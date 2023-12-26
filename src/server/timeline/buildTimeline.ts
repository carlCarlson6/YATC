import { desc, eq } from "drizzle-orm";
import { type DrizzleDb } from "../infrastructure/drizzle";
import { followsTable } from "../user/follows/follows.drizzle.schema";
import { emojisTable } from "../emojeets/publish/emojis.drizzle.schema";
import { emojisReactionsTable } from "../emojeets/react/emojisReactions.drizzle.schema";
import type { EmojiEntityWithReactions } from "./EmojiTweet";

export const buildTimelineFromDb = (db: DrizzleDb) => async (userId: string): Promise<EmojiEntityWithReactions[]> => {
  const followers = await db.select({
      userWhoIsFollowedId: followsTable.isFollowingUserId
    })
    .from(followsTable)
    .where(eq(followsTable.userId, userId))
    .execute();
  const followEmojis = (await Promise.all(followers.map(x => db.select().from(emojisTable).where(eq(emojisTable.publishedBy, x.userWhoIsFollowedId)).execute())))
    .flatMap(x => x);
  const followEmojisWithReactionsPromises = followEmojis.flatMap(async x => ({
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