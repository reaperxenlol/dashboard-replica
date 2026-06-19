import { StatCard } from "@/components/stat-card"
import { WeeklyChart } from "@/components/weekly-chart"
import { Leaderboard } from "@/components/leaderboard"
import { LiveHits } from "@/components/live-hits"
import { DashboardShell } from "@/components/dashboard-shell"

const stats = [
  { label: "Accounts", value: "9" },
  { label: "Visits", value: "79" },
  { label: "Robux", value: "0", withRobux: true },
  { label: "RAP", value: "0", withRobux: true },
  { label: "Summary", value: "0", withRobux: true },
]

export default function Page() {
  return (
    <DashboardShell>
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
    </DashboardShell>
  )
}
