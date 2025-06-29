import { createClient } from '@supabase/supabase-js'

// Use placeholder values if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Create client even with placeholder values to prevent errors
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  full_name: string | null
  updated_at: string
}