import z from "zod";
import { protectedProcedure } from "../infrastructure/trpc";
import type { DrizzleDb } from "../infrastructure/drizzle";
import type { User } from "../user/userProfile.drizzle.schema";
import type { Emojeet } from "../timeline/EmojiTweet";
import { randomUUID } from "crypto";
import { emojisTable } from "./emojis.drizzle.schema";

export const publishEmojeetProcedure = protectedProcedure
  .input(z.object({
    emoji: z.string().min(1)
  }))
  .mutation(({ctx: {db, session: {user}}, input: {emoji}}) => storeEmojeet(db)({
    emoji,
    publisher: {
      id: user.id,
      name: user.name,
      avatar: user.image
    }
  }));

const storeEmojeet = (db: DrizzleDb) => async ({emoji, publisher}: {emoji: string, publisher: User}) => {
  const insertInput = {
    id: randomUUID(),
    emoji,
    publishedBy: publisher.id,
    publishedAt: `${Date.now()}`
  };
  await db.insert(emojisTable).values(insertInput).execute();

  return {    
    id: insertInput.id,
    emoji,
    publishedAt: insertInput.publishedAt,
    user: publisher,
    reactions: []
  } satisfies Emojeet;
}