import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  fetchLandlordPropertyCount,
  fetchListingById,
} from '@/lib/listings/detail'
import { formatInitials, formatName } from '../../../lib/formatters'
import ProfileCard from '@/components/ProfileCard'
import UserTile from '@/components/UserTile'
import RatingStar from '@/components/RatingStar'
import { Icons } from '@/components/ui/icons'
import Link from 'next/link'
import OwnerListingsDrawer from './OwnerListingsDrawer'
import { SListingWithAddress } from '@/lib/listings'

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
    <main className="min-h-[calc(100vh-60px)] mt-12 mx-24">
      <div className="flex gap-4 mb-4">
        <div className="h-[400px] w-full bg-slate-200 rounded"></div>
        <div className="h-[400px] w-full grid grid-cols-2 grid-rows-2 gap-4">
          <div className="bg-slate-200 rounded" />
          <div className="bg-slate-200 rounded" />
          <div className="bg-slate-200 rounded" />
          <div className="bg-slate-200 rounded" />
        </div>
      </div>
      <div className="flex gap-4 mb-4 max-w-[1280px]">
        <div className="w-[640px] relative">
          <Card className="max-w-[400px] mt-10 min-h-[320px] sticky top-10">
            <CardHeader>
              <h2 className="text-4xl font-black">
                $ {Number(listing?.currentPrice)}{' '}
              </h2>
            </CardHeader>
            <CardContent className="flex flex-col h-full gap-4">
              <p>Some content</p>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                eveniet, at consequatur molestiae rerum officiis velit quaerat
                sunt alias, rem eius eos veniam praesentium suscipit autem
                provident, laudantium voluptate assumenda.
              </CardDescription>
              <Button variant="default" className="w-full">
                Submit an Application
              </Button>
              <Button variant="ghost" className="w-full">
                Schedule a Viewing
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="w-full h-[2000px] py-10">
          <h1 className="text-4xl font-bold">{listing?.title}</h1>
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
