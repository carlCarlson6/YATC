import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { env } from "yact/env.mjs";
import * as baseSchema from "./base.drizzle.schema";

const schema = {
	...baseSchema,
};

export const db = drizzle(
  new Client({
    url: env.DATABASE_URL,
  }).connection(),
  { schema }
);
