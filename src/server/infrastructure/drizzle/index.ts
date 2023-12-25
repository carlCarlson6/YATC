import * as baseSchema from "src/server/infrastructure/drizzle/base.drizzle.schema";
import * as followsSchema from "src/server/user/follows/follows.drizzle.schema"
import * as emojisSchema from "src/server/emojeets/publish/emojis.drizzle.schema";
import * as userProfileSchema from "src/server/user/profile/userProfile.drizzle.schema";
import * as emojisReactionsSchema from "src/server/emojeets/react/emojisReactions.drizzle.schema";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const drizzleSchema = {
	...baseSchema,
  ...followsSchema,
  ...emojisSchema,
  ...userProfileSchema,
  ...emojisReactionsSchema,
};

export const drizzleDb = drizzle(postgres(process.env.NEON_DB!), { schema: drizzleSchema } );
export type DrizzleDb = typeof drizzleDb;