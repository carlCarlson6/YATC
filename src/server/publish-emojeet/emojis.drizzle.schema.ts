import { decimal, varchar } from "drizzle-orm/pg-core";
import { drizzleTable } from "../infrastructure/drizzle/drizzleTable";
import { relations } from "drizzle-orm";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema";

export type EmojiEntity = typeof emojisTable.$inferSelect;

export const emojisTable = drizzleTable("emoji_tweets", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  emoji: varchar("emoji", { length: 255 }),
  publishedBy: varchar("publishedBy", { length: 255 }).notNull(),
  publishedAt: decimal("publishedAt").notNull(),
});

export const emojisTableRelations = relations(emojisTable, ({one}) => ({
  user: one(usersTable, { 
    fields: [emojisTable.publishedBy], 
    references: [usersTable.id] 
  })
}));