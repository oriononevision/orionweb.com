import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Pricing from '../components/Pricing'

export default function TarifsPage() {
  return (
    <div className="subpage">
      <PageHero
        eyebrow="TARIFS"
        title="Accès aux logiciels,"
        accent="crédits IA inclus."
        lead="Choisissez un plan pour accéder aux branches ORION. Les crédits alimentent Intelligence, Build et Studio."
        crumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Tarifs' },
        ]}
        actions={
          <>
            <Link to="/commencer" className="btn btn--white btn--sm">
              Commencer <span aria-hidden="true">→</span>
            </Link>
            <Link to="/credits" className="btn btn--ghost btn--sm">
              Packs crédits
            </Link>
          </>
        }
      />
      <Pricing standalone />
    </div>
  )
}
