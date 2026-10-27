import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import LaptopMockup from './LaptopMockup'
import { useReady } from '../ReadyContext'

const Scene3D = lazy(() => import('./Scene3D'))

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const ready = useReady()

  return (
    <section className="hero" id="accueil" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <motion.img
          src="/images/hero-cosmic-bg.jpg"
          alt=""
          className="hero__bg-img"
          initial={{ scale: 1.08, opacity: 0.5 }}
          animate={ready ? { scale: 1.04, opacity: 0.88 } : undefined}
          transition={{ duration: 1.6, ease }}
        />
        <div className="hero__bg-veil" />
        <div className="hero__bg-glow" />
      </div>

      <div className="hero__content">
        <div className="hero__copy">
          <motion.p
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.05, ease }}
          >
            ÉCOSYSTÈME ORION
          </motion.p>

          <h1 id="hero-title" className="hero__title">
            <motion.span
              className="hero__title-line"
              initial={{ opacity: 0, y: 28 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.85, delay: 0.15, ease }}
            >
              Connecter. Comprendre.
            </motion.span>
            <motion.span
              className="hero__title-accent"
              initial={{ opacity: 0, y: 28 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.28, ease }}
            >
              Construire. Créer.
            </motion.span>
          </h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.4, ease }}
          >
            Core, Intelligence, Build, Studio et Platform : cinq branches pour
            unifier vos outils, déployer l&apos;IA et inventer ce dont votre
            organisation a besoin.
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.52, ease }}
          >
            <Link to="/commencer" className="btn btn--white btn--lg">
              Commencer gratuitement <span aria-hidden="true">→</span>
            </Link>
            <Link to="/demo" className="hero__demo">
              <span className="hero__demo-play" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4.5 2.8v8.4L11.2 7 4.5 2.8Z" fill="currentColor" />
                </svg>
              </span>
              Voir la démo
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.92, y: 40, rotateX: 8 }}
          animate={ready ? { opacity: 1, scale: 1, y: 0, rotateX: 0 } : undefined}
          transition={{ duration: 1.15, delay: 0.35, ease }}
        >
          <div className="hero__scene">
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </div>

          <div className="hero__laptop-wrap">
            <LaptopMockup />
            <img
              src="/images/orb-glass.png"
              alt=""
              className="hero__orb hero__orb--a"
              aria-hidden="true"
            />
            <img
              src="/images/orb-glass.png"
              alt=""
              className="hero__orb hero__orb--b"
              aria-hidden="true"
            />
            <img
              src="/images/hero-laptop.jpg"
              alt=""
              className="hero__fx-plate"
              aria-hidden="true"
            />
          </div>

        </motion.div>
      </div>

      <motion.div
        className="scroll-hint"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span>SCROLLEZ</span>
        <div className="scroll-hint__track">
          <div className="scroll-hint__dot" />
        </div>
      </motion.div>
    </section>
  )
}
