import SubmitApplication from '@/app/listing/[id]/submit-application'
import RatingReview from '../RatingReview'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { SListingWithAddress } from '@/lib/listings'
import { UserProfile } from '@prisma/client'
import Link from 'next/link'

interface IListingCard {
  listing: SListingWithAddress
  authUser: UserProfile | null
}

function AuthenticatedCardContent({ listing, authUser }: IListingCard) {
  return (
    <>
      <SubmitApplication listing={listing} authUserId={authUser?.id || ''} />
      <Button variant="secondary" className="w-full">
        Schedule a Viewing
      </Button>
    </>
  )
}
function UnauthenticatedCardContent() {
  return (
    <div className="text-xs">
      <Link href="/signup" className="text-blue-500 hover:underline">
        Sign up
      </Link>{' '}
      or{' '}
      <Link href="/login" className="text-blue-500 hover:underline">
        log in
      </Link>{' '}
      to submit an application or schedule a viewing
    </div>
  )
}

function ListingDetailCard({ listing, authUser }: IListingCard) {
  return (
    <Card className="max-w-[400px] mt-10 sticky top-10">
      <CardHeader>
        <h2 className="text-4xl font-black">
          $ {Number(listing?.currentPrice)}{' '}
        </h2>
        <RatingReview rating={listing?.overallRating} reviewCount={1} />
      </CardHeader>
      <CardContent className="flex flex-col h-full gap-4">
        <CardTitle>Listing Breakdown</CardTitle>
        <CardDescription>
          How this listing stacks up against your search preferences
        </CardDescription>
        <CardFooter className="p-0 justify-self-end flex flex-col gap-2">
          {authUser ? (
            <AuthenticatedCardContent listing={listing} authUser={authUser} />
          ) : (
            <UnauthenticatedCardContent />
          )}
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export default ListingDetailCard
