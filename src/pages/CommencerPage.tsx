import { Link, useNavigate } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import AuthShell from '../components/AuthShell'
import GoogleAuthButton from '../components/GoogleAuthButton'
import { authErrorMessage, signUpWithEmail, updateProfile } from '../lib/auth'

const TOTAL_STEPS = 4

const roles = [
  'Dirigeant / Fondateur',
  'Responsable opérations',
  'Produit / IT',
  'Marketing / Création',
  'Développement',
  'Autre',
]

const teamSizes = ['Juste moi', '2–10', '11–50', '51–200', '200+']

const branches = [
  { id: 'core', label: 'Core' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'build', label: 'Build' },
  { id: 'studio', label: 'Studio' },
  { id: 'platform', label: 'Platform' },
]

const goals = [
  'Centraliser nos outils et données',
  'Déployer des assistants IA',
  'Créer des applications internes',
  'Produire du contenu / design',
  'Industrialiser toute la suite',
]

type Draft = {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  role: string
  linkedin: string
  org: string
  website: string
  industry: string
  teamSize: string
  country: string
  city: string
  plan: string
  tools: string
  referral: string
  context: string
  newsletter: boolean
}

const emptyDraft: Draft = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  role: '',
  linkedin: '',
  org: '',
  website: '',
  industry: '',
  teamSize: '',
  country: '',
  city: '',
  plan: 'pro',
  tools: '',
  referral: '',
  context: '',
  newsletter: false,
}

export default function CommencerPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [selectedBranches, setSelectedBranches] = useState<string[]>(['core'])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function toggleBranch(id: string) {
    setSelectedBranches((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    )
  }

  function toggleGoal(goal: string) {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
    )
  }

  function readStep(form: HTMLFormElement): Partial<Draft> {
    const fd = new FormData(form)
    const get = (name: string) => String(fd.get(name) || '')
    return {
      email: get('email') || draft.email,
      password: get('password') || draft.password,
      firstName: get('firstName') || draft.firstName,
      lastName: get('lastName') || draft.lastName,
      phone: get('phone') || draft.phone,
      role: get('role') || draft.role,
      linkedin: get('linkedin') || draft.linkedin,
      org: get('org') || draft.org,
      website: get('website') || draft.website,
      industry: get('industry') || draft.industry,
      teamSize: get('teamSize') || draft.teamSize,
      country: get('country') || draft.country,
      city: get('city') || draft.city,
      plan: get('plan') || draft.plan,
      tools: get('tools') || draft.tools,
      referral: get('referral') || draft.referral,
      context: get('context') || draft.context,
      newsletter: fd.get('newsletter') === 'on' || draft.newsletter,
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const next = { ...draft, ...readStep(form) }

    if (step === 1) {
      const confirm = String(new FormData(form).get('passwordConfirm') || '')
      if (next.password !== confirm) {
        setError('Les mots de passe ne correspondent pas.')
        return
      }
      if (next.password.length < 8) {
        setError('Le mot de passe doit contenir au moins 8 caractères.')
        return
      }
      setDraft(next)
      setStep(2)
      return
    }

    if (step < TOTAL_STEPS) {
      setDraft(next)
      setStep((s) => s + 1)
      return
    }

    setDraft(next)
    setLoading(true)

    try {
      const { user, session } = await signUpWithEmail({
        email: next.email,
        password: next.password,
        metadata: {
          first_name: next.firstName,
          last_name: next.lastName,
          full_name: `${next.firstName} ${next.lastName}`.trim(),
        },
      })

      if (!user) {
        throw new Error('Inscription incomplète. Réessayez.')
      }

      await updateProfile(user.id, {
        email: next.email,
        first_name: next.firstName,
        last_name: next.lastName,
        phone: next.phone || null,
        role: next.role || null,
        linkedin: next.linkedin || null,
        org_name: next.org || null,
        website: next.website || null,
        industry: next.industry || null,
        team_size: next.teamSize || null,
        country: next.country || null,
        city: next.city || null,
        plan: next.plan || 'pro',
        branches: selectedBranches,
        goals: selectedGoals,
        tools: next.tools || null,
        referral: next.referral || null,
        context: next.context || null,
        newsletter: next.newsletter,
      })

      setDone(true)
      if (session) {
        navigate('/espace', { replace: true })
        return
      }
      setLoading(false)
    } catch (err) {
      setError(authErrorMessage(err))
      setLoading(false)
    }
  }

  const titles = [
    'Créer un compte',
    'Qui êtes-vous ?',
    'Votre organisation',
    'Vos besoins ORION',
  ]

  return (
    <AuthShell mode="signup" title={titles[step - 1]}>
      {done && !loading ? (
        <div className="auth__done">
          <p>
            Compte créé. Si une confirmation e-mail est requise, ouvrez le lien reçu
            puis connectez-vous.
          </p>
          <Link to="/espace" className="auth__btn">
            Aller à mon espace
          </Link>
          <Link to="/connexion" className="auth__btn auth__btn--ghost">
            Se connecter
          </Link>
        </div>
      ) : (
        <form className="auth__form" onSubmit={onSubmit}>
          <div className="auth__steps" aria-label={`Étape ${step} sur ${TOTAL_STEPS}`}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <i key={i} className={step >= i + 1 ? 'is-on' : undefined} />
            ))}
          </div>
          <p className="auth__step-label">
            Étape {step} / {TOTAL_STEPS}
          </p>

          {step === 1 && (
            <>
              <GoogleAuthButton onError={setError} />
              <div className="auth__divider" aria-hidden="true">
                <span>ou</span>
              </div>

              <label className="auth__field">
                <span>E-mail professionnel</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="vous@entreprise.com"
                  defaultValue={draft.email}
                />
              </label>

              <label className="auth__field">
                <span>Mot de passe</span>
                <div className="auth__input-wrap">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="8 caractères minimum"
                    defaultValue={draft.password}
                  />
                  <button
                    type="button"
                    className="auth__eye"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? 'Masquer' : 'Afficher'}
                  </button>
                </div>
              </label>

              <label className="auth__field">
                <span>Confirmer le mot de passe</span>
                <input
                  name="passwordConfirm"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Retapez le mot de passe"
                />
              </label>

              {error && <p className="auth__error">{error}</p>}

              <button type="submit" className="auth__btn" disabled={loading}>
                Continuer
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="auth__grid-2">
                <label className="auth__field">
                  <span>Prénom</span>
                  <input
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="Alex"
                    defaultValue={draft.firstName}
                  />
                </label>
                <label className="auth__field">
                  <span>Nom</span>
                  <input
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    placeholder="Martin"
                    defaultValue={draft.lastName}
                  />
                </label>
              </div>

              <label className="auth__field">
                <span>Téléphone</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+33 6 12 34 56 78"
                  defaultValue={draft.phone}
                />
              </label>

              <label className="auth__field">
                <span>Poste / rôle</span>
                <select
                  name="role"
                  required
                  className="auth__select"
                  defaultValue={draft.role}
                >
                  <option value="" disabled>
                    Sélectionnez votre rôle
                  </option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              <label className="auth__field">
                <span>LinkedIn (optionnel)</span>
                <input
                  name="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/…"
                  defaultValue={draft.linkedin}
                />
              </label>

              {error && <p className="auth__error">{error}</p>}

              <div className="auth__row-btns">
                <button
                  type="button"
                  className="auth__btn auth__btn--ghost"
                  onClick={() => setStep(1)}
                >
                  Retour
                </button>
                <button type="submit" className="auth__btn">
                  Continuer
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <label className="auth__field">
                <span>Nom de l’organisation</span>
                <input
                  name="org"
                  type="text"
                  required
                  autoComplete="organization"
                  placeholder="Entreprise SAS"
                  defaultValue={draft.org}
                />
              </label>

              <label className="auth__field">
                <span>Site web</span>
                <input
                  name="website"
                  type="url"
                  placeholder="https://www.entreprise.com"
                  defaultValue={draft.website}
                />
              </label>

              <div className="auth__grid-2">
                <label className="auth__field">
                  <span>Secteur</span>
                  <select
                    name="industry"
                    required
                    className="auth__select"
                    defaultValue={draft.industry}
                  >
                    <option value="" disabled>
                      Secteur d’activité
                    </option>
                    <option>Tech / SaaS</option>
                    <option>Conseil / Services</option>
                    <option>Industrie</option>
                    <option>Retail / E-commerce</option>
                    <option>Médias / Création</option>
                    <option>Finance</option>
                    <option>Santé</option>
                    <option>Éducation</option>
                    <option>Autre</option>
                  </select>
                </label>
                <label className="auth__field">
                  <span>Taille de l’équipe</span>
                  <select
                    name="teamSize"
                    required
                    className="auth__select"
                    defaultValue={draft.teamSize}
                  >
                    <option value="" disabled>
                      Nombre de personnes
                    </option>
                    {teamSizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="auth__grid-2">
                <label className="auth__field">
                  <span>Pays</span>
                  <input
                    name="country"
                    type="text"
                    required
                    placeholder="France"
                    autoComplete="country-name"
                    defaultValue={draft.country}
                  />
                </label>
                <label className="auth__field">
                  <span>Ville</span>
                  <input
                    name="city"
                    type="text"
                    placeholder="Paris"
                    autoComplete="address-level2"
                    defaultValue={draft.city}
                  />
                </label>
              </div>

              <label className="auth__field">
                <span>Offre souhaitée</span>
                <select
                  name="plan"
                  className="auth__select"
                  defaultValue={draft.plan || 'pro'}
                >
                  <option value="essentiel">Essentiel — Gratuit</option>
                  <option value="pro">Pro — 49€ / mois</option>
                  <option value="entreprise">Entreprise — Sur mesure</option>
                </select>
              </label>

              {error && <p className="auth__error">{error}</p>}

              <div className="auth__row-btns">
                <button
                  type="button"
                  className="auth__btn auth__btn--ghost"
                  onClick={() => setStep(2)}
                >
                  Retour
                </button>
                <button type="submit" className="auth__btn">
                  Continuer
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <fieldset className="auth__fieldset">
                <legend>Branches qui vous intéressent</legend>
                <div className="auth__chips">
                  {branches.map((b) => (
                    <label
                      key={b.id}
                      className={`auth__chip${selectedBranches.includes(b.id) ? ' is-on' : ''}`}
                    >
                      <input
                        type="checkbox"
                        name="branches"
                        value={b.id}
                        checked={selectedBranches.includes(b.id)}
                        onChange={() => toggleBranch(b.id)}
                      />
                      {b.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="auth__fieldset">
                <legend>Objectifs principaux</legend>
                <div className="auth__chips auth__chips--wrap">
                  {goals.map((g) => (
                    <label
                      key={g}
                      className={`auth__chip${selectedGoals.includes(g) ? ' is-on' : ''}`}
                    >
                      <input
                        type="checkbox"
                        name="goals"
                        value={g}
                        checked={selectedGoals.includes(g)}
                        onChange={() => toggleGoal(g)}
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="auth__field">
                <span>Outils déjà utilisés</span>
                <input
                  name="tools"
                  type="text"
                  placeholder="Notion, HubSpot, Slack, Drive…"
                  defaultValue={draft.tools}
                />
              </label>

              <label className="auth__field">
                <span>Comment nous avez-vous connu ?</span>
                <select
                  name="referral"
                  className="auth__select"
                  defaultValue={draft.referral}
                >
                  <option value="" disabled>
                    Choisissez une option
                  </option>
                  <option>Recherche Google</option>
                  <option>Réseaux sociaux</option>
                  <option>Recommandation</option>
                  <option>Événement / conf</option>
                  <option>Presse</option>
                  <option>Autre</option>
                </select>
              </label>

              <label className="auth__field">
                <span>Message / contexte (optionnel)</span>
                <textarea
                  name="context"
                  rows={3}
                  className="auth__textarea"
                  placeholder="Décrivez brièvement votre besoin ou votre stack actuelle…"
                  defaultValue={draft.context}
                />
              </label>

              <label className="auth__check">
                <input
                  type="checkbox"
                  name="newsletter"
                  defaultChecked={draft.newsletter}
                />
                <span>Recevoir les nouveautés produit ORION</span>
              </label>

              <label className="auth__check">
                <input type="checkbox" name="terms" required />
                <span>
                  J’accepte les conditions d’utilisation et la politique de
                  confidentialité.
                </span>
              </label>

              {error && <p className="auth__error">{error}</p>}

              <div className="auth__row-btns">
                <button
                  type="button"
                  className="auth__btn auth__btn--ghost"
                  onClick={() => setStep(3)}
                  disabled={loading}
                >
                  Retour
                </button>
                <button type="submit" className="auth__btn" disabled={loading}>
                  {loading ? 'Création…' : 'Créer mon compte'}
                </button>
              </div>
            </>
          )}

          <p className="auth__switch">
            Déjà un compte ? <Link to="/connexion">Se connecter</Link>
          </p>
        </form>
      )}
    </AuthShell>
  )
}
