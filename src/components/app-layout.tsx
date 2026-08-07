import { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation } from '@tanstack/react-router'
import { Github, Moon, Palette, PanelLeft, Search, Sun } from 'lucide-react'
import { stories } from '@/stories/registry'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
const STYLE_KEY = 'ui-docs-style'

const styles = [
  { value: 'mono', label: 'Mono' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'orchid', label: 'Orchid' },
] as const

type Style = (typeof styles)[number]['value']

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

function readInitialStyle(): Style {
  if (typeof window === 'undefined') return 'mono'
  const stored = localStorage.getItem(STYLE_KEY)
  return styles.some((style) => style.value === stored) ? (stored as Style) : 'mono'
}

function applyStyle(style: Style) {
  document.documentElement.dataset.style = style
}

function AppSidebar({
  query,
  setQuery,
  filtered,
  pathname,
  dark,
  setDark,
  style,
  setStyle,
}: {
  query: string
  setQuery: (query: string) => void
  filtered: typeof stories
  pathname: string
  dark: boolean
  setDark: (value: boolean | ((value: boolean) => boolean)) => void
  style: Style
  setStyle: (style: Style) => void
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
                ui.amarjay
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
        <div className="mb-2 space-y-1 px-1 group-data-[collapsible=icon]:hidden">
          <label className="flex items-center gap-2 text-xs text-muted-foreground" htmlFor="app-style">
            <Palette className="size-3.5" />
            Style
          </label>
          <Select value={style} onValueChange={(value) => setStyle(value as Style)}>
            <SelectTrigger id="app-style" className="w-full">
              <SelectValue placeholder="Choose a style" />
            </SelectTrigger>
            <SelectContent position="popper" align="start">
              {styles.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
  const [style, setStyle] = useState<Style>(readInitialStyle)
  const pathname = useLocation({ select: (location) => location.pathname })

  useEffect(() => {
    applyDarkClass(dark)
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    applyStyle(style)
    localStorage.setItem(STYLE_KEY, style)
  }, [style])

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
        style={style}
        setStyle={setStyle}
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
