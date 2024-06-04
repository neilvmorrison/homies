import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="max-w-xl mx-auto">{children}</div>
}
