import {
  Avatar,
  Menu as MantineMenu,
  Flex,
  Indicator,
  ActionIcon,
} from "@mantine/core";
import Link from "next/link";
import { IconMessage2, IconInbox } from "@tabler/icons-react";
import { useAuthenticationContext } from "@/contexts/Authentication.context";
import UnauthenticatedMenu from "./UnauthenticatedMenu";
import AuthenticatedMenu from "./AuthenticatedMenu";

function NavigationMenu() {
  const { isAuthenticated, userObject } = useAuthenticationContext();
  const avatarURL = userObject?.auth.currentUser.photoURL || null;
  return (
    <Flex gap="sm">
      <Indicator processing disabled>
        <ActionIcon component={Link} href={"/applications"}>
          <IconInbox />
        </ActionIcon>
      </Indicator>
      <Indicator processing disabled>
        <ActionIcon component={Link} href={"/messages"}>
          <IconMessage2 />
        </ActionIcon>
      </Indicator>
      <MantineMenu shadow="md" width={200}>
        <MantineMenu.Target>
          <Avatar
            radius="xl"
            color="blue"
            size="sm"
            src={avatarURL}
            sx={{ cursor: "pointer" }}
          />
        </MantineMenu.Target>
        <MantineMenu.Dropdown>
          {isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
        </MantineMenu.Dropdown>
      </MantineMenu>
    </Flex>
  );
}

export default NavigationMenu;
