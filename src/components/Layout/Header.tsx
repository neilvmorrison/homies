import {
  Flex,
  Header as MantineHeader,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useRouter } from "next/router";
import { APP_NAME } from "../../constants/appName";
import NavigationMenu from "./NavigationMenu";

function Header() {
  const { push } = useRouter();
  const handleNavigate = (url: string) => push(url);
  return (
    <MantineHeader height={50} px="lg">
      <Flex align="center" mih={50} justify="space-between">
        <UnstyledButton component="a" onClick={() => handleNavigate("/")}>
          <Text fw={900} c="blue" tt="uppercase" fz="xl">
            {APP_NAME}
          </Text>
        </UnstyledButton>
        <NavigationMenu />
      </Flex>
    </MantineHeader>
  );
}

export default Header;
