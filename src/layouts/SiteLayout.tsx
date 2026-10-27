import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Splash from '../components/Splash'
import CookieConsent from '../components/CookieConsent'
import SideProgressNav from '../components/SideProgressNav'
import { ReadyContext } from '../ReadyContext'
import { useScrollChrome } from '../hooks/useScrollChrome'

const AUTH_PATHS = new Set(['/connexion', '/commencer', '/auth/callback', '/espace'])

export default function SiteLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isAuth = AUTH_PATHS.has(pathname)
  const [ready, setReady] = useState(!isHome)
  const { headerVisible, sideVisible, progress } = useScrollChrome(ready && !isAuth)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (pathname !== '/') setReady(true)
  }, [pathname])

  if (isAuth) {
    return (
      <ReadyContext.Provider value={true}>
        <div className="page page--ready page--auth">
          <Outlet />
          <CookieConsent />
        </div>
      </ReadyContext.Provider>
    )
  }

  return (
    <ReadyContext.Provider value={ready}>
      <div className={`page${ready ? ' page--ready' : ''}`}>
        {isHome && !ready ? <Splash onDone={() => setReady(true)} /> : null}

        <div className="page__content" aria-hidden={isHome && !ready}>
          <Navbar hidden={!headerVisible} />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>

        <SideProgressNav visible={sideVisible && ready} progress={progress} />
        <CookieConsent />
      </div>
    </ReadyContext.Provider>
  )
}
