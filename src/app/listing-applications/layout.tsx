import { ReactNode } from 'react'

function ListingApplicationsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">Test</div>
      <div className="col-span-3">{children}</div>
    </div>
  )
}

export default ListingApplicationsLayout
