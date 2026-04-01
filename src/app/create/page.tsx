'use client'

import { useState, useRef } from 'react'
import { TEMPLATES } from '@/components/templates'
import type { TemplateProps } from '@/types/invitation'

const TOTAL_STEPS = 5

interface FormData {
  templateId: string
  brideName: string
  groomName: string
  weddingDate: string
  weddingTime: string
  venue: string
  venueAddress: string
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
      if (!form.weddingTime) e.weddingTime = 'Waktu pernikahan wajib diisi'
      if (!form.venue.trim()) e.venue = 'Nama tempat wajib diisi'
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
      // 1. Create invitation
      const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brideName: form.brideName,
          groomName: form.groomName,
          weddingDate: form.weddingDate,
          weddingTime: form.weddingTime,
          venue: form.venue,
          venueAddress: form.venueAddress || undefined,
          templateId: form.templateId,
          message: form.message || undefined,
        }),
      })
      if (!res.ok) throw new Error('Gagal membuat undangan')
      const invitation = await res.json()

      // 2. Upload photos if any
      if (form.photos.length > 0) {
        const fd = new FormData()
        for (const photo of form.photos) fd.append('photos', photo)
        await fetch(`/api/invitations/${invitation.slug}/photos`, {
          method: 'POST',
          body: fd,
        })
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
        </div>
      </div>
    )
  }

  const templateForPreview = TEMPLATES.find((t) => t.id === form.templateId)
  const previewProps: TemplateProps = {
    brideName: form.brideName || 'Nama Mempelai Wanita',
    groomName: form.groomName || 'Nama Mempelai Pria',
    weddingDate: form.weddingDate || '2026-01-01',
    weddingTime: form.weddingTime || '10:00',
    venue: form.venue || 'Nama Tempat',
    venueAddress: form.venueAddress || undefined,
    photos: [],
    message: form.message || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f9f5ee]">
      {/* Header */}
      <header className="border-b border-[#c4973c]/20 bg-[#f9f5ee] py-4 px-4 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c4973c]" style={{ fontFamily: 'Georgia, serif' }}>
          AT Wedding
        </p>
        <h1 className="text-xl font-light italic text-[#2c2016] mt-1" style={{ fontFamily: 'Georgia, serif' }}>
          Buat Undangan Pernikahan
        </h1>
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

        {/* Step 1: Template */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-light italic text-[#2c2016] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Pilih Template
            </h2>
            <p className="text-sm text-[#7c6a52] mb-6">Pilih tampilan undangan yang Anda inginkan</p>
            {errors.templateId && <p className="text-red-500 text-sm mb-4">{errors.templateId}</p>}
            <div className="grid gap-4 sm:grid-cols-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateField('templateId', t.id)}
                  className={`border-2 rounded p-4 text-left transition-all ${
                    form.templateId === t.id
                      ? 'border-[#c4973c] bg-[#c4973c]/5'
                      : 'border-[#e8e0d4] bg-white hover:border-[#c4973c]/50'
                  }`}
                >
                  <div className="w-full aspect-[3/4] bg-[#f0ebe3] rounded mb-3 flex items-center justify-center text-4xl text-[#c4973c]/30">
                    ❦
                  </div>
                  <p className="font-medium text-[#2c2016] text-sm mb-1">{t.name}</p>
                  <p className="text-xs text-[#7c6a52] leading-relaxed">{t.description}</p>
                  {form.templateId === t.id && (
                    <div className="mt-2 text-[#c4973c] text-xs font-medium">✓ Dipilih</div>
                  )}
                </button>
              ))}
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
            <p className="text-sm text-[#7c6a52] mb-6">Informasi waktu dan tempat pernikahan</p>
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
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
                <div>
                  <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                    Waktu
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
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#7c6a52] mb-2">
                  Tempat
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
                  Alamat Tempat <span className="normal-case text-[#7c6a52]/70">(opsional)</span>
                </label>
                <input
                  type="text"
                  value={form.venueAddress}
                  onChange={(e) => updateField('venueAddress', e.target.value)}
                  placeholder="Contoh: Jl. Sudirman No. 10, Jakarta"
                  className="w-full border border-[#e8e0d4] px-4 py-3 text-[#2c2016] bg-white focus:outline-none focus:border-[#c4973c] text-sm"
                />
              </div>
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

            {/* Drop zone */}
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

            {/* Previews */}
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
              Konfirmasi & Pratinjau
            </h2>
            <p className="text-sm text-[#7c6a52] mb-6">Periksa kembali data undangan Anda sebelum dibuat</p>

            {/* Summary */}
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
              <div className="flex justify-between">
                <span className="text-[#7c6a52]">Waktu</span>
                <span className="text-[#2c2016]">{form.weddingTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7c6a52]">Tempat</span>
                <span className="text-[#2c2016]">{form.venue}</span>
              </div>
              {form.venueAddress && (
                <div className="flex justify-between">
                  <span className="text-[#7c6a52]">Alamat</span>
                  <span className="text-[#2c2016] text-right max-w-[60%]">{form.venueAddress}</span>
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
                <div className="border border-[#e8e0d4] rounded overflow-hidden" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', pointerEvents: 'none' }}>
                    <templateForPreview.component {...previewProps} />
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
