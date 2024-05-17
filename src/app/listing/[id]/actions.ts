'use server'

import { SListingWithAddress, getListingsByOwnerId } from '@/lib/listings'
import { createMessageThread } from '@/lib/messages/threads'

export async function fetchListingsByOwnerId(
  ownerId: string
): Promise<SListingWithAddress[]> {
  return getListingsByOwnerId(ownerId)
}

export async function initiateContact(name: string, userProfileIds: string[]) {
  return createMessageThread(name, userProfileIds)
}
