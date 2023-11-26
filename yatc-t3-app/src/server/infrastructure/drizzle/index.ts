import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { env } from "yact/env.mjs";
import * as baseSchema from "yact/server/infrastructure/drizzle/base.drizzle.schema";
import * as tweetSchema from "yact/server/send-tweet/tweet.drizzle.schema";
import * as followsSchema from "yact/server/user/follow/follow.drizzle.schema"

const schema = {
	...baseSchema,
  ...tweetSchema,
  ...followsSchema,
};

export const drizzleDb = drizzle(
  new Client({
    url: env.DATABASE_URL,
  }).connection(),
  { schema }
);

export type DrizzleDb = typeof drizzleDb;