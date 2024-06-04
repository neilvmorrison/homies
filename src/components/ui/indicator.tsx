import { ReactNode } from 'react'

export default function Indicator({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <span className="absolute bottom-full right-1 flex">
        <span className="animate-ping absolute h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
        <span className="absolute rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
    </div>
  )
}
