'use client'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { threadId } from 'worker_threads'

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
