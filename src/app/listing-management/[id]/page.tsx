import ManagementTile from '@/components/ManagementTile'
import { formatListingAddress } from '@/lib/formatters'
import { fetchListingById } from '@/lib/listings/detail'
import { redirect } from 'next/navigation'

export default async function ListingManagementDetail({
  params,
}: {
  params: { id: string }
}) {
  const listing = await fetchListingById(params.id)
  if (!listing) redirect('/404')
  const { addressString } = formatListingAddress(listing.address)
  return (
    <div>
      <section className="mb-4">
        <h1 className="text-2xl font-bold">{listing.title}</h1>
        <p className="">{addressString}</p>
      </section>
      <section className="grid grid-cols-3 gap-4">
        <ManagementTile
          title="Rent Status"
          value="Current"
          description="No actions required"
        />
        <ManagementTile
          title="Maintenance Requests"
          value="0"
          description="All clear!"
        />
        <ManagementTile
          title="End-of-lease Date"
          value="12 December 2025"
          description="No actions required"
        />
      </section>
      <section></section>
    </div>
  )
}
