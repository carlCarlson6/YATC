import { relations } from "drizzle-orm";
import { users } from "../infrastructure/drizzle/base.drizzle.schema"
import { int, varchar, } from "drizzle-orm/mysql-core";
import { drizzleMySqlTable } from "../infrastructure/drizzle/drizzleMySqlTable";

export type TweetEntity = typeof tweets.$inferSelect;

export const tweets = drizzleMySqlTable("tweet", {
  id:           varchar("id", { length: 255 }).notNull().primaryKey(),
  text:         varchar("text", { length: 280 }).notNull(),
  publishedBy:  varchar("publishedBy", { length: 255 }).notNull(),
  publishedAt:  int("publishedAt").notNull(),
});

export const tweetsRelations = relations(tweets, ({one}) => ({
  user: one(users, { fields: [tweets.publishedBy], references: [users.id] })
}));