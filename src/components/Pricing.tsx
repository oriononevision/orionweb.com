import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const plans = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: '0€',
    period: 'pour démarrer',
    desc: 'Découvrir ORION et tester Core avec un volume d’IA limité.',
    cta: 'Commencer gratuitement',
    to: '/commencer',
    featured: false,
    features: [
      'Accès à ORION Core',
      'Connexion de 3 logiciels',
      '500 crédits IA / mois',
      'Assistants Intelligence (basique)',
      '1 espace de travail',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '49€',
    period: '/ mois / utilisateur',
    desc: 'Pour les équipes qui veulent accéder à toute la suite et produire avec l’IA.',
    cta: 'Passer en Pro',
    to: '/commencer',
    featured: true,
    features: [
      'Accès Core + Intelligence + Studio',
      'Accès Build (projets standards)',
      'Connexions illimitées',
      '5 000 crédits IA / mois inclus',
      'Automatisations avancées',
      'Support prioritaire',
    ],
  },
  {
    id: 'entreprise',
    name: 'Entreprise',
    price: 'Sur mesure',
    period: 'selon vos besoins',
    desc: 'Déploiement complet avec Platform, gouvernance et crédits dédiés.',
    cta: 'Parler à un expert',
    to: '/entreprise',
    featured: false,
    features: [
      'Toute la suite ORION + Platform',
      'Crédits IA dédiés / volume négocié',
      'SSO, rôles & conformité',
      'Espaces multi-équipes',
      'SLA & accompagnement',
      'Intégrations sur mesure',
    ],
  },
]

const creditPacks = [
  {
    name: 'Boost',
    credits: '2 000',
    price: '19€',
    per: '≈ 0,95¢ / crédit',
    text: 'Idéal pour ponctuellement intensifier Intelligence ou Studio.',
    featured: false,
  },
  {
    name: 'Scale',
    credits: '10 000',
    price: '79€',
    per: '≈ 0,79¢ / crédit',
    text: 'Pour les équipes qui générent, automatisent et itèrent souvent.',
    featured: true,
  },
  {
    name: 'Power',
    credits: '50 000',
    price: '329€',
    per: '≈ 0,66¢ / crédit',
    text: 'Volume élevé pour Build, assistants et production créative.',
    featured: false,
  },
]

const access = [
  { branch: 'Core', essentiel: true, pro: true, entreprise: true },
  { branch: 'Intelligence', essentiel: 'Basique', pro: true, entreprise: true },
  { branch: 'Build', essentiel: false, pro: 'Standard', entreprise: true },
  { branch: 'Studio', essentiel: false, pro: true, entreprise: true },
  { branch: 'Platform', essentiel: false, pro: false, entreprise: true },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <span className="pricing__check">Inclus</span>
  if (value === false) return <span className="pricing__dash">—</span>
  return <span className="pricing__partial">{value}</span>
}

type PricingProps = {
  standalone?: boolean
}

export default function Pricing({ standalone = false }: PricingProps) {
  return (
    <section
      className={`pricing${standalone ? ' pricing--standalone' : ''}`}
      id={standalone ? undefined : 'tarifs'}
      aria-labelledby="pricing-title"
    >
      <div className="pricing__inner">
        {!standalone ? (
          <motion.header
            className="section-intro"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="section-intro__eyebrow">TARIFS</p>
            <h2 id="pricing-title" className="section-intro__title">
              Accès aux logiciels,
              <span> crédits IA inclus.</span>
            </h2>
            <p className="section-intro__lead">
              Choisissez un plan pour accéder aux branches ORION. Les crédits alimentent
              Intelligence, Build et Studio — rechargeables à tout moment.
            </p>
          </motion.header>
        ) : (
          <h2 id="pricing-title" className="sr-only">
            Plans et tarifs ORION
          </h2>
        )}

        <div className="pricing__plans">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.id}
              className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease }}
            >
              {plan.featured ? <span className="pricing-card__badge">Recommandé</span> : null}
              <h3 className="pricing-card__name">{plan.name}</h3>
              <div className="pricing-card__price">
                <strong>{plan.price}</strong>
                <span>{plan.period}</span>
              </div>
              <p className="pricing-card__desc">{plan.desc}</p>
              <ul className="pricing-card__list">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link
                to={plan.to}
                className={`btn ${plan.featured ? 'btn--white' : 'btn--ghost'} btn--sm pricing-card__cta`}
              >
                {plan.cta} <span aria-hidden="true">→</span>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="pricing__access"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease }}
        >
          <div className="pricing__access-head">
            <h3>Accès aux logiciels par offre</h3>
            <p>Ce que chaque plan débloque dans l’écosystème ORION.</p>
          </div>
          <div className="pricing__table-wrap">
            <table className="pricing__table">
              <thead>
                <tr>
                  <th scope="col">Branche</th>
                  <th scope="col">Essentiel</th>
                  <th scope="col">Pro</th>
                  <th scope="col">Entreprise</th>
                </tr>
              </thead>
              <tbody>
                {access.map((row) => (
                  <tr key={row.branch}>
                    <th scope="row">
                      <Link to={`/logiciels/${row.branch.toLowerCase()}`}>{row.branch}</Link>
                    </th>
                    <td>
                      <Cell value={row.essentiel} />
                    </td>
                    <td>
                      <Cell value={row.pro} />
                    </td>
                    <td>
                      <Cell value={row.entreprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          id="credits"
          className="pricing__credits"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease }}
        >
          <div className="pricing__credits-head">
            <div className="pricing__credits-copy">
              <p className="product__tag">CRÉDITS IA</p>
              <h3 className="pricing__credits-title">
                L’énergie de Intelligence, Build et Studio
              </h3>
              <p>
                Chaque requête IA, génération ou automatisation avancée consomme des
                crédits. Ils sont inclus dans votre plan, et vous pouvez en ajouter
                quand vous en avez besoin — sans changer d’offre.
              </p>
              <ul className="product__points">
                <li>Assistants Intelligence</li>
                <li>Génération Build</li>
                <li>Création Studio</li>
              </ul>
            </div>
            <Link to="/credits" className="btn btn--ghost btn--sm pricing__credits-more">
              Voir les packs crédits <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="pricing__credit-packs pricing__credit-packs--row">
            {creditPacks.map((pack, index) => (
              <motion.article
                key={pack.name}
                className={`credit-pack${pack.featured ? ' credit-pack--featured' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1, ease }}
              >
                {pack.featured ? (
                  <span className="credit-pack__badge">Le plus choisi</span>
                ) : null}
                <header className="credit-pack__top">
                  <h4>{pack.name}</h4>
                  <strong>{pack.price}</strong>
                </header>
                <p className="credit-pack__credits">
                  <span>{pack.credits}</span> crédits
                </p>
                <p className="credit-pack__per">{pack.per}</p>
                <p className="credit-pack__text">{pack.text}</p>
                <Link
                  to="/commencer"
                  className={`btn ${pack.featured ? 'btn--white' : 'btn--accent'} btn--sm credit-pack__cta`}
                >
                  Acheter <span aria-hidden="true">→</span>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
