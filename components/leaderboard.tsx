import { Crown } from "lucide-react"

export function Leaderboard() {
  return (
    <section className="relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-100">
        <Crown className="size-4 text-neutral-400" strokeWidth={2} />
        Leaderboard
      </h2>

      <div className="flex flex-1 items-center justify-center py-16">
        <p className="text-sm text-neutral-600">No users yet</p>
      </div>
    </section>
  )
}
