import { pgTableCreator } from 'drizzle-orm/pg-core'

export const drizzleTable = pgTableCreator((name) => name);