import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../data/products'

const ease = [0.22, 1, 0.36, 1] as const

export default function Features() {
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
            Cinq branches.
            <span> Une même ambition.</span>
          </h2>
          <p className="section-intro__lead">
            ORION n’est pas un seul outil : c’est un écosystème complet pour
            connecter, comprendre, construire et créer — sur une plateforme commune.
          </p>
        </motion.header>

        <div className="features__grid features__grid--five">
          {products.map((feature, index) => (
            <motion.article
              key={feature.id}
              className="feature"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: index * 0.1, ease }}
            >
              <motion.div
                className="feature__icon-wrap"
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.85, delay: 0.08 + index * 0.1, ease }}
              >
                <img src={feature.icon} alt="" className="feature__icon" />
                <div className="feature__icon-glow" aria-hidden="true" />
              </motion.div>
              <div className="feature__meta">
                <span className="feature__num">0{index + 1}</span>
                <h3 className="feature__title">{feature.tag.replace('ORION ', '')}</h3>
              </div>
              <p className="feature__text">{feature.text}</p>
              <Link to={`/logiciels/${feature.id}`} className="product__link">
                Découvrir <span aria-hidden="true">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
