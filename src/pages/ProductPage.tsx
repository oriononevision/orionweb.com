import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import PageHero from '../components/PageHero'
import { getProduct, products } from '../data/products'

const ease = [0.22, 1, 0.36, 1] as const

function WebAccessLink({
  url,
  className,
  children,
}: {
  url: string
  className: string
  children: ReactNode
}) {
  const external = /^https?:\/\//i.test(url)
  if (external) {
    return (
      <a href={url} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link to={url} className={className}>
      {children}
    </Link>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const product = id ? getProduct(id) : undefined

  if (!product) return <Navigate to="/logiciels" replace />

  const others = products.filter((p) => p.id !== product.id)
  const shortName = product.tag.replace('ORION ', '')

  return (
    <div className="subpage product-page">
      <PageHero
        eyebrow={product.tag}
        title={product.title}
        lead={product.longText}
        crumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Logiciels', to: '/logiciels' },
          { label: shortName },
        ]}
        actions={
          <>
            <WebAccessLink url={product.webUrl} className="btn btn--white btn--sm">
              Accéder via le web <span aria-hidden="true">→</span>
            </WebAccessLink>
            <a href={product.downloadUrl} className="btn btn--accent btn--sm">
              Télécharger {product.downloadName}
            </a>
            <Link to="/demo" className="btn btn--ghost btn--sm">
              Demander une démo
            </Link>
          </>
        }
      />

      {/* CTA sticky strip */}
      <section className="product-cta-bar">
        <div className="product-cta-bar__inner">
          <p>
            <strong>{product.tag}</strong>
            <span>{product.promise}</span>
          </p>
          <div className="product-cta-bar__actions">
            <WebAccessLink url={product.webUrl} className="btn btn--white btn--sm">
              Accéder via le web
            </WebAccessLink>
            <a href={product.downloadUrl} className="btn btn--accent btn--sm">
              Télécharger {shortName}
            </a>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="subpage__section">
        <div className="subpage__inner product-overview">
          <motion.div
            className="product-detail__visual"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            aria-hidden="true"
          >
            <div className="product__glow" />
            <img src={product.icon} alt="" className="product__icon product__icon--lg" />
          </motion.div>

          <div>
            <p className="product__tag">Vue d’ensemble</p>
            <h2 className="product-detail__h">À qui s’adresse {shortName} ?</h2>
            <p className="product-detail__text">{product.audience}</p>
            <p className="product-detail__text">{product.promise}</p>
            <ul className="product__points product__points--lg">
              {product.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="subpage__section subpage__section--muted">
        <div className="subpage__inner">
          <header className="section-intro section-intro--compact">
            <p className="section-intro__eyebrow">FONCTIONNALITÉS</p>
            <h2 className="section-intro__title">
              Tout ce que
              <span> {shortName} permet.</span>
            </h2>
          </header>
          <div className="product-features">
            {product.features.map((f, i) => (
              <motion.article
                key={f.title}
                className="product-feature"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.05, ease }}
              >
                <span className="product-feature__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + modules */}
      <section className="subpage__section">
        <div className="subpage__inner product-split">
          <div>
            <p className="product__tag">AVANTAGES</p>
            <h2 className="product-detail__h">Pourquoi choisir {shortName}</h2>
            <ul className="product-benefits">
              {product.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="product__tag">MODULES</p>
            <h2 className="product-detail__h">Dans le logiciel</h2>
            <div className="product-modules">
              {product.modules.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            {product.integrations ? (
              <>
                <h3 className="product-detail__h product-detail__h--sm">Intégrations</h3>
                <div className="product-modules product-modules--soft">
                  {product.integrations.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="subpage__section subpage__section--muted">
        <div className="subpage__inner">
          <header className="section-intro section-intro--compact">
            <p className="section-intro__eyebrow">CAS D’USAGE</p>
            <h2 className="section-intro__title">
              Concret.
              <span> Au quotidien.</span>
            </h2>
          </header>
          <div className="related-grid related-grid--3">
            {product.useCases.map((u, i) => (
              <motion.article
                key={u.title}
                className="related-card related-card--block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <div>
                  <strong>{u.title}</strong>
                  <span>{u.text}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="subpage__section">
        <div className="subpage__inner">
          <p className="product__tag">FICHE TECHNIQUE</p>
          <h2 className="product-detail__h">Accès, crédits et déploiement</h2>
          <div className="product-specs">
            {product.specs.map((s) => (
              <div key={s.label} className="product-spec">
                <span>{s.label}</span>
                <strong>{s.value}</strong>
              </div>
            ))}
          </div>
          {product.usesCredits ? (
            <p className="product-credits-note">
              Ce logiciel consomme des{' '}
              <Link to="/credits">crédits IA</Link> selon l’usage (assistants,
              génération, itérations).
            </p>
          ) : null}
        </div>
      </section>

      {/* Final CTA */}
      <section className="subpage__section">
        <div className="enterprise__inner subpage__inner product-final-cta">
          <h2 className="section-intro__title">
            Prêt à utiliser
            <span> {product.tag} ?</span>
          </h2>
          <p className="section-intro__lead">
            {product.id === 'core'
              ? 'Ouvrez Core dans le navigateur, ou téléchargez l’application Windows ORION Core.'
              : `Ouvrez-le dans le navigateur, ou téléchargez ${product.downloadName} pour l’environnement desktop via Platform.`}
          </p>
          <div className="page-hero__actions">
            <WebAccessLink url={product.webUrl} className="btn btn--white btn--lg">
              Accéder via le web <span aria-hidden="true">→</span>
            </WebAccessLink>
            <a
              href={product.downloadUrl}
              className="btn btn--accent btn--lg"
              {...(product.id === 'core' ? { download: true } : {})}
            >
              Télécharger {product.downloadName}
              {product.id === 'core' ? ' (Windows)' : ''}
            </a>
            <Link to="/tarifs" className="btn btn--ghost btn--lg">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="subpage__section subpage__section--muted">
        <div className="subpage__inner">
          <h2 className="product-detail__h">Autres logiciels ORION</h2>
          <div className="related-grid">
            {others.map((p) => (
              <Link key={p.id} to={`/logiciels/${p.id}`} className="related-card">
                <img src={p.icon} alt="" />
                <div>
                  <strong>{p.tag}</strong>
                  <span>{p.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
