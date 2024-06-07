import UserTile from '@/components/UserTile'
import { formatListingAddress } from '@/lib/formatters'
import { getListingsByOwnerId } from '@/lib/listings'
import { getAuthenticatedUserProfile } from '@/lib/profiles'
import { ScrollArea } from '../../components/ui/scroll-area'
import { ReactNode } from 'react'
import TabLink from '@/components/ui/tab-link'
import { protectRoute } from '@/utils/protect-route'
import Link from 'next/link'
import { getApplicationCountByOwner } from '@/lib/applications'

export default async function ListingManagementLayout({
  children,
}: {
  children: ReactNode
}) {
  const authUser = await protectRoute('/')
  const listings = await getListingsByOwnerId(authUser.id)
  const applicationCount = await getApplicationCountByOwner(authUser.id)
  return (
    <div>
      <div className="grid gap-[64px] mt-4 grid-cols-4 min-h-[100vh]">
        <div className="col-span-1 pr-4">
          <Link
            href="/listing-management"
            className="text-3xl font-bold hover:bg-transparent"
          >
            Overview
          </Link>
          <div className="flex flex-col gap-2 my-4">
            <Link
              href="/listing-management/applications"
              className="flex items-center justify-between"
            >
              <span>Lease Applications</span>
              {applicationCount && (
                <span className="text-xs text-white bg-blue-500 h-[16px] w-[16px] rounded-full flex items-center justify-center">
                  {applicationCount}
                </span>
              )}
            </Link>
            <Link href="/listing-management/tasks">Maintenance</Link>
            <Link href="/listing-management/payments">Payments</Link>
            <Link href="/listing-management/active-leases">Active Leases</Link>
          </div>
          <div className="border-b w-full h-[1px] my-2" />
          <h2 className="text-lg font-bold text-slate-500 mb-4">My Listings</h2>
          <ScrollArea>
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
