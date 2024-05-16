import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { getUserProfile } from "@/lib/profiles";
import { USER_ROLES } from "@prisma/client";
import { APPNAME } from "@/lib/consts";

const unauthenticatedItems = [
  {
    text: 'Log in',
    href: '/login',
  },
  {
    text: 'Sign up',
    href: '/signup',
  },
];

const tenantMenuItems = [
  {
    text: 'Profile',
    href: '/profile',
  },
  {
    text: 'Messages',
    href: '/messages',
  },
  {
    text: 'Favorites',
    href: '/favorites',
  },
  {
    text: 'Applications',
    href: '/applications',
  },
];

const landlordMenuItems = [
  {
    text: 'Profile',
    href: '/profile',
  },
  {
    text: 'Messages',
    href: '/messages',
  },
  {
    text: 'Listings',
    href: '/listings',
  },
  {
    text: 'Applications',
    href: '/applications',
  },
  {
    text: 'Management',
    href: '/management',
  },
];

function UnauthMenu() {
  return (
    <>
      {unauthenticatedItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <DropdownMenuItem className="cursor-pointer">
            {item.text}
          </DropdownMenuItem>
        </Link>
      ))}
      <DropdownMenuSeparator />
      <Link href="/about">
        <DropdownMenuItem className="cursor-pointer">
          About
        </DropdownMenuItem>
      </Link>
      <Link href="/policies">
        <DropdownMenuItem className="cursor-pointer">
          Privacy policies
        </DropdownMenuItem>
      </Link>
    </>
  )
}

export default async function UserNav() {
  const userProfile = await getUserProfile();
  const authLinks = userProfile?.role === USER_ROLES.TENANT ? tenantMenuItems : landlordMenuItems;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>{!userProfile ? '?' : `${userProfile?.givenName[0]}${userProfile?.familyName[0]}`}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {!userProfile && <UnauthMenu />}
        {userProfile && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userProfile.givenName} {userProfile.familyName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userProfile?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {authLinks.map((link) => {
                return (
                  <Link key={link.href} href={link.href}>
                    <DropdownMenuItem>
                      {link.text}
                    </DropdownMenuItem>
                  </Link>
                )
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/get-started">
                <DropdownMenuItem>
                  I want to list my Property
                </DropdownMenuItem>
              </Link>
              <Link href="/learn-more">
                <DropdownMenuItem>
                  What is {APPNAME}?
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuItem>
              <Button variant="destructive" className="w-full">
                Log out
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}