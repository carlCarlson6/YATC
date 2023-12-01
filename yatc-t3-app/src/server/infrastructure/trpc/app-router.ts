import { createTRPCRouter } from "yact/server/infrastructure/trpc";
import { sendTweetProcedure } from "yact/server/send-tweet/send-tweet-procedure";
import { findUsersProcedure } from "yact/server/user/findUsersProcedure";
import { followUserProcedure } from "yact/server/user/follow/followUser";
import { unFollowUserProcedure } from "yact/server/user/follow/unFollowUser";

export const appRouter = createTRPCRouter({
  sendTweet:  sendTweetProcedure,
  follow:     followUserProcedure,
  unfollow:   unFollowUserProcedure,
  findUsers:  findUsersProcedure,
});

export type AppRouter = typeof appRouter;
