import { desc, eq, inArray } from "drizzle-orm";
import { drizzleDb, type DrizzleDb } from "../infrastructure/drizzle";
import { users } from "../infrastructure/drizzle/base.drizzle.schema";
import { type TweetEntity, tweets } from "../send-tweet/tweet.drizzle.schema";
import type { ArrElement } from "../core/ArrElement";
import { follows } from "../user/follow/follow.drizzle.schema";
import type { AppCache } from "../core/AppCache";
import { timelineId } from "./timelineId";
import type { User } from "../user/user";
import { vercelKvCache } from "../infrastructure/vercelKv";

export const loadAllTweetsFromDrizzleDb = (db: DrizzleDb) => async () => {
  const result = await db
    .select({
      id: tweets.id,
      text: tweets.text,
      publishedAt: tweets.publishedAt,
      user: {
        id: users.id,
        name: users.name,
        avatar: users.image,
      }
    })
    .from(tweets)
    .innerJoin(users, eq(tweets.publishedBy, users.id))
    .orderBy(desc(tweets.publishedAt))
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
  const result = await db
    .select({ tweet: tweets })
    .from(follows)
    .where(eq(follows.userWhoIsFollowing, userId))
    .innerJoin(tweets, eq(follows.userWhoIsFollowed, tweets.publishedBy))
    .execute();
  const followsTweets = result.map(x => x.tweet);

  const userTweets = await db
    .select()
    .from(tweets)
    .where(eq(tweets.publishedBy, userId))
    .execute();

  return [...followsTweets, ...userTweets].sort(x => x.publishedAt).reverse();
}

const addUserData = (db: DrizzleDb) => async (tweetsEntities: TweetEntity[]): Promise<Timeline> => {
  if (tweetsEntities.length === 0) return [];

  const usersData = await db.select({
  id: users.id,
  name: users.name,
  avatar: users.image
  }).from(users).where(inArray(users.id, tweetsEntities.map(t => t.publishedBy))).execute();
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