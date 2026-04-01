import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { findBySlug } from '@/lib/storage'
import { getTemplateById, ElegantTemplate } from '@/components/templates'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const invitation = await findBySlug(slug)

  if (!invitation) {
    return { title: 'Undangan tidak ditemukan' }
  }

  const title = `Undangan Pernikahan ${invitation.brideName} & ${invitation.groomName}`
  const description = `Kami mengundang Anda ke pernikahan ${invitation.brideName} & ${invitation.groomName} pada ${invitation.weddingDate} di ${invitation.venue}`
  const ogImage = invitation.photos?.[0]

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  }
}

export default async function WeddingPage({ params }: Props) {
  const { slug } = await params
  const invitation = await findBySlug(slug)

  if (!invitation) {
    notFound()
  }

  const templateConfig = getTemplateById(invitation.templateId)
  const TemplateComponent = templateConfig?.component ?? ElegantTemplate

  return (
    <main className="w-full min-h-screen">
      <TemplateComponent
        brideName={invitation.brideName}
        groomName={invitation.groomName}
        weddingDate={invitation.weddingDate}
        weddingTime={invitation.weddingTime}
        venue={invitation.venue}
        venueAddress={invitation.venueAddress}
        photos={invitation.photos}
        message={invitation.message}
      />
    </main>
  )
}
