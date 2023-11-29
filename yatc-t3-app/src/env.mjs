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
		DISCORD_CLIENT_ID: 					z.string(),
		DISCORD_CLIENT_SECRET: 			z.string(),
		APP_ENV: 										z.enum(["local", "dev", "test", "prod"]),
		QSTASH_URL: 								z.string().url(),
		QSTASH_TOKEN: 							z.string(),
		QSTASH_CURRENT_SIGNING_KEY:	z.string(),
		QSTASH_NEXT_SIGNING_KEY: 		z.string(),
		LOCAL_DEV_TUNNEL: z.string().optional(),
	},

	client: {},
	
	runtimeEnv: {
		DATABASE_URL: 							process.env.DATABASE_URL,
		NODE_ENV: 									process.env.NODE_ENV,
		NEXTAUTH_SECRET: 						process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: 							process.env.NEXTAUTH_URL,
		DISCORD_CLIENT_ID: 					process.env.DISCORD_CLIENT_ID,
		DISCORD_CLIENT_SECRET: 			process.env.DISCORD_CLIENT_SECRET,
		APP_ENV: 										process.env.APP_ENV,
		QSTASH_URL:									process.env.QSTASH_URL,
		QSTASH_TOKEN: 							process.env.QSTASH_TOKEN,
		QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
		QSTASH_NEXT_SIGNING_KEY: 		process.env.QSTASH_NEXT_SIGNING_KEY,
		LOCAL_DEV_TUNNEL:						process.env.LOCAL_DEV_TUNNEL
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
