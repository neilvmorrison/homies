import { UserFavoriteListing } from "@prisma/client";
import prisma from "../../../prisma/prisma";

export async function listUserFavorites(
  userProfileId: string
): Promise<UserFavoriteListing[]> {
  return prisma.userFavoriteListing.findMany({ where: { userProfileId } });
}

export async function addListingToFavorites(
  listingId: string,
  userProfileId: string
): Promise<void> {
  await prisma.userFavoriteListing.create({
    data: { userProfileId, listingId },
  });
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
  });
}

export async function shareFavorites(
  userProfileId: string,
  targetUserProfileId: string
): Promise<void> {
  // share a list of user favorites with a target user
}

// for future use
export async function createSharedList(userIds: string[]): Promise<void> {}
