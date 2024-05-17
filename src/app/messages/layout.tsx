import {
  getAuthenticatedUserProfile,
  getThreadsByProfileId,
} from '@/lib/profiles'
import { cn } from '@/lib/utils'
import { MessageThread } from '@prisma/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default async function MessageLayout({
  children,
}: {
  children: ReactNode
}) {
  const authUser = await getAuthenticatedUserProfile()
  if (!authUser) return null
  const { messageThreads } = (await getThreadsByProfileId(authUser.id)) || {}
  return (
    <div className="mt-12 mx-24 grid grid-cols-4 gap-8 h-[calc(100vh-140px)]">
      <div className="cols-span-1">
        <h1 className="text-xl font-semibold">Message Threads</h1>
        <div className="p-4 flex flex-col gap-2 rounded my-4">
          {!messageThreads?.length ? (
            <p>You have no messages yet!</p>
          ) : (
            messageThreads?.map((thread: MessageThread) => {
              return (
                <Link href={`/messages/${thread.id}`} key={thread.id}>
                  <button className={cn('border-none', 'text-left')}>
                    {thread.name}
                  </button>
                </Link>
              )
            })
          )}
        </div>
      </div>
      <main className="border rounded mt-11 col-span-3 p-4">{children}</main>
    </div>
  )
}
