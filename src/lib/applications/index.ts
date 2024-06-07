import { PropertyApplication, UserProfile } from '@prisma/client'
import prisma from '../../../prisma/prisma'

export async function createApplication(
  listingId: string,
  tenants: string[]
): Promise<PropertyApplication> {
  const formattedTenants = tenants.map((t) => ({ id: t }))
  return prisma.propertyApplication.create({
    data: {
      listingId,
      tenants: {
        connect: [...formattedTenants],
      },
    },
  })
}

export async function getApplicationsByUserId(
  userId: string
): Promise<PropertyApplication[]> {
  return prisma.propertyApplication.findMany({
    where: { tenants: { some: { id: userId } } },
    include: {
      listing: {
        include: {
          address: true,
        },
      },
    },
  })
}

export async function getApplicationCountByOwner(
  ownerId: string
): Promise<number> {
  return prisma.propertyApplication.count({ where: { listing: { ownerId } } })
}

export async function getApplicationsByOwner(
  ownerId: string
): Promise<PropertyApplication[]> {
  return prisma.propertyApplication.findMany({
    where: {
      listing: {
        ownerId,
      },
    },
    include: {
      tenants: true,
      listing: true,
    },
  })
}
