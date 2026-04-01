export interface TemplateProps {
  brideName: string
  groomName: string
  weddingDate: string
  weddingTime: string   // Waktu Resepsi (can be empty if resepsi not held)
  venue: string         // Lokasi Resepsi (can be empty if resepsi not held)
  venueAddress?: string
  akadVenue?: string    // Lokasi Akad
  akadTime?: string     // Waktu Akad
  googleMapsUrl?: string
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
