import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="max-w-[55vw] ml-[80px] mb-[200px]">{children}</div>
}
