import { ScrollArea } from '@/components/ui/scroll-area'
import { getMessageThreadById } from '@/lib/messages/threads'
import { Button } from '@/components/ui/button'

export default async function MessageThreadDetail({
  params,
}: {
  params: { threadId: string }
}) {
  const thread = await getMessageThreadById(params.threadId)
  console.log(thread)
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-60px)]">
      <div className="flex text-white bg-slate-700 p-4 font-bold">
        {thread.name}
        <Icons />
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
