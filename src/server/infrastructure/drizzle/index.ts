import * as baseSchema from "src/server/infrastructure/drizzle/base.drizzle.schema";
import * as tweetSchema from "src/server/publish-tweet/tweet.drizzle.schema";
import * as followsSchema from "src/server/user/follows/follow.drizzle.schema"
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const drizzleSchema = {
	...baseSchema,
  ...tweetSchema,
  ...followsSchema,
};

export const drizzleDb = drizzle(sql, { schema: drizzleSchema } );

export type DrizzleDb = typeof drizzleDb;