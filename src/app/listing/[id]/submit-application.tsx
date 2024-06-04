'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { applyToListing } from './actions'
import UserSearch from '@/components/UserSearch'
import { SListingWithAddress } from '@/lib/listings'
import { formatListingAddress } from '@/lib/formatters'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'

interface ISubmitApplication {
  authUserId: string
  listing: SListingWithAddress
}

export default function SubmitApplication({
  listing,
  authUserId,
}: ISubmitApplication) {
  const { toast } = useToast()
  const router = useRouter()
  const owner = listing.owner.givenName
  const { addressString } = formatListingAddress(listing.address)

  async function handleSubmit() {
    const res = await applyToListing(listing.id, [authUserId])
    if (res) {
      return toast({
        title: 'Success!',
        description: 'You successfully applied for this listing',
        action: (
          <ToastAction
            altText="Goto applications"
            onClick={() => router.push('/applications')}
          >
            See Applications
          </ToastAction>
        ),
      })
    }
    return toast({
      title: 'Something went wrong!',
      description:
        'There was an error while applying to this listing, please try again later',
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Submit an Application</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply to Listing?</DialogTitle>
          <p>{listing.title}</p>
          <p className="text-xs">{addressString}</p>
          <DialogDescription>
            {owner} will receive a notification that you are interested in the
            property.
          </DialogDescription>
          {/* <h2>Add another user to this application?</h2>
          <UserSearch /> */}
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>
            Submit application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
