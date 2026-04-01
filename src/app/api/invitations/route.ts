import { randomUUID } from 'crypto'
import type { NextRequest } from 'next/server'
import { generateSlug, saveInvitation } from '@/lib/storage'
import type { Invitation } from '@/types/invitation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { brideName, groomName, weddingDate, weddingTime, venue, venueAddress, templateId, message } = body

    if (!brideName || !groomName || !weddingDate || !weddingTime || !venue || !templateId) {
      return Response.json(
        { error: 'Missing required fields: brideName, groomName, weddingDate, weddingTime, venue, templateId' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    const invitation: Invitation = {
      id: randomUUID(),
      slug: generateSlug(brideName, groomName),
      brideName,
      groomName,
      weddingDate,
      weddingTime,
      venue,
      venueAddress: venueAddress ?? undefined,
      templateId,
      photos: [],
      message: message ?? undefined,
      createdAt: now,
      updatedAt: now,
    }

    saveInvitation(invitation)

    return Response.json(invitation, { status: 201 })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
