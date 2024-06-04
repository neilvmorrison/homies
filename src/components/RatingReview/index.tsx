'use client'

import RatingStar from '../RatingStar'
import ReviewSheet from '../ReviewSheet'
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
      <ReviewSheet>
        <Button variant="link" className="px-0">
          {reviewCount} {reviewCount > 1 ? ' reviews' : ' review'}
        </Button>
      </ReviewSheet>
    </div>
  )
}

export default RatingReview
