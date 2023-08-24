import { APP_NAME } from "@/constants/appName";
import { Text, Box, Center } from "@mantine/core";

function Footer() {
  return (
    <Box component="footer" p="xl" bg="gray.1">
      <Center>
        <Text>&copy; 2023 {APP_NAME} Inc.</Text>
      </Center>
    </Box>
  );
}

export default Footer;
