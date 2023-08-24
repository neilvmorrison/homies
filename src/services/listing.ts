import prisma from "@/config/prisma";
import { Listing, PropertyType, PropertySubType } from ".prisma/client";

interface ICreateListing {
  title: string;
  description: string;
  propertyType: PropertyType;
  propertySubType?: PropertySubType;
  userProfileId: string;
  addressId: string;
}

export async function createListing(payload: ICreateListing): Promise<Listing> {
  return prisma.listing.create({ data: payload });
}
