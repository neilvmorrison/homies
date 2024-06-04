import UserTile from '@/components/UserTile'
import { formatListingAddress } from '@/lib/formatters'
import { getListingsByOwnerId } from '@/lib/listings'
import { getAuthenticatedUserProfile } from '@/lib/profiles'
import { ScrollArea } from '../../components/ui/scroll-area'
import { ReactNode } from 'react'
import TabLink from '@/components/ui/tab-link'

export default async function ListingManagementLayout({
  children,
}: {
  children: ReactNode
}) {
  const authUser = await getAuthenticatedUserProfile()
  if (!authUser) return null
  const listings = await getListingsByOwnerId(authUser.id)
  return (
    <div>
      <div className="grid gap-[64px] mt-4 grid-cols-4 min-h-[100vh]">
        <div className="col-span-1 pr-4">
          <h1>My Listings</h1>
          <ScrollArea className="h-full mt-6">
            <div className="flex flex-col gap-4">
              {listings.map((listing) => {
                const { addressString } = formatListingAddress(listing.address)
                return (
                  <TabLink
                    href={`/listing-management/${listing.id}`}
                    key={listing.id}
                    className="hover:bg-slate-100 px-2 py-2 rounded"
                  >
                    <UserTile
                      src={listing.thumbnail}
                      name={listing.title}
                      subtitle={addressString}
                      initials={listing.title[0]}
                    />
                  </TabLink>
                )
              })}
            </div>
          </ScrollArea>
        </div>
        <div className="col-span-3">{children}</div>
      </div>
    </div>
  )
}
