import { CURRENCY_CODES } from "@prisma/client";
import prisma from "../../../prisma/prisma";

interface INewPrice {
  amount: number;
  currencyCode: CURRENCY_CODES;
}

export async function updateListingPrice(
  listingId: string,
  addressId: string,
  newPrice: INewPrice
): Promise<void> {
  const newPriceRecord = await prisma.listingPrice.create({
    data: {
      listingId,
      addressId,
      amount: newPrice.amount,
      currencyCode: newPrice.currencyCode,
    },
  });
  await prisma.listing.update({
    data: { currentPrice: newPriceRecord.amount },
    where: { id: listingId },
  });
}
