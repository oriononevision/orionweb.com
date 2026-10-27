import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { OrionLogo } from './OrionLogo'
import { useReady } from '../ReadyContext'
import { navSections } from '../data/navSections'
import { CORE_DESKTOP_DOWNLOAD } from '../lib/downloads'

type Props = {
  hidden?: boolean
}

function scrollToId(id: string) {
  if (id === 'accueil') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar({ hidden = false }: Props) {
  const ready = useReady()
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!isHome) {
      setActiveId(null)
      return
    }

    const ids = navSections.map((s) => s.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -50% 0px', threshold: [0.12, 0.35, 0.55] },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [isHome, pathname])

  useEffect(() => {
    if (!isHome || !hash) return
    const id = hash.replace(/^#/, '')
    const t = window.setTimeout(() => scrollToId(id), 80)
    return () => window.clearTimeout(t)
  }, [isHome, hash])

  function onNavClick(id: string) {
    if (isHome) {
      scrollToId(id)
      window.history.replaceState(null, '', `#${id}`)
      setActiveId(id)
      return
    }
    navigate(`/#${id}`)
  }

  return (
    <motion.header
      className={`nav${hidden ? ' nav--hidden' : ''}`}
      initial={{ opacity: 0, y: -16 }}
      animate={
        ready
          ? { opacity: hidden ? 0 : 1, y: hidden ? -88 : 0 }
          : undefined
      }
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={hidden}
    >
      <Link
        to="/"
        className="nav__brand"
        aria-label="ORION — Accueil"
        tabIndex={hidden ? -1 : undefined}
        onClick={(e) => {
          if (isHome) {
            e.preventDefault()
            scrollToId('accueil')
            window.history.replaceState(null, '', '/')
          }
        }}
      >
        <OrionLogo markSize={26} />
      </Link>

      <nav className="nav__links" aria-label="Navigation principale">
        {navSections.map((link, i) => (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, y: -8 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className={`nav__link${activeId === link.id ? ' is-active' : ''}`}
              tabIndex={hidden ? -1 : undefined}
              onClick={() => onNavClick(link.id)}
            >
              {link.label}
            </button>
          </motion.div>
        ))}
      </nav>

      <motion.div
        className="nav__actions"
        initial={{ opacity: 0, y: -8 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href={CORE_DESKTOP_DOWNLOAD}
          className="nav__login"
          download
          tabIndex={hidden ? -1 : undefined}
        >
          Télécharger Core
        </a>
        <Link to="/connexion" className="nav__login" tabIndex={hidden ? -1 : undefined}>
          Se connecter
        </Link>
        <Link
          to="/commencer"
          className="btn btn--white btn--sm"
          tabIndex={hidden ? -1 : undefined}
        >
          Commencer <span aria-hidden="true">→</span>
        </Link>
      </motion.div>
    </motion.header>
  )
}
