import z from "zod";
import { protectedProcedure } from "../infrastructure/trpc";

export const publishTweetProcedure = protectedProcedure
  .input(z.object({
    text: z.string().min(1).max(280)
  }))
  .mutation(({}) => ({})); // TODO
