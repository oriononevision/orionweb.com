import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'

const ease = [0.22, 1, 0.36, 1] as const

const pillars = [
  {
    title: 'Platform dédiée',
    text: 'Socle commun, identité, permissions et capacités partagées à l’échelle de l’organisation.',
  },
  {
    title: 'Crédits négociés',
    text: 'Volumes IA adaptés à Intelligence, Build et Studio, avec suivi d’usage et plafonds par équipe.',
  },
  {
    title: 'Gouvernance',
    text: 'SSO, rôles fins, conformité et espaces multi-équipes pour industrialiser l’écosystème.',
  },
  {
    title: 'Accompagnement',
    text: 'SLA, onboarding et intégrations sur mesure avec l’équipe ORION.',
  },
]

export default function EntreprisePage() {
  return (
    <div className="subpage">
      <PageHero
        eyebrow="ENTREPRISE"
        title="ORION à l’échelle"
        accent="de votre organisation."
        lead="Déployez toute la suite — Core, Intelligence, Build, Studio et Platform — avec gouvernance, crédits dédiés et accompagnement."
        crumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Entreprise' },
        ]}
        actions={
          <>
            <Link to="/commencer" className="btn btn--white btn--sm">
              Contacter l’équipe <span aria-hidden="true">→</span>
            </Link>
            <Link to="/demo" className="btn btn--ghost btn--sm">
              Demander une démo
            </Link>
          </>
        }
      />

      <section className="subpage__section">
        <div className="subpage__inner related-grid related-grid--2">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              className="related-card related-card--block"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
            >
              <div>
                <strong>{p.title}</strong>
                <span>{p.text}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="subpage__section">
        <div className="enterprise__inner subpage__inner">
          <h2 className="section-intro__title">
            Prêt à industrialiser
            <span> votre stack ORION ?</span>
          </h2>
          <p className="section-intro__lead">
            Parlez-nous de votre organisation : nous construisons une offre sur mesure
            (accès logiciels, crédits, déploiement Platform).
          </p>
          <Link to="/commencer" className="btn btn--white btn--lg">
            Parler à un expert <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
