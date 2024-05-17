import { MessageThread, Prisma, UserProfile } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import { createClient } from '@/utils/supabase/server'

export async function getAuthenticatedUserProfile(): Promise<UserProfile | null> {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (!data || !data.user) {
    return null
  }
  return prisma.userProfile.findFirst({ where: { userSub: data.user.id } })
}

export async function getUserProfileById(
  profileId: string
): Promise<UserProfile | null> {
  return prisma.userProfile.findUnique({ where: { id: profileId } })
}

export type MessageThreadWithParticipants = Prisma.MessageThreadGetPayload<{
  include: {
    participants: {
      select: {
        givenName: true
        familyName: true
        overallRating: true
        email: true
      }
    }
  }
}>
export async function getThreadWithParticipants(
  threadId: string
): Promise<MessageThreadWithParticipants | null> {
  return prisma.messageThread.findUnique({
    where: { id: threadId },
    include: {
      participants: {
        select: {
          givenName: true,
          familyName: true,
          overallRating: true,
          email: true,
        },
      },
    },
  })
}

export type MessageThreadsByUserProfile = Prisma.UserProfileGetPayload<{
  include: { messageThreads: true }
}>
export async function getThreadsByProfileId(
  profileId: string
): Promise<MessageThreadsByUserProfile | null> {
  const userThreads = await prisma.userProfile.findUnique({
    where: { id: profileId },
    include: { messageThreads: true },
  })
  return userThreads
}
