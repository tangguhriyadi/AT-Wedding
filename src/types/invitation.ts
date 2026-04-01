export interface TemplateProps {
  brideName: string
  groomName: string
  weddingDate: string
  weddingTime: string
  venue: string
  venueAddress?: string
  photos: string[]
  message?: string
}

export interface Invitation extends TemplateProps {
  id: string
  slug: string
  templateId: string
  createdAt: string
  updatedAt: string
}
