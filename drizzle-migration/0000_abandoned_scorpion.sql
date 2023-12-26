CREATE TABLE IF NOT EXISTS "yatc_emoji_tweets" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"emoji" varchar(255) NOT NULL,
	"publishedBy" varchar(255) NOT NULL,
	"publishedAt" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "yatc_emoji_reaction" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"reaction" varchar(255) NOT NULL,
	"reactsTo" varchar(255) NOT NULL,
	"publishedBy" varchar(255) NOT NULL,
	"publishedAt" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "yatc_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT yatc_account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "yatc_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "yatc_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp DEFAULT CURRENT_TIMESTAMP(3),
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "yatc_verificationtoken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT yatc_verificationtoken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "yatc_follows" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"isFollowingUserId" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "yatc_user_profile" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "yatc_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "yatc_session" ("userId");