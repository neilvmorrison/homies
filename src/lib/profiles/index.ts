import { UserProfile } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import { createClient } from '@/utils/supabase/server'

export async function getUserProfile(): Promise<UserProfile | null> {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (!data || !data.user) {
    return null
  }
  return prisma.userProfile.findFirst({ where: { userSub: data.user.id } })
}
