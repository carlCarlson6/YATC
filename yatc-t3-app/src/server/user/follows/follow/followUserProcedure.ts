import { protectedProcedure } from "src/server/infrastructure/trpc";
import z from "zod";
import { checkIfFollowingWithDrizzle } from "../checkIfFollowing";
import { followUser, storeFollowerOnDrizzle } from "./followUser";


export const followUserProcedure = protectedProcedure
  .input(z.object({
    userToFollow: z.string().min(1)
  }))
  .mutation(({ ctx: { db, session: { user } }, input }) => followUser({
    checkIfFollowing: checkIfFollowingWithDrizzle(db),
    storeFollower: storeFollowerOnDrizzle(db),
  })(user.id, input.userToFollow));
