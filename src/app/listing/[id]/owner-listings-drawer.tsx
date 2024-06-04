import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { SListingWithAddress, getListingsByOwnerId } from '@/lib/listings'
import { getAuthenticatedUserProfile, getUserProfileById } from '@/lib/profiles'
import { formatListingAddress, formatName } from '@/lib/formatters'
import UserTile from '@/components/UserTile'
import { Icons } from '@/components/ui/icons'
import RatingStar from '@/components/RatingStar'
import ListingCard from '@/components/ListingCard'
import { aggregateOwnerListings } from '@/lib/listings/detail'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { MessageUserButton } from '@/components/MessageUserButton'

interface IOwnerListingsDrawer {
  triggerText: ReactNode | ReactNode[]
  ownerId: string
  currentListing: SListingWithAddress
}

function OwnerStat({
  label,
  icon: Icon,
  value,
  tooltipContent,
}: {
  label: string
  value: string | number
  icon: any
  tooltipContent?: string
}) {
  return (
    <div>
      <div className="text-md font-medium mb-1 flex items-center gap-1">
        {label}
        {tooltipContent && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Icons.information className="h-4 w-4 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex gap-2 items-center">
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
      <DrawerTrigger className="text-blue-500 hover:underline">
        {triggerText}
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
              <div className="flex flex-col gap-8 pl-4">
                <OwnerStat
                  label="Properties Managed"
                  value={ownerStats._count}
                  icon={Icons.building}
                  tooltipContent="This user owns multiple listings"
                />
                <OwnerStat
                  label="Average Rent"
                  value={ownerStats._avg.currentPrice.toFixed(2)}
                  icon={Icons.dollar}
                  tooltipContent="This user owns multiple listings"
                />
                <OwnerStat
                  label="Average Rating"
                  value={ownerStats._avg.overallRating.toFixed(2)}
                  icon={Icons.ratingStartLg}
                  tooltipContent="This user owns multiple listings "
                />
              </div>
              <MessageUserButton
                buttonText={`Message ${owner.givenName}`}
                userIds={[authUser.id, owner.id]}
                threadName={currentListing.title}
              />
            </div>
          </div>
          <div className="col-span-2 flex gap-4 overflow-x-scroll pb-4">
            {listings.map((listing) => (
              <div className="basis-1/4" key={listing.id}>
                <ListingCard listing={listing} profileId={authUser.id} />
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
