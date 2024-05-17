import { MessageThread } from '@prisma/client'
import prisma from '../../../prisma/prisma'

export async function createMessageThread(
  threadName: string = 'Test thread',
  participantIds: string[]
): Promise<MessageThread> {
  const thread = await prisma.messageThread.create({
    data: {
      name: threadName,
      participants: {
        connect: participantIds.map((id) => ({ id })),
      },
    },
  })
  return thread
}
