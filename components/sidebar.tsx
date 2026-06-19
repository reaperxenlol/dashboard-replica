"use client"

import { LayoutGrid, Cookie, CircleDollarSign, Settings, Zap, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const topItems = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: Cookie, label: "Cookies" },
  { icon: CircleDollarSign, label: "Currency" },
  { icon: Settings, label: "Settings" },
  { icon: Zap, label: "Hits 1" },
  { icon: Zap, label: "Hits 2" },
  { icon: Zap, label: "Hits 3" },
  { icon: Zap, label: "Hits 4" },
]

export function Sidebar() {
  return (
    <nav
      aria-label="Primary"
      className="flex w-16 shrink-0 flex-col items-center gap-2 py-4"
    >
      <div className="flex flex-1 flex-col items-center gap-1.5">
        {topItems.map((item, i) => (
          <SidebarButton key={i} icon={item.icon} label={item.label} active={item.active} />
        ))}
      </div>

      <div className="mt-2 h-px w-7 bg-white/10" />

      <SidebarButton icon={LogOut} label="Log out" />
    </nav>
  )
}

function SidebarButton({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ElementType
  label: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-2xl text-neutral-500 transition-colors hover:bg-white/5 hover:text-neutral-200",
        active && "bg-white/[0.07] text-neutral-100",
      )}
    >
      {active && (
        <span className="absolute -right-3 h-5 w-1 rounded-full bg-neutral-200" />
      )}
      <Icon className="size-5" strokeWidth={1.75} />
    </button>
  )
}
