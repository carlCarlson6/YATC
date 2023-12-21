import { desc, eq, inArray } from "drizzle-orm";
import { type DrizzleDb } from "../infrastructure/drizzle";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema";
import { type TweetEntity, tweetsTable } from "../publish-tweet/tweet.drizzle.schema";
import { followsTable } from "../user/follows/follow.drizzle.schema";
import type { Timeline } from "../core/EmojiTweet";

export const buildTimelineFromDb = (db: DrizzleDb) => async (userId: string) => {
  const resultFollowsTweets = await db
    .select({ tweet: tweetsTable })
    .from(followsTable)
    .where(eq(followsTable.userId, userId))
    .innerJoin(tweetsTable, eq(followsTable.userId, tweetsTable.publishedBy))
    .orderBy(desc(tweetsTable.publishedAt))
    .execute();
  const followsTweets = resultFollowsTweets.map(x => x.tweet);

  const userTweets = await db
    .select()
    .from(tweetsTable)
    .where(eq(tweetsTable.publishedBy, userId))
    .orderBy(desc(tweetsTable.publishedAt))
    .execute();

  return [...followsTweets, ...userTweets].sort((x, y) => Number.parseFloat(x.publishedAt)-Number.parseFloat(y.publishedAt)).reverse();
}

export const addUserData = (_: DrizzleDb) => (_: TweetEntity[]): Promise<Timeline> => {
  return Promise.resolve([]);
  // TODO
  /*if (tweetsEntities.length === 0) return [];

  const usersData = await db.select({
    id: usersTable.id,
  name: usersTable.name,
  avatar: usersTable.image
  }).from(usersTable).where(inArray(usersTable.id, tweetsEntities.map(t => t.publishedBy))).execute();
  return tweetsEntities.map(tweet => {
  const maybeUser = usersData.filter(x => x.id === tweet.publishedBy).map(x => ({
    id: x.id,
    name: x.name ?? "",
    avatar: x.avatar ?? ""
  })).at(0);
  return {
    ...tweet,
    user: maybeUser ?? { id: "", name: "", avatar: "" }
  };
  });*/
}