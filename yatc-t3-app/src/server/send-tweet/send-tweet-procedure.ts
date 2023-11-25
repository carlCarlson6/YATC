import { protectedProcedure } from "yact/server/infrastructure/trpc";
import z from "zod";
import { saveNewTweet, storeTweetWithDrizzle } from "./saveNewTweet";

export const sendTweetProcedure = protectedProcedure
  .input(z.object({
    text: z.string().min(1).max(280)
  }))
  .mutation(({ctx: {db, session}, input}) => saveNewTweet({
    storeTweet: storeTweetWithDrizzle(db),
    sendNewTweetPublished: (_) => Promise.resolve(),
  })({ id: session.user.id, name: session.user.name, avatar: session.user.image }, input.text));
