import { LISTING_STATUS, Listing, ListingPrice, Prisma } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import { serializeListings } from '../formatters'

export async function getAllListings(): Promise<Listing[]> {
  // used for home page, should include params for location as well as minimizing payload size.
  return prisma.listing.findMany({
    where: { status: LISTING_STATUS.IMMEDIATE },
    include: { price: true },
  })
}

export type ListingWithAddress = Prisma.ListingGetPayload<{
  include: {
    address: {
      select: {
        city: true
        civicNumber: true
        country: true
        streetName: true
        postalCode: true
      }
    }
  }
}>

export type SListingWithAddress = Pick<
  ListingWithAddress,
  Exclude<keyof ListingWithAddress, 'currentPrice' | 'sizeSQM' | 'bathrooms'>
> & {
  currentPrice: number | undefined
  sizeSQM: number
  bathrooms: number
}

export async function getFilteredListingsByStatus(
  listingStatus: LISTING_STATUS
): Promise<SListingWithAddress[]> {
  const listings = await prisma.listing.findMany({
    where: { status: listingStatus },
    include: {
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
  })
  const serialized = serializeListings<ListingWithAddress>(listings)
  return serialized
}

export async function getListingsByOwnerId(
  ownerId: string
): Promise<SListingWithAddress[]> {
  const listings = await prisma.listing.findMany({
    where: { owner: { id: ownerId } },
    include: { address: true },
  })
  const serialized = serializeListings<ListingWithAddress>(listings)
  return serialized
}
