import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import LikeListing from "./LikeListing";
import Link from "next/link";
import { ListingWithAddressAndPrice } from "@/lib/listings";

interface IListingCardProps {
  listing: ListingWithAddressAndPrice;
}

function ListingCard({ listing }: IListingCardProps) {
  return (
    <Card key={listing.id}>
      <AspectRatio className="mb-3">
        <Image
          alt={`${listing.title} image`}
          src={listing.thumbnail}
          fill
          className="rounded-t-md w-full bg-cover"
        />
      </AspectRatio>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-bold font-md">
            $ {Number(listing.currentPrice) || 2000}
          </h3>
          <LikeListing listingId={listing.id} userProfileId="" />
        </div>
        <Link href={`/listing/${listing.id}`}>
          <h2>{listing.title}</h2>
        </Link>
        <p className="text-gray-500 text-xs">
          {listing.address.civicNumber} {listing.address.streetName},{" "}
          {listing.address.city}, {listing.address.country}
        </p>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {listing.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default ListingCard;
