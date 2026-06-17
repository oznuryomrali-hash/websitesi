'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const SIGNUP_ENABLED = true

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'signup' | 'reset'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage({ type: 'error', text: 'E-posta veya şifre hatalı.' })
    } else {
      router.push('/admin/dashboard')
      router.refresh()
    }
    setLoading(false)
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Kayıt başarılı. Giriş yapabilirsiniz.' })
      setTab('login')
    }
    setLoading(false)
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    })
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Sıfırlama e-postası gönderildi.' })
    }
    setLoading(false)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-body text-body-md text-on-surface placeholder:text-on-surface-variant'

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-sand/40 px-margin-mobile">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-headline text-headline-lg text-primary">Admin Panel</h1>
          <p className="font-body text-body-md text-on-surface-variant mt-2">
            Öznur Yomralı - Psikolojik Danışman
          </p>
        </div>

        <div className="bg-surface rounded-xl border border-outline-variant p-8 soft-card-shadow">
          {/* Sekme */}
          <div className="flex border-b border-outline-variant mb-6">
            <button
              className={`flex-1 py-2 font-label text-label-md transition-colors ${
                tab === 'login'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
              onClick={() => { setTab('login'); setMessage(null) }}
            >
              Giriş yap
            </button>
            {SIGNUP_ENABLED && (
              <button
                className={`flex-1 py-2 font-label text-label-md transition-colors ${
                  tab === 'signup'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
                onClick={() => { setTab('signup'); setMessage(null) }}
              >
                Kayıt ol
              </button>
            )}
            <button
              className={`flex-1 py-2 font-label text-label-md transition-colors ${
                tab === 'reset'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
              onClick={() => { setTab('reset'); setMessage(null) }}
            >
              Şifremi unuttum
            </button>
          </div>

          {/* Mesaj */}
          {message && (
            <div
              className={`p-3 rounded-lg mb-4 font-body text-body-md ${
                message.type === 'error'
                  ? 'bg-error-container text-on-error-container'
                  : 'bg-secondary-container text-on-secondary-container'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Giriş formu */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="E-posta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
              <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary py-3 rounded-lg font-label text-label-md hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </form>
          )}

          {/* Kayıt formu */}
          {tab === 'signup' && SIGNUP_ENABLED && (
            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="email"
                placeholder="E-posta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
              <input
                type="password"
                placeholder="Şifre (min. 6 karakter)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                required
                minLength={6}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary py-3 rounded-lg font-label text-label-md hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
              </button>
            </form>
          )}

          {/* Şifre sıfırlama */}
          {tab === 'reset' && (
            <form onSubmit={handleReset} className="space-y-4">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary py-3 rounded-lg font-label text-label-md hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Gönderiliyor...' : 'Sıfırlama e-postası gönder'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
