"use server"

import { like } from "drizzle-orm";
import { DrizzleDb, drizzleDb } from "src/server/infrastructure/drizzle";
import { usersTable } from "src/server/infrastructure/drizzle/base.drizzle.schema";
import { validateAuth } from "src/server/validateAuth";
import { z } from "zod";

const finUsersInputSchma =  z.object({userName: z.string()});

// TODO add auth middleware
const findUsers = (db: DrizzleDb) => async (input: z.infer<typeof finUsersInputSchma>) => {
  await validateAuth();
  const {userName} = await finUsersInputSchma.parseAsync(input);

  const result = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      avatar: usersTable.image
    })
    .from(usersTable)
    .where(like(usersTable.name, `%${userName}%`))
    .execute();
  
  return result.map(user => ({
    id: user.id,
    name: user.name ?? "",
    avatar: user.avatar ?? "",
  }));
}

export default findUsers(drizzleDb);