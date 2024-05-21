'use client'
import { Input } from '@/components/ui/input'

export default function ChatWindow({ threadId }: { threadId: string }) {
  return (
    <div className="max-h-[h-full]">
      <Input
        placeholder="Begin typing your message..."
        className="justify-self-end"
      />
    </div>
  )
}
