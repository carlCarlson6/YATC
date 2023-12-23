"use server"

import { drizzleDb, type DrizzleDb } from "../infrastructure/drizzle";
import type { Emojeet } from "../timeline/EmojiTweet";
import { randomUUID } from "crypto";
import { emojisTable } from "./emojis.drizzle.schema";
import { z } from "zod";
import { nextAuthValidator } from "../auth/nextAuthValidator";
import type { AuthValidator } from "../auth/AuthValidator";

const storeEmojeetInputSchema = z.object({
  emoji: z.string().min(1),
});

// TODO add auth middleware
const storeEmojeet = (db: DrizzleDb, auth: AuthValidator) => async (input: z.infer<typeof storeEmojeetInputSchema>) => {
  const publisher = await auth();
  const {emoji} = await storeEmojeetInputSchema.parseAsync(input);

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

export const publishEmojeet = storeEmojeet(drizzleDb, nextAuthValidator);