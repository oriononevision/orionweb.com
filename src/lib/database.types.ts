export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Profile = {
  id: string
  email: string | null
  first_name: string | null
  last_name: string | null
  phone: string | null
  role: string | null
  linkedin: string | null
  org_name: string | null
  website: string | null
  industry: string | null
  team_size: string | null
  country: string | null
  city: string | null
  plan: string | null
  branches: string[] | null
  goals: string[] | null
  tools: string | null
  referral: string | null
  context: string | null
  newsletter: boolean | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type ProfileUpdate = Partial<
  Omit<Profile, 'id' | 'created_at' | 'updated_at'>
> & { updated_at?: string }

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Partial<Profile> & { id: string }
        Update: ProfileUpdate
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
