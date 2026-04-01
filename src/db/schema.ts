import { pgTable, text, jsonb, timestamp } from 'drizzle-orm/pg-core'

export const invitations = pgTable('invitations', {
  id: text('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  templateId: text('template_id').notNull(),
  brideName: text('bride_name').notNull(),
  groomName: text('groom_name').notNull(),
  weddingDate: text('wedding_date').notNull(),
  weddingTime: text('wedding_time').notNull(),
  venue: text('venue').notNull(),
  venueAddress: text('venue_address'),
  akadVenue: text('akad_venue'),
  akadTime: text('akad_time'),
  googleMapsUrl: text('google_maps_url'),
  photos: jsonb('photos').$type<string[]>().notNull().default([]),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
