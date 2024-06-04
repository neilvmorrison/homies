import ManagementTile from '@/components/ManagementTile'
import Indicator from '@/components/ui/indicator'

const tiles = [
  {
    title: 'Outstanding Rent',
    value: '$405.89',
    description: 'Across 4 listings',
  },
  {
    title: 'Tasks',
    value: 4,
    description: 'Across 3 listings',
  },
  {
    title: 'Lease Applications',
    value: 1,
    description: '325 Front Street West, Toronto, Ontario, M4Y 3B8',
  },
]

export default function ListingManagement() {
  return (
    <div>
      <section className="grid grid-cols-3 gap-4">
        {tiles.map((tile) => (
          <ManagementTile
            key={tile.value}
            value={tile.value}
            title={tile.title}
            description={tile.description}
          />
        ))}
      </section>
      <section></section>
    </div>
  )
}
