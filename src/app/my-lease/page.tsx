import UserTile from '@/components/UserTile'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { formatName } from '@/lib/formatters'
import { getAuthenticatedUserProfile } from '@/lib/profiles'
import Link from 'next/link'

// manage lease here
// add action-item
// pay rent (see if can be automated)
// message LL directly
// give notice

const leaseOptions = [
  {
    href: '/',
    text: 'Lease Details',
    Icon: Icons.apple,
  },
  {
    href: '/',
    text: 'Request maintenance',
  },
  {
    href: '/',
    text: 'Payment History',
  },
  {
    href: '/',
    text: 'Settings',
  },
]

export default async function MyLeasePage() {
  const authUser = await getAuthenticatedUserProfile()
  if (!authUser) return null

  const { nameString, initials } = formatName(
    authUser?.givenName,
    authUser?.familyName
  )
  return (
    <div className="grid gap-[64px] mt-4 grid-cols-4 min-h-full">
      <div className="col-span-1">
        <Card>
          <CardHeader>
            <h1 className="text-lg font-bold mb-3">Manage Lease</h1>
            <div className="mb-3">
              <UserTile
                src={authUser?.avatar || ''}
                name="Listing Title"
                initials={initials}
                subtitle="24 Sussex Avenue, Ottawa, Ontario, Canada"
              />
            </div>
            <CardDescription>
              This is where you can manage the details of your lease
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            {leaseOptions.map((opt) => {
              const { Icon } = opt
              return (
                <Button
                  asChild
                  variant="ghost"
                  key={opt.href}
                  className="w-full block"
                >
                  <div>
                    <Link href={opt.href}>{opt.text}</Link>
                  </div>
                </Button>
              )
            })}
          </CardContent>
          <CardFooter>
            <Button variant="destructive" className="w-full">
              Give Notice
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="col-span-3">Main Content</div>
    </div>
  )
}
