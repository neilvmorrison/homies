import { formatInitials } from '@/lib/formatters'
import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar'
import { cn } from '@/lib/utils'

export interface IUserTile {
  src?: string
  name: string[]
  subtitle?: string
  className?: string
}

export default function UserTile({
  src,
  name,
  subtitle,
  className,
}: IUserTile) {
  const nameString = name.reduce(
    (acc: string, next: string) => (acc += ` ${next}`),
    ''
  )
  return (
    <div className={cn('flex gap-2 flex-row items-center', className)}>
      <Avatar>
        <AvatarImage src={src} alt={nameString} />
        <AvatarFallback>{formatInitials(name)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-md font-bold">{nameString}</p>
        {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
      </div>
    </div>
  )
}
