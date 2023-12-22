import * as baseSchema from "src/server/infrastructure/drizzle/base.drizzle.schema";
import * as followsSchema from "src/server/user/follows/follows.drizzle.schema"
import * as emojisSchema from "src/server/publish-emojeet/emojis.drizzle.schema";
import { sql } from '@vercel/postgres';
//import { drizzle } from 'drizzle-orm/vercel-postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import postgres from 'postgres';
import { env } from "src/env.mjs";


export const drizzleSchema = {
	...baseSchema,
  ...followsSchema,
  ...emojisSchema,
};

//export const drizzleDb = drizzle(sql, { schema: drizzleSchema } );

export const drizzleDb = drizzle(postgres(env.NEON_DB), { schema: drizzleSchema } );
export type DrizzleDb = typeof drizzleDb;