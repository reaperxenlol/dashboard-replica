"use client"

import { useState } from "react"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = ["Summary", "RAP", "Robux"] as const
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const yTicks = [4, 3, 2, 1, 0]

export function WeeklyChart() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Summary")

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-100">
          <Activity className="size-4 text-neutral-400" strokeWidth={2} />
          Weekly Chart
        </h2>

        <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                active === tab
                  ? "bg-white/[0.08] text-neutral-100"
                  : "text-neutral-500 hover:text-neutral-300",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <div className="flex w-4 flex-col justify-between py-1 text-[11px] text-neutral-600">
          {yTicks.map((t) => (
            <span key={t} className="leading-none">
              {t}
            </span>
          ))}
        </div>

        <div className="relative h-64 flex-1">
          <svg
            className="h-full w-full"
            viewBox="0 0 700 240"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {yTicks.map((_, i) => {
              const y = (i / (yTicks.length - 1)) * 232 + 4
              return (
                <line
                  key={i}
                  x1="0"
                  x2="700"
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  className="text-white/[0.04]"
                  strokeWidth="1"
                />
              )
            })}
            {/* Flat data line at the baseline (value 0) */}
            <line
              x1="4"
              x2="696"
              y1="236"
              y2="236"
              stroke="currentColor"
              className="text-neutral-200"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="ml-7 mt-3 flex justify-between text-[11px] text-neutral-600">
        {days.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </section>
  )
}
