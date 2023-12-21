import { decimal, varchar, json } from "drizzle-orm/pg-core";
import { drizzleTable } from "../infrastructure/drizzle/drizzleTable";

export const emojisTable = drizzleTable("emoji_tweets", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  emoji: varchar("id", { length: 255 }).primaryKey(),
  reactions: json("reactions"),
  publishedBy: varchar("publishedBy", { length: 255 }).notNull(),
  publishedAt: decimal("publishedAt").notNull(),
});
