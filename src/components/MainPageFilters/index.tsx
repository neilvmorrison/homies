"use client";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LISTING_STATUS } from "@prisma/client";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

const filterNames = {
  [LISTING_STATUS.ARCHIVED]: "Archived",
  [LISTING_STATUS.UPCOMING]: "Upcoming",
  [LISTING_STATUS.IMMEDIATE]: "Immediate",
  [LISTING_STATUS.LEASED]: "Leased",
  [LISTING_STATUS.PENDING]: "Offer Pending",
};

export default function MainPageFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleChange = (status: LISTING_STATUS) => router.push(pathname + '?' + createQueryString('status', status))

  return (
    <Select defaultValue={searchParams.get('status') || LISTING_STATUS.IMMEDIATE} onValueChange={handleChange}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select a listing status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(LISTING_STATUS).map((status) => (
            <SelectItem key={status} value={status}>
              {filterNames[status]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
