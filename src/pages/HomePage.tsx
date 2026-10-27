import Hero from '../components/Hero'
import Features from '../components/Features'
import Products from '../components/Products'
import Pricing from '../components/Pricing'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Products />
      <Pricing />
      <section className="enterprise" id="entreprise" aria-labelledby="enterprise-home-title">
        <div className="enterprise__inner">
          <p className="section-intro__eyebrow">ENTREPRISE</p>
          <h2 id="enterprise-home-title" className="section-intro__title">
            ORION à l’échelle
            <span> de votre organisation.</span>
          </h2>
          <p className="section-intro__lead">
            Déploiement Platform, crédits dédiés, gouvernance et accompagnement pour
            les équipes qui veulent industrialiser tout l’écosystème.
          </p>
          <Link to="/entreprise" className="btn btn--white btn--lg">
            Découvrir l’offre Entreprise <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="home-contact" id="contact" aria-labelledby="contact-home-title">
        <div className="home-contact__inner">
          <p className="section-intro__eyebrow">CONTACT</p>
          <h2 id="contact-home-title" className="section-intro__title">
            Une question,
            <span> une demande ?</span>
          </h2>
          <p className="section-intro__lead">
            Commercial, support, partenariat ou démo — écrivez-nous, l’équipe ORION
            vous répond.
          </p>
          <div className="page-hero__actions">
            <Link to="/contact" className="btn btn--white btn--lg">
              Envoyer un message <span aria-hidden="true">→</span>
            </Link>
            <Link to="/demo" className="btn btn--ghost btn--lg">
              Demander une démo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
