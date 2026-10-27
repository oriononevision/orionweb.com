import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { OrionLogo } from './OrionLogo'

type SplashProps = {
  onDone?: () => void
}

export default function Splash({ onDone }: SplashProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hold = reduce ? 400 : 1700
    const fade = reduce ? 200 : 900

    const t1 = window.setTimeout(() => setVisible(false), hold)
    const t2 = window.setTimeout(() => onDone?.(), hold + fade)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!visible}
        >
          <motion.div
            className="splash__mark"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <OrionLogo className="splash__logo" markSize={56} />
          </motion.div>
          <div className="splash__glow" aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
