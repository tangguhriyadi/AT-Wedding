import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { NextRequest } from 'next/server'

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION ?? 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
})

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params

    if (!path || path.length < 2) {
      return new Response('Not found', { status: 404 })
    }

    // path[0] = bucket, path[1..] = key parts
    const bucket = path[0]
    const key = path.slice(1).join('/')

    const result = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    )

    if (!result.Body) {
      return new Response('Not found', { status: 404 })
    }

    const contentType = result.ContentType ?? 'application/octet-stream'
    const bytes = await result.Body.transformToByteArray()

    return new Response(bytes, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err: unknown) {
    const code = (err as { Code?: string })?.Code
    if (code === 'NoSuchKey' || code === 'NoSuchBucket') {
      return new Response('Not found', { status: 404 })
    }
    return new Response('Internal server error', { status: 500 })
  }
}
