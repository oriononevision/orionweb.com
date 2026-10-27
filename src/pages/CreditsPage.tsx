import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'

const ease = [0.22, 1, 0.36, 1] as const

const packs = [
  {
    name: 'Boost',
    credits: '2 000',
    price: '19€',
    text: 'Idéal pour intensifier ponctuellement Intelligence ou Studio.',
  },
  {
    name: 'Scale',
    credits: '10 000',
    price: '79€',
    text: 'Pour les équipes qui générent, automatisent et itèrent souvent.',
  },
  {
    name: 'Power',
    credits: '50 000',
    price: '329€',
    text: 'Volume élevé pour Build, assistants et production créative.',
  },
]

const usages = [
  {
    title: 'Intelligence',
    text: 'Assistants, analyses, relances et automatisations contextuelles.',
    to: '/logiciels/intelligence',
  },
  {
    title: 'Build',
    text: 'Génération et itération d’applications assistées par l’IA.',
    to: '/logiciels/build',
  },
  {
    title: 'Studio',
    text: 'Création de contenu et conception de projets numériques.',
    to: '/logiciels/studio',
  },
]

export default function CreditsPage() {
  return (
    <div className="subpage">
      <PageHero
        eyebrow="CRÉDITS IA"
        title="L’énergie de"
        accent="Intelligence, Build et Studio."
        lead="Chaque requête IA, génération ou automatisation avancée consomme des crédits. Inclus dans votre plan, rechargeables à tout moment."
        crumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Crédits' },
        ]}
        actions={
          <>
            <Link to="/commencer" className="btn btn--white btn--sm">
              Obtenir des crédits <span aria-hidden="true">→</span>
            </Link>
            <Link to="/tarifs" className="btn btn--ghost btn--sm">
              Voir les plans
            </Link>
          </>
        }
      />

      <section className="subpage__section">
        <div className="subpage__inner">
          <h2 className="product-detail__h">Où sont utilisés les crédits ?</h2>
          <div className="related-grid related-grid--3">
            {usages.map((u, i) => (
              <motion.div
                key={u.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
              >
                <Link to={u.to} className="related-card related-card--block">
                  <div>
                    <strong>{u.title}</strong>
                    <span>{u.text}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="subpage__section subpage__section--muted">
        <div className="subpage__inner">
          <h2 className="product-detail__h">Packs de crédits</h2>
          <div className="pricing__credit-packs pricing__credit-packs--row">
            {packs.map((pack, index) => (
              <motion.article
                key={pack.name}
                className="credit-pack"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08, ease }}
              >
                <div className="credit-pack__top">
                  <h3>{pack.name}</h3>
                  <strong>{pack.price}</strong>
                </div>
                <p className="credit-pack__credits">{pack.credits} crédits</p>
                <p className="credit-pack__text">{pack.text}</p>
                <Link to="/commencer" className="product__link">
                  Acheter <span aria-hidden="true">→</span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
