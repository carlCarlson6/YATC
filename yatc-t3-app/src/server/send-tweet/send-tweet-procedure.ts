import { protectedProcedure, publicProcedure } from "yact/server/infrastructure/trpc";
import z from "zod";

export const sendTweetProcedure = protectedProcedure
  .input(z.object({
    text: z.string().min(1).max(280)
  }))