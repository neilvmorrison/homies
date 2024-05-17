import { ReactNode } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Icons } from '../ui/icons'
import { formatInitials } from '@/lib/formatters'

interface IProfileCard {
  src?: string
  name: string[]
  subtitle?: string
  rating?: number
  children?: ReactNode | ReactNode[]
}

export default function ProfileCard({
  src,
  name,
  subtitle,
  rating,
  children,
}: IProfileCard) {
  const nameString = name.reduce((acc, next) => (acc += next), '')
  const Icon = rating ? Icons.ratingStarFilled : Icons.ratingStarOutline
  return (
    <Card className="min-w-[320px]">
      <CardHeader className="flex gap-2 flex-row items-center">
        <Avatar>
          <AvatarImage src={src} alt={nameString} />
          <AvatarFallback>{formatInitials(name)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-md font-bold">{nameString}</p>
          {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-center">
          <Icon className="fill-slate-300 stroke-slate-300" />
          <p className="text-sm text-slate-500">
            {rating || 'User has no ratings yet'}
          </p>
        </div>
      </CardContent>
      {children && <CardFooter>{children}</CardFooter>}
    </Card>
  )
}
