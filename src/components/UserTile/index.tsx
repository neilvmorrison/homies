import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar'
import { cn } from '@/lib/utils'
import { DividerHorizontalIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'

export interface IUserTile {
  src?: string
  name: string
  initials: string
  subtitle?: string
  className?: string
  children?: ReactNode
}

export default function UserTile({
  src,
  name,
  initials,
  subtitle,
  className,
  children,
}: IUserTile) {
  return (
    <div className={cn('flex gap-2 flex-row items-start', className)}>
      <Avatar>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-md font-bold">{name}</p>
        {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
        {children && (
          <div className="text-sm text-slate-600 mt-2">{children}</div>
        )}
      </div>
    </div>
  )
}
