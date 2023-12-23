"use server"

import { like } from "drizzle-orm";
import { type DrizzleDb, drizzleDb } from "src/server/infrastructure/drizzle";
import { usersTable } from "src/server/infrastructure/drizzle/base.drizzle.schema";
import { nextAuthValidator } from "src/server/auth/nextAuthValidator";
import type { AuthValidator } from "src/server/auth/AuthValidator";
import { z } from "zod";

const finUsersInputSchma =  z.object({userName: z.string()});

// TODO add auth middleware
const findUsersOnDb = (db: DrizzleDb, auth: AuthValidator) => async (input: z.infer<typeof finUsersInputSchma>) => {
  await auth();
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

export const findUsers = findUsersOnDb(drizzleDb, nextAuthValidator);