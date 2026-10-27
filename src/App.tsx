import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout'
import HomePage from './pages/HomePage'
import UniversPage from './pages/UniversPage'
import LogicielsPage from './pages/LogicielsPage'
import ProductPage from './pages/ProductPage'
import TarifsPage from './pages/TarifsPage'
import CreditsPage from './pages/CreditsPage'
import EntreprisePage from './pages/EntreprisePage'
import CommencerPage from './pages/CommencerPage'
import ConnexionPage from './pages/ConnexionPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import EspacePage from './pages/EspacePage'
import DemoPage from './pages/DemoPage'
import ContactPage from './pages/ContactPage'
import LegalPage from './pages/LegalPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="univers" element={<UniversPage />} />
          <Route path="logiciels" element={<LogicielsPage />} />
          <Route path="logiciels/:id" element={<ProductPage />} />
          <Route path="tarifs" element={<TarifsPage />} />
          <Route path="credits" element={<CreditsPage />} />
          <Route path="entreprise" element={<EntreprisePage />} />
          <Route path="commencer" element={<CommencerPage />} />
          <Route path="connexion" element={<ConnexionPage />} />
          <Route path="espace" element={<EspacePage />} />
          <Route path="auth/callback" element={<AuthCallbackPage />} />
          <Route path="demo" element={<DemoPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="confidentialite" element={<LegalPage />} />
          <Route path="cookies" element={<LegalPage />} />
          <Route path="mentions" element={<LegalPage />} />
          <Route path="cgu" element={<LegalPage />} />
          <Route path="start" element={<Navigate to="/commencer" replace />} />
          <Route path="login" element={<Navigate to="/connexion" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
