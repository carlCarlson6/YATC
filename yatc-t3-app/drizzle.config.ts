import { type Config } from "drizzle-kit";

import { env } from "yact/env.mjs";

export default {
  schema: "./src/**/*.drizzle.schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["yatc-t3-app_*"],
} satisfies Config;
