import { protectedProcedure } from "src/server/infrastructure/trpc";
import { z } from "zod";

const editUserProfileInputSchema = z.object({ name: z.string().min(1) });

export const editUserProfileProcedure = protectedProcedure
  .input(editUserProfileInputSchema)
  .mutation(({}) => {
    console.log("hit editUserProfileProcedure")
  });
