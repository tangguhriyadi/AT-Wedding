CREATE TABLE "invitations" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"template_id" text NOT NULL,
	"bride_name" text NOT NULL,
	"groom_name" text NOT NULL,
	"wedding_date" text NOT NULL,
	"wedding_time" text NOT NULL,
	"venue" text NOT NULL,
	"venue_address" text,
	"photos" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "invitations_slug_unique" UNIQUE("slug")
);
