import { Address, LISTING_STATUS } from '@prisma/client'
import { ListingWithAddress } from './listings'

export function formatListingStatusText(status: LISTING_STATUS) {
  const filterNames = {
    [LISTING_STATUS.ARCHIVED]: 'Archived',
    [LISTING_STATUS.UPCOMING]: 'Upcoming',
    [LISTING_STATUS.IMMEDIATE]: 'Immediate',
    [LISTING_STATUS.LEASED]: 'Leased',
    [LISTING_STATUS.PENDING]: 'Offer Pending',
  }
  return filterNames[status]
}

export function formatInitials(args: string[]): string {
  return args
    .filter((arg) => arg === args[0] || arg === args[args.length - 1])
    .reduce((acc, next) => (acc += next[0]), '')
}

export function serializeListings<T extends ListingWithAddress>(listings: T[]) {
  return listings.map((listing: T) => ({
    ...listing,
    currentPrice: listing?.currentPrice?.toNumber(),
    sizeSQM: listing.sizeSQM?.toNumber(),
    bathrooms: listing.bathrooms?.toNumber(),
  }))
}

export function getNameStringFromNameArray(...args: string[]): string {
  return args.reduce(
    (accName: string, nextName: string) => (accName += ` ${nextName}`),
    ''
  )
}

export type FormattedUserName = {
  nameString: string
  initials: string
}
export function formatName(...args: string[]): FormattedUserName {
  const initials = args.reduce(
    (name: string, nextName: string) => (name += nextName[0]),
    ''
  )
  const nameString = args.reduce(
    (name: string, nextName: string) => (name += ` ${nextName}`),
    ''
  )
  return {
    initials,
    nameString,
  }
}

export type FormattedAddress = {
  addressString: string
}
export function formatListingAddress(address: Address): FormattedAddress {
  let addressString = `${address.civicNumber} ${address.streetName}, ${address.city}`

  return {
    addressString,
  }
}
