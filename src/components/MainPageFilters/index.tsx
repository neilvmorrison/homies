"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LISTING_STATUS } from "@prisma/client";

const filterNames = {
  [LISTING_STATUS.ARCHIVED]: "Archived",
  [LISTING_STATUS.UPCOMING]: "Upcoming",
  [LISTING_STATUS.IMMEDIATE]: "Immediate",
  [LISTING_STATUS.LEASED]: "Leased",
  [LISTING_STATUS.PENDING]: "Offer Pending",
};

export function MainPageFilters({
  onChange,
}: {
  onChange: (value: LISTING_STATUS) => void;
}) {
  return (
    <Select onValueChange={onChange}>
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
