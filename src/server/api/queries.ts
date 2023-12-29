"use server"
import { nextAuthValidator } from "../auth/nextAuthValidator";
import { fetchEmojeetAction } from "../emojeets/loadEmojeetAction";
import { drizzleDb } from "../infrastructure/drizzle";
import { fetchTimelineAction } from "../timeline/fetchTimelineAction";
import { findUsersAction } from "../user/findUsersAction";
import { checkUserNameIsAvailableAction } from "../user/profile/checkUserNameIsAvailableAction";
import { fetchUserProfileAction } from "../user/profile/get/fetchUserProfileAction";

export const fetchTimeline            = fetchTimelineAction(drizzleDb);
export const findUsers                = findUsersAction(drizzleDb, nextAuthValidator);
export const fetchUserProfile         = fetchUserProfileAction(drizzleDb);
export const fetchEmojeet             = fetchEmojeetAction(drizzleDb);
export const checkUserNameIsAvailable = checkUserNameIsAvailableAction(drizzleDb, nextAuthValidator);