import { useAuthenticationContext } from "@/contexts/Authentication.context";
import { Button, Menu } from "@mantine/core";
import { IconUser, IconClipboardList, IconHeart } from "@tabler/icons-react";
import NavigationLink from "./components/NavLink";

function AuthenticatedMenu() {
  const { logoutUser } = useAuthenticationContext();
  return (
    <>
      <NavigationLink
        label="Profile"
        href="/profile/@me"
        icon={<IconUser size="1rem" />}
      />
      <NavigationLink
        label="Applications"
        href="/applications"
        icon={<IconClipboardList size="1rem" />}
      />
      <NavigationLink
        label="Favorites"
        href="/favorites"
        icon={<IconHeart size="1rem" />}
      />
      <Menu.Divider />
      <Button color="red" variant="subtle" fullWidth onClick={logoutUser}>
        Sign out
      </Button>
    </>
  );
}

export default AuthenticatedMenu;
