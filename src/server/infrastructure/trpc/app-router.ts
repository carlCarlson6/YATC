import { createTRPCRouter } from "src/server/infrastructure/trpc";
import { followUserProcedure } from "src/server/user/follows/follow/followUserProcedure";
import { unFollowUserProcedure } from "src/server/user/follows/unfollow/unFollowUser";

export const appRouter = createTRPCRouter({
  follow:           followUserProcedure,
  unfollow:         unFollowUserProcedure,});

export type AppRouter = typeof appRouter;
