import type { AuthValidator } from "src/server/auth/AuthValidator";
import type { DrizzleDb } from "src/server/infrastructure/drizzle";
import { z } from "zod";
import { type User, userProfileTable } from "./userProfile.drizzle.schema";
import { eq } from "drizzle-orm";
import { checkUserNameIsAvailable } from "./checkUserNameIsAvailableAction";

export const updateUserProfileInputSchema = z.object({
  userName: z.string().min(1),
});

export const editUserProfileAction = (
  db: DrizzleDb, 
  auth: AuthValidator
) => async (
  input: z.infer<typeof updateUserProfileInputSchema>
) => {
  const user = await auth();
  const {userName} = await updateUserProfileInputSchema.parseAsync(input);
  const isUniqueUserName = await checkUserNameIsAvailable(db)(userName);
  if (isUniqueUserName) {
    throw new Error("400");
  }

  await upsertUserProfile(db)(user.id, {name: userName});

  return {
    ...user,
    name: userName
  };
}

const upsertUserProfile = (db: DrizzleDb) => async (userId: string, values: Partial<User>) => {
  await db.update(userProfileTable).set(values).where(eq(userProfileTable.id, userId))
  .execute();
}

