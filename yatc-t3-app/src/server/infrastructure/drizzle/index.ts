import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from '@vercel/postgres';
import * as baseSchema from "yact/server/infrastructure/drizzle/base.drizzle.schema";
import * as tweetSchema from "yact/server/send-tweet/tweet.drizzle.schema";
import * as followsSchema from "yact/server/user/follow/follow.drizzle.schema"

const schema = {
	...baseSchema,
  ...tweetSchema,
  ...followsSchema,
};

export const drizzleDb = drizzle(sql,
  { schema }
);

export type DrizzleDb = typeof drizzleDb;