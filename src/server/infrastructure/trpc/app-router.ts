import { createTRPCRouter } from "src/server/infrastructure/trpc";
import { editUserProfileProcedure } from "src/server/user/edit/editUserProfileProcedure";
import { findUsersProcedure } from "src/server/user/findUsersProcedure";
import { followUserProcedure } from "src/server/user/follows/follow/followUserProcedure";
import { unFollowUserProcedure } from "src/server/user/follows/unfollow/unFollowUser";

export const appRouter = createTRPCRouter({
  follow:           followUserProcedure,
  unfollow:         unFollowUserProcedure,
  findUsers:        findUsersProcedure,
  editUserProfile:  editUserProfileProcedure,
});

export type AppRouter = typeof appRouter;
