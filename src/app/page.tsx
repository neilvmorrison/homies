import { useEffect, useMemo, useState } from "react";
import ListingCard from "@/components/ListingCard";
import MainPageFilters from "@/components/MainPageFilters";
import { fetchFilteredListings } from "./actions";
import { LISTING_STATUS } from "@prisma/client";
import { SListingWithAddress } from "@/lib/listings";

type HomeProps = {
  params?: {
    num?: string;
  };
  searchParams?: {
    status?: LISTING_STATUS;
  };
};

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | LISTING_STATUS } }) {
  const listings = await fetchFilteredListings({ status: searchParams.status as LISTING_STATUS || LISTING_STATUS.IMMEDIATE })

  return (
    <main className="mx-24 my-12">
      <MainPageFilters />
      <section className="grid grid-cols-4 gap-6 mt-4">
        {listings.map((listing) => {
          return <ListingCard key={listing.id} listing={listing} />;
        })}
      </section>
    </main>
  );
}
