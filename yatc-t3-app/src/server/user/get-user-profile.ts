import { DrizzleDb, drizzleDb } from "../infrastructure/drizzle";
import { users } from "../infrastructure/drizzle/base.drizzle.schema";
import { desc, eq } from "drizzle-orm";

const getUserProfileWithDrizzle = (db: DrizzleDb) => async (userName: string) => {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      avatar: users.image
    })
    .from(users)
    .where(eq(users.name, userName))
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

export const findUserProfile = (userName: string) => getUserProfileWithDrizzle(drizzleDb)(userName);