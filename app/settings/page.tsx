import { Globe, ArrowUpRight, Star } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { cn } from "@/lib/utils"

const domains = [
  { name: "roblox.com.ml", rating: 5, reviews: "67" },
  { name: "robiox.com.py", rating: 5, reviews: "5.0" },
]

export default function SettingsPage() {
  return (
    <DashboardShell breadcrumb="Settings">
      <div className="mx-auto max-w-3xl pt-8 sm:pt-16">
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-neutral-500">
            GET STARTED
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold text-neutral-50 sm:text-4xl">
            Choose a domain
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {domains.map((d) => (
            <DomainCard key={d.name} {...d} />
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}

function DomainCard({
  name,
  rating,
  reviews,
}: {
  name: string
  rating: number
  reviews: string
}) {
  return (
    <div className="group flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]">
      <div className="flex size-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-neutral-300">
        <Globe className="size-5" strokeWidth={1.75} />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-neutral-50">{name}</h2>

      <div className="mt-2 flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5",
                i < rating
                  ? "fill-red-500 text-red-500"
                  : "fill-neutral-700 text-neutral-700",
              )}
            />
          ))}
        </div>
        <span className="text-xs text-neutral-500">{reviews}</span>
      </div>

      <div className="mt-5 border-t border-white/[0.06] pt-4">
        <button
          type="button"
          className="flex w-full items-center justify-between text-sm text-neutral-300 transition-colors hover:text-neutral-50"
        >
          <span>Select domain</span>
          <ArrowUpRight className="size-4 text-neutral-500 transition-colors group-hover:text-neutral-300" />
        </button>
      </div>
    </div>
  )
}
