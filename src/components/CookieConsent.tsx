import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReady } from '../ReadyContext'

const STORAGE_KEY = 'orion_cookie_consent'

type Consent = 'accepted' | 'essential' | null

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'accepted' || v === 'essential') return v
  } catch {
    /* ignore */
  }
  return null
}

function writeConsent(value: 'accepted' | 'essential') {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* ignore */
  }
}

export default function CookieConsent() {
  const ready = useReady()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ready) return
    if (readConsent()) return
    const t = window.setTimeout(() => setVisible(true), 600)
    return () => window.clearTimeout(t)
  }, [ready])

  function choose(value: 'accepted' | 'essential') {
    writeConsent(value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-live="polite">
      <div className="cookie-banner__inner">
        <div className="cookie-banner__copy">
          <p id="cookie-title" className="cookie-banner__title">
            Cookies & confidentialité
          </p>
          <p className="cookie-banner__text">
            Nous utilisons des cookies essentiels au fonctionnement du site, et —
            avec votre accord — des cookies pour mesurer l’audience. Vous pouvez
            accepter ou continuer avec l’essentiel uniquement.{' '}
            <Link to="/cookies">En savoir plus</Link>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => choose('essential')}>
            Essentiels seulement
          </button>
          <button type="button" className="btn btn--white btn--sm" onClick={() => choose('accepted')}>
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  )
}
