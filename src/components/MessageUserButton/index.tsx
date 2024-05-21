'use client'

import { initiateContact } from '@/app/listing/[id]/actions'
import { Button } from '../ui/button'
import { ToastAction } from '../ui/toast'
import { useToast } from '../ui/use-toast'
import Link from 'next/link'

interface IMessageUserButton {
  userIds: string[]
  buttonText?: string
  threadName: string
}

export function MessageUserButton({
  buttonText = 'Message User',
  userIds = [],
  threadName,
}: IMessageUserButton) {
  // useOptimisitc is probably relevant here
  const { toast } = useToast()
  const handleClick = async () => {
    const thread = await initiateContact(threadName, userIds)
    if (thread.id) {
      toast({
        title: 'Message to Landlord Sent!',
        description: 'You may now chat with the landlord.',
        action: (
          <ToastAction altText="Go to message thread" asChild>
            <Link href={`/messages/${thread.id}`}>Go to message thread</Link>
          </ToastAction>
        ),
      })
    }
  }
  return <Button onClick={handleClick}>{buttonText}</Button>
}
