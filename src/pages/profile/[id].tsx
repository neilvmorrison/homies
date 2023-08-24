import { useRouter } from "next/router";
import { Text } from "@mantine/core";

function ProfileDetail() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Text>This is profile {id}</Text>
    </div>
  );
}

export default ProfileDetail;
