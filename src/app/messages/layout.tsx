import { formatDate } from '@/lib/formatters'
import {
  getAuthenticatedUserProfile,
  getThreadsByProfileId,
} from '@/lib/profiles'
import { MessageThread } from '@prisma/client'
import Link from 'next/link'
import { ReactNode } from 'react'

async function MessageLayout({ children }: { children: ReactNode }) {
  const now = new Date()
  const date = formatDate(now)
  const authUser = await getAuthenticatedUserProfile()
  if (!authUser) return null
  const { messageThreads } = (await getThreadsByProfileId(authUser.id)) || {}
  if (!messageThreads?.length) return <h1>No threads yet!</h1>
  return (
    <div className="flex h-[calc(100vh-100px)]">
      <div className="w-1/3  p-4">
        <div className="font-bold text-lg mb-4">Message Threads</div>
        {messageThreads.map((thread: MessageThread) => (
          <Link href={`/messages/${thread.id}`} key={thread.id}>
            <div className="flex items-center p-2 bg-white mb-2 rounded-lg shadow">
              <div className="w-12 h-12 rounded-full bg-blue-400 flex-shrink-0"></div>
              <div className="ml-4">
                <div className="font-bold">{thread.name}</div>
                <div className="text-sm text-gray-600 line-clamp-1">
                  Last Message Shows here it is extra long let us clamp it test
                  test test lmao test
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex-1 flex flex-col bg-gray-100 rounded-b-lg">
        {children}
      </div>
    </div>
  )
}

export default MessageLayout
