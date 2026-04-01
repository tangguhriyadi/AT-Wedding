import type { NextRequest } from 'next/server'
import { findBySlug } from '@/lib/storage'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const invitation = await findBySlug(slug)

    if (!invitation) {
      return Response.json({ error: 'Invitation not found' }, { status: 404 })
    }

    return Response.json(invitation)
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
