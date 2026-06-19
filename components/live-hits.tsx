import { Zap } from "lucide-react"

export function LiveHits() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-100">
          <Zap className="size-4 text-neutral-400" strokeWidth={2} />
          Live Hits
        </h2>

        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-neutral-300 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-neutral-200" />
          </span>
          Live
        </span>
      </div>

      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-neutral-600">No live hits yet</p>
      </div>
    </section>
  )
}
