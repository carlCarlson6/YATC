import * as baseSchema from "src/server/infrastructure/drizzle/base.drizzle.schema";
import * as followsSchema from "src/server/user/follows/follows.drizzle.schema"
import * as emojisSchema from "src/server/publish-emojeet/emojis.drizzle.schema";
import * as userProfileSchema from "src/server/user/profile/userProfile.drizzle.schema";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';


export const drizzleSchema = {
	...baseSchema,
  ...followsSchema,
  ...emojisSchema,
  ...userProfileSchema
};


export const drizzleDb = drizzle(postgres(process.env.NEON_DB!), { schema: drizzleSchema } );
export type DrizzleDb = typeof drizzleDb;