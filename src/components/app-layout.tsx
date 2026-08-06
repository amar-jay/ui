import { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation } from '@tanstack/react-router'
import { Github, Moon, PanelLeft, Search, Sun } from 'lucide-react'
import { stories } from '@/stories/registry'
import { Input } from '@/components/ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'

const THEME_KEY = 'ui-docs-theme'

function readInitialDark() {
  if (typeof document === 'undefined') return false
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'dark') return true
  if (stored === 'light') return false
  return (
    document.documentElement.classList.contains('dark') ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

function applyDarkClass(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
}

function AppSidebar({
  query,
  setQuery,
  filtered,
  pathname,
  dark,
  setDark,
}: {
  query: string
  setQuery: (query: string) => void
  filtered: typeof stories
  pathname: string
  dark: boolean
  setDark: (value: boolean | ((value: boolean) => boolean)) => void
}) {
  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="gap-3 border-b border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Toggle sidebar"
              onClick={toggleSidebar}
            >
              <PanelLeft />
              <span className="font-heading text-sm font-semibold tracking-tight">
                Component Docs
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="relative px-1 group-data-[collapsible=icon]:hidden">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components…"
            className="h-8 bg-background pl-8 text-xs"
            aria-label="Search components"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            {filtered.length === 0 ? (
              <p className="px-2 py-6 text-center text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
                No components match “{query}”.
              </p>
            ) : (
              <SidebarMenu>
                {filtered.map((story) => {
                  const Icon = story.icon
                  return (
                    <SidebarMenuItem key={story.slug}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/components/${story.slug}`}
                        tooltip={story.title}
                      >
                        <Link
                          to="/components/$component"
                          params={{ component: story.slug }}
                          onClick={() => setQuery('')}
                        >
                          <Icon />
                          <span>{story.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setDark((value) => !value)}
            >
              {dark ? <Sun /> : <Moon />}
              <span>{dark ? 'Light mode' : 'Dark mode'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="GitHub">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Github />
                <span>GitHub</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export function AppLayout() {
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(readInitialDark)
  const pathname = useLocation({ select: (location) => location.pathname })

  useEffect(() => {
    applyDarkClass(dark)
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
  }, [dark])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return stories
    return stories.filter(
      (story) =>
        story.title.toLowerCase().includes(q) ||
        story.slug.toLowerCase().includes(q) ||
        story.description.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <SidebarProvider>
      <AppSidebar
        query={query}
        setQuery={setQuery}
        filtered={filtered}
        pathname={pathname}
        dark={dark}
        setDark={setDark}
      />

      <SidebarInset className="min-w-0 bg-background">
        <SidebarTrigger className="fixed left-3 top-3 z-40 md:hidden" />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
