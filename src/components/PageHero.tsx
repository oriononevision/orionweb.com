import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Crumb = { label: string; to?: string }

type PageHeroProps = {
  eyebrow: string
  title: string
  accent?: string
  lead: string
  crumbs?: Crumb[]
  actions?: ReactNode
}

const ease = [0.22, 1, 0.36, 1] as const

export default function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  crumbs,
  actions,
}: PageHeroProps) {
  return (
    <header className="page-hero">
      <div className="page-hero__inner">
        {crumbs && crumbs.length > 0 ? (
          <nav className="breadcrumbs" aria-label="Fil d’Ariane">
            {crumbs.map((c, i) => (
              <span key={c.label} className="breadcrumbs__item">
                {i > 0 ? <span className="breadcrumbs__sep">/</span> : null}
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
              </span>
            ))}
          </nav>
        ) : null}

        <motion.p
          className="section-intro__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="page-hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.05, ease }}
        >
          {title}
          {accent ? <span> {accent}</span> : null}
        </motion.h1>
        <motion.p
          className="page-hero__lead"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          {lead}
        </motion.p>
        {actions ? (
          <motion.div
            className="page-hero__actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease }}
          >
            {actions}
          </motion.div>
        ) : null}
      </div>
    </header>
  )
}
