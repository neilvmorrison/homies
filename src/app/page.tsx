"use client";
import { useEffect, useMemo, useState } from "react";
import ListingCard from "@/components/ListingCard";
import { MainPageFilters } from "@/components/MainPageFilters";
import { fetchFilteredListings } from "./actions";
import { LISTING_STATUS, Listing } from "@prisma/client";
import { ListingWithAddressAndPrice } from "@/lib/listings";

export default function Home() {
  const [listings, setListings] = useState<ListingWithAddressAndPrice[]>([]);
  const [status, setStatus] = useState<LISTING_STATUS>(
    LISTING_STATUS.IMMEDIATE
  );
  const activeFilterState = useMemo(
    () => ({
      status,
    }),
    [status]
  );

  useEffect(() => {
    async function hydrate() {
      const listings = await fetchFilteredListings(activeFilterState);
      setListings(listings);
    }
    hydrate();
  }, [activeFilterState]);

  return (
    <main className="mx-24 my-12">
      <MainPageFilters
        onChange={(status: LISTING_STATUS) => setStatus(status)}
      />
      <section className="grid grid-cols-4 gap-6 mt-4">
        {listings.map((listing) => {
          return <ListingCard key={listing.id} listing={listing} />;
        })}
      </section>
    </main>
  );
}
