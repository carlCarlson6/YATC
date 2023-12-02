import { type Config } from "drizzle-kit";
import { env } from "src/env.mjs";

export default {
  out: "./drizzle-migration",
  schema: "./src/**/*.drizzle.schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
