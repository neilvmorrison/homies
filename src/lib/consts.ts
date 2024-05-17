import { LISTING_STATUS } from '@prisma/client'

export const APPNAME = 'Homies™'

export enum SORT_DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
}

export const filterNames = {
  [LISTING_STATUS.ARCHIVED]: 'Archived',
  [LISTING_STATUS.UPCOMING]: 'Upcoming',
  [LISTING_STATUS.IMMEDIATE]: 'Immediate',
  [LISTING_STATUS.LEASED]: 'Leased',
  [LISTING_STATUS.PENDING]: 'Offer Pending',
}
