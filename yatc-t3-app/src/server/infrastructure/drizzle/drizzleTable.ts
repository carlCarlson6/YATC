import { pgTableCreator } from 'drizzle-orm/pg-core'

export const drizzleTable = pgTableCreator((name) => `yatct3app${name}`);