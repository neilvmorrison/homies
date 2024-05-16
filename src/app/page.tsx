import ListingCard from '@/components/ListingCard'
import MainPageFilters from '@/components/MainPageFilters'
import { LISTING_STATUS } from '@prisma/client'
import { SListingWithAddress } from '@/lib/listings'
import { getUserProfile } from '@/lib/profiles'
import { listUserFavorites } from '@/lib/listings/favorites'
import { fetchFilteredListings } from './actions'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | LISTING_STATUS }
}) {
  const listings = await fetchFilteredListings({
    status: (searchParams.status as LISTING_STATUS) || LISTING_STATUS.IMMEDIATE,
  })
  const profile = await getUserProfile()
  const userFavorites = profile ? await listUserFavorites(profile.id) : []

  const f_listings = userFavorites.map((l) => l.listingId)

  return (
    <main className="mx-24 my-12">
      <MainPageFilters />
      <section className="grid grid-cols-4 gap-6 mt-4">
        {listings.map((listing: SListingWithAddress) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            profileId={profile?.id}
            userFavorites={f_listings}
          />
        ))}
      </section>
    </main>
  )
}
