import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../data/products'

const ease = [0.22, 1, 0.36, 1] as const

export default function Products() {
  return (
    <section className="products" id="produit" aria-labelledby="products-title">
      <div className="products__inner">
        <motion.header
          className="section-intro"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="section-intro__eyebrow">NOS LOGICIELS</p>
          <h2 id="products-title" className="section-intro__title">
            Tout l’écosystème,
            <span> en détail.</span>
          </h2>
          <p className="section-intro__lead">
            Chaque branche a un rôle précis. Ensemble, elles forment ORION —
            de l’opérationnel quotidien à la création assistée par l’IA.
          </p>
        </motion.header>

        <div className="products__list products__list--all">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              id={product.id}
              className="product product--row"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: index * 0.08, ease }}
            >
              <div className="product__icon-wrap">
                <img src={product.icon} alt="" className="product__icon" />
                <div className="product__icon-glow" />
              </div>
              <div className="product__copy">
                <p className="product__tag">{product.tag}</p>
                <h3 className="product__title">{product.title}</h3>
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

        <div className="products__more">
          <Link to="/logiciels" className="btn btn--ghost btn--sm">
            Voir tous les logiciels <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
