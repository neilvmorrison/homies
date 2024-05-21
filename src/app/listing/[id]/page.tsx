import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  fetchLandlordPropertyCount,
  fetchListingById,
} from '@/lib/listings/detail'
import { formatName } from '../../../lib/formatters'
import UserTile from '@/components/UserTile'
import RatingStar from '@/components/RatingStar'
import { Icons } from '@/components/ui/icons'
import OwnerListingsDrawer from './OwnerListingsDrawer'
import Image from 'next/image'
import RatingReview from '@/components/RatingReview'

export default async function ListingDetail({
  params: { id },
}: {
  params: { id: string }
}) {
  const listing = await fetchListingById(id)
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
          <Card className="max-w-[400px] mt-10 min-h-[320px] sticky top-10">
            <CardHeader>
              <h2 className="text-4xl font-black">
                $ {Number(listing?.currentPrice)}{' '}
              </h2>
              <RatingReview rating={listing?.overallRating} reviewCount={1} />
            </CardHeader>
            <CardContent className="flex flex-col h-full gap-4">
              <CardTitle>Listing Breakdown</CardTitle>
              <CardDescription>
                <p>
                  How this listing stacks up against your search preferences
                </p>
              </CardDescription>
              {}
              <CardFooter className="p-0 justify-self-end flex flex-col gap-2">
                <Button variant="default" className="w-full">
                  Submit an Application
                </Button>
                <Button variant="ghost" className="w-full">
                  Schedule a Viewing
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
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
