import { Icons } from '../ui/icons'

export default function RatingStar({
  rating,
  userName,
}: {
  rating: number | null
  userName?: string
}) {
  return (
    <div className="flex items-center gap-2">
      {rating ? (
        <Icons.ratingStarFilled className="fill-yellow-500" />
      ) : (
        <Icons.ratingStarOutline className="fill-slate-300 stroke-slate-300" />
      )}
      <span
        className={rating ? 'font-bold text-black' : 'text-slate-500 text-sm'}
      >
        {rating || `${userName || 'User'} has no rating yet`}
      </span>
    </div>
  )
}
