import { ScrollArea } from '@/components/ui/scroll-area'
import { getMessageThreadById } from '@/lib/messages/threads'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import AvatarGroup from '@/components/AvatarGroup'
import { formatName } from '@/lib/formatters'
import ChatMenu from '@/components/ChatMenu'

export default async function MessageThreadDetail({
  params,
}: {
  params: { threadId: string }
}) {
  const thread = await getMessageThreadById(params.threadId)
  const avatars = thread.participants.map((p) => {
    const { initials, nameString } = formatName(p.givenName, p.familyName)
    return {
      src: p.avatar,
      userName: nameString,
      initials,
      userRole: p.role,
    }
  })
  return (
    <div className="flex flex-col justify-between h-full border rounded-lg">
      <div className="flex items-center text-white bg-slate-700 p-4 font-bold justify-between rounded-t">
        {thread.name}
        <div className="flex items-center gap-4">
          <AvatarGroup avatars={avatars} />
          <ChatMenu />
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        {/* {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}
          >
            <div className="text-xs">
              {message.sender === 'You' ? 'Me' : 'Neil Morrison'}
            </div>
            <div
              className={`inline-block p-2 rounded-lg shadow ${message.sender === 'You' ? 'bg-blue-200' : 'bg-white'}`}
            >
              {message.text}
            </div>
            <div className="text-xs">{date}</div>
          </div>
        ))} */}
      </ScrollArea>
      <div className="flex-none p-4 bg-white border-t border-slate-100 flex items-center rounded-b-lg">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 border border-slate-300 rounded-lg mr-2"
        />
        <Button>Send</Button>
      </div>
    </div>
  )
}
