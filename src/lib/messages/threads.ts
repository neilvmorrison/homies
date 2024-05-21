import { MessageThread, Prisma } from '@prisma/client'
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

export type MessageThreadWithMessagesAndParticipants =
  Prisma.MessageThreadGetPayload<{
    include: {
      userMessages: true
      participants: true
    }
  }>
export async function getMessageThreadById(
  threadId: string
): Promise<MessageThreadWithMessagesAndParticipants> {
  const thread = await prisma.messageThread.findFirstOrThrow({
    where: {
      id: threadId,
    },
    include: {
      userMessages: true,
      participants: true,
    },
  })
  return thread
}
