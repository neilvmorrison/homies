import {
  fetchLandlordPropertyCount,
  fetchListingById,
} from '@/lib/listings/detail'
import { formatName } from '../../../lib/formatters'
import UserTile from '@/components/UserTile'
import RatingStar from '@/components/RatingStar'
import { Icons } from '@/components/ui/icons'
import OwnerListingsDrawer from './owner-listings-drawer'
import Image from 'next/image'
import { getAuthenticatedUserProfile } from '@/lib/profiles'
import ListingDetailCard from '@/components/ListingDetailCard'

export default async function ListingDetail({
  params: { id },
}: {
  params: { id: string }
}) {
  const listing = await fetchListingById(id)
  const authUser = await getAuthenticatedUserProfile()

  if (!listing) return null
  const landlord = listing.owner
  const { nameString, initials } = formatName(
    landlord.givenName,
    landlord.familyName
  )
  const propertyCount = await fetchLandlordPropertyCount(landlord.id)
  return (
    <main>
      <div className="flex gap-4 mb-4">
        <div className="h-[400px] w-full rounded relative">
          <Image
            src={listing?.thumbnail || ''}
            alt={listing?.title || ''}
            objectFit="cover"
            fill
            className="absolute rounded"
          />
        </div>
        <div className="w-full grid grid-cols-2 grid-rows-2 gap-4">
          {listing?.photoUrls.map((url) => (
            <div className="relative" key={url}>
              <Image
                src={url}
                alt={listing?.title || ''}
                objectFit="cover"
                fill
                className="absolute rounded"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 mb-4 max-w-[1280px]">
        <div className="w-[640px] relative">
          <ListingDetailCard listing={listing} authUser={authUser} />
        </div>
        <div className="w-full h-[2000px] py-10">
          <h1 className="text-4xl font-bold mb-2">{listing?.title}</h1>
          <p className="text-md mb-10">{listing?.description}</p>
          <div className="">
            <h2 className="mb-4 font-medium text-slate-600">
              This property is administered by
            </h2>
            <UserTile
              src={landlord.avatar}
              name={nameString}
              initials={initials}
              subtitle="Landlord/Owner"
              className="mb-2"
            />
            <ul className="flex flex-col gap-2 mt-4 text-slate-500 text-sm">
              <li>
                <RatingStar
                  rating={landlord.overallRating}
                  userName={landlord.givenName}
                />
              </li>
              <li className="flex items-center gap-2">
                <Icons.propertyCount className="stroke-slate-400" />
                {landlord.givenName} manages
                <OwnerListingsDrawer
                  triggerText={`${propertyCount} properties`}
                  ownerId={landlord.id}
                  currentListing={listing}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
