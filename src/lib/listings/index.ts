import { LISTING_STATUS, Listing, Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma";

export async function getAllListings(): Promise<Listing[]> {
  // used for home page, should include params for location as well as minimizing payload size.
  return prisma.listing.findMany({
    where: { status: LISTING_STATUS.IMMEDIATE },
    include: { price: true },
  });
}

export type ListingWithAddressAndPrice = Prisma.ListingGetPayload<{
  include: {
    price: true;
    address: {
      select: {
        city: true;
        civicNumber: true;
        country: true;
        streetName: true;
        postalCode: true;
      };
    };
  };
}>;

export async function getFilteredListingsByStatus(
  listingStatus: LISTING_STATUS
): Promise<ListingWithAddressAndPrice[]> {
  return prisma.listing.findMany({
    where: { status: listingStatus },
    include: {
      price: true,
      address: {
        select: {
          city: true,
          civicNumber: true,
          country: true,
          postalCode: true,
          streetName: true,
        },
      },
    },
  });
}
