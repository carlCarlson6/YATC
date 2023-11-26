import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/mysql-core";
import { users } from "yact/server/infrastructure/drizzle/base.drizzle.schema";
import { drizzleMySqlTable } from "yact/server/infrastructure/drizzle/drizzleMySqlTable";

export const follows = drizzleMySqlTable("follows", {
  userWhoIsFollowing: varchar("userWhoIsFollowingId", {length: 255}).notNull(),
  userWhoIsFollowed:  varchar("userWhoIsFollowedId", {length: 255}).notNull(),
});

export const followsRelation = relations(follows, ({one}) => ({
  userWhoIsFollowing: one(users, { 
    fields: [follows.userWhoIsFollowing], 
    references: [users.id],
  }),
  userWhoIsFollowed: one(users, { 
    fields: [follows.userWhoIsFollowed], 
    references: [users.id],
  }),
}));