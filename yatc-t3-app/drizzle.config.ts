import { type Config } from "drizzle-kit";

import { env } from "yact/env.mjs";

export default {
  schema: "./src/**/*.drizzle.schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: [`${env.APP_ENV}yatct3app*`],
} satisfies Config;
