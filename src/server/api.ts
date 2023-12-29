"use server"

import { nextAuthValidator } from "./auth/nextAuthValidator";
import { publishEmojeetAction } from "./emojeets/publish/publishEmojeet";
import { publishReactionAction } from "./emojeets/react/publishReaction";
import { drizzleDb } from "./infrastructure/drizzle";
import { fetchTimelineAction } from "./timeline/fetchTimelineAction";
import { findUsersOnDb } from "./user/find/findUsers";
import { followrUserAction } from "./user/follows/follow/followrUserAction";
import { unFollowUserAction } from "./user/follows/unfollow/unFollowUserAction";
import { loadUserProfileData } from "./user/profile/loadUserProfileData";

export const publishEmojeet   = publishEmojeetAction(drizzleDb, nextAuthValidator);
export const publishReaction  = publishReactionAction(drizzleDb,  nextAuthValidator);
export const fetchTimeline    = fetchTimelineAction(drizzleDb);
export const findUsers        = findUsersOnDb(drizzleDb, nextAuthValidator);
export const followUser       = followrUserAction(drizzleDb, nextAuthValidator);
export const unfollowUser     = unFollowUserAction(drizzleDb, nextAuthValidator);
export const fetchUserProfile = loadUserProfileData(drizzleDb);
