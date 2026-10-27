import { Link } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import PageHero from '../components/PageHero'

export default function DemoPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="subpage">
      <PageHero
        eyebrow="DÉMO"
        title="Voyez ORION"
        accent="en action."
        lead="Une session guidée sur Core, Intelligence, Build, Studio et Platform — adaptée à votre contexte."
        crumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Démo' },
        ]}
      />

      <section className="subpage__section">
        <div className="subpage__inner form-layout">
          {sent ? (
            <div className="form-success">
              <h2>Demande envoyée</h2>
              <p>Nous vous recontacterons pour planifier la démonstration (démo front).</p>
              <Link to="/logiciels" className="btn btn--white btn--sm">
                Explorer les logiciels
              </Link>
            </div>
          ) : (
            <form className="orion-form" onSubmit={onSubmit}>
              <label>
                Nom
                <input name="name" type="text" required />
              </label>
              <label>
                E-mail
                <input name="email" type="email" required />
              </label>
              <label>
                Branches qui vous intéressent
                <select name="focus" defaultValue="all">
                  <option value="all">Tout l’écosystème</option>
                  <option value="core">Core</option>
                  <option value="intelligence">Intelligence</option>
                  <option value="build">Build</option>
                  <option value="studio">Studio</option>
                  <option value="platform">Platform</option>
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows={4} placeholder="Votre contexte, vos outils…" />
              </label>
              <button type="submit" className="btn btn--white btn--lg">
                Demander une démo <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
