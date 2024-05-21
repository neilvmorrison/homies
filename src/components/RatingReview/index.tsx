'use client'

import RatingStar from '../RatingStar'
import { Button } from '../ui/button'

function RatingReview({
  rating,
  reviewCount = 0,
}: {
  rating: number | null | undefined
  reviewCount: number
}) {
  return (
    <div className="flex items-center gap-1">
      <RatingStar rating={rating || null} />
      based on{' '}
      <Button variant="link" onClick={() => alert('clicked')} className="px-0">
        {reviewCount} {reviewCount > 1 ? ' reviews' : ' review'}
      </Button>
    </div>
  )
}

export default RatingReview
