import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { invitations } from '@/db/schema'
import type { Invitation } from '@/types/invitation'

function rowToInvitation(row: typeof invitations.$inferSelect): Invitation {
  return {
    id: row.id,
    slug: row.slug,
    templateId: row.templateId,
    brideName: row.brideName,
    groomName: row.groomName,
    weddingDate: row.weddingDate,
    weddingTime: row.weddingTime,
    venue: row.venue,
    venueAddress: row.venueAddress ?? undefined,
    photos: (row.photos as string[]) ?? [],
    message: row.message ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

export async function readInvitations(): Promise<Invitation[]> {
  const rows = await db.select().from(invitations)
  return rows.map(rowToInvitation)
}

export async function findBySlug(slug: string): Promise<Invitation | undefined> {
  const rows = await db.select().from(invitations).where(eq(invitations.slug, slug))
  return rows[0] ? rowToInvitation(rows[0]) : undefined
}

export async function saveInvitation(invitation: Invitation): Promise<void> {
  await db
    .insert(invitations)
    .values({
      id: invitation.id,
      slug: invitation.slug,
      templateId: invitation.templateId,
      brideName: invitation.brideName,
      groomName: invitation.groomName,
      weddingDate: invitation.weddingDate,
      weddingTime: invitation.weddingTime,
      venue: invitation.venue,
      venueAddress: invitation.venueAddress ?? null,
      photos: invitation.photos,
      message: invitation.message ?? null,
      createdAt: new Date(invitation.createdAt),
      updatedAt: new Date(invitation.updatedAt),
    })
    .onConflictDoUpdate({
      target: invitations.id,
      set: {
        slug: invitation.slug,
        templateId: invitation.templateId,
        brideName: invitation.brideName,
        groomName: invitation.groomName,
        weddingDate: invitation.weddingDate,
        weddingTime: invitation.weddingTime,
        venue: invitation.venue,
        venueAddress: invitation.venueAddress ?? null,
        photos: invitation.photos,
        message: invitation.message ?? null,
        updatedAt: new Date(invitation.updatedAt),
      },
    })
}

export async function generateSlug(brideName: string, groomName: string): Promise<string> {
  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const base = `${slugify(brideName)}-and-${slugify(groomName)}`

  let slug: string
  do {
    const suffix = Math.random().toString(36).slice(2, 6)
    slug = `${base}-${suffix}`
    const existing = await db.select({ id: invitations.id }).from(invitations).where(eq(invitations.slug, slug))
    if (existing.length === 0) break
  } while (true)

  return slug
}
