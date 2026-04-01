import { randomUUID } from 'crypto'
import type { NextRequest } from 'next/server'
import { generateSlug, saveInvitation } from '@/lib/storage'
import type { Invitation } from '@/types/invitation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { brideName, groomName, weddingDate, weddingTime, venue, venueAddress, akadVenue, akadTime, googleMapsUrl, templateId, message } = body

    if (!brideName || !groomName || !weddingDate || !templateId) {
      return Response.json(
        { error: 'Missing required fields: brideName, groomName, weddingDate, templateId' },
        { status: 400 }
      )
    }

    // At least one of resepsi or akad must be provided
    const hasResepsi = !!(venue && weddingTime)
    const hasAkad = !!(akadVenue && akadTime)
    if (!hasResepsi && !hasAkad) {
      return Response.json(
        { error: 'At least one event (resepsi or akad) must be provided with venue and time' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    const invitation: Invitation = {
      id: randomUUID(),
      slug: await generateSlug(brideName, groomName),
      brideName,
      groomName,
      weddingDate,
      weddingTime: weddingTime ?? '',
      venue: venue ?? '',
      venueAddress: venueAddress ?? undefined,
      akadVenue: akadVenue ?? undefined,
      akadTime: akadTime ?? undefined,
      googleMapsUrl: googleMapsUrl ?? undefined,
      templateId,
      photos: [],
      message: message ?? undefined,
      createdAt: now,
      updatedAt: now,
    }

    await saveInvitation(invitation)

    return Response.json(invitation, { status: 201 })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
