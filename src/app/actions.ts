'use server'
import {
  SListingWithAddress,
  getFilteredListingsByStatus,
} from '@/lib/listings'
import { addListingToFavorites } from '@/lib/listings/favorites'
import { createClient } from '@/utils/supabase/server'
import { LISTING_STATUS } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const client = createClient()

interface IListingFilterParams {
  status: LISTING_STATUS
}

export async function fetchFilteredListings(
  filterParams: IListingFilterParams
): Promise<SListingWithAddress[]> {
  return getFilteredListingsByStatus(filterParams.status)
}

export async function getUserProfileId() {
  const user = await client.auth.getUser()
  return user
}

export async function addToFavorites(
  listingId: string,
  profileId: string
): Promise<void> {
  await addListingToFavorites(listingId, profileId)
  revalidatePath('/')
}
