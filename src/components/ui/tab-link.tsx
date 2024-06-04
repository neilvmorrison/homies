'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface ITabLink {
  href: string
  children: ReactNode | string
  className?: string
}

export default function TabLink({
  href,
  children,
  className: customClassName,
}: ITabLink) {
  const path = usePathname()
  const active = path === href
  return (
    <Link
      href={href}
      className={cn(
        active && 'bg-slate-100',
        'hover:bg-slate-100',
        customClassName
      )}
    >
      {children}
    </Link>
  )
}
