"use server";

import {
  SListingWithAddress,
  getFilteredListingsByStatus,
} from "@/lib/listings";
import { createClient } from "@/utils/supabase/server";
import { LISTING_STATUS, Listing } from "@prisma/client";

const client = createClient();

interface IListingFilterParams {
  status: LISTING_STATUS;
}

export async function fetchFilteredListings(
  filterParams: IListingFilterParams
): Promise<SListingWithAddress[]> {
  return getFilteredListingsByStatus(filterParams.status);
}

export async function getUserProfileId() {
  const user = await client.auth.getUser();
  return user;
}

export async function addToFavorites(listingId: string): Promise<void> { };
