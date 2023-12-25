import { drizzleDb } from "src/server/infrastructure/drizzle";
import { loadUserProfileData } from "./loadUserProfileData";

export const fetchUserProfile = loadUserProfileData(drizzleDb);