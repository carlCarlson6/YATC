CREATE TABLE IF NOT EXISTS "yatc_emoji_reaction" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"reaction" varchar(255) NOT NULL,
	"reactsTo" varchar(255) NOT NULL,
	"publishedBy" varchar(255) NOT NULL,
	"publishedAt" numeric NOT NULL
);
