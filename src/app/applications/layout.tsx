import UserTile from '@/components/UserTile'
import TabLink from '@/components/ui/tab-link'
import { getApplicationsByUserId } from '@/lib/applications'
import {
  formatApplicationStatusText,
  formatListingAddress,
} from '@/lib/formatters'
import { getAuthenticatedUserProfile } from '@/lib/profiles'
import { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
  const authUser = await getAuthenticatedUserProfile()
  if (!authUser) return null
  const applications = await getApplicationsByUserId(authUser?.id)
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        {applications?.map((app) => {
          const applicationStatus = formatApplicationStatusText(app.status)
          const { addressString } = formatListingAddress(app.listing.address)
          return (
            <TabLink href={`/applications/${app.id}`} key={app.id}>
              <UserTile
                src={app.listing.thumbnail}
                name={app.listing.title}
                subtitle={addressString}
                initials={app.listing.title[0]}
              />
            </TabLink>
          )
        })}
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  )
}
