import type { Timeline } from "../core/EmojiTweet";
import { type DrizzleDb } from "../infrastructure/drizzle";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema";
import { tweetsTable } from "../publish-tweet/tweet.drizzle.schema";
import { desc, eq } from "drizzle-orm";

export const getUserTweetsWithDrizzle = (db: DrizzleDb) => async (userId: string): Promise<Timeline> => {
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
    .where(eq(tweetsTable.publishedBy, userId))
    .orderBy(desc(tweetsTable.publishedAt)).execute();
  return result.map(x => ({
    ...x,
    user: {
      ...x.user,
      name: x.user.name ?? "",
      avatar: x.user.avatar ?? ""
    }
  }))
}