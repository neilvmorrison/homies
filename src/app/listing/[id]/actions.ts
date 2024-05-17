'use server'

import { SListingWithAddress, getListingsByOwnerId } from '@/lib/listings'

export async function fetchListingsByOwnerId(
  ownerId: string
): Promise<SListingWithAddress[]> {
  return getListingsByOwnerId(ownerId)
}
