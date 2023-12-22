import * as baseSchema from "src/server/infrastructure/drizzle/base.drizzle.schema";
import * as followsSchema from "src/server/user/follows/follows.drizzle.schema"
import * as emojisSchema from "src/server/publish-emojeet/emojis.drizzle.schema";
//import { sql } from '@vercel/postgres'; TODO delete
//import { drizzle } from 'drizzle-orm/vercel-postgres'; TODO delete
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';


export const drizzleSchema = {
	...baseSchema,
  ...followsSchema,
  ...emojisSchema,
};

//export const drizzleDb = drizzle(sql, { schema: drizzleSchema } ); TODO delete

export const drizzleDb = drizzle(postgres(process.env.NEON_DB!), { schema: drizzleSchema } );
export type DrizzleDb = typeof drizzleDb;