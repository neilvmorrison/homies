'use client'
import { UploadIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

interface IShareListingProps {
  listingId: string
}

function ShareListing({ listingId }: IShareListingProps) {
  const handleClick = () => {
    alert(`${listingId}`)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="border-none z-10"
    >
      <UploadIcon />
    </Button>
  )
}

export default ShareListing
