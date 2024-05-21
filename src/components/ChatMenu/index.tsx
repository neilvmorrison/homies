import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu'
import { Icons } from '../ui/icons'

function ChatMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Icons.dotMenu className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>Add Member</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Leave thread</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ChatMenu
