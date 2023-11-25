import { desc, eq } from "drizzle-orm";
import { type DrizzleDb, drizzleDb } from "../infrastructure/drizzle";
import { users } from "../infrastructure/drizzle/base.drizzle.schema";
import { tweets } from "../send-tweet/tweet.drizzle.schema";

const buildTimelineWithDrizzle = (db: DrizzleDb) => async () => {
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

export const buildTimeline = buildTimelineWithDrizzle(drizzleDb);

export type Timeline = Awaited<ReturnType<typeof buildTimeline>>;
type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never;
export type Tweet = ArrElement<Timeline>;