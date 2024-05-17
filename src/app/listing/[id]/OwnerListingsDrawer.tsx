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

interface IOwnerListingsDrawer {
  triggerText: ReactNode | ReactNode[]
  ownerId: string
  currentListing: SListingWithAddress
}

export default async function OwnerListingsDrawer({
  triggerText,
  ownerId,
  currentListing,
}: IOwnerListingsDrawer) {
  const listings = await getListingsByOwnerId(ownerId)
  const owner = await getUserProfileById(ownerId)
  const authUser = await getAuthenticatedUserProfile()
  if (!owner || !listings.length || !authUser) return null
  const { nameString, initials } = formatName(owner.givenName, owner.familyName)
  const { addressString } = formatListingAddress(currentListing.address)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="link" className="underline px-0 mx-0">
          {triggerText}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full flex min-h-[45vh] items-start">
          <DrawerHeader className="text-left min-w-[400px]">
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
          </DrawerHeader>
          <div className="flex items-center gap-4 overflow-x-scroll p-3">
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
