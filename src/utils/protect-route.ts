import { getAuthenticatedUserProfile } from '@/lib/profiles'
import { redirect } from 'next/navigation'

export async function protectRoute(fallbackUrl: string = '/login') {
  const authUser = await getAuthenticatedUserProfile()
  if (!authUser) {
    return redirect(fallbackUrl)
  }
  return authUser
}
