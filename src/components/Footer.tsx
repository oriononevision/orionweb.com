import { Link } from 'react-router-dom'
import { OrionLogo } from './OrionLogo'
import { products } from '../data/products'
import {
  CORE_DESKTOP_DOWNLOAD,
  CORE_DESKTOP_LABEL,
  TRANSFER_DESKTOP_DOWNLOAD,
  TRANSFER_DESKTOP_LABEL,
} from '../lib/downloads'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner footer__inner--full">
        <div className="footer__top">
          <div className="footer__brand-block">
            <Link to="/" className="footer__brand" aria-label="ORION — Accueil">
              <OrionLogo markSize={22} />
            </Link>
            <p className="footer__tagline">
              L’écosystème pour connecter, partager, comprendre, construire et créer —
              Core, Transfer, Intelligence, Build, Studio et Platform.
            </p>
            <div className="footer__cta-row">
              <Link to="/commencer" className="btn btn--white btn--sm">
                Commencer
              </Link>
              <Link to="/contact" className="btn btn--ghost btn--sm">
                Nous contacter
              </Link>
            </div>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h3>Logiciels</h3>
              <ul>
                {products.map((p) => (
                  <li key={p.id}>
                    <Link to={`/logiciels/${p.id}`}>{p.tag.replace('ORION ', '')}</Link>
                  </li>
                ))}
                <li>
                  <Link to="/logiciels">Tous les logiciels</Link>
                </li>
              </ul>
            </div>

            <div className="footer__col">
              <h3>Produit</h3>
              <ul>
                <li>
                  <Link to="/univers">Univers</Link>
                </li>
                <li>
                  <Link to="/tarifs">Tarifs</Link>
                </li>
                <li>
                  <Link to="/credits">Crédits IA</Link>
                </li>
                <li>
                  <Link to="/entreprise">Entreprise</Link>
                </li>
                <li>
                  <Link to="/demo">Demander une démo</Link>
                </li>
              </ul>
            </div>

            <div className="footer__col">
              <h3>Compte</h3>
              <ul>
                <li>
                  <Link to="/commencer">Créer un compte</Link>
                </li>
                <li>
                  <Link to="/connexion">Se connecter</Link>
                </li>
                <li>
                  <Link to="/espace">Mon espace</Link>
                </li>
                <li>
                  <a
                    href={
                      (import.meta.env.VITE_CORE_URL as string | undefined) ||
                      'https://orion-core-app.vercel.app'
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    ORION Core (web)
                  </a>
                </li>
                <li>
                  <a href={CORE_DESKTOP_DOWNLOAD} download>
                    {CORE_DESKTOP_LABEL}
                  </a>
                </li>
                <li>
                  <a href={TRANSFER_DESKTOP_DOWNLOAD} download>
                    {TRANSFER_DESKTOP_LABEL}
                  </a>
                </li>
                <li>
                  <Link to="/contact">Contact & demandes</Link>
                </li>
              </ul>
            </div>

            <div className="footer__col">
              <h3>Légal</h3>
              <ul>
                <li>
                  <Link to="/mentions">Mentions légales</Link>
                </li>
                <li>
                  <Link to="/confidentialite">Confidentialité</Link>
                </li>
                <li>
                  <Link to="/cookies">Cookies</Link>
                </li>
                <li>
                  <Link to="/cgu">CGU</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} ORION. Tous droits réservés.</p>
          <nav className="footer__bottom-nav" aria-label="Liens légaux">
            <Link to="/confidentialite">Confidentialité</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
