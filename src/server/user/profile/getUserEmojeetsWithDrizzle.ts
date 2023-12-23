import type { Timeline } from "../../timeline/EmojiTweet";
import { type DrizzleDb } from "../../infrastructure/drizzle";
import { usersTable } from "../../infrastructure/drizzle/base.drizzle.schema";
import { desc, eq } from "drizzle-orm";
import { emojisTable } from "../../publish-emojeet/emojis.drizzle.schema";

export const getUserEmojeetsWithDrizzle = (db: DrizzleDb) => async (userId: string): Promise<Timeline> => {
  const result = await db
    .select({
      id: emojisTable.id,
      emoji: emojisTable.emoji,
      publishedAt: emojisTable.publishedAt,
      user: {
        id: usersTable.id,
        name: usersTable.name,
        avatar: usersTable.image,
      }
    })
    .from(emojisTable)
    .innerJoin(usersTable, eq(emojisTable.publishedBy, usersTable.id))
    .where(eq(emojisTable.publishedBy, userId))
    .orderBy(desc(emojisTable.publishedAt)).execute();
  return result.map(x => ({
    ...x,
    user: {
      ...x.user,
      name: x.user.name ?? "",
      avatar: x.user.avatar ?? ""
    },
    reactions: [] // TODO pending to load reactions
  }))
}