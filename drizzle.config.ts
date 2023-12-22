import { type Config } from "drizzle-kit";
import { env } from "src/env.mjs";

export default {
  out: "./drizzle-migration",
  schema: "./src/**/*.drizzle.schema.ts",
  driver: "pg",
  dbCredentials: { connectionString: env.NEON_DB}
  /*{
    
    host: env.POSTGRES_HOST,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
    ssl: true
  }*/
} satisfies Config;