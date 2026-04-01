ALTER TABLE "invitations" ADD COLUMN IF NOT EXISTS "akad_venue" text;
ALTER TABLE "invitations" ADD COLUMN IF NOT EXISTS "akad_time" text;
ALTER TABLE "invitations" ADD COLUMN IF NOT EXISTS "google_maps_url" text;
