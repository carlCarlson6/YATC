import { desc, eq } from "drizzle-orm";
import { type DrizzleDb } from "../infrastructure/drizzle";
import { followsTable } from "../user/follows/follows.drizzle.schema";
import { emojisTable } from "../emojeets/publish/emojis.drizzle.schema";
import { emojisReactionsTable } from "../emojeets/react/emojisReactions.drizzle.schema";
import type { EmojiEntityWithReactions } from "./EmojiTweet";

export const buildTimelineFromDb = (db: DrizzleDb) => async (userId: string): Promise<EmojiEntityWithReactions[]> => {
  const queryFollowsEmojisResult = await db
    .select({ emoji: emojisTable })
    .from(followsTable)
    .where(eq(followsTable.userId, userId))
    .innerJoin(emojisTable, eq(followsTable.userId, emojisTable.publishedBy))
    .orderBy(desc(emojisTable.publishedAt))
    .execute();
  const followEmojis = queryFollowsEmojisResult.map(x => ({...x.emoji}));
  const followEmojisWithReactionsPromises = followEmojis.map(async x => ({
    ...x,
    reactions: await loadEmojeetReactions(db)(x.id),
  }));
  const followEmojisWithReactions = await Promise.all(followEmojisWithReactionsPromises);

  const userEmojis = await db
    .select()
    .from(emojisTable)
    .where(eq(emojisTable.publishedBy, userId))
    .orderBy(desc(emojisTable.publishedAt))
    .execute();
  const userEmojisWithReactionsPromises = userEmojis.map(async x => ({
    ...x,
    reactions: await loadEmojeetReactions(db)(x.id),
  }));
  const userEmojisWithReactions = await Promise.all(userEmojisWithReactionsPromises);

  return [...userEmojisWithReactions, ...followEmojisWithReactions].sort((a,b) => Number.parseFloat(a.publishedAt) - Number.parseFloat(b.publishedAt)).reverse();
}

const loadEmojeetReactions = (db: DrizzleDb) => async (emojeetId: string) => await db
  .select({ emoji: emojisReactionsTable.reaction })
  .from(emojisReactionsTable)
  .where(eq(emojisReactionsTable.reactsTo, emojeetId))
  .execute();