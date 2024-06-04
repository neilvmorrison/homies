import UserTile from '@/components/UserTile'
import { getApplicationsByUserId } from '@/lib/applications'
import {
  formatApplicationStatusText,
  formatListingAddress,
} from '@/lib/formatters'
import { getAuthenticatedUserProfile } from '@/lib/profiles'
import Link from 'next/link'

export default async function Applications() {
  const authUser = await getAuthenticatedUserProfile()
  if (!authUser) return null
  const applications = await getApplicationsByUserId(authUser?.id)
  return (
    <div>
      <h1 className="mb-4">Applications</h1>
      {applications?.map((app) => {
        const applicationStatus = formatApplicationStatusText(app.status)
        const { addressString } = formatListingAddress(app.listing.address)
        return (
          <Link href={`/applications/${app.id}`} key={app.id}>
            <UserTile
              src={app.listing.thumbnail}
              name={app.listing.title}
              subtitle={addressString}
              initials={app.listing.title[0]}
            >
              {applicationStatus}
            </UserTile>
          </Link>
        )
      })}
    </div>
  )
}
