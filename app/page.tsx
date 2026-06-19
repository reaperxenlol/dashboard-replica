import { Sidebar } from "@/components/sidebar"
import { StatCard } from "@/components/stat-card"
import { WeeklyChart } from "@/components/weekly-chart"
import { Leaderboard } from "@/components/leaderboard"
import { LiveHits } from "@/components/live-hits"
import { Starfield } from "@/components/starfield"

const stats = [
  { label: "Accounts", value: "9" },
  { label: "Visits", value: "79" },
  { label: "Robux", value: "0", withRobux: true },
  { label: "RAP", value: "0", withRobux: true },
  { label: "Summary", value: "0", withRobux: true },
]

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-neutral-200">
      <Starfield />

      <div className="relative flex min-h-screen">
        {/* Sidebar: collapses to a bottom bar feel is overkill; keep slim and sticky */}
        <aside className="sticky top-0 hidden h-screen sm:block">
          <Sidebar />
        </aside>

        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {stats.map((s) => (
              <StatCard
                key={s.label}
                label={s.label}
                value={s.value}
                withRobux={s.withRobux}
              />
            ))}
          </div>

          {/* Chart + Leaderboard */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <WeeklyChart />
            </div>
            <div className="lg:col-span-1">
              <Leaderboard />
            </div>
          </div>

          {/* Live hits */}
          <div className="mt-4">
            <LiveHits />
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  )
}

import { LayoutGrid, Cookie, CircleDollarSign, Settings, Zap, LogOut } from "lucide-react"

function MobileNav() {
  const items = [
    { icon: LayoutGrid, label: "Dashboard", active: true },
    { icon: Cookie, label: "Cookies" },
    { icon: CircleDollarSign, label: "Currency" },
    { icon: Settings, label: "Settings" },
    { icon: Zap, label: "Hits" },
    { icon: LogOut, label: "Log out" },
  ]
  return (
    <nav
      aria-label="Primary mobile"
      className="sticky bottom-0 z-10 flex items-center justify-around border-t border-white/[0.06] bg-[#070707]/95 px-2 py-2 backdrop-blur sm:hidden"
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          aria-label={item.label}
          aria-current={item.active ? "page" : undefined}
          className={
            "flex size-10 items-center justify-center rounded-xl text-neutral-500 transition-colors hover:text-neutral-200 " +
            (item.active ? "bg-white/[0.07] text-neutral-100" : "")
          }
        >
          <item.icon className="size-5" strokeWidth={1.75} />
        </button>
      ))}
    </nav>
  )
}
