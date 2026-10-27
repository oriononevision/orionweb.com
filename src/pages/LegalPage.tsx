import { Link, useLocation, Navigate } from 'react-router-dom'
import PageHero from '../components/PageHero'

const pages: Record<
  string,
  { crumb: string; title: string; accent: string; lead: string; body: string[] }
> = {
  confidentialite: {
    crumb: 'Confidentialité',
    title: 'Politique de',
    accent: 'confidentialité.',
    lead: 'Comment ORION traite les données collectées sur ce site marketing.',
    body: [
      'Les informations saisies via les formulaires (contact, démo, inscription) sont utilisées uniquement pour répondre à votre demande et vous accompagner dans la découverte d’ORION.',
      'Nous ne revendons pas vos données. Les cookies essentiels assurent le fonctionnement du site ; les cookies optionnels (mesure d’audience) ne sont activés qu’avec votre consentement.',
      'Pour toute question relative à vos données : hello@orionweb.com.',
    ],
  },
  cookies: {
    crumb: 'Cookies',
    title: 'Politique',
    accent: 'cookies.',
    lead: 'Quels cookies utilisons-nous et comment gérer votre choix.',
    body: [
      'Cookies essentiels : nécessaires au fonctionnement (session, préférences de consentement). Ils ne peuvent pas être désactivés.',
      'Cookies analytiques : nous aident à comprendre l’usage du site (pages vues, parcours). Ils ne sont déposés qu’après acceptation.',
      'Vous pouvez modifier votre choix à tout moment en effaçant les données du site dans votre navigateur, ou en nous contactant.',
    ],
  },
  mentions: {
    crumb: 'Mentions légales',
    title: 'Mentions',
    accent: 'légales.',
    lead: 'Informations éditeur et hébergement du site orionweb.com.',
    body: [
      'Éditeur : ORION — site marketing de présentation de l’écosystème logiciel.',
      'Contact : hello@orionweb.com',
      'Ce site est une démonstration front : aucun traitement serveur n’est effectué pour les formulaires.',
    ],
  },
  cgu: {
    crumb: 'CGU',
    title: 'Conditions',
    accent: 'd’utilisation.',
    lead: 'Conditions applicables à l’usage de ce site et des contenus présentés.',
    body: [
      'Le contenu de ce site est fourni à titre informatif. Les offres, tarifs et fonctionnalités peuvent évoluer.',
      'L’accès aux logiciels ORION (Core, Intelligence, Build, Studio, Platform) est soumis aux conditions contractuelles en vigueur lors de la souscription.',
      'Pour toute question : contactez-nous via le formulaire ou hello@orionweb.com.',
    ],
  },
}

export default function LegalPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const page = pages[slug]

  if (!page) return <Navigate to="/" replace />

  return (
    <div className="subpage">
      <PageHero
        eyebrow="LÉGAL"
        title={page.title}
        accent={page.accent}
        lead={page.lead}
        crumbs={[
          { label: 'Accueil', to: '/' },
          { label: page.crumb },
        ]}
      />
      <section className="subpage__section">
        <div className="subpage__inner legal-body">
          {page.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Link to="/contact" className="btn btn--accent btn--sm">
            Nous contacter <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
