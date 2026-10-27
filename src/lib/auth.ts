import type { Session, User } from '@supabase/supabase-js'
import { CORE_URL, supabase } from './supabase'
import type { ProfileUpdate } from './database.types'

export function authErrorMessage(error: unknown): string {
  const raw =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Une erreur est survenue.'

  const msg = raw.toLowerCase()
  if (msg.includes('invalid login credentials')) {
    return 'E-mail ou mot de passe incorrect.'
  }
  if (msg.includes('user already registered')) {
    return 'Un compte existe déjà avec cet e-mail.'
  }
  if (msg.includes('password')) {
    return 'Mot de passe trop court (6 caractères minimum).'
  }
  if (msg.includes('email')) {
    return 'Adresse e-mail invalide.'
  }
  if (msg.includes('network') || msg.includes('fetch')) {
    return 'Impossible de joindre le serveur. Vérifiez votre connexion.'
  }
  return raw
}

export async function signUpWithEmail(input: {
  email: string
  password: string
  metadata?: Record<string, unknown>
}) {
  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: input.metadata ?? {},
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error
  return data
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })
  if (error) throw error
  return data
}

export async function signInWithGoogleIdToken(credential: string, nonce?: string) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: credential,
    nonce,
  })
  if (error) throw error
  return data
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/connexion`,
  })
  if (error) throw error
}

export async function updateProfile(userId: string, patch: ProfileUpdate) {
  const { error } = await supabase.from('profiles').upsert({
    id: userId,
    ...patch,
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}

/** Transfert la session vers Orion Core (origine différente en local). */
export function redirectToCore(session: Session, path = '/auth/callback') {
  const target = new URL(path, CORE_URL)
  const params = new URLSearchParams({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    type: 'orion_handoff',
  })
  target.hash = params.toString()
  window.location.assign(target.toString())
}

export async function goToCoreAfterAuth(session?: Session | null) {
  const active =
    session ??
    (await supabase.auth.getSession()).data.session
  if (!active) {
    window.location.assign(CORE_URL)
    return
  }
  redirectToCore(active)
}

export function displayName(user: User | null): string {
  if (!user) return ''
  const meta = user.user_metadata ?? {}
  const first = meta.first_name || meta.given_name || meta.full_name || meta.name
  if (typeof first === 'string' && first.trim()) return first.trim().split(' ')[0]
  return user.email?.split('@')[0] ?? ''
}
