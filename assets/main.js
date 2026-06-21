/* Dashboard shell + interactivity (vanilla JS) */

const NAV_ITEMS = [
  { href: "index.html", label: "Dashboard", icon: "layout-grid" },
  { href: "stats.html", label: "Accounts", icon: "user", badge: "0" },
  { href: "tools.html", label: "Tools", icon: "wrench" },
  { href: "settings.html", label: "Settings", icon: "settings" },
]

function normalize(name) {
  let file = name.substring(name.lastIndexOf("/") + 1)
  file = file.replace(/\.html$/, "")
  return file === "" ? "index" : file
}

function currentFile() {
  return normalize(window.location.pathname)
}

function navMarkup(onNavigate) {
  const active = currentFile()
  return NAV_ITEMS.map((item) => {
    const isActive = normalize(item.href) === active
    return `
      <a
        href="${item.href}"
        aria-label="${item.label}"
        ${isActive ? 'aria-current="page"' : ""}
        class="relative flex size-11 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-neutral-400 transition-colors hover:bg-white/[0.08] hover:text-neutral-100 ${
          isActive ? "bg-white/[0.1] text-neutral-100" : ""
        }"
      >
        <i data-lucide="${item.icon}" class="size-[18px]"></i>
        ${
          item.badge
            ? `<span class="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-neutral-100 px-1 text-[10px] font-medium leading-4 text-neutral-900">${item.badge}</span>`
            : ""
        }
      </a>`
  }).join("")
}

function breadcrumbMarkup(breadcrumb) {
  if (!breadcrumb) return ""
  return `
    <nav aria-label="Breadcrumb" class="mb-4 text-sm">
      <ol class="flex items-center gap-1.5 text-neutral-500">
        <li><a href="index.html" class="transition-colors hover:text-neutral-300">Dashboard</a></li>
        <li aria-hidden="true" class="text-neutral-600">&rsaquo;</li>
        <li class="font-medium text-neutral-100">${breadcrumb}</li>
      </ol>
    </nav>`
}

function buildShell() {
  const page = document.getElementById("page")
  if (!page) return
  const breadcrumb = page.dataset.breadcrumb || ""
  const content = page.innerHTML

  document.body.innerHTML = `
    <div class="relative min-h-screen overflow-hidden bg-[#070707] text-neutral-200">
      <div id="starfield" aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden"></div>

      <header class="relative z-30 flex items-center justify-between px-4 py-4 sm:px-6">
        <button type="button" aria-label="Open menu" id="open-menu"
          class="flex size-9 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-neutral-300 transition-colors hover:bg-white/[0.08] sm:hidden">
          <i data-lucide="menu" class="size-5"></i>
        </button>
        <div class="ml-auto flex items-center gap-2">
          <button type="button" aria-label="Profile"
            class="size-9 overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.06]">
            <img src="/public/diverse-avatars.png" alt="Profile" class="size-full object-cover" />
          </button>
          <button type="button" aria-label="Toggle theme"
            class="flex size-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.06] text-neutral-300 transition-colors hover:bg-white/[0.1]">
            <i data-lucide="moon" class="size-[18px]"></i>
          </button>
        </div>
      </header>

      <aside class="fixed left-0 top-0 z-20 hidden h-screen w-16 sm:flex">
        <nav aria-label="Primary" class="flex h-full w-full flex-col items-center justify-center gap-3">
          ${navMarkup()}
        </nav>
      </aside>

      <div id="drawer" class="fixed inset-0 z-40 sm:hidden pointer-events-none" aria-hidden="true">
        <div id="drawer-overlay" class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity"></div>
        <div id="drawer-panel" class="absolute left-0 top-0 flex h-full w-20 -translate-x-full flex-col border-r border-white/[0.06] bg-[#0b0b0b] transition-transform duration-300">
          <div class="flex justify-end p-3">
            <button type="button" aria-label="Close menu" id="close-menu"
              class="flex size-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/[0.08] hover:text-neutral-100">
              <i data-lucide="x" class="size-4"></i>
            </button>
          </div>
          <nav aria-label="Primary" class="flex flex-1 flex-col items-center justify-center gap-3">
            ${navMarkup()}
          </nav>
        </div>
      </div>

      <main class="relative z-10 px-4 pb-16 sm:pl-20 sm:pr-6 lg:pr-8">
        ${breadcrumbMarkup(breadcrumb)}
        ${content}
      </main>
    </div>`

  initStarfield()
  initDrawer()
  initWeeklyChart()
  initStatsFilters()
  initEditor()
  initToolTabs()

  if (window.lucide) window.lucide.createIcons()
}

function initToolTabs() {
  const tabs = document.querySelectorAll("[data-tooltab]")
  if (!tabs.length) return
  const panels = document.querySelectorAll("[data-toolpanel]")

  const activeClasses = ["bg-white/[0.9]", "text-neutral-900", "shadow"]
  const idleClasses = ["text-neutral-400"]

  const setActive = (name) => {
    tabs.forEach((t) => {
      const isActive = t.dataset.tooltab === name
      activeClasses.forEach((c) => t.classList.toggle(c, isActive))
      idleClasses.forEach((c) => t.classList.toggle(c, !isActive))
    })
    panels.forEach((p) => p.classList.toggle("hidden", p.dataset.toolpanel !== name))
  }

  tabs.forEach((t) => t.addEventListener("click", () => setActive(t.dataset.tooltab)))
  setActive("refresh")

  document.querySelectorAll("[data-toolpanel] form, form[data-toolform]").forEach((form) => {
    form.addEventListener("submit", (e) => e.preventDefault())
  })
}

function initEditor() {
  const tabs = document.querySelectorAll("[data-tab]")
  if (!tabs.length) return
  const panels = document.querySelectorAll("[data-panel]")

  // Set domain code badge (e.g. roblox.com.ml -> first two letters of label)
  const params = new URLSearchParams(window.location.search)
  const domain = params.get("domain")
  const codeEl = document.getElementById("domain-code")
  if (codeEl && domain) {
    codeEl.textContent = domain.slice(0, 2).toUpperCase()
  }

  const setActive = (name) => {
    tabs.forEach((t) => {
      const isActive = t.dataset.tab === name
      t.classList.toggle("text-neutral-50", isActive)
      t.classList.toggle("text-neutral-400", !isActive)
      // underline element
      let underline = t.querySelector("[data-underline]")
      if (isActive && !underline) {
        underline = document.createElement("span")
        underline.dataset.underline = "true"
        underline.className = "absolute -bottom-0.5 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full bg-red-500"
        t.appendChild(underline)
      } else if (!isActive && underline) {
        underline.remove()
      }
    })
    panels.forEach((p) => {
      p.classList.toggle("hidden", p.dataset.panel !== name)
    })
  }

  tabs.forEach((t) => t.addEventListener("click", () => setActive(t.dataset.tab)))
  setActive("profile")

  // Prevent form navigation on submit (static demo)
  document.querySelectorAll("[data-panel]").forEach((form) => {
    form.addEventListener("submit", (e) => e.preventDefault())
  })
}

function initStarfield(count = 60) {
  const container = document.getElementById("starfield")
  if (!container) return
  let html = ""
  for (let i = 0; i < count; i++) {
    const size = Math.random() < 0.85 ? 1 : 2
    const opacity = 0.15 + Math.random() * 0.45
    html += `<span class="absolute rounded-full bg-white" style="top:${Math.random() * 100}%;left:${
      Math.random() * 100
    }%;width:${size}px;height:${size}px;opacity:${opacity}"></span>`
  }
  container.innerHTML = html
}

function initDrawer() {
  const drawer = document.getElementById("drawer")
  const overlay = document.getElementById("drawer-overlay")
  const panel = document.getElementById("drawer-panel")
  const openBtn = document.getElementById("open-menu")
  const closeBtn = document.getElementById("close-menu")
  if (!drawer) return

  const open = () => {
    drawer.classList.remove("pointer-events-none")
    drawer.classList.add("pointer-events-auto")
    drawer.setAttribute("aria-hidden", "false")
    overlay.classList.replace("opacity-0", "opacity-100")
    panel.classList.replace("-translate-x-full", "translate-x-0")
  }
  const close = () => {
    drawer.classList.add("pointer-events-none")
    drawer.classList.remove("pointer-events-auto")
    drawer.setAttribute("aria-hidden", "true")
    overlay.classList.replace("opacity-100", "opacity-0")
    panel.classList.replace("translate-x-0", "-translate-x-full")
  }

  openBtn && openBtn.addEventListener("click", open)
  closeBtn && closeBtn.addEventListener("click", close)
  overlay && overlay.addEventListener("click", close)
}

function initWeeklyChart() {
  const tabs = document.querySelectorAll("[data-chart-tab]")
  if (!tabs.length) return
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("bg-white/[0.08]", "text-neutral-100")
        t.classList.add("text-neutral-500")
      })
      tab.classList.add("bg-white/[0.08]", "text-neutral-100")
      tab.classList.remove("text-neutral-500")
    })
  })
}

function initStatsFilters() {
  const filters = document.querySelectorAll("[data-filter]")
  if (!filters.length) return
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => {
        b.classList.remove("bg-white/[0.1]", "text-neutral-100")
        b.classList.add("text-neutral-500")
      })
      btn.classList.add("bg-white/[0.1]", "text-neutral-100")
      btn.classList.remove("text-neutral-500")
    })
  })
}

document.addEventListener("DOMContentLoaded", buildShell)
