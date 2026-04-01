import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { NextRequest } from 'next/server'
import { findBySlug, saveInvitation } from '@/lib/storage'

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION ?? 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
})

const BUCKET = 'wedding-photos'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const invitation = await findBySlug(slug)

    if (!invitation) {
      return Response.json({ error: 'Invitation not found' }, { status: 404 })
    }

    const formData = await request.formData()
    const files = formData.getAll('photos') as File[]

    if (!files || files.length === 0) {
      return Response.json({ error: 'No photos provided' }, { status: 400 })
    }

    const savedPaths: string[] = []

    for (const file of files) {
      if (!(file instanceof File)) continue

      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `${slug}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`

      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: filename,
          Body: buffer,
          ContentType: file.type,
        })
      )

      const publicBase = process.env.S3_PUBLIC_URL ?? `${process.env.S3_ENDPOINT}`
      savedPaths.push(`${publicBase}/${BUCKET}/${filename}`)
    }

    invitation.photos = [...invitation.photos, ...savedPaths]
    invitation.updatedAt = new Date().toISOString()
    await saveInvitation(invitation)

    return Response.json(invitation)
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
