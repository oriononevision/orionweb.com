import { useEffect, useState } from 'react'

/** Header visible near top / on scroll up; side rail when scrolling down. */
export function useScrollChrome(enabled = true) {
  const [headerVisible, setHeaderVisible] = useState(true)
  const [sideVisible, setSideVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setHeaderVisible(true)
      setSideVisible(false)
      setProgress(0)
      return
    }

    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const doc = document.documentElement
      const max = Math.max(doc.scrollHeight - window.innerHeight, 1)
      setProgress(Math.min(1, Math.max(0, y / max)))

      const nearTop = y < 48
      const goingDown = y > lastY + 4
      const goingUp = y < lastY - 4

      if (nearTop) {
        setHeaderVisible(true)
        setSideVisible(false)
      } else if (goingDown && y > 100) {
        setHeaderVisible(false)
        setSideVisible(true)
      } else if (goingUp) {
        setHeaderVisible(true)
        setSideVisible(false)
      }

      lastY = y
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enabled])

  return { headerVisible, sideVisible, progress }
}
