import { Prisma, UserFavoriteListing } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import { SListingWithAddress } from '.'

export async function listUserFavorites(
  userProfileId: string
): Promise<UserFavoriteListing[]> {
  return prisma.userFavoriteListing.findMany({ where: { userProfileId } })
}

export type UserFavoritesWithListing = Prisma.UserFavoriteListingGetPayload<{
  include: {
    listing: {
      include: {
        address: true
      }
    }
  }
}>

export type UserFavoriteWithListing = Pick<
  UserFavoritesWithListing,
  Exclude<keyof UserFavoritesWithListing, 'listing'>
> & { listing: SListingWithAddress }

export async function getListingsFromFavorites(
  userProfileId: string
): Promise<UserFavoriteWithListing[]> {
  const favorites = await prisma.userFavoriteListing.findMany({
    where: { userProfileId },
    include: { listing: { include: { address: true } } },
  })
  const serialized = favorites.map((favorite) => {
    const { listing } = favorite
    const newListing = {
      ...listing,
      currentPrice: listing.currentPrice?.toNumber(),
      sizeSQM: listing.sizeSQM.toNumber(),
      bathrooms: listing.bathrooms.toNumber(),
    }
    return {
      ...favorite,
      listing: newListing,
    }
  })
  return serialized
}

export async function addListingToFavorites(
  listingId: string,
  userProfileId: string
): Promise<void> {
  await prisma.userFavoriteListing.create({
    data: { userProfileId, listingId },
  })
}

export async function removeListingFromFavorites(
  listingId: string,
  userProfileId: string
): Promise<void> {
  await prisma.userFavoriteListing.update({
    where: {
      listingId_userProfileId: {
        userProfileId,
        listingId,
      },
    },
    data: { deletedAt: new Date() },
  })
}

export async function shareFavorites(
  userProfileId: string,
  targetUserProfileId: string
): Promise<void> {
  // share a list of user favorites with a target user
}

// for future use
export async function createSharedList(userIds: string[]): Promise<void> {}
