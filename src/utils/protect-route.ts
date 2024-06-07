import { getAuthenticatedUserProfile } from '@/lib/profiles'
import { UserProfile } from '@prisma/client'
import { redirect } from 'next/navigation'

export async function protectRoute(
  fallbackUrl: string = '/login'
): Promise<UserProfile> {
  const authUser = await getAuthenticatedUserProfile()
  if (!authUser) {
    return redirect(fallbackUrl)
  }
  return authUser
}
