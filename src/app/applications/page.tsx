import UserTile from '@/components/UserTile'
import { Badge } from '@/components/ui/badge'
import { getApplicationsByUserId } from '@/lib/applications'
import {
  formatApplicationStatusText,
  formatListingAddress,
} from '@/lib/formatters'
import { getAuthenticatedUserProfile } from '@/lib/profiles'
import { cn } from '@/lib/utils'
import { APPLICATION_STATUS } from '@prisma/client'
import Link from 'next/link'
import { ReactNode } from 'react'

export default async function Applications({
  children,
}: {
  children: ReactNode
}) {
  const authUser = await getAuthenticatedUserProfile()
  if (!authUser) return null
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 rounded">
      <div>
        <h1>Select an application</h1>
        <p>See the details about your application</p>
      </div>
    </div>
  )
}
