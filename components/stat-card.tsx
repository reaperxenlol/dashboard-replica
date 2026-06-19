import { Cookie } from "lucide-react"

function RobuxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

// Heights (in %) for the mini bar chart — increasing trend like the reference.
const barPattern = [22, 30, 26, 46, 34, 30, 52, 44, 70, 58, 48]

export function StatCard({
  label,
  value,
  withRobux = false,
}: {
  label: string
  value: string
  withRobux?: boolean
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          {label}
        </span>
        <span className="flex size-9 items-center justify-center rounded-xl bg-white/[0.04] text-neutral-500">
          <Cookie className="size-4" strokeWidth={1.75} />
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {withRobux && <RobuxIcon className="size-6 text-neutral-100" />}
        <span className="text-4xl font-bold leading-none text-neutral-50">{value}</span>
      </div>

      <div className="mt-5 flex h-12 items-end gap-1.5">
        {barPattern.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-neutral-600/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}
