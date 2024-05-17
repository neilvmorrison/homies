import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { SListingWithAddress, getListingsByOwnerId } from '@/lib/listings'
import { getAuthenticatedUserProfile, getUserProfileById } from '@/lib/profiles'
import {
  formatListingAddress,
  formatName,
  getNameStringFromNameArray,
} from '@/lib/formatters'
import UserTile from '@/components/UserTile'
import { Icons } from '@/components/ui/icons'
import RatingStar from '@/components/RatingStar'
import ListingCard from '@/components/ListingCard'
import { aggregateOwnerListings } from '@/lib/listings/detail'

interface IOwnerListingsDrawer {
  triggerText: ReactNode | ReactNode[]
  ownerId: string
  currentListing: SListingWithAddress
}

function OwnerStat({
  label,
  icon: Icon,
  value,
}: {
  label: string
  value: string | number
  icon: any
}) {
  return (
    <div>
      <p className="text-md font-medium mb-1">{label}</p>
      <div className="flex gap-2">
        <Icon className="h-10 w-10" />
        <p className="text-3xl font-black">{value}</p>
      </div>
    </div>
  )
}

export default async function OwnerListingsDrawer({
  triggerText,
  ownerId,
  currentListing,
}: IOwnerListingsDrawer) {
  const listings = await getListingsByOwnerId(ownerId)
  const owner = await getUserProfileById(ownerId)
  const authUser = await getAuthenticatedUserProfile()
  if (!owner || !listings.length || !authUser || !currentListing) return null
  const { nameString, initials } = formatName(owner.givenName, owner.familyName)
  const { addressString } = formatListingAddress(currentListing.address)
  const ownerStats = await aggregateOwnerListings(owner.id)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="link" className="underline px-0 mx-0">
          {triggerText}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full grid grid-cols-3 items-start gap-4">
          <div className="p-6 col-span-1 h-full flex flex-col gap-3">
            <DrawerTitle className="mb-4">
              {owner.givenName}&apos;s Properties
            </DrawerTitle>
            <DrawerDescription>
              <UserTile
                name={nameString}
                initials={initials}
                src={owner.avatar || ''}
              >
                <div>
                  <div className="flex items-center mb-2">
                    Owner{' '}
                    <span>
                      <Icons.dotSeparator className="h-3 w-3 mx-1" />
                    </span>{' '}
                    {addressString}
                  </div>
                  <RatingStar
                    rating={owner.overallRating}
                    userName={owner.givenName}
                  />
                </div>
              </UserTile>
            </DrawerDescription>
            <div className="mt-6 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-4 pl-4">
                <OwnerStat
                  label="Properties Managed"
                  value={ownerStats._count}
                  icon={Icons.building}
                />
                <OwnerStat
                  label="Average Rent"
                  value={ownerStats._avg.currentPrice.toFixed(2)}
                  icon={Icons.dollar}
                />
                <OwnerStat
                  label="Average Rating"
                  value={ownerStats._avg.overallRating.toFixed(2)}
                  icon={Icons.ratingStartLg}
                />
              </div>
              <Button className="w-full">Message {owner.givenName}</Button>
            </div>
          </div>
          <div className="col-span-2 flex gap-4 overflow-x-scroll pb-4">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                profileId={authUser.id}
              />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
