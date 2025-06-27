CREATE TABLE "matches" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date" date,
	"time" time,
	"teamAId" uuid,
	"teamBId" uuid
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" uuid PRIMARY KEY NOT NULL,
	"teamName" varchar NOT NULL,
	"color" varchar NOT NULL,
	"imageUrl" text,
	"points" integer DEFAULT 0,
	"wins" integer DEFAULT 0,
	"defeats" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userName" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"isAdmin" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
