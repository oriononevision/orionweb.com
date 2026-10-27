import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function NotFoundPage() {
  return (
    <div className="subpage">
      <PageHero
        eyebrow="404"
        title="Cette page"
        accent="n’existe pas."
        lead="Le lien est peut-être obsolète. Revenez à l’accueil ou explorez l’écosystème ORION."
        actions={
          <>
            <Link to="/" className="btn btn--white btn--sm">
              Accueil
            </Link>
            <Link to="/logiciels" className="btn btn--ghost btn--sm">
              Logiciels
            </Link>
          </>
        }
      />
    </div>
  )
}
