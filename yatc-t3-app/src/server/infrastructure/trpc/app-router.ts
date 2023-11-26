import { createTRPCRouter } from "yact/server/infrastructure/trpc";
import { sendTweetProcedure } from "yact/server/send-tweet/send-tweet-procedure";
import { followUserProcedure } from "yact/server/user/follow/followUser";

export const appRouter = createTRPCRouter({
  sendTweet: sendTweetProcedure,
  follow: followUserProcedure,
});

export type AppRouter = typeof appRouter;
