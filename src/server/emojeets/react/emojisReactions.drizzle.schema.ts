import { relations } from "drizzle-orm";
import { decimal, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "src/server/infrastructure/drizzle/base.drizzle.schema";
import { drizzleTable } from "src/server/infrastructure/drizzle/drizzleTable";
import { emojisTable } from "../publish/emojis.drizzle.schema";

export const emojisReactionsTable = drizzleTable("emoji_reaction", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  reaction: varchar("reaction", { length: 255 }).notNull(),
  reactsTo: varchar("reactsTo", { length: 255 }).notNull(),
  publishedBy: varchar("publishedBy", { length: 255 }).notNull(),
  publishedAt: decimal("publishedAt").notNull(),
});

export const emojisReactionsTableRelations = relations(emojisReactionsTable, ({one}) => ({
  user: one(usersTable, {
    fields:     [emojisReactionsTable.publishedBy],
    references: [usersTable.id]
  }),
  emoji: one(emojisTable, {
    fields:     [emojisReactionsTable.reactsTo],
    references: [emojisTable.id]
  })
}));