import { PropertyApplication } from '@prisma/client'
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
