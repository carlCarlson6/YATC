"use server";
import type { User } from "../user/userProfile.drizzle.schema";

export type AuthValidator = () => Promise<User>;
