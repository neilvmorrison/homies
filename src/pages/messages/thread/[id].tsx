import { useRouter } from "next/router";
import { Text } from "@mantine/core";

function MessageThread() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Text>This is message thread {id}</Text>
    </div>
  );
}

export default MessageThread;
