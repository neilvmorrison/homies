import prisma from "../../../prisma/prisma";

export async function createListingReview(
  authorId: string,
  listingId: string,
  comment: string,
  accuracy: number
): Promise<void> {
  await prisma.listingReview.create({
    data: { authorId, listingId, comment, accuracy },
  });
}
