import type { DrizzleDb } from "../infrastructure/drizzle";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema";
import { emojisTable } from "./publish/emojis.drizzle.schema";
import { eq } from "drizzle-orm";
import { emojisReactionsTable } from "./react/emojisReactions.drizzle.schema";
import type { Emojeet } from "../timeline/EmojiTweet";

export const loadEmojeet = (db: DrizzleDb) => async (emojeetId: string) => {
  const resultWithUser = await db
    .select({
      emoji: emojisTable,
      user: usersTable,
    })
    .from(emojisTable)
    .where(eq(emojisTable.id, emojeetId))
    .innerJoin(usersTable, eq(usersTable.id, emojisTable.publishedBy))
    .execute();

  const firstResultWithUser = resultWithUser.at(0);
  if (!firstResultWithUser) {
    return null;
  }

  const reactions = await db
  .select({
    emoji: emojisReactionsTable.reaction
  })
  .from(emojisReactionsTable)
  .where(eq(emojisReactionsTable.reactsTo, emojeetId))
  .execute();

  return {
    id: firstResultWithUser.emoji.id,
    emoji: firstResultWithUser.emoji.emoji,
    publishedAt: firstResultWithUser.emoji.publishedAt,
    user: {
      id: firstResultWithUser.user.id,
      name: firstResultWithUser.user.name ?? '',
      avatar: firstResultWithUser.user.image ?? ''
    },
    reactions
  } satisfies Emojeet;
}