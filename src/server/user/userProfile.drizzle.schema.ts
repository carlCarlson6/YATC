import { varchar } from "drizzle-orm/pg-core"
import { drizzleTable } from "../infrastructure/drizzle/drizzleTable"

export type User = {
  id: string,
  name: string,
  avatar: string
}

export const userProfileTable = drizzleTable("user_profile", {
  id: varchar("id", {length: 255}).notNull().primaryKey(),
  name: varchar("name", {length: 255}).notNull()
})