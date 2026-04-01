'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { TEMPLATES } from '@/components/templates'
import type { TemplateProps } from '@/types/invitation'
import InvitationCover from '@/components/InvitationCover'

const TOTAL_STEPS = 5

interface FormData {
  templateId: string
  brideName: string
  groomName: string
  weddingDate: string
  // Resepsi
  weddingTime: string
  venue: string
  venueAddress: string
  // Akad
  akadVenue: string
  akadTime: string
  // Maps
  googleMapsUrl: string
  message: string
  photos: File[]
  photoPreviews: string[]
}

const initialForm: FormData = {
  templateId: '',
  brideName: '',
  groomName: '',
  weddingDate: '',
  weddingTime: '',
  venue: '',
  venueAddress: '',
  akadVenue: '',
  akadTime: '',
  googleMapsUrl: '',
  message: '',
  photos: [],
  photoPreviews: [],
}

export default function CreatePage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [successUrl, setSuccessUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => { const e = { ...prev }; delete e[field]; return e })
  }

  function validateStep(s: number): boolean {
    const e: Record<string, string> = {}
    if (s === 1 && !form.templateId) e.templateId = 'Pilih salah satu template'
    if (s === 2) {
      if (!form.brideName.trim()) e.brideName = 'Nama mempelai wanita wajib diisi'
      if (!form.groomName.trim()) e.groomName = 'Nama mempelai pria wajib diisi'
    }
    if (s === 3) {
      if (!form.weddingDate) e.weddingDate = 'Tanggal pernikahan wajib diisi'

      const hasResepsi = !!(form.venue.trim() && form.weddingTime)
      const hasAkad = !!(form.akadVenue.trim() && form.akadTime)

      if (!hasResepsi && !hasAkad) {
        e.eventRequired = 'Minimal salah satu acara (Akad atau Resepsi) harus diisi lengkap'
      }
      // Partial akad
      if (form.akadVenue.trim() && !form.akadTime) e.akadTime = 'Waktu Akad wajib diisi jika Lokasi Akad diisi'
      if (!form.akadVenue.trim() && form.akadTime) e.akadVenue = 'Lokasi Akad wajib diisi jika Waktu Akad diisi'
      // Partial resepsi
      if (form.venue.trim() && !form.weddingTime) e.weddingTime = 'Waktu Resepsi wajib diisi jika Lokasi Resepsi diisi'
      if (!form.venue.trim() && form.weddingTime) e.venue = 'Lokasi Resepsi wajib diisi jika Waktu Resepsi diisi'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1))
    setErrors({})
  }

  function handlePhotos(files: FileList | null) {
    if (!files) return
    const accepted = Array.from(files).filter((f) =>
      ['image/jpeg', 'image/png', 'image/webp'].includes(f.type)
    )
    const previews = accepted.map((f) => URL.createObjectURL(f))
    setForm((prev) => ({
      ...prev,
      photos: [...prev.photos, ...accepted],
      photoPreviews: [...prev.photoPreviews, ...previews],
    }))
  }

  function removePhoto(index: number) {
    setForm((prev) => {
      URL.revokeObjectURL(prev.photoPreviews[index])
      return {
        ...prev,
        photos: prev.photos.filter((_, i) => i !== index),
        photoPreviews: prev.photoPreviews.filter((_, i) => i !== index),
      }
    })
  }

  async function handleSubmit() {
    if (!validateStep(step)) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brideName: form.brideName,
          groomName: form.groomName,
          weddingDate: form.weddingDate,
          weddingTime: form.weddingTime || undefined,
          venue: form.venue || undefined,
          venueAddress: form.venueAddress || undefined,
          akadVenue: form.akadVenue || undefined,
          akadTime: form.akadTime || undefined,
          googleMapsUrl: form.googleMapsUrl || undefined,
          templateId: form.templateId,
          message: form.message || undefined,
        }),
      })
      if (!res.ok) throw new Error('Gagal membuat undangan')
      const invitation = await res.json()

      if (form.photos.length > 0) {
        const fd = new FormData()
        for (const photo of form.photos) fd.append('photos', photo)
        const photoRes = await fetch(`/api/invitations/${invitation.slug}/photos`, {
          method: 'POST',
          body: fd,
        })
        if (!photoRes.ok) {
          console.error('Photo upload failed:', await photoRes.text())
        }
      }

      setSuccessUrl(`/wedding/${invitation.slug}`)
    } catch {
      setErrors({ submit: 'Terjadi kesalahan. Silakan coba lagi.' })
    } finally {
      setSubmitting(false)
    }
  }

  // Success screen
  if (successUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f5ee] px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-5xl mb-6">❦</div>
          <h1 className="text-3xl font-light italic text-[#2c2016] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Undangan Berhasil Dibuat!
          </h1>
          <p className="text-[#7c6a52] mb-8 text-sm leading-relaxed">
            Undangan pernikahan Anda telah berhasil dibuat. Bagikan tautan berikut kepada tamu undangan Anda.
          </p>
          <a
            href={successUrl}
            className="inline-block bg-[#c4973c] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#b08530] transition-colors"
          >
            Lihat Undangan
          </a>
          <div className="mt-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.origin + successUrl)
              }}
              className="text-[#c4973c] text-sm underline"
            >
              Salin Tautan
            </button>
          </div>
          <div className="mt-6">
            <Link href="/" className="text-[#7c6a52] text-sm hover:text-[#2c2016]">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const templateForPreview = TEMPLATES.find((t) => t.id === form.templateId)
  const previewProps: TemplateProps = {
    brideName: form.brideName || 'Nama Mempelai Wanita',
    groomName: form.groomName || 'Nama Mempelai Pria',
    weddingDate: form.weddingDate || '2026-06-15',
    weddingTime: form.weddingTime || (form.akadTime ? '' : '10:00'),
    venue: form.venue || (form.akadVenue ? '' : 'Nama Gedung'),
    venueAddress: form.venueAddress || undefined,
    akadVenue: form.akadVenue || undefined,
    akadTime: form.akadTime || undefined,
    googleMapsUrl: form.googleMapsUrl || undefined,
    photos: form.photoPreviews,
    message: form.message || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f9f5ee]">
      {/* Header */}
      <header className="border-b border-[#c4973c]/20 bg-[#f9f5ee] py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Bug 1 fix: back to dashboard button */}
          <Link
            href="/"
            className="text-[#c4973c] text-sm hover:text-[#b08530] transition-colors flex items-center gap-1"
          >
            ← Dashboard
          </Link>
          <div className="text-center flex-1">
            <p className="text-xs tracking-[0.3em] uppercase text-[#c4973c]" style={{ fontFamily: 'Georgia, serif' }}>
              AT Wedding
            </p>
            <h1 className="text-xl font-light italic text-[#2c2016] mt-1" style={{ fontFamily: 'Georgia, serif' }}>
              Buat Undangan Pernikahan
            </h1>
          </div>
          <div className="w-20" /> {/* Spacer to center heading */}
        </div>
      </header>

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-[#7c6a52]">Langkah {step} dari {TOTAL_STEPS}</span>
          <span className="text-xs text-[#7c6a52]">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-1 bg-[#e8e0d4] rounded-full">
          <div
            className="h-1 bg-[#c4973c] rounded-full transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Step 1: Template — Bug 2 fix: render actual template mini preview */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-light italic text-[#2c2016] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Pilih Template
            </h2>
            <p className="text-sm text-[#7c6a52] mb-6">Pilih tampilan undangan yang Anda inginkan</p>
            {errors.templateId && <p className="text-red-500 text-sm mb-4">{errors.templateId}</p>}
            <div className="grid gap-4 sm:grid-cols-3">
              {TEMPLATES.map((t) => {
                const demoProps: TemplateProps = {
                  brideName: 'Siti',
                  groomName: 'Budi',
                  weddingDate: '2026-06-15',
                  weddingTime: '10:00',
                  venue: 'Gedung Mulia',
                  photos: [],
                }
                return (
                  <button
                    key={t.id}
                    onClick={() => updateField('templateId', t.id)}
                    className={`border-2 rounded p-4 text-left transition-all ${
                      form.templateId === t.id
                        ? 'border-[#c4973c] bg-[#c4973c]/5'
                        : 'border-[#e8e0d4] bg-white hover:border-[#c4973c]/50'
                    }`}
                  >
                    {/* Mini template preview */}
                    <div className="w-full aspect-[3/4] overflow-hidden rounded mb-3 relative bg-[#f0ebe3]">
                      <div style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '300%',
                        height: '300%',
                        transform: 'scale(0.333)',
                        transformOrigin: 'top left',
                        pointerEvents: 'none',
                      }}>
                        <t.component {...demoProps} />
                      </div>
                    </div>
                    <p className="font-medium text-[#2c2016] text-sm mb-1">{t.name}</p>
                    <p className="text-xs text-[#7c6a52] leading-relaxed">{t.description}</p>
                    {form.templateId === t.id && (
                      <div className="mt-2 text-[#c4973c] text-xs font-medium">✓ Dipilih</div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 2: Couple Details */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-light italic text-[#2c2016] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Data Mempelai
            </h2>
            <p className="text-sm text-[#7c6a52] mb-6">Masukkan nama kedua mempelai</p>
            <div className="space-y-5">
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                  Nama Mempelai Wanita
                </label>
                <input
                  type="text"
                  value={form.brideName}
                  onChange={(e) => updateField('brideName', e.target.value)}
                  placeholder="Contoh: Siti Rahayu"
                  className={`w-full border px-4 py-3 text-[#2c2016] bg-white focus:outline-none focus:border-[#c4973c] text-sm ${
                    errors.brideName ? 'border-red-400' : 'border-[#e8e0d4]'
                  }`}
                />
                {errors.brideName && <p className="text-red-500 text-xs mt-1">{errors.brideName}</p>}
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                  Nama Mempelai Pria
                </label>
                <input
                  type="text"
                  value={form.groomName}
                  onChange={(e) => updateField('groomName', e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className={`w-full border px-4 py-3 text-[#2c2016] bg-white focus:outline-none focus:border-[#c4973c] text-sm ${
                    errors.groomName ? 'border-red-400' : 'border-[#e8e0d4]'
                  }`}
                />
                {errors.groomName && <p className="text-red-500 text-xs mt-1">{errors.groomName}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Wedding Details */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-light italic text-[#2c2016] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Detail Pernikahan
            </h2>
            <p className="text-sm text-[#7c6a52] mb-6">
              Informasi tanggal dan tempat pernikahan. Isi minimal salah satu acara (Akad atau Resepsi).
            </p>

            {errors.eventRequired && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-5">
                {errors.eventRequired}
              </div>
            )}

            <div className="space-y-6">
              {/* Shared date */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                  Tanggal Pernikahan
                </label>
                <input
                  type="date"
                  value={form.weddingDate}
                  onChange={(e) => updateField('weddingDate', e.target.value)}
                  className={`w-full border px-4 py-3 text-[#2c2016] bg-white focus:outline-none focus:border-[#c4973c] text-sm ${
                    errors.weddingDate ? 'border-red-400' : 'border-[#e8e0d4]'
                  }`}
                />
                {errors.weddingDate && <p className="text-red-500 text-xs mt-1">{errors.weddingDate}</p>}
              </div>

              {/* Akad section */}
              <div className="border border-[#e8e0d4] rounded p-4 bg-white">
                <p className="text-xs tracking-widest uppercase text-[#c4973c] mb-4">Akad <span className="normal-case text-[#7c6a52]/70">(opsional)</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                      Lokasi Akad
                    </label>
                    <input
                      type="text"
                      value={form.akadVenue}
                      onChange={(e) => updateField('akadVenue', e.target.value)}
                      placeholder="Contoh: Masjid Al-Ikhlas"
                      className={`w-full border px-4 py-3 text-[#2c2016] bg-white focus:outline-none focus:border-[#c4973c] text-sm ${
                        errors.akadVenue ? 'border-red-400' : 'border-[#e8e0d4]'
                      }`}
                    />
                    {errors.akadVenue && <p className="text-red-500 text-xs mt-1">{errors.akadVenue}</p>}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                      Waktu Akad
                    </label>
                    <input
                      type="time"
                      value={form.akadTime}
                      onChange={(e) => updateField('akadTime', e.target.value)}
                      className={`w-full border px-4 py-3 text-[#2c2016] bg-white focus:outline-none focus:border-[#c4973c] text-sm ${
                        errors.akadTime ? 'border-red-400' : 'border-[#e8e0d4]'
                      }`}
                    />
                    {errors.akadTime && <p className="text-red-500 text-xs mt-1">{errors.akadTime}</p>}
                  </div>
                </div>
              </div>

              {/* Resepsi section */}
              <div className="border border-[#e8e0d4] rounded p-4 bg-white">
                <p className="text-xs tracking-widest uppercase text-[#c4973c] mb-4">Resepsi <span className="normal-case text-[#7c6a52]/70">(opsional)</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                      Lokasi Resepsi
                    </label>
                    <input
                      type="text"
                      value={form.venue}
                      onChange={(e) => updateField('venue', e.target.value)}
                      placeholder="Contoh: Gedung Serbaguna Mulia"
                      className={`w-full border px-4 py-3 text-[#2c2016] bg-white focus:outline-none focus:border-[#c4973c] text-sm ${
                        errors.venue ? 'border-red-400' : 'border-[#e8e0d4]'
                      }`}
                    />
                    {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue}</p>}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                      Waktu Resepsi
                    </label>
                    <input
                      type="time"
                      value={form.weddingTime}
                      onChange={(e) => updateField('weddingTime', e.target.value)}
                      className={`w-full border px-4 py-3 text-[#2c2016] bg-white focus:outline-none focus:border-[#c4973c] text-sm ${
                        errors.weddingTime ? 'border-red-400' : 'border-[#e8e0d4]'
                      }`}
                    />
                    {errors.weddingTime && <p className="text-red-500 text-xs mt-1">{errors.weddingTime}</p>}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                      Alamat Lokasi <span className="normal-case text-[#7c6a52]/70">(opsional)</span>
                    </label>
                    <input
                      type="text"
                      value={form.venueAddress}
                      onChange={(e) => updateField('venueAddress', e.target.value)}
                      placeholder="Contoh: Jl. Sudirman No. 10, Jakarta"
                      className="w-full border border-[#e8e0d4] px-4 py-3 text-[#2c2016] bg-white focus:outline-none focus:border-[#c4973c] text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                  Google Maps Link <span className="normal-case text-[#7c6a52]/70">(opsional)</span>
                </label>
                <input
                  type="url"
                  value={form.googleMapsUrl}
                  onChange={(e) => updateField('googleMapsUrl', e.target.value)}
                  placeholder="https://maps.google.com/..."
                  className="w-full border border-[#e8e0d4] px-4 py-3 text-[#2c2016] bg-white focus:outline-none focus:border-[#c4973c] text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                  Pesan Khusus <span className="normal-case text-[#7c6a52]/70">(opsional)</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Tuliskan pesan atau doa untuk tamu undangan..."
                  rows={3}
                  className="w-full border border-[#e8e0d4] px-4 py-3 text-[#2c2016] bg-white focus:outline-none focus:border-[#c4973c] text-sm resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Photo Upload */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-light italic text-[#2c2016] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Unggah Foto Prewedding
            </h2>
            <p className="text-sm text-[#7c6a52] mb-6">Tambahkan foto-foto untuk ditampilkan di undangan Anda (opsional)</p>

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                handlePhotos(e.dataTransfer.files)
              }}
              className="border-2 border-dashed border-[#c4973c]/40 bg-white rounded cursor-pointer hover:border-[#c4973c] hover:bg-[#c4973c]/5 transition-colors p-8 text-center"
            >
              <div className="text-3xl text-[#c4973c]/40 mb-3">❁</div>
              <p className="text-sm text-[#7c6a52]">Klik atau seret foto ke sini</p>
              <p className="text-xs text-[#7c6a52]/70 mt-1">JPG, PNG, WebP — bisa pilih lebih dari satu</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => handlePhotos(e.target.files)}
              />
            </div>

            {form.photoPreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {form.photoPreviews.map((src, i) => (
                  <div key={i} className="relative aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Foto ${i + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-black/70"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 5: Review & Confirm */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-light italic text-[#2c2016] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Konfirmasi &amp; Pratinjau
            </h2>
            <p className="text-sm text-[#7c6a52] mb-6">Periksa kembali data undangan Anda sebelum dibuat</p>

            <div className="bg-white border border-[#e8e0d4] rounded p-5 mb-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#7c6a52]">Template</span>
                <span className="text-[#2c2016] font-medium">
                  {TEMPLATES.find((t) => t.id === form.templateId)?.name ?? '—'}
                </span>
              </div>
              <div className="border-t border-[#e8e0d4]" />
              <div className="flex justify-between">
                <span className="text-[#7c6a52]">Mempelai Wanita</span>
                <span className="text-[#2c2016]">{form.brideName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c6a52]">Mempelai Pria</span>
                <span className="text-[#2c2016]">{form.groomName}</span>
              </div>
              <div className="border-t border-[#e8e0d4]" />
              <div className="flex justify-between">
                <span className="text-[#7c6a52]">Tanggal</span>
                <span className="text-[#2c2016]">{form.weddingDate}</span>
              </div>
              {form.akadVenue && (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#7c6a52]">Lokasi Akad</span>
                    <span className="text-[#2c2016]">{form.akadVenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7c6a52]">Waktu Akad</span>
                    <span className="text-[#2c2016]">{form.akadTime}</span>
                  </div>
                </>
              )}
              {form.venue && (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#7c6a52]">Lokasi Resepsi</span>
                    <span className="text-[#2c2016]">{form.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7c6a52]">Waktu Resepsi</span>
                    <span className="text-[#2c2016]">{form.weddingTime}</span>
                  </div>
                </>
              )}
              {form.venueAddress && (
                <div className="flex justify-between">
                  <span className="text-[#7c6a52]">Alamat</span>
                  <span className="text-[#2c2016] text-right max-w-[60%]">{form.venueAddress}</span>
                </div>
              )}
              {form.googleMapsUrl && (
                <div className="flex justify-between">
                  <span className="text-[#7c6a52]">Google Maps</span>
                  <span className="text-[#c4973c] text-right max-w-[60%] truncate">✓ Ditambahkan</span>
                </div>
              )}
              {form.message && (
                <>
                  <div className="border-t border-[#e8e0d4]" />
                  <div>
                    <span className="text-[#7c6a52] block mb-1">Pesan Khusus</span>
                    <p className="text-[#2c2016] text-xs italic">{form.message}</p>
                  </div>
                </>
              )}
              <div className="border-t border-[#e8e0d4]" />
              <div className="flex justify-between">
                <span className="text-[#7c6a52]">Foto</span>
                <span className="text-[#2c2016]">{form.photos.length} foto dipilih</span>
              </div>
            </div>

            {/* Live preview */}
            {templateForPreview && (
              <div>
                <p className="text-xs tracking-widest uppercase text-[#7c6a52] mb-3">Pratinjau Template</p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {/* Phone body */}
                  <div style={{
                    position: 'relative',
                    width: '220px',
                    height: '460px',
                    background: '#1c1c1e',
                    borderRadius: '40px',
                    padding: '14px 10px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12)',
                    flexShrink: 0,
                  }}>
                    {/* Volume buttons */}
                    <div style={{ position: 'absolute', left: '-4px', top: '80px', width: '4px', height: '28px', background: '#3a3a3c', borderRadius: '2px 0 0 2px' }} />
                    <div style={{ position: 'absolute', left: '-4px', top: '118px', width: '4px', height: '28px', background: '#3a3a3c', borderRadius: '2px 0 0 2px' }} />
                    {/* Power button */}
                    <div style={{ position: 'absolute', right: '-4px', top: '100px', width: '4px', height: '36px', background: '#3a3a3c', borderRadius: '0 2px 2px 0' }} />

                    {/* Screen */}
                    <div style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '30px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#000',
                    }}>
                      {/* Dynamic island */}
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '52px',
                        height: '14px',
                        background: '#1c1c1e',
                        borderRadius: '7px',
                        zIndex: 3,
                      }} />

                      {/* Scrollable area */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        scrollbarWidth: 'none',
                      }}>
                        <div style={{
                          zoom: 0.51,
                          pointerEvents: 'none',
                        }}>
                          <templateForPreview.component {...previewProps} />
                        </div>
                      </div>

                      {/* Cover overlay — contained inside screen */}
                      <InvitationCover
                        contained
                        compact
                        brideName={form.brideName || 'Nama Mempelai Wanita'}
                        groomName={form.groomName || 'Nama Mempelai Pria'}
                        weddingDate={form.weddingDate || '2026-06-15'}
                        templateId={form.templateId || 'elegant'}
                        coverPhoto={form.photoPreviews[0]}
                      />

                      {/* Home indicator */}
                      <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '48px',
                        height: '4px',
                        background: 'rgba(255,255,255,0.3)',
                        borderRadius: '2px',
                        zIndex: 3,
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {errors.submit && (
              <p className="text-red-500 text-sm mt-4">{errors.submit}</p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-[#e8e0d4]">
          {step > 1 ? (
            <button
              onClick={back}
              className="px-6 py-3 border border-[#c4973c] text-[#c4973c] text-sm tracking-widest uppercase hover:bg-[#c4973c]/5 transition-colors"
            >
              Kembali
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <button
              onClick={next}
              className="px-8 py-3 bg-[#c4973c] text-white text-sm tracking-widest uppercase hover:bg-[#b08530] transition-colors"
            >
              Lanjutkan
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 bg-[#c4973c] text-white text-sm tracking-widest uppercase hover:bg-[#b08530] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Membuat...' : 'Buat Undangan'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
