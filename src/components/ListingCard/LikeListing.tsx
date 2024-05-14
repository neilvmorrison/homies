"use client";
import { HeartIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface ILikeListingProps {
  listingId: string;
  userProfileId: string;
  isLiked?: boolean;
}

function LikeListing({
  listingId,
  userProfileId,
  isLiked = false,
}: ILikeListingProps) {
  const handleClick = () => {
    alert(`${listingId} ${userProfileId}`);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      className="border-none z-10"
    >
      <HeartIcon className="h-4 w-4" />
    </Button>
  );
}

export default LikeListing;
