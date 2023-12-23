"use server";

import { drizzleDb } from "../infrastructure/drizzle";
import { nextAuthValidator } from "../auth/nextAuthValidator";
import { publishEmojeet } from "./publishEmojeet";


export const publishEmojeetAction = publishEmojeet(drizzleDb, nextAuthValidator);
