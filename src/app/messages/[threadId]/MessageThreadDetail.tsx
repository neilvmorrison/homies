import { ScrollArea } from '@/components/ui/scroll-area'
import { getMessageThreadById } from '@/lib/messages/threads'
import { Button } from '@/components/ui/button'
import ChatWindow from './ChatWindow'

export default async function MessageThreadDetail({
  params,
}: {
  params: { threadId: string }
}) {
  const thread = await getMessageThreadById(params.threadId)
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-60px)]">
      <div className="flex text-white bg-slate-700 p-4 font-bold">
        {thread.name}
      </div>
      <ScrollArea className="flex-1 p-4">
        <ChatWindow threadId="threadId" />
      </ScrollArea>
      <div className="flex-none p-4 bg-white border-t border-gray-300 flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
        />
        <Button>Send</Button>
      </div>
    </div>
  )
}
