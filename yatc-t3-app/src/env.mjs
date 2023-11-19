import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z
			.string()
			.url()
			.refine(
				(str) => !str.includes("YOUR_MYSQL_URL_HERE"),
				"You forgot to change the default URL"
			),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		NEXTAUTH_SECRET:
			process.env.NODE_ENV === "production"
				? z.string()
				: z.string().optional(),
		NEXTAUTH_URL: z.preprocess(
			(str) => process.env.VERCEL_URL ?? str,
			process.env.VERCEL ? z.string() : z.string().url()
		),
		DISCORD_CLIENT_ID: z.string(),
		DISCORD_CLIENT_SECRET: z.string(),
		APP_ENV: z.enum(["dev", "test", "prod"]),
	},

	client: {},

	runtimeEnv: {
		DATABASE_URL: 					process.env.DATABASE_URL,
		NODE_ENV: 							process.env.NODE_ENV,
		NEXTAUTH_SECRET: 				process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: 					process.env.NEXTAUTH_URL,
		DISCORD_CLIENT_ID: 			process.env.DISCORD_CLIENT_ID,
		DISCORD_CLIENT_SECRET: 	process.env.DISCORD_CLIENT_SECRET,
		APP_ENV: 								process.env.APP_ENV,
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
