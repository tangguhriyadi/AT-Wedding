import ElegantTemplate from './ElegantTemplate'
import ModernTemplate from './ModernTemplate'
import RusticTemplate from './RusticTemplate'

export { ElegantTemplate, ModernTemplate, RusticTemplate }

export interface TemplateConfig {
  id: string
  name: string
  description: string
  component: React.ComponentType<import('@/types/invitation').TemplateProps>
}

import type React from 'react'

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'elegant',
    name: 'Elegan',
    description: 'Tampilan klasik dengan tipografi serif, palet warna emas dan krem, serta hiasan ornamental yang mewah.',
    component: ElegantTemplate,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Desain minimalis dengan tipografi bold, layout bersih, dan aksen warna kontras yang elegan.',
    component: ModernTemplate,
  },
  {
    id: 'rustic',
    name: 'Rustic',
    description: 'Nuansa hangat dengan font kaligrafi, warna tanah alami, dan sentuhan dekorasi alam yang romantis.',
    component: RusticTemplate,
  },
]

export function getTemplateById(id: string): TemplateConfig | undefined {
  return TEMPLATES.find((t) => t.id === id)
}
