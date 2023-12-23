import { drizzleDb } from "../infrastructure/drizzle";
import { addUserData, buildTimelineFromDb } from "./buildTimeline";
import { getTimeline } from "./getTimeline";

export const fetchTimeline = getTimeline({
  fetchEmojeets: buildTimelineFromDb(drizzleDb),
  addUserData: addUserData(drizzleDb)
})