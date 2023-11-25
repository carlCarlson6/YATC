import { createTRPCRouter } from "yact/server/infrastructure/trpc";
import { sendTweetProcedure } from "yact/server/send-tweet/send-tweet-procedure";

export const appRouter = createTRPCRouter({
  sendTweet: sendTweetProcedure
});

export type AppRouter = typeof appRouter;
