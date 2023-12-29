import { type DrizzleDb } from "../../../infrastructure/drizzle";
import { eq } from "drizzle-orm";
import { usersTable } from "../../../infrastructure/drizzle/base.drizzle.schema";
import { userProfileTable } from "../userProfile.drizzle.schema";

export const getUserProfileWithDrizzle = (db: DrizzleDb) => async (userName: string) => {
  const result = await db
    .select({
      id: usersTable.id,
      account: {
        name: usersTable.name,
        avatar: usersTable.image
      },
      profile: {
        name: userProfileTable.name
      }
    })
    .from(usersTable)
    .where(eq(usersTable.name, userName))
    .leftJoin(userProfileTable, eq(userProfileTable.id, usersTable.id))
    .execute();

  const maybeUser = result.at(0);
  return !maybeUser
    ? undefined
    : {
      id: maybeUser.id,
      name: maybeUser.profile?.name ?? maybeUser.account.name ?? "",
      avatar: maybeUser.account.avatar ?? "",
    };
}