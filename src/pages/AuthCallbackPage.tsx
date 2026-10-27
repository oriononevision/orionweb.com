import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import { supabase } from '../lib/supabase'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      const { data, error: sessionError } = await supabase.auth.getSession()
      if (cancelled) return
      if (sessionError) {
        setError(sessionError.message)
        return
      }
      if (data.session) {
        navigate('/espace', { replace: true })
        return
      }
      setError('Session introuvable. Reconnectez-vous.')
    })()

    return () => {
      cancelled = true
    }
  }, [navigate])

  return (
    <AuthShell mode="login" title="Connexion">
      <div className="auth__done">
        {error ? (
          <>
            <p className="auth__error">{error}</p>
            <Link to="/connexion" className="auth__btn">
              Retour à la connexion
            </Link>
          </>
        ) : (
          <p>Finalisation de la connexion…</p>
        )}
      </div>
    </AuthShell>
  )
}
