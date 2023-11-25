import { mysqlTableCreator } from "drizzle-orm/mysql-core";
import { env } from "yact/env.mjs";

export const drizzleMySqlTable = mysqlTableCreator((name) => `${env.APP_ENV}yatct3app${name}`);