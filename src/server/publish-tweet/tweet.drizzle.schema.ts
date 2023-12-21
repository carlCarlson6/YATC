import { relations } from "drizzle-orm";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema"
import { decimal, varchar } from "drizzle-orm/pg-core";
import { drizzleTable } from "../infrastructure/drizzle/drizzleTable";

export type TweetEntity = typeof tweetsTable.$inferSelect;

export const tweetsTable = drizzleTable("tweet", {
  id:           varchar("id", { length: 255 }).notNull().primaryKey(),
  text:         varchar("text", { length: 280 }).notNull(),
  publishedBy:  varchar("publishedBy", { length: 255 }).notNull(),
  publishedAt:  decimal("publishedAt").notNull(),
});

export const tweetsTableRelations = relations(tweetsTable, ({one}) => ({
  user: one(usersTable, { fields: [tweetsTable.publishedBy], references: [usersTable.id] })
}));