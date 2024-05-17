import RatingStar from '@/components/RatingStar'
import UserTile from '@/components/UserTile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { APPNAME } from '@/lib/consts'
import { formatInitials, formatName } from '@/lib/formatters'
import { getAuthenticatedUserProfile } from '@/lib/profiles'
import { createClient } from '@/utils/supabase/server'
import { NextPage } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode
}) {
  const profile = await getAuthenticatedUserProfile()
  if (!profile) return null
  const { nameString, initials } = formatName(
    profile?.givenName,
    profile?.familyName
  )
  return (
    <div className="mx-24 my-12">
      <div className="grid gap-[64px] mt-4 grid-cols-4">
        <div className="col-span-1">
          <UserTile
            src={profile?.avatar || ''}
            name={nameString}
            initials={initials}
            subtitle={profile.email}
            className="mb-8"
          />
          <h2 className="font-bold text-lg mb-3">Edit your profile</h2>
          <p className="mb-2">
            This is what others will see when they interact with you on{' '}
            {APPNAME}
          </p>
          <nav className="flex flex-col gap-4 mt-5">
            <Button variant="secondary" asChild>
              <Link href={'/profile/personal-information'}>
                Personal Information
              </Link>
            </Button>
            <Button variant="secondary">Renter&apos;s Application</Button>
            <Button variant="secondary" asChild>
              <Link href={'/profile/preferences'}>Preferences</Link>
            </Button>
            <Button variant="secondary">Payment History</Button>
            <Button variant="secondary">Notifications</Button>
            <Button variant="secondary">Messages</Button>
          </nav>
        </div>
        <main className="mt-4 col-span-3">{children}</main>
      </div>
    </div>
  )
}
