import type { AuthValidator } from "src/server/auth/AuthValidator";
import type { DrizzleDb } from "src/server/infrastructure/drizzle";

export const checkUserNameIsAvailableAction = (db: DrizzleDb, auth: AuthValidator) => async (userName: string) => {
  await auth();
  return await checkUserNameIsAvailable(db)(userName)
}

export const checkUserNameIsAvailable = (db: DrizzleDb) => async (userName: string): Promise<boolean> => {
  const recordOnUsers = await db.query.usersTable.findFirst({
    where: (usersTable, {eq}) => eq(usersTable.name, userName),
  }).execute();
  const recordOnProfile = await db.query.userProfileTable.findFirst({
    where: (userProfileTable, {eq}) => eq(userProfileTable.name, userName),
  }).execute();

  const a = !!recordOnProfile;
  const b = (!!recordOnUsers && recordOnUsers.name !== userName);
  console.log(a, b);
  return a || b;
}