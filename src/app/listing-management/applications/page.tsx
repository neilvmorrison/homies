import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/components/ui/icons'
import { getApplicationsByOwner } from '@/lib/applications'
import { formatName } from '@/lib/formatters'
import { protectRoute } from '@/utils/protect-route'

export default async function LandlordApplications() {
  const authUser = await protectRoute('/404')
  const applications = await getApplicationsByOwner(authUser.id)

  return (
    <div>
      <h1>Applications</h1>
      {applications.map((app) => {
        const formattedTenants = app.tenants.map((tenant) => {
          const { nameString, initials } = formatName(
            tenant.givenName,
            tenant.familyName
          )
          return {
            id: tenant.id,
            nameString,
            initials,
            src: tenant.avatar,
            rating: tenant.rating,
          }
        })
        return (
          <div key={app.id} className="flex gap-4 my-3 border rounded p-4">
            <div>
              {formattedTenants.map((tenant) => {
                return (
                  <div
                    key={tenant.id}
                    className="flex flex-col items-center gap-2"
                  >
                    <Avatar>
                      <AvatarImage
                        src={tenant.avatar}
                        alt={tenant.nameString}
                      />
                      <AvatarFallback>{tenant.initials}</AvatarFallback>
                    </Avatar>
                    <p className="text-xs">
                      {tenant.rating ? (
                        <span className="flex items-center gap-2">
                          <Icons.ratingStarFilled className="fill-yellow-500" />
                          {tenant.rating}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Icons.ratingStarOutline className="fill-slate-300 stroke-slate-300" />
                          {'-'}
                        </span>
                      )}
                    </p>
                  </div>
                )
              })}
            </div>
            {app.listing.title}
          </div>
        )
      })}
    </div>
  )
}
