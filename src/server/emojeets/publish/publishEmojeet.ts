"use server"

import { type DrizzleDb } from "../../infrastructure/drizzle";
import type { Emojeet } from "../../timeline/EmojiTweet";
import { randomUUID } from "crypto";
import { emojisTable } from "./emojis.drizzle.schema";
import { z } from "zod";
import type { AuthValidator } from "../../auth/AuthValidator";

const publishEmojeetInputSchema = z.object({
  emoji: z.string().min(1),
});

// TODO add auth middleware
export const publishEmojeet = (db: DrizzleDb, auth: AuthValidator) => async (input: z.infer<typeof publishEmojeetInputSchema>) => {
  const publisher = await auth();
  const {emoji} = await publishEmojeetInputSchema.parseAsync(input);

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
};

