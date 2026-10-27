export type ProductFeature = {
  title: string
  text: string
}

export type Product = {
  id: string
  tag: string
  title: string
  text: string
  longText: string
  points: string[]
  icon: string
  cta: string
  usesCredits?: boolean
  downloadName: string
  webUrl: string
  downloadUrl: string
  audience: string
  promise: string
  features: ProductFeature[]
  benefits: string[]
  useCases: ProductFeature[]
  modules: string[]
  integrations?: string[]
  specs: { label: string; value: string }[]
}

export const products: Product[] = [
  {
    id: 'core',
    tag: 'ORION CORE',
    title: 'La base du projet',
    text: 'Une plateforme qui connecte les logiciels utilisés par les entreprises, rassemble leurs données au même endroit et simplifie leur travail.',
    longText:
      'ORION Core est le point d’entrée de l’écosystème. Il relie vos outils métier, centralise les informations critiques et offre une interface unique pour piloter le quotidien — clients, projets, documents et activités.',
    points: ['Connexion des logiciels', 'Données centralisées', 'Travail simplifié'],
    icon: '/images/icon-centralisez.png',
    cta: 'Découvrir Core',
    downloadName: 'ORION Core',
    webUrl:
      (typeof import.meta !== 'undefined' &&
        (import.meta.env.VITE_CORE_URL as string | undefined)) ||
      'https://orion-core-app.vercel.app',
    downloadUrl: '/downloads/ORION-Core-Setup-0.1.0.exe',
    audience: 'Équipes opérations, direction, support et toute organisation multi-outils.',
    promise: 'Une seule interface pour voir, chercher et agir sur l’ensemble de votre activité.',
    features: [
      {
        title: 'Hub de connexions',
        text: 'Reliez Gmail, Notion, Drive, HubSpot et des dizaines d’autres sources en quelques clics, avec synchronisation continue.',
      },
      {
        title: 'Espace de travail unifié',
        text: 'Clients, projets, documents et activités dans une vue consolidée, filtrable et partageable par équipe.',
      },
      {
        title: 'Recherche globale',
        text: 'Retrouvez une information où qu’elle se trouve — dans vos apps connectées ou dans ORION — en une seule requête.',
      },
      {
        title: 'Permissions fines',
        text: 'Contrôlez qui voit quoi : rôles, espaces, et accès par source pour sécuriser le partage.',
      },
      {
        title: 'Activité & journal',
        text: 'Suivez les événements importants (contrats, syncs, relances) dans un fil clair et actionnable.',
      },
      {
        title: 'Tableaux de bord',
        text: 'Indicateurs clés (clients actifs, projets, volume documentaire) pour piloter sans multiplier les outils.',
      },
    ],
    benefits: [
      'Moins de double saisie entre vos logiciels',
      'Vision unique pour toute l’équipe',
      'Onboarding plus rapide des nouveaux collaborateurs',
      'Base propre pour Intelligence, Build et Studio',
      'Gain de temps sur la recherche d’information',
    ],
    useCases: [
      {
        title: 'Direction & opérations',
        text: 'Piloter l’activité sans basculer entre CRM, messagerie et fichiers cloud.',
      },
      {
        title: 'Équipes clients',
        text: 'Contexte client complet (échanges, docs, historique) avant chaque rendez-vous.',
      },
      {
        title: 'Organisation multi-outils',
        text: 'Remplacer les allers-retours manuels par une synchro fiable et traçable.',
      },
    ],
    modules: [
      'Connexions & sync',
      'Workspace',
      'Recherche',
      'Documents',
      'Activité',
      'Admin & droits',
    ],
    integrations: ['Gmail', 'Notion', 'Google Drive', 'HubSpot', 'Slack', 'Calendriers'],
    specs: [
      { label: 'Accès', value: 'Web + application desktop via Platform' },
      { label: 'Déploiement', value: 'Cloud ORION / options Entreprise' },
      { label: 'Sécurité', value: 'Rôles, espaces, journal d’accès' },
      { label: 'Crédits IA', value: 'Non requis (sauf assistants liés)' },
    ],
  },
  {
    id: 'intelligence',
    tag: 'ORION INTELLIGENCE',
    title: 'L’IA au service de vos équipes',
    text: 'La branche dédiée à l’intelligence artificielle, avec des assistants capables d’aider les utilisateurs, d’automatiser des tâches et de travailler avec leurs outils.',
    longText:
      'ORION Intelligence déploie des assistants contextuels qui comprennent vos données et vos outils. Ils aident à décider, automatiser et accélérer les tâches répétitives — en consommant des crédits IA selon l’usage.',
    points: ['Assistants IA', 'Automatisation', 'Travail avec vos outils'],
    icon: '/images/icon-comprenez.png',
    cta: 'Explorer Intelligence',
    usesCredits: true,
    downloadName: 'ORION Intelligence',
    webUrl: '/commencer',
    downloadUrl: '/commencer?download=intelligence',
    audience: 'Managers, support, sales et toute équipe qui veut accélérer avec l’IA.',
    promise: 'Des réponses claires et des actions proposées, ancrées dans vos vraies données.',
    features: [
      {
        title: 'Assistants contextuels',
        text: 'Posez une question : l’assistant s’appuie sur Core et vos sources connectées pour répondre avec précision.',
      },
      {
        title: 'Suggestions d’actions',
        text: 'Relances, synthèses, priorisation — des propositions concrètes prêtes à valider.',
      },
      {
        title: 'Automatisations intelligentes',
        text: 'Déclenchez des scénarios quand un événement survient (client inactif, document manquant, sync terminée).',
      },
      {
        title: 'Travail multi-outils',
        text: 'L’IA agit avec vos logiciels reliés : rédiger, planifier, classer, sans quitter ORION.',
      },
      {
        title: 'Contrôle humain',
        text: 'Vous validez avant l’envoi. Traçabilité complète des suggestions et des actions.',
      },
      {
        title: 'Consommation de crédits',
        text: 'Chaque requête avancée consomme des crédits inclus dans votre plan ou achetés à la demande.',
      },
    ],
    benefits: [
      'Moins de temps perdu sur les tâches répétitives',
      'Décisions plus rapides grâce au contexte consolidé',
      'Qualité de suivi client renforcée',
      'Équipes augmentées sans changer d’outils',
      'Usage maîtrisable via les crédits IA',
    ],
    useCases: [
      {
        title: 'Support & succès client',
        text: 'Synthèses de tickets, réponses proposées, détection des comptes à risque.',
      },
      {
        title: 'Commercial',
        text: 'Préparation de rendez-vous, messages de relance, scoring d’opportunités.',
      },
      {
        title: 'Direction',
        text: 'Briefings automatiques sur l’activité de la semaine.',
      },
    ],
    modules: [
      'Assistants',
      'Suggestions',
      'Automatisations',
      'Mémoire contextuelle',
      'Journal IA',
      'Crédits',
    ],
    integrations: ['Core', 'Gmail', 'Notion', 'CRM connectés'],
    specs: [
      { label: 'Accès', value: 'Web + desktop via Platform' },
      { label: 'Crédits IA', value: 'Requis pour assistants & automations' },
      { label: 'Modes', value: 'Suggestion / automatisation validée' },
      { label: 'Gouvernance', value: 'Politiques d’usage Entreprise' },
    ],
  },
  {
    id: 'build',
    tag: 'ORION BUILD',
    title: 'Créer des logiciels grâce à l’IA',
    text: 'Une branche consacrée à la création de logiciels grâce à l’IA, pour développer des applications et des outils plus facilement.',
    longText:
      'ORION Build permet de concevoir et itérer des applications plus rapidement. Décrivez ce dont vous avez besoin : l’IA génère, structure et affine — pour prototyper ou industrialiser vos outils internes.',
    points: ['Développement assisté', 'Applications sur mesure', 'Itération rapide'],
    icon: '/images/icon-build.png',
    cta: 'Découvrir Build',
    usesCredits: true,
    downloadName: 'ORION Build',
    webUrl: '/commencer',
    downloadUrl: '/commencer?download=build',
    audience: 'Product builders, IT, fondateurs et équipes qui créent des outils internes.',
    promise: 'Passer de l’idée à un outil utilisable sans friction de développement classique.',
    features: [
      {
        title: 'Génération assistée',
        text: 'Décrivez l’outil souhaité : écrans, logique et structure sont proposés par l’IA.',
      },
      {
        title: 'Itération conversationnelle',
        text: 'Affinez par consignes : “ajoute un tableau”, “relie à Core”, “restreins l’accès”.',
      },
      {
        title: 'Connexion à Platform',
        text: 'Identité, données et permissions héritées du socle ORION pour des apps cohérentes.',
      },
      {
        title: 'Composants prêts',
        text: 'Formulaires, listes, dashboards et workflows réutilisables pour accélérer.',
      },
      {
        title: 'Prévisualisation live',
        text: 'Testez immédiatement le résultat avant de publier à votre équipe.',
      },
      {
        title: 'Publication contrôlée',
        text: 'Déployez en interne, versionnez et retirez en un clic si besoin.',
      },
    ],
    benefits: [
      'Prototypes en heures, pas en semaines',
      'Moins de dépendance aux cycles IT longs',
      'Outils vraiment adaptés à votre métier',
      'Réutilisation des données Core / Platform',
      'Coût maîtrisé via crédits IA',
    ],
    useCases: [
      {
        title: 'Outils internes',
        text: 'Portails RH, suivi de stock, tableaux métier spécifiques.',
      },
      {
        title: 'MVP produit',
        text: 'Valider une idée avant un développement lourd.',
      },
      {
        title: 'Automatisation métier',
        text: 'Apps qui orchestrent des étapes entre vos systèmes connectés.',
      },
    ],
    modules: [
      'Studio de génération',
      'Éditeur d’app',
      'Preview',
      'Publication',
      'Versions',
      'Accès & rôles',
    ],
    integrations: ['Platform', 'Core', 'APIs connectées'],
    specs: [
      { label: 'Accès', value: 'Web + environnement Build desktop' },
      { label: 'Crédits IA', value: 'Requis pour génération & itérations' },
      { label: 'Cible', value: 'Apps internes / prototypes' },
      { label: 'Export', value: 'Publication dans l’espace ORION' },
    ],
  },
  {
    id: 'studio',
    tag: 'ORION STUDIO',
    title: 'La partie créative d’ORION',
    text: 'Des outils intelligents pour créer du contenu, concevoir des projets et explorer de nouvelles possibilités numériques.',
    longText:
      'ORION Studio rassemble les outils créatifs de l’écosystème : contenu, design et exploration numérique, assistés par l’IA pour produire plus vite sans sacrifier la qualité.',
    points: ['Création de contenu', 'Conception de projets', 'Exploration numérique'],
    icon: '/images/icon-studio.png',
    cta: 'Explorer Studio',
    usesCredits: true,
    downloadName: 'ORION Studio',
    webUrl: '/commencer',
    downloadUrl: '/commencer?download=studio',
    audience: 'Marketing, design, contenu et équipes qui produisent des assets digitaux.',
    promise: 'Créer plus vite, avec une direction artistique assistée et cohérente.',
    features: [
      {
        title: 'Génération de contenu',
        text: 'Textes, variantes, structures de campagnes et briefs assistés par l’IA.',
      },
      {
        title: 'Conception visuelle',
        text: 'Exploration de directions, maquettes et assets pour vos projets digitaux.',
      },
      {
        title: 'Espaces projet',
        text: 'Organisez moodboards, livrables et versions dans un même atelier.',
      },
      {
        title: 'Collaboration',
        text: 'Commentez, validez et partagez avec le reste de l’équipe ORION.',
      },
      {
        title: 'Lien avec Core',
        text: 'Réutilisez le contexte marque / clients pour des créations plus pertinentes.',
      },
      {
        title: 'Bibliothèque',
        text: 'Centralisez templates et assets réutilisables pour industrialiser la création.',
      },
    ],
    benefits: [
      'Production accélérée sans perdre le contrôle créatif',
      'Moins d’allers-retours sur les briefs',
      'Cohérence de marque renforcée',
      'Exploration rapide de nouvelles idées',
      'Crédits IA pour scaler la production',
    ],
    useCases: [
      {
        title: 'Marketing',
        text: 'Campagnes, landing copy, variantes A/B et kits de contenus.',
      },
      {
        title: 'Design produit',
        text: 'Exploration d’UI, moodboards et prototypes visuels.',
      },
      {
        title: 'Agences / freelances',
        text: 'Atelier client unique pour co-créer et livrer plus vite.',
      },
    ],
    modules: [
      'Contenu',
      'Visuel',
      'Projets',
      'Bibliothèque',
      'Validation',
      'Export',
    ],
    integrations: ['Core', 'Intelligence', 'Drive / Notion'],
    specs: [
      { label: 'Accès', value: 'Web + app Studio' },
      { label: 'Crédits IA', value: 'Requis pour génération créative' },
      { label: 'Formats', value: 'Texte, visuels, kits projet' },
      { label: 'Collab', value: 'Commentaires & validation' },
    ],
  },
  {
    id: 'platform',
    tag: 'ORION PLATFORM',
    title: 'Le socle technologique commun',
    text: 'L’infrastructure qui permet à toutes ces branches de communiquer, de partager certaines capacités et de fonctionner ensemble.',
    longText:
      'ORION Platform est le socle partagé : identité, données, permissions et capacités communes. Elle fait communiquer Core, Intelligence, Build et Studio pour un écosystème cohérent — et se télécharge pour un poste de travail unifié.',
    points: ['Interconnexion', 'Capacités partagées', 'Écosystème unifié'],
    icon: '/images/icon-platform.png',
    cta: 'Découvrir Platform',
    downloadName: 'ORION Platform',
    webUrl: '/commencer',
    downloadUrl: '/commencer?download=platform',
    audience: 'IT, entreprises et équipes qui déploient toute la suite ORION.',
    promise: 'Un socle unique pour faire vivre toutes les branches ensemble, en sécurité.',
    features: [
      {
        title: 'Identité unique',
        text: 'Un compte, un SSO (Entreprise), des rôles partagés entre tous les logiciels ORION.',
      },
      {
        title: 'Couche données',
        text: 'Modèle commun pour que Core, Intelligence, Build et Studio partagent le contexte.',
      },
      {
        title: 'Permissions transverses',
        text: 'Politiques d’accès appliquées partout : qui peut voir, générer, publier.',
      },
      {
        title: 'Runtime desktop',
        text: 'Téléchargez Platform pour lancer et orchestrer les apps ORION sur votre poste.',
      },
      {
        title: 'API & extensibilité',
        text: 'Connectez vos systèmes et étendez les capacités du socle.',
      },
      {
        title: 'Observabilité',
        text: 'Logs, usage crédits, santé des syncs — une vue d’administration centralisée.',
      },
    ],
    benefits: [
      'Écosystème cohérent sans silos entre produits',
      'Sécurité et gouvernance centralisées',
      'Déploiement simplifié pour les équipes IT',
      'Expérience desktop + web unifiée',
      'Base pour industrialiser ORION à l’échelle',
    ],
    useCases: [
      {
        title: 'Déploiement Entreprise',
        text: 'SSO, espaces multi-équipes et politiques d’usage IA.',
      },
      {
        title: 'Poste de travail ORION',
        text: 'Télécharger Platform et accéder à Core, Intelligence, Build, Studio.',
      },
      {
        title: 'Intégration SI',
        text: 'Brancher l’écosystème sur votre stack existante via API.',
      },
    ],
    modules: [
      'Identité',
      'Données',
      'Permissions',
      'Runtime desktop',
      'API',
      'Admin',
    ],
    integrations: ['Core', 'Intelligence', 'Build', 'Studio', 'SSO Entreprise'],
    specs: [
      { label: 'Accès', value: 'Web admin + téléchargement desktop' },
      { label: 'OS', value: 'Windows / macOS (via installateur Platform)' },
      { label: 'Rôle', value: 'Socle commun de l’écosystème' },
      { label: 'Offre', value: 'Inclus Pro (partiel) / complet Entreprise' },
    ],
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}
