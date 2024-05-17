import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import LikeListing from './LikeListing'
import Link from 'next/link'
import { SListingWithAddress } from '@/lib/listings'
import ShareListing from './ShareListing'
import { Badge } from '../ui/badge'
import { formatListingStatusText } from '@/lib/formatters'

interface IListingCardProps {
  listing: SListingWithAddress
  profileId: string | undefined
  userFavorites?: string[]
}

async function ListingCard({
  listing,
  profileId,
  userFavorites,
}: IListingCardProps) {
  const isFavorite = userFavorites?.some((id) => listing.id === id)
  return (
    <Card key={listing.id} className="min-w-[320px]">
      <AspectRatio className="mb-3 relative">
        <Badge variant={'default'} className="z-10 absolute top-4 right-4">
          {formatListingStatusText(listing.status)}
        </Badge>
        <Image
          alt={`${listing.title} image`}
          src={listing.thumbnail}
          fill
          className="rounded-t-md w-full bg-cover"
        />
      </AspectRatio>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">
            $ {listing.currentPrice || 2000}
          </h3>
          <div className="flex gap-2">
            <ShareListing listingId={listing.id} />
            <LikeListing
              listingId={listing.id}
              userProfileId={profileId}
              isFavorite={isFavorite}
            />
          </div>
        </div>
        <Link href={`/listing/${listing.id}`}>
          <h2 className="hover:underline">{listing.title}</h2>
        </Link>
        <p className="text-gray-500 text-xs">
          {listing.address.civicNumber} {listing.address.streetName},{' '}
          {listing.address.city}, {listing.address.country}
        </p>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {listing.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default ListingCard
