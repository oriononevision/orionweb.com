import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AuthShell from '../components/AuthShell'
import { goToCoreAfterAuth } from '../lib/auth'
import { CORE_DESKTOP_DOWNLOAD, CORE_DESKTOP_LABEL } from '../lib/downloads'
import { supabase } from '../lib/supabase'
import type { Session, User } from '@supabase/supabase-js'

export default function EspacePage() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [opening, setOpening] = useState(false)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      const { data } = await supabase.auth.getSession()
      if (cancelled) return
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })()

    const { data: sub } = supabase.auth.onAuthStateChange((_e, next) => {
      setSession(next)
      setUser(next?.user ?? null)
    })

    return () => {
      cancelled = true
      sub.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <AuthShell mode="login" title="Votre espace">
        <p className="auth__switch">Chargement…</p>
      </AuthShell>
    )
  }

  if (!session || !user) {
    return <Navigate to="/connexion" replace />
  }

  const name =
    (user.user_metadata?.first_name as string | undefined) ||
    (user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ||
    user.email?.split('@')[0] ||
    'là'

  async function openCoreWeb() {
    setOpening(true)
    try {
      await goToCoreAfterAuth(session)
    } catch {
      setOpening(false)
    }
  }

  async function onSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthShell mode="login" title={`Bonjour ${name}`}>
      <div className="auth__form auth__espace">
        <p className="auth__espace-lead">
          Vous êtes connecté sur ORION. Choisissez comment accéder à Core — le
          lancement n’est plus automatique.
        </p>

        <button
          type="button"
          className="auth__btn"
          onClick={openCoreWeb}
          disabled={opening}
        >
          {opening ? 'Ouverture…' : 'Ouvrir ORION Core (web)'}
        </button>

        <a
          className="auth__btn auth__btn--ghost"
          href={CORE_DESKTOP_DOWNLOAD}
          download
        >
          {CORE_DESKTOP_LABEL} (Windows)
        </a>

        <div className="auth__espace-links">
          <Link to="/logiciels">Voir les logiciels</Link>
          <Link to="/">Retour au site</Link>
          <button type="button" className="auth__text-btn" onClick={onSignOut}>
            Se déconnecter
          </button>
        </div>
      </div>
    </AuthShell>
  )
}
