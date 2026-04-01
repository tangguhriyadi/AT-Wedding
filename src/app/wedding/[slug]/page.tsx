import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { findBySlug } from '@/lib/storage'
import { getTemplateById, ElegantTemplate } from '@/components/templates'
import InvitationCover from '@/components/InvitationCover'

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
  const description = `Kami mengundang Anda ke pernikahan ${invitation.brideName} & ${invitation.groomName} pada ${invitation.weddingDate} di ${invitation.venue || invitation.akadVenue || ''}`
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

  // Improvement 3: Redirect to landing page after H+1
  const weddingDate = new Date(invitation.weddingDate)
  const expireDate = new Date(weddingDate)
  expireDate.setDate(expireDate.getDate() + 1) // H+1
  expireDate.setHours(23, 59, 59, 999) // End of H+1 day
  const now = new Date()
  if (now > expireDate) {
    redirect('/')
  }

  const templateConfig = getTemplateById(invitation.templateId)
  const TemplateComponent = templateConfig?.component ?? ElegantTemplate

  return (
    <main className="w-full min-h-screen">
      <InvitationCover
        brideName={invitation.brideName}
        groomName={invitation.groomName}
        weddingDate={invitation.weddingDate}
        templateId={invitation.templateId}
        coverPhoto={invitation.photos?.[0]}
      >
        <TemplateComponent
          brideName={invitation.brideName}
          groomName={invitation.groomName}
          weddingDate={invitation.weddingDate}
          weddingTime={invitation.weddingTime}
          venue={invitation.venue}
          venueAddress={invitation.venueAddress}
          akadVenue={invitation.akadVenue}
          akadTime={invitation.akadTime}
          googleMapsUrl={invitation.googleMapsUrl}
          photos={invitation.photos}
          message={invitation.message}
        />
      </InvitationCover>
    </main>
  )
}
