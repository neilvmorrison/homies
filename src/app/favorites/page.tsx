import {
  UserFavoriteWithListing,
  getListingsFromFavorites,
} from '@/lib/listings/favorites'
import { getUserProfile } from '@/lib/profiles'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ListingCard from '@/components/ListingCard'
import NoListings from '@/components/NoListings'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SORT_DIRECTION, filterNames } from '@/lib/consts'
import { LISTING_STATUS } from '@prisma/client'
import { ReadonlyURLSearchParams, redirect } from 'next/navigation'
import { useCallback } from 'react'
import { buildQueryString } from '@/utils/searchParams'

function Content({
  listings,
  profileId,
  favoriteIds,
}: {
  listings: UserFavoriteWithListing[]
  profileId: string
  favoriteIds: string[]
}) {
  if (!listings.length) {
    return <NoListings />
  }
  return (
    <>
      {listings.map((listing: UserFavoriteWithListing) => (
        <ListingCard
          key={listing.listingId}
          profileId={profileId}
          listing={listing.listing}
          userFavorites={favoriteIds}
        />
      ))}
    </>
  )
}

export default async function Favorites({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams
}) {
  const profile = await getUserProfile()
  if (!profile) {
    return redirect('/login')
  }
  const userFavorites = await getListingsFromFavorites(profile.id)
  const userShares = [] as any[]
  const favoriteIds = userFavorites.map((f) => f.listing.id)

  // const handleSortChange = (value: string) => {
  //   return buildQueryString(searchParams, 'sort', value)
  // }

  return (
    <main className="min-h-[calc(100vh-60px)] mt-12 mx-24">
      <h1 className="text-lg font-bold mb-4">Favorites</h1>
      <Tabs defaultValue="saved" className="">
        <div>
          <TabsList className="grid grid-cols-2 w-[320px]">
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="shared-with-me">Shared with me</TabsTrigger>
          </TabsList>
          {/* <Select
            defaultValue={SORT_DIRECTION.ASC}
            onValueChange={(value: string) => handleSortChange(value)}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a listing status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(LISTING_STATUS).map((status) => (
                  <SelectItem key={status} value={status}>
                    {filterNames[status]}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>
        <TabsContent value="saved" className="grid grid-cols-4 gap-6 mt-4">
          <Content
            listings={userFavorites}
            profileId={profile.id}
            favoriteIds={favoriteIds}
          />
        </TabsContent>
        <TabsContent value="shared-with-me">
          <Content
            listings={userShares}
            profileId={profile.id}
            favoriteIds={favoriteIds}
          />
        </TabsContent>
      </Tabs>
    </main>
  )
}
