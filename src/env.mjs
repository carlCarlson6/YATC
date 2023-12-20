import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
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

		DISCORD_CLIENT_ID: 			z.string(),
		DISCORD_CLIENT_SECRET:	z.string(),
		
		QSTASH_URL: 								z.string().url(),
		QSTASH_TOKEN: 							z.string(),
		QSTASH_CURRENT_SIGNING_KEY:	z.string(),
		QSTASH_NEXT_SIGNING_KEY: 		z.string(),
		
		LOCAL_DEV_TUNNEL: z.string().optional(),

		KV_REST_API_READ_ONLY_TOKEN:	z.string(),
		KV_REST_API_TOKEN:						z.string(),
		KV_REST_API_URL:							z.string(),
		KV_URL:												z.string(),

		DATABASE_URL: z
			.string()
			.url()
			.refine(
				(str) => !str.includes("YOUR_PG_URL_HERE"),
				"You forgot to change the default URL"
			),

		POSTGRES_URL:							z.string(),
		POSTGRES_PRISMA_URL:			z.string(),
		POSTGRES_URL_NON_POOLING:	z.string(),
		POSTGRES_USER:						z.string(),
		POSTGRES_HOST:						z.string(),
		POSTGRES_PASSWORD:				z.string(),
		POSTGRES_DATABASE:				z.string(),
	},

	client: {},
	
	runtimeEnv: {
		NODE_ENV:	process.env.NODE_ENV,

		NEXTAUTH_SECRET:	process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: 		process.env.NEXTAUTH_URL,
		
		DISCORD_CLIENT_ID: 			process.env.DISCORD_CLIENT_ID,
		DISCORD_CLIENT_SECRET:	process.env.DISCORD_CLIENT_SECRET,
		
		QSTASH_URL:									process.env.QSTASH_URL,
		QSTASH_TOKEN: 							process.env.QSTASH_TOKEN,
		QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
		QSTASH_NEXT_SIGNING_KEY: 		process.env.QSTASH_NEXT_SIGNING_KEY,
		
		LOCAL_DEV_TUNNEL:	process.env.LOCAL_DEV_TUNNEL,

		KV_REST_API_READ_ONLY_TOKEN:	process.env.KV_REST_API_READ_ONLY_TOKEN,
		KV_REST_API_TOKEN:						process.env.KV_REST_API_TOKEN,
		KV_REST_API_URL:							process.env.KV_REST_API_URL,
		KV_URL:												process.env.KV_URL,

		DATABASE_URL:	process.env.DATABASE_URL,

		POSTGRES_URL: 						process.env.POSTGRES_URL,
		POSTGRES_PRISMA_URL: 			process.env.POSTGRES_PRISMA_URL,
		POSTGRES_URL_NON_POOLING:	process.env.POSTGRES_URL_NON_POOLING,
		POSTGRES_USER: 						process.env.POSTGRES_USER,
		POSTGRES_HOST: 						process.env.POSTGRES_HOST,
		POSTGRES_PASSWORD: 				process.env.POSTGRES_PASSWORD,
		POSTGRES_DATABASE: 				process.env.POSTGRES_DATABASE,
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
