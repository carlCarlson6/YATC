import { desc, eq, inArray } from "drizzle-orm";
import { drizzleDb, type DrizzleDb } from "../infrastructure/drizzle";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema";
import { type TweetEntity, tweetsTable } from "../send-tweet/tweet.drizzle.schema";
import type { ArrElement } from "../core/ArrElement";
import { followsTable } from "../user/follow/follow.drizzle.schema";
import type { AppCache } from "../core/AppCache";
import { timelineId } from "./timelineId";
import type { User } from "../user/user";
import { vercelKvCache } from "../infrastructure/vercelKv";

export const loadAllTweetsFromDrizzleDb = (db: DrizzleDb) => async () => {
  const result = await db
    .select({
      id: tweetsTable.id,
      text: tweetsTable.text,
      publishedAt: tweetsTable.publishedAt,
      user: {
        id: usersTable.id,
        name: usersTable.name,
        avatar: usersTable.image,
      }
    })
    .from(tweetsTable)
    .innerJoin(usersTable, eq(tweetsTable.publishedBy, usersTable.id))
    .orderBy(desc(tweetsTable.publishedAt))
    .execute();
  return result.map(x => ({
    ...x,
    user: {
      ...x.user,
      name: x.user.name ?? "",
      avatar: x.user.avatar ?? ""
    }
  }))
};

export type Timeline = Awaited<ReturnType<ReturnType<typeof loadAllTweetsFromDrizzleDb>>>;

export type Tweet = ArrElement<Timeline>;

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

  return [...followsTweets, ...userTweets].sort(x => x.publishedAt).reverse();
}

const addUserData = (db: DrizzleDb) => async (tweetsEntities: TweetEntity[]): Promise<Timeline> => {
  if (tweetsEntities.length === 0) return [];

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
  });
}

const getTimeline = ({cache, buildTimeline, addUserData}: {
  cache: AppCache,
  buildTimeline: (userId: string) => Promise<TweetEntity[]>,
  addUserData: (tweets: TweetEntity[]) => Promise<Tweet[]>,
}) => async (userId: string) => {
  const timeline = await cache.read<TweetEntity[]>(timelineId(userId));
  if (!timeline || timeline.length === 0) {
    const builtTimeline = await buildTimeline(userId);
    await cache.upsert(timelineId(userId), builtTimeline);
    return await addUserData(builtTimeline);
  }
  return await addUserData(timeline);
}
export const executeGetTimeline = (user: User) => getTimeline({
  cache: vercelKvCache,
  buildTimeline: buildTimelineFromDb(drizzleDb),
  addUserData: addUserData(drizzleDb),
})(user.id)