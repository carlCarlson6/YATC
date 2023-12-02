import { z } from "zod";
import { protectedProcedure } from "../infrastructure/trpc";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema";
import { like } from "drizzle-orm";

export const findUsersProcedure = protectedProcedure
  .input(z.object({name: z.string()}))
  .query(async ({ctx: {db}, input: {name}}) => {
    const result = await db.select({
      id: usersTable.id,
      name: usersTable.name,
      avatar: usersTable.image
    }).from(usersTable).where(like(usersTable.name, `%${name}%`)).execute();
    return result.map(user => ({
      id: user.id,
      name: user.name ?? "",
      avatar: user.avatar ?? "",
    }));
  });