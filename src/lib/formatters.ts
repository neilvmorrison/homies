import { LISTING_STATUS } from "@prisma/client";

export function formatListingStatusOptions(status: LISTING_STATUS) { }

export function formatInitials(args: string[]): string {
  return args.filter((arg) => arg === args[0] || arg === args[args.length - 1]).reduce((acc, next) => acc += next[0], "")
}