import { drizzleDb } from "../infrastructure/drizzle";
import { buildTimelineFromDb } from "./buildTimeline";
import { addUserData } from "./addUserData";
import { getTimeline } from "./getTimeline";

export const fetchTimeline = getTimeline({
  fetchEmojeets: buildTimelineFromDb(drizzleDb),
  addUserData: addUserData(drizzleDb)
})