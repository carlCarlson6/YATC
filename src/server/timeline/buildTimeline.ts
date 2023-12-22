import { desc, eq, inArray } from "drizzle-orm";
import { type DrizzleDb } from "../infrastructure/drizzle";
import { followsTable } from "../user/follows/follows.drizzle.schema";
import type { Timeline } from "./EmojiTweet";
import { type EmojiEntity, emojisTable } from "../publish-emojeet/emojis.drizzle.schema";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema";

export const buildTimelineFromDb = (db: DrizzleDb) => async (userId: string): Promise<EmojiEntity[]> => {
  const queryFollowsEmojisResult = await db
    .select({ emoji: emojisTable })
    .from(followsTable)
    .where(eq(followsTable.userId, userId))
    .innerJoin(emojisTable, eq(followsTable.userId, emojisTable.publishedBy))
    .orderBy(desc(emojisTable.publishedAt))
    .execute();
  const followEmojis = queryFollowsEmojisResult.map(x => x.emoji);

  const userEmojis = await db
    .select()
    .from(emojisTable)
    .where(eq(emojisTable.publishedBy, userId))
    .orderBy(desc(emojisTable.publishedAt))
    .execute();

  return [...userEmojis, ...followEmojis].sort((a,b) => Number.parseFloat(a.publishedAt) - Number.parseFloat(b.publishedAt)).reverse();
}

export const addUserData = (db: DrizzleDb) => async (emojis: EmojiEntity[]): Promise<Timeline> => {
  if (emojis.length === 0) return [];
  
  const usersData = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    avatar: usersTable.image
  }).from(usersTable).where(inArray(usersTable.id, emojis.map(t => t.publishedBy))).execute();

  return emojis.map(emoji => {
    const maybeUser = usersData.filter(x => x.id === emoji.publishedBy).map(x => ({
      id: x.id,
      name: x.name ?? "",
      avatar: x.avatar ?? ""
    })).at(0);
    return {
      ...emoji,
      reactions: [],
      user: maybeUser ?? { id: "", name: "", avatar: "" }
    };
  });
}