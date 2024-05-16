import {
  UserFavoriteWithListing,
  getListingsFromFavorites,
} from '@/lib/listings/favorites'
import { getUserProfile } from '@/lib/profiles'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ListingCard from '@/components/ListingCard'
import NoListings from '@/components/NoListings'

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

export default async function Favorites() {
  const profile = await getUserProfile()
  if (!profile) {
    return null
  }
  const userFavorites = await getListingsFromFavorites(profile.id)
  const userShares = [] as any[]
  const favoriteIds = userFavorites.map((f) => f.listing.id)
  return (
    <main className="min-h-[calc(100vh-60px)] mt-12 mx-24">
      <h1 className="text-lg font-bold mb-4">Favorites</h1>
      <Tabs defaultValue="saved" className="">
        <TabsList className="grid grid-cols-2 w-[320px]">
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="shared-with-me">Shared with me</TabsTrigger>
        </TabsList>
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
