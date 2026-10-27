import { Link, useNavigate } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import AuthShell from '../components/AuthShell'
import GoogleAuthButton from '../components/GoogleAuthButton'
import { authErrorMessage, resetPassword, signInWithEmail } from '../lib/auth'

export default function ConnexionPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setLoading(true)

    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email') || '')
    const password = String(fd.get('password') || '')

    try {
      await signInWithEmail(email, password)
      navigate('/espace', { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
      setLoading(false)
    }
  }

  async function onForgot() {
    const emailInput = document.querySelector<HTMLInputElement>('input[name="email"]')
    const email = emailInput?.value?.trim()
    if (!email) {
      setError('Saisissez votre e-mail pour réinitialiser le mot de passe.')
      return
    }
    setError(null)
    setInfo(null)
    try {
      await resetPassword(email)
      setInfo('E-mail de réinitialisation envoyé si le compte existe.')
    } catch (err) {
      setError(authErrorMessage(err))
    }
  }

  return (
    <AuthShell mode="login" title="Connexion">
      <form className="auth__form" onSubmit={onSubmit} noValidate>
        <GoogleAuthButton onError={setError} />

        <div className="auth__divider" aria-hidden="true">
          <span>ou</span>
        </div>

        <label className="auth__field">
          <span>E-mail</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@entreprise.com"
          />
        </label>

        <div className="auth__field">
          <span>
            Mot de passe
            <button type="button" className="auth__text-btn" onClick={onForgot}>
              Oublié ?
            </button>
          </span>
          <div className="auth__input-wrap">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              placeholder="Votre mot de passe"
            />
            <button
              type="button"
              className="auth__eye"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? 'Masquer' : 'Afficher'}
            </button>
          </div>
        </div>

        {error && <p className="auth__error">{error}</p>}
        {info && <p className="auth__info">{info}</p>}

        <button type="submit" className="auth__btn" disabled={loading}>
          {loading ? 'Connexion…' : 'Continuer'}
        </button>

        <p className="auth__switch">
          Nouveau sur ORION ? <Link to="/commencer">Créer un compte</Link>
        </p>
      </form>
    </AuthShell>
  )
}
