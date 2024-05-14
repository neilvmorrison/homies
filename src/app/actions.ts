"use server";

import {
  ListingWithAddressAndPrice,
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
): Promise<ListingWithAddressAndPrice[]> {
  return getFilteredListingsByStatus(filterParams.status);
}

export async function getUserProfileId() {
  const user = await client.auth.getUser();
  return user;
}
