import { inArray } from "drizzle-orm";
import { type DrizzleDb } from "../infrastructure/drizzle";
import type { EmojiEntityWithReactions, Timeline } from "./EmojiTweet";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema";

export const addUserData = (db: DrizzleDb) => async (emojis: EmojiEntityWithReactions[]): Promise<Timeline> => {
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
      user: maybeUser ?? { id: "", name: "", avatar: "" }
    };
  });
};
