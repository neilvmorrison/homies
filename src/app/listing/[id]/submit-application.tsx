'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { applyToListing } from './actions'

interface ISubmitApplication {
  listingId: string
  authenticatedUserId: string
}

export default function SubmitApplication({
  listingId,
  authenticatedUserId,
}: ISubmitApplication) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Submit an Application</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={() => applyToListing(listingId, [authenticatedUserId])}>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit">Apply to listing</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
