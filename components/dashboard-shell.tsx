"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Moon } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { Starfield } from "@/components/starfield"
import { cn } from "@/lib/utils"

export function DashboardShell({
  breadcrumb,
  children,
}: {
  breadcrumb?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070707] text-neutral-200">
      <Starfield />

      {/* Top header */}
      <header className="relative z-30 flex items-center justify-between px-4 py-4 sm:px-6">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex size-9 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-neutral-300 transition-colors hover:bg-white/[0.08] sm:hidden"
        >
          <Menu className="size-5" strokeWidth={1.75} />
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Profile"
            className="size-9 overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.06]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/diverse-avatars.png"
              alt="Profile"
              className="size-full object-cover"
            />
          </button>
          <button
            type="button"
            aria-label="Toggle theme"
            className="flex size-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.06] text-neutral-300 transition-colors hover:bg-white/[0.1]"
          >
            <Moon className="size-[18px]" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      {/* Desktop sidebar (fixed, vertically centered rail) */}
      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-16 sm:flex">
        <AppSidebar />
      </aside>

      {/* Mobile sidebar drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 sm:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute left-0 top-0 flex h-full w-20 flex-col border-r border-white/[0.06] bg-[#0b0b0b] transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex justify-end p-3">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex size-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/[0.08] hover:text-neutral-100"
            >
              <X className="size-4" strokeWidth={2} />
            </button>
          </div>
          <div className="flex-1">
            <AppSidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 px-4 pb-16 sm:pl-20 sm:pr-6 lg:pr-8">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-4 text-sm">
            <ol className="flex items-center gap-1.5 text-neutral-500">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-neutral-300"
                >
                  Dashboard
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-600">
                {"›"}
              </li>
              <li className="font-medium text-neutral-100">{breadcrumb}</li>
            </ol>
          </nav>
        )}

        {children}
      </main>
    </div>
  )
}
