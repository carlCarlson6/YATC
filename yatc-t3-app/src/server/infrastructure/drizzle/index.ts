import { drizzle } from 'drizzle-orm/postgres-js'
import { sql } from '@vercel/postgres';
import * as baseSchema from "src/server/infrastructure/drizzle/base.drizzle.schema";
import * as tweetSchema from "src/server/send-tweet/tweet.drizzle.schema";
import * as followsSchema from "src/server/user/follow/follow.drizzle.schema"
import postgres from 'postgres'

export const drizzleSchema = {
	...baseSchema,
  ...tweetSchema,
  ...followsSchema,
};

const postgressClient = postgres(process.env.DATABASE_URL!)
export const drizzleDb = drizzle(postgressClient, { schema: drizzleSchema } );

export type DrizzleDb = typeof drizzleDb;