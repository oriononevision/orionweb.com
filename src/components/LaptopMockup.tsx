const navItems = [
  { label: 'Accueil', active: true, icon: '⌂' },
  { label: 'Recherche', icon: '⌕' },
  { label: 'Clients', icon: '◎' },
  { label: 'Documents', icon: '▤' },
  { label: 'Automations', icon: '⚡' },
]

const sources = [
  { name: 'Gmail', tone: '#ea4335' },
  { name: 'Notion', tone: '#ffffff' },
  { name: 'Drive', tone: '#34a853' },
  { name: 'HubSpot', tone: '#ff7a59' },
]

const activities = [
  { title: 'Contrat signé — Nova Labs', time: 'il y a 2 min', tone: '#5eb8ff' },
  { title: 'Sync Notion terminée', time: 'il y a 18 min', tone: '#7dd3a7' },
  { title: 'Relance client planifiée', time: 'il y a 1 h', tone: '#c4a5ff' },
]

export default function LaptopMockup() {
  return (
    <div className="laptop" aria-hidden="true">
      <div className="laptop__bezel">
        <div className="laptop__screen">
          <aside className="dash__side">
            <div className="dash__brand">
              <svg width="11" height="11" viewBox="0 0 64 64" fill="none">
                <path
                  d="M44.8 19.2 A18 18 0 0 1 44.8 44.8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M19.2 44.8 A18 18 0 0 1 19.2 19.2"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M32 4 C33.1 23.4 41.2 31.2 60 32 C41.2 32.8 33.1 40.6 32 60 C30.9 40.6 22.8 32.8 4 32 C22.8 31.2 30.9 23.4 32 4Z"
                  fill="currentColor"
                />
              </svg>
              ORION
            </div>
            <nav className="dash__nav">
              {navItems.map((item) => (
                <span key={item.label} className={item.active ? 'is-active' : undefined}>
                  <b>{item.icon}</b>
                  {item.label}
                </span>
              ))}
            </nav>
            <div className="dash__side-foot">
              <span className="dash__live">
                <i /> Live
              </span>
            </div>
          </aside>

          <div className="dash__main">
            <header className="dash__top">
              <div>
                <p className="dash__hello">Bonjour Alex</p>
                <p className="dash__date">Lundi 26 octobre · Vue consolidée</p>
              </div>
              <div className="dash__top-right">
                <div className="dash__search">Recherche</div>
                <div className="dash__avatar">A</div>
              </div>
            </header>

            <div className="dash__stats">
              <div className="dash__stat dash__reveal" style={{ ['--d' as string]: '0.05s' }}>
                <span>Clients actifs</span>
                <strong>128</strong>
                <em className="dash__trend dash__trend--up">+12%</em>
                <svg className="dash__spark" viewBox="0 0 64 18" preserveAspectRatio="none">
                  <path d="M0 14 L10 12 L20 13 L30 8 L40 10 L50 5 L64 3" />
                </svg>
              </div>
              <div className="dash__stat dash__reveal" style={{ ['--d' as string]: '0.12s' }}>
                <span>Projets en cours</span>
                <strong>34</strong>
                <em className="dash__trend dash__trend--up">+4</em>
                <svg className="dash__spark" viewBox="0 0 64 18" preserveAspectRatio="none">
                  <path d="M0 11 L12 10 L24 12 L36 7 L48 8 L64 4" />
                </svg>
              </div>
              <div className="dash__stat dash__stat--sources dash__reveal" style={{ ['--d' as string]: '0.2s' }}>
                <span>Sources connectées</span>
                <div className="dash__sources">
                  {sources.map((s) => (
                    <em key={s.name}>
                      <i style={{ background: s.tone }} />
                      {s.name}
                    </em>
                  ))}
                </div>
              </div>
            </div>

            <div className="dash__bottom">
              <div className="dash__panel dash__reveal" style={{ ['--d' as string]: '0.28s' }}>
                <div className="dash__panel-head">
                  <h4>Activité récente</h4>
                  <span>Tout voir</span>
                </div>
                <ul>
                  {activities.map((a) => (
                    <li key={a.title}>
                      <i style={{ background: a.tone, boxShadow: `0 0 6px ${a.tone}` }} />
                      <div>
                        <b>{a.title}</b>
                        <small>{a.time}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dash__panel dash__panel--ai dash__reveal" style={{ ['--d' as string]: '0.36s' }}>
                <div className="dash__panel-head">
                  <h4>Suggestion IA</h4>
                  <span className="dash__ai-badge">ORION</span>
                </div>
                <p>
                  3 clients n&apos;ont pas été contactés depuis 14 jours. Préparer une
                  relance ?
                </p>
                <div className="dash__ai-actions">
                  <span className="dash__chip">Générer le message</span>
                  <span className="dash__chip dash__chip--ghost">Plus tard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="laptop__base" />
      <div className="laptop__shadow" />
    </div>
  )
}
