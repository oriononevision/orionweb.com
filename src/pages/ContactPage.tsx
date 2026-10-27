import { Link } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import PageHero from '../components/PageHero'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="subpage">
      <PageHero
        eyebrow="CONTACT"
        title="Écrivez-nous."
        accent="On vous répond."
        lead="Message, demande commerciale, support ou partenariat — décrivez votre besoin, l’équipe ORION vous recontacte."
        crumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Contact' },
        ]}
        actions={
          <>
            <Link to="/demo" className="btn btn--ghost btn--sm">
              Demander une démo
            </Link>
            <Link to="/entreprise" className="btn btn--ghost btn--sm">
              Offre Entreprise
            </Link>
          </>
        }
      />

      <section className="subpage__section">
        <div className="subpage__inner contact-layout">
          <aside className="contact-aside">
            <p className="product__tag">CANAUX</p>
            <h2 className="product-detail__h">Comment on peut vous aider</h2>
            <ul className="contact-channels">
              <li>
                <strong>Commercial</strong>
                <span>Tarifs, crédits, déploiement équipe</span>
              </li>
              <li>
                <strong>Produit</strong>
                <span>Core, Intelligence, Build, Studio, Platform</span>
              </li>
              <li>
                <strong>Support</strong>
                <span>Accès, comptes, questions techniques</span>
              </li>
              <li>
                <strong>Partenariat</strong>
                <span>Intégrateurs, revendeurs, co-création</span>
              </li>
            </ul>
            <p className="contact-aside__mail">
              Ou écrivez à{' '}
              <a href="mailto:hello@orionweb.com">hello@orionweb.com</a>
            </p>
          </aside>

          {sent ? (
            <div className="form-success">
              <h2>Message envoyé</h2>
              <p>
                Merci. Nous traitons votre demande et vous répondrons sous peu
                (démo front — aucun envoi serveur).
              </p>
              <div className="page-hero__actions">
                <Link to="/logiciels" className="btn btn--white btn--sm">
                  Voir les logiciels
                </Link>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => setSent(false)}
                >
                  Envoyer un autre message
                </button>
              </div>
            </div>
          ) : (
            <form className="orion-form orion-form--contact" onSubmit={onSubmit}>
              <div className="orion-form__row">
                <label>
                  Nom complet
                  <input name="name" type="text" required autoComplete="name" />
                </label>
                <label>
                  E-mail professionnel
                  <input name="email" type="email" required autoComplete="email" />
                </label>
              </div>
              <div className="orion-form__row">
                <label>
                  Entreprise
                  <input name="company" type="text" autoComplete="organization" />
                </label>
                <label>
                  Type de demande
                  <select name="type" defaultValue="message" required>
                    <option value="message">Message général</option>
                    <option value="commercial">Demande commerciale</option>
                    <option value="support">Support</option>
                    <option value="demo">Demande de démo</option>
                    <option value="partnership">Partenariat</option>
                    <option value="press">Presse / média</option>
                  </select>
                </label>
              </div>
              <label>
                Sujet
                <input name="subject" type="text" required placeholder="Ex. Déploiement Core + crédits" />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows={6}
                  required
                  placeholder="Décrivez votre besoin, votre équipe, vos outils…"
                />
              </label>
              <label className="orion-form__check">
                <input type="checkbox" name="privacy" required />
                <span>
                  J’accepte que mes données soient utilisées pour traiter ma
                  demande.{' '}
                  <Link to="/confidentialite">Confidentialité</Link>
                </span>
              </label>
              <button type="submit" className="btn btn--white btn--lg">
                Envoyer le message <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
