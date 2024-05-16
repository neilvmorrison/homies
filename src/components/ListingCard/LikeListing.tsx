'use client'
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { addToFavorites } from '@/app/actions'

interface ILikeListingProps {
  listingId: string
  userProfileId?: string
  isFavorite?: boolean
}

function LikeListing({
  listingId,
  userProfileId,
  isFavorite = false,
}: ILikeListingProps) {
  const handleClick = async () => {
    if (!userProfileId) {
      return
    }
    await addToFavorites(listingId, userProfileId)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="border-none z-10"
    >
      {isFavorite ? (
        <HeartFilledIcon color="red" />
      ) : (
        <HeartIcon className="h-4 w-4" />
      )}
    </Button>
  )
}

export default LikeListing
