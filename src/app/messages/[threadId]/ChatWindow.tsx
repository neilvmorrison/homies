'use client'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function ChatWindow({ threadId }: { threadId: string }) {
  // subscribe on mount
  // useOptimistic
  return (
    <div>
      <ScrollArea></ScrollArea>
    </div>
  )
}
