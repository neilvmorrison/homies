"use client";
import TenantMenu from "./TenantMenu";
import LandlordMenu from "./LandlordMenu";
import UnauthenticatedMenu from "./UnathenticatedMenu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { NavigationMenuContent } from "@radix-ui/react-navigation-menu";

interface IUserMenuProps {
  user: any | null;
}

function UserMenu({ user }: IUserMenuProps) {
  if (!user) {
    return (
      <NavigationMenu>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuContent>
            <UnauthenticatedMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>
    );
  }
  return (
    <div>
      <NavigationMenu>
        <TenantMenu />
      </NavigationMenu>
    </div>
  );
}

export default UserMenu;
