import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import type { Invitation } from '@/types/invitation'

const DATA_DIR = join(process.cwd(), 'data')
const DATA_FILE = join(DATA_DIR, 'invitations.json')

function ensureDataFile(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!existsSync(DATA_FILE)) {
    writeFileSync(DATA_FILE, JSON.stringify([]), 'utf-8')
  }
}

export function readInvitations(): Invitation[] {
  ensureDataFile()
  const raw = readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw) as Invitation[]
}

export function writeInvitations(invitations: Invitation[]): void {
  ensureDataFile()
  writeFileSync(DATA_FILE, JSON.stringify(invitations, null, 2), 'utf-8')
}

export function findBySlug(slug: string): Invitation | undefined {
  return readInvitations().find((inv) => inv.slug === slug)
}

export function saveInvitation(invitation: Invitation): void {
  const invitations = readInvitations()
  const idx = invitations.findIndex((inv) => inv.id === invitation.id)
  if (idx >= 0) {
    invitations[idx] = invitation
  } else {
    invitations.push(invitation)
  }
  writeInvitations(invitations)
}

export function generateSlug(brideName: string, groomName: string): string {
  const invitations = readInvitations()
  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const base = `${slugify(brideName)}-and-${slugify(groomName)}`

  let slug: string
  do {
    const suffix = Math.random().toString(36).slice(2, 6)
    slug = `${base}-${suffix}`
  } while (invitations.some((inv) => inv.slug === slug))

  return slug
}
