import { type DrizzleDb, drizzleDb } from "../infrastructure/drizzle";
import { users } from "../infrastructure/drizzle/base.drizzle.schema";
import { tweets } from "../send-tweet/tweet.drizzle.schema";
import { desc, eq } from "drizzle-orm";
import type { Timeline } from "./build-timeline";

const getUserTweetsWithDrizzle = (db: DrizzleDb) => async (userId: string): Promise<Timeline> => {
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
    .where(eq(tweets.publishedBy, userId))
    .orderBy(desc(tweets.publishedAt)).execute();
  return result.map(x => ({
    ...x,
    user: {
      ...x.user,
      name: x.user.name ?? "",
      avatar: x.user.avatar ?? ""
    }
  }))
}

export const getUserTweets = getUserTweetsWithDrizzle(drizzleDb);