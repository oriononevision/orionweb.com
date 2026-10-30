import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products, type Product } from '../data/products'

const ease = [0.22, 1, 0.36, 1] as const

const FLAGSHIP_IDS = ['core', 'transfer'] as const

function shortName(product: Product) {
  return product.tag.replace(/^ORION\s+/i, '')
}

function FeatureIcon({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      className="feature__icon-wrap"
      initial={{ opacity: 0, scale: 0.82, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: 0.06 + index * 0.07, ease }}
    >
      <img src={product.icon} alt="" className="feature__icon" />
      <div className="feature__icon-glow" aria-hidden="true" />
    </motion.div>
  )
}

export default function Features() {
  const featured = FLAGSHIP_IDS.map((id) => products.find((p) => p.id === id)).filter(
    Boolean,
  ) as Product[]
  const secondary = products.filter((p) => !FLAGSHIP_IDS.includes(p.id as (typeof FLAGSHIP_IDS)[number]))

  return (
    <section className="features" id="capacites" aria-labelledby="features-title">
      <div className="features__inner">
        <motion.header
          className="section-intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease }}
        >
          <p className="section-intro__eyebrow">L’UNIVERS ORION</p>
          <h2 id="features-title" className="section-intro__title">
            Un écosystème.
            <span> Six rôles clairs.</span>
          </h2>
          <p className="section-intro__lead">
            Core et Transfer pour le quotidien. Intelligence, Build et Studio pour
            créer. Platform pour tout relier.
          </p>
        </motion.header>

        <div className="features__stage">
          <div className="features__flagship">
            {featured.map((product, index) => (
              <motion.article
                key={product.id}
                className="feature feature--flagship"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.75, delay: index * 0.1, ease }}
              >
                <FeatureIcon product={product} index={index} />
                <div className="feature__body">
                  <div className="feature__meta">
                    <span className="feature__num">0{index + 1}</span>
                    <h3 className="feature__title">{shortName(product)}</h3>
                  </div>
                  <p className="feature__kicker">{product.title}</p>
                  <p className="feature__text">{product.text}</p>
                  <ul className="feature__points">
                    {product.points.slice(0, 3).map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <Link to={`/logiciels/${product.id}`} className="feature__cta">
                    {product.cta} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="features__rail"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            {secondary.map((product, index) => {
              const n = index + featured.length + 1
              return (
                <article key={product.id} className="feature feature--rail">
                  <FeatureIcon product={product} index={index + 2} />
                  <div className="feature__meta">
                    <span className="feature__num">0{n}</span>
                    <h3 className="feature__title">{shortName(product)}</h3>
                  </div>
                  <p className="feature__text">{product.points[0] ?? product.text}</p>
                  <Link to={`/logiciels/${product.id}`} className="feature__cta feature__cta--quiet">
                    Découvrir <span aria-hidden="true">→</span>
                  </Link>
                </article>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
