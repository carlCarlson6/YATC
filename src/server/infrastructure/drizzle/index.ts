import * as baseSchema from "src/server/infrastructure/drizzle/base.drizzle.schema";
import * as followsSchema from "src/server/user/follows/follows.drizzle.schema"
import * as emojisSchema from "src/server/publish-emojeet/emojis.drizzle.schema";
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const drizzleSchema = {
	...baseSchema,
  ...followsSchema,
  ...emojisSchema,
};

export const drizzleDb = drizzle(sql, { schema: drizzleSchema } );

export type DrizzleDb = typeof drizzleDb;