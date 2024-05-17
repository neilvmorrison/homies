'use client'

import { initiateContact } from '@/app/listing/[id]/actions'
import { Button } from '../ui/button'
import { redirect } from 'next/navigation'

interface IMessageUserButton {
  userIds: string[]
  buttonText?: string
}

export function MessageUserButton({
  buttonText = 'Message User',
  userIds = [],
}: IMessageUserButton) {
  const handleClick = async () => {
    const name = 'Test Thread Fuck!'
    const thread = await initiateContact(name, userIds)
    if (thread.id) {
      return redirect(`/messages/${thread.id}`)
    }
  }
  return <Button onClick={handleClick}>{buttonText}</Button>
}
