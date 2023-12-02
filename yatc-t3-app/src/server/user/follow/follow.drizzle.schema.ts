import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { usersTable } from "yact/server/infrastructure/drizzle/base.drizzle.schema";
import { drizzleTable } from "yact/server/infrastructure/drizzle/drizzleTable";

export const followsTable = drizzleTable("follows", {
  id:                 varchar("id", {length: 255}).primaryKey().notNull(),
  userId:             varchar("userId", {length: 255}).notNull(),
  isFollowingUserId:  varchar("isFollowingUserId", {length: 255}).notNull(),
});

export const followsRelation = relations(followsTable, ({one}) => ({
  userWhoIsFollowing: one(usersTable, { 
    fields: [followsTable.userId], 
    references: [usersTable.id],
  }),
  userWhoIsFollowed: one(usersTable, { 
    fields: [followsTable.isFollowingUserId], 
    references: [usersTable.id],
  }),
}));