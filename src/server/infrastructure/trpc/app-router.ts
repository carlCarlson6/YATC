import { createTRPCRouter } from "src/server/infrastructure/trpc";
import { publishEmojeetProcedure } from "src/server/publish-emojeet/publishEmojeetProcedure";
import { findUsersProcedure } from "src/server/user/findUsersProcedure";
import { followUserProcedure } from "src/server/user/follows/follow/followUserProcedure";
import { unFollowUserProcedure } from "src/server/user/follows/unfollow/unFollowUser";

export const appRouter = createTRPCRouter({
  publishEmojeet: publishEmojeetProcedure,
  follow:         followUserProcedure,
  unfollow:       unFollowUserProcedure,
  findUsers:      findUsersProcedure,
});

export type AppRouter = typeof appRouter;