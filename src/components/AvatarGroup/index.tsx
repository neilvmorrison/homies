import { USER_ROLES } from '@prisma/client'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export interface IAvatar {
  src: string | null
  initials: string
  userName: string
  userRole: USER_ROLES
}

function AvatarGroup({ avatars }: { avatars: IAvatar[] }) {
  return (
    <div className="flex -space-x-4 rtl:space-x-reverse">
      {avatars.map((avatar) => (
        <Tooltip key={avatar.src}>
          <TooltipTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src={avatar.src || ''} alt={avatar.userName} />
              <AvatarFallback>{avatar.initials}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-md font-bold">{avatar.userName}</p>
            <p className="text-xs font-light">{avatar.userRole}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export default AvatarGroup
