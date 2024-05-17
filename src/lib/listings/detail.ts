import { Listing } from '@prisma/client'
import prisma from '../../../prisma/prisma'

export async function fetchListingById(
  listingId: string
): Promise<Listing | null> {
  return prisma.listing.findFirst({
    where: { id: listingId },
    include: { owner: true },
  })
}

export async function fetchLandlordPropertyCount(
  lanlordProfileId: string
): Promise<any> {
  return prisma.listing.count({ where: { owner: { id: lanlordProfileId } } })
}
