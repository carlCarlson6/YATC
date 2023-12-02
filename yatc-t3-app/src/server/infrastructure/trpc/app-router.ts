import { createTRPCRouter } from "src/server/infrastructure/trpc";
import { sendTweetProcedure } from "src/server/send-tweet/send-tweet-procedure";
import { findUsersProcedure } from "src/server/user/findUsersProcedure";
import { followUserProcedure } from "src/server/user/follow/followUser";
import { unFollowUserProcedure } from "src/server/user/follow/unFollowUser";

export const appRouter = createTRPCRouter({
  sendTweet:  sendTweetProcedure,
  follow:     followUserProcedure,
  unfollow:   unFollowUserProcedure,
  findUsers:  findUsersProcedure,
});

export type AppRouter = typeof appRouter;
