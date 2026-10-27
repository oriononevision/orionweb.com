/** Sections de la page d’accueil ciblées par le header / menu latéral. */
export const navSections = [
  { label: 'Logiciels', id: 'produit' },
  { label: 'Tarifs', id: 'tarifs' },
  { label: 'Entreprise', id: 'entreprise' },
  { label: 'Contact', id: 'contact' },
] as const

export type NavSectionId = (typeof navSections)[number]['id']
