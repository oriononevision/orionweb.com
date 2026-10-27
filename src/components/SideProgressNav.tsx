import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { navSections } from '../data/navSections'

type Props = {
  visible: boolean
  progress: number
}

const ringR = 18
const ringC = 2 * Math.PI * ringR

const HOME_TRACK = [
  { id: 'accueil', label: 'Accueil', short: '00' },
  ...navSections.map((s, i) => ({
    id: s.id,
    label: s.label,
    short: String(i + 1).padStart(2, '0'),
  })),
]

export default function SideProgressNav({ visible, progress }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const [activeSection, setActiveSection] = useState('accueil')
  const pct = Math.round(progress * 100)

  useEffect(() => {
    if (!isHome || !visible) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] },
    )

    HOME_TRACK.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [isHome, visible, pathname])

  function goTo(id: string) {
    if (!isHome) {
      navigate(id === 'accueil' ? '/' : `/#${id}`)
      return
    }
    if (id === 'accueil') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.replaceState(null, '', '/')
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          key="side-progress"
          className="side-rail"
          initial={{ opacity: 0, scale: 0.82, x: 36, y: '-50%', filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, x: 0, y: '-50%', filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.82, x: 36, y: '-50%', filter: 'blur(6px)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 26, mass: 0.75 }}
          aria-label="Progression du site"
        >
          <div className="side-rail__glow" aria-hidden="true" />

          <div className="side-rail__ring" aria-hidden="true">
            <svg viewBox="0 0 44 44" className="side-rail__ring-svg">
              <circle className="side-rail__ring-track" cx="22" cy="22" r={ringR} />
              <circle
                className="side-rail__ring-fill"
                cx="22"
                cy="22"
                r={ringR}
                strokeDasharray={ringC}
                strokeDashoffset={ringC * (1 - progress)}
              />
            </svg>
            <span className="side-rail__ring-pct">{pct}</span>
          </div>

          <div className="side-rail__divider" aria-hidden="true" />

          <nav className="side-rail__nav">
            {HOME_TRACK.map((s, i) => (
              <motion.button
                key={s.id}
                type="button"
                className={`side-rail__item${activeSection === s.id ? ' is-active' : ''}`}
                onClick={() => goTo(s.id)}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + i * 0.04, duration: 0.35 }}
              >
                <span className="side-rail__index">{s.short}</span>
                <span className="side-rail__label">{s.label}</span>
              </motion.button>
            ))}
          </nav>

          <button
            type="button"
            className="side-rail__top"
            onClick={() => goTo('accueil')}
            aria-label="Remonter en haut"
          >
            ↑
          </button>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
