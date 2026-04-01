export interface Invitation {
  id: string
  slug: string
  brideName: string
  groomName: string
  weddingDate: string
  weddingTime: string
  venue: string
  venueAddress?: string
  templateId: string
  photos: string[]
  message?: string
  createdAt: string
  updatedAt: string
}
