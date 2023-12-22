import { DrizzleDb } from "src/server/infrastructure/drizzle";
import { usersTable } from "src/server/infrastructure/drizzle/base.drizzle.schema";
import { protectedProcedure } from "src/server/infrastructure/trpc";
import { z } from "zod";
import { userProfileTable } from "../userProfile.drizzle.schema";
import { eq, or } from "drizzle-orm";

const editUserProfileInputSchema = z.object({ name: z.string().min(1) });

export const editUserProfileProcedure = protectedProcedure
  .input(editUserProfileInputSchema)
  .mutation(({ctx: {session}, input}) => {})

const editUserProfile = (db: DrizzleDb) => (userId: string, newFields: z.infer<typeof editUserProfileInputSchema>) => {
}