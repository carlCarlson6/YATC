import { AuthValidator } from "src/server/auth/AuthValidator";
import { DrizzleDb } from "src/server/infrastructure/drizzle";

export const checkUserNameIsUniqueAction = (db: DrizzleDb, auth: AuthValidator) => async (userName: string) => {
  await auth();
  return await checkUserNameOnDbIsUnique(db)(userName)
}

export const checkUserNameOnDbIsUnique = (db: DrizzleDb) => (userName: string): Promise<Boolean> => {
  return Promise.resolve(false);
}