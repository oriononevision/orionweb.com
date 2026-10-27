import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { products } from '../data/products'

const ease = [0.22, 1, 0.36, 1] as const

export default function LogicielsPage() {
  return (
    <div className="subpage">
      <PageHero
        eyebrow="NOS LOGICIELS"
        title="Tout l’écosystème,"
        accent="en détail."
        lead="Chaque branche a un rôle précis. Ensemble, elles forment ORION — de l’opérationnel quotidien à la création assistée par l’IA."
        crumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Logiciels' },
        ]}
      />

      <section className="subpage__section">
        <div className="subpage__inner products__list products__list--all">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              className="product product--row"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.06, ease }}
            >
              <div className="product__icon-wrap">
                <img src={product.icon} alt="" className="product__icon" />
                <div className="product__icon-glow" />
              </div>
              <div className="product__copy">
                <p className="product__tag">{product.tag}</p>
                <h2 className="product__title">{product.title}</h2>
                <p className="product__text">{product.text}</p>
                <ul className="product__points">
                  {product.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <Link to={`/logiciels/${product.id}`} className="product__link">
                {product.cta} <span aria-hidden="true">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
