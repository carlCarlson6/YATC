import { desc, eq } from "drizzle-orm";
import { type DrizzleDb } from "../infrastructure/drizzle";
import { users } from "../infrastructure/drizzle/base.drizzle.schema";
import { tweets } from "../send-tweet/tweet.drizzle.schema";
import type { ArrElement } from "../core/ArrElement";

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

export const buildTimeline = () => Promise.resolve([])