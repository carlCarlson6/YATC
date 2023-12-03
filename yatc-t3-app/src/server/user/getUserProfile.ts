import { type DrizzleDb, drizzleDb } from "../infrastructure/drizzle";
import { eq } from "drizzle-orm";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema";

export const getUserProfileWithDrizzle = (db: DrizzleDb) => async (userName: string) => {
  const result = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      avatar: usersTable.image
    })
    .from(usersTable)
    .where(eq(usersTable.name, userName))
    .execute();

  const maybeUser = result.at(0);
  return !maybeUser
    ? undefined
    : {
      id: maybeUser.id,
      name: maybeUser.name ?? "",
      avatar: maybeUser.avatar ?? "",
    };
}