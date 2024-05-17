import { getThreadWithParticipants } from '@/lib/profiles'
import { threadId } from 'worker_threads'
import ChatWindow from './ChatWindow'

export default async function MessageThreadDetail({
  params,
}: {
  params: { threadId: string }
}) {
  const messageThread = await getThreadWithParticipants(params.threadId)
  return (
    <div className="h-full">
      <div className="border-b pb-4">
        <h1 className="font-bold text-lg">{messageThread?.name}</h1>
        <p className="text-dimmed">
          Thread started {messageThread?.createdAt.toDateString()}
        </p>
      </div>
      <div className="h-full bg-slate-300">
        <ChatWindow threadId={threadId} />
      </div>
    </div>
  )
}
