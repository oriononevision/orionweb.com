import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { products } from '../data/products'

const ease = [0.22, 1, 0.36, 1] as const

export default function UniversPage() {
  return (
    <div className="subpage">
      <PageHero
        eyebrow="L’UNIVERS ORION"
        title="Cinq branches."
        accent="Une même ambition."
        lead="ORION est un écosystème complet : connecter, comprendre, construire et créer — sur une plateforme commune."
        crumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Univers' },
        ]}
        actions={
          <>
            <Link to="/logiciels" className="btn btn--white btn--sm">
              Voir les logiciels <span aria-hidden="true">→</span>
            </Link>
            <Link to="/tarifs" className="btn btn--ghost btn--sm">
              Tarifs
            </Link>
          </>
        }
      />

      <section className="subpage__section">
        <div className="subpage__inner features__grid features__grid--five">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              className="feature"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.08, ease }}
            >
              <div className="feature__icon-wrap">
                <img src={product.icon} alt="" className="feature__icon" />
                <div className="feature__icon-glow" aria-hidden="true" />
              </div>
              <div className="feature__meta">
                <span className="feature__num">0{index + 1}</span>
                <h2 className="feature__title">{product.tag.replace('ORION ', '')}</h2>
              </div>
              <p className="feature__text">{product.text}</p>
              <Link to={`/logiciels/${product.id}`} className="product__link">
                En savoir plus <span aria-hidden="true">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
