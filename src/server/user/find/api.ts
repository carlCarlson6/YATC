"use server"

import { drizzleDb } from "src/server/infrastructure/drizzle";
import { findUsersOnDb } from "./findUsers";
import { nextAuthValidator } from "src/server/auth/nextAuthValidator";

export const findUsers = findUsersOnDb(drizzleDb, nextAuthValidator);