"use client"

import { useState } from "react"
import {
  Filter,
  IdCard,
  Clock,
  CircleDollarSign,
  TrendingUp,
  User,
  Activity,
  ShieldCheck,
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { cn } from "@/lib/utils"

const filters = [
  { label: "All", icon: Filter },
  { label: "Username", icon: IdCard },
  { label: "Recent", icon: Clock },
  { label: "Balance", icon: CircleDollarSign },
  { label: "RAP", icon: TrendingUp },
  { label: "Summary", icon: TrendingUp },
]

const columns = [
  { label: "USER", icon: User },
  { label: "VALUE", icon: Activity },
  { label: "COOKIE", icon: ShieldCheck },
  { label: "PASSWORD", icon: null },
]

export default function StatsPage() {
  const [active, setActive] = useState("All")

  return (
    <DashboardShell breadcrumb="Stats">
      {/* Header row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-neutral-400">
          Loaded <span className="font-semibold text-neutral-100">0</span> of 0
          account(s)
        </p>

        <div className="-mx-1 flex items-center gap-1 overflow-x-auto px-1 pb-1">
          {filters.map((f) => {
            const Icon = f.icon
            const isActive = active === f.label
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => setActive(f.label)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-white/[0.1] text-neutral-100"
                    : "text-neutral-500 hover:text-neutral-200",
                )}
              >
                <Icon className="size-3.5" strokeWidth={1.75} />
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {columns.map((c) => (
                  <th
                    key={c.label}
                    className="px-5 py-3 text-left text-xs font-medium tracking-wide text-neutral-500"
                  >
                    <span className="flex items-center gap-1.5">
                      {c.label}
                      {c.icon && (
                        <c.icon className="size-3 text-neutral-600" strokeWidth={1.75} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={columns.length} className="h-72 text-center">
                  <span className="text-sm text-neutral-500">No results.</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / pagination */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-500">No accounts to display.</p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-400">
            Page <span className="font-semibold text-neutral-100">1</span> of 1
          </span>
          <button
            type="button"
            disabled
            className="rounded-lg border border-white/[0.07] px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            disabled
            className="rounded-lg border border-white/[0.07] px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardShell>
  )
}
