"use server"

import { drizzleDb } from "src/server/infrastructure/drizzle";
import { publishReaction } from "./publishReaction";
import { nextAuthValidator } from "src/server/auth/nextAuthValidator";

export const publishReactionAction = publishReaction(drizzleDb,  nextAuthValidator);