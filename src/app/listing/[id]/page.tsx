import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'
import { fetchListingById } from '@/lib/listings/detail'
import { formatInitials } from '../../../lib/formatters'

export default async function ListingDetail({
  params: { id },
}: {
  params: { id: string }
}) {
  const listing = await fetchListingById(id)
  const landlord = listing.owner
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
          <div className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage
                src={landlord.avatar}
                alt={`${landlord.givenName}`}
              />
              <AvatarFallback>
                {formatInitials([
                  landlord.givenName,
                  landlord.middleName,
                  landlord.familyName,
                ])}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-md">
                {landlord.givenName} {landlord.familyName}
              </p>
              <p className="text-sm flex items-center text-slate-500">
                Landlord
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
