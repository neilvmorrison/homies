import { Button, Menu, Text } from "@mantine/core";
import { useAuthenticationContext } from "@/contexts/Authentication.context";

function UnauthenticatedMenu() {
  const { loginUser } = useAuthenticationContext();

  const handleClick = async () => {
    await loginUser();
  };

  return (
    <>
      <Button variant="subtle" fullWidth onClick={handleClick}>
        Sign in
      </Button>
    </>
  );
}

export default UnauthenticatedMenu;
