import { desc, eq } from "drizzle-orm";
import { type DrizzleDb } from "../infrastructure/drizzle";
import { followsTable } from "../user/follows/follows.drizzle.schema";
import { emojisTable } from "../emojeets/publish/emojis.drizzle.schema";
import { emojisReactionsTable } from "../emojeets/react/emojisReactions.drizzle.schema";
import type { EmojiEntityWithReactions } from "./EmojiTweet";

export const buildTimelineFromDb = (db: DrizzleDb) => async (userId: string): Promise<EmojiEntityWithReactions[]> => {
  const followingEmojis = await loadFollowingUsersEmojis(db, userId);
  const userEmojis = await loadUserEmojis(db, userId);
  return [...userEmojis, ...followingEmojis].sort((a,b) => Number.parseFloat(a.publishedAt) - Number.parseFloat(b.publishedAt)).reverse();
}

const loadUserEmojis = async (db: DrizzleDb, userId: string) => {
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
  return await Promise.all(userEmojisWithReactionsPromises);
}

const loadFollowingUsersEmojis = async (db: DrizzleDb, userId: string) => {
  const followers = await db
    .select({userWhoIsFollowedId: followsTable.isFollowingUserId})
    .from(followsTable)
    .where(eq(followsTable.userId, userId))
    .execute();
  const followEmojis = (await Promise.all(followers.map(x => db.select().from(emojisTable).where(eq(emojisTable.publishedBy, x.userWhoIsFollowedId)).execute())))
    .flatMap(x => x);
  const followEmojisWithReactionsPromises = followEmojis.flatMap(async x => ({
    ...x,
    reactions: await loadEmojeetReactions(db)(x.id),
  }));
  return await Promise.all(followEmojisWithReactionsPromises);
}

const loadEmojeetReactions = (db: DrizzleDb) => async (emojeetId: string) => await db
  .select({ emoji: emojisReactionsTable.reaction })
  .from(emojisReactionsTable)
  .where(eq(emojisReactionsTable.reactsTo, emojeetId))
  .execute();