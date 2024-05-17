'use client'

import { Button } from '../ui/button'

export default function LogoutButton({
  handleClick,
}: {
  handleClick: () => void
}) {
  return (
    <Button
      variant="destructive"
      onClick={() => handleClick()}
      className="w-full"
    >
      Log out
    </Button>
  )
}
