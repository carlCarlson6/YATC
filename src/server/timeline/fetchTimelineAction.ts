"use server"

import type { DrizzleDb } from "../infrastructure/drizzle";
import { buildTimelineFromDb } from "./buildTimeline";
import { addUserData } from "./addUserData";
import { getTimeline } from "./getTimeline";

export const fetchTimelineAction = (db: DrizzleDb) => getTimeline({
  fetchEmojeets: buildTimelineFromDb(db),
  addUserData: addUserData(db)
})