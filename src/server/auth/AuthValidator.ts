"use server";
import type { User } from "../user/profile/userProfile.drizzle.schema";

export type AuthValidator = () => Promise<User>;
