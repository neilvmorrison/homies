import { useRouter } from "next/router";
import { Text } from "@mantine/core";

function ListingDetail() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Text>This is listing {id}</Text>
    </div>
  );
}

export default ListingDetail;
