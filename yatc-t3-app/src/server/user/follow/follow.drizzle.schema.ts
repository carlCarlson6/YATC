import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/mysql-core";
import { users } from "yact/server/infrastructure/drizzle/base.drizzle.schema";
import { drizzleMySqlTable } from "yact/server/infrastructure/drizzle/drizzleMySqlTable";

export const follows = drizzleMySqlTable("follows", {
  userWhoIsFollowing: varchar("userWhoIsFollowingId", {length: 255}).notNull(),
  userWhoIsFollowed:  varchar("userWhoIsFollowedId", {length: 255}).notNull(),
});

export const followsRelation = relations(follows, ({one}) => ({
  user: one(users, { 
    fields: [follows.userWhoIsFollowing, follows.userWhoIsFollowing], 
    references: [users.id, users.id] 
  })
}));