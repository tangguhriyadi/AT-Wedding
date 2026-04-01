import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import type { NextRequest } from 'next/server'
import { findBySlug, saveInvitation } from '@/lib/storage'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const invitation = findBySlug(slug)

    if (!invitation) {
      return Response.json({ error: 'Invitation not found' }, { status: 404 })
    }

    const formData = await request.formData()
    const files = formData.getAll('photos') as File[]

    if (!files || files.length === 0) {
      return Response.json({ error: 'No photos provided' }, { status: 400 })
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads', slug)
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true })
    }

    const savedPaths: string[] = []

    for (const file of files) {
      if (!(file instanceof File)) continue

      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      const filePath = join(uploadDir, filename)
      writeFileSync(filePath, buffer)
      savedPaths.push(`/uploads/${slug}/${filename}`)
    }

    invitation.photos = [...invitation.photos, ...savedPaths]
    invitation.updatedAt = new Date().toISOString()
    saveInvitation(invitation)

    return Response.json(invitation)
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
