'use server'

import { createClient } from '@/utils/supabase/server'

export async function signOut() {
  const sb = createClient()
  return sb.auth.signOut()
}
