"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, User, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/stats", label: "Accounts", icon: User, badge: "0" },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="flex h-full flex-col items-center justify-center gap-3"
    >
      {items.map((item) => {
        const active = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "relative flex size-11 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-neutral-400 transition-colors hover:bg-white/[0.08] hover:text-neutral-100",
              active && "bg-white/[0.1] text-neutral-100",
            )}
          >
            <Icon className="size-[18px]" strokeWidth={1.75} />
            {item.badge && (
              <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-neutral-100 px-1 text-[10px] font-medium leading-4 text-neutral-900">
                {item.badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
