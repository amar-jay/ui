import { createContext, useContext, useState } from 'react'
import { Link, Outlet, useLocation } from '@tanstack/react-router'
import { Circle, Code2, Component, Github, Layers2, Moon, Search, Sparkles, Sun } from 'lucide-react'
import { components, groups } from '@/lib/component-catalog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

type ExplorerContextValue = { query: string; setQuery: (query: string) => void }
const ExplorerContext = createContext<ExplorerContextValue | null>(null)

export function useExplorer() {
  const context = useContext(ExplorerContext)
  if (!context) throw new Error('useExplorer must be used inside AppLayout')
  return context
}

export function AppLayout() {
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(false)
  const pathname = useLocation({ select: (location) => location.pathname })

  return <ExplorerContext.Provider value={{ query, setQuery }}>
    <div className={dark ? 'dark' : undefined}>
      <SidebarProvider>
        <Sidebar collapsible="icon" className="border-r bg-background">
          <SidebarHeader className="h-14 border-b px-3">
            <div className="flex items-center gap-2 px-1"><div className="grid size-7 place-items-center rounded-md bg-foreground text-background"><Layers2 className="size-4" /></div><span className="font-heading text-sm font-semibold group-data-[collapsible=icon]:hidden">ui.workbench</span></div>
          </SidebarHeader>
          <SidebarContent className="px-2 py-3">
            <SidebarGroup><SidebarGroupLabel>Explore</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
              <SidebarMenuItem><SidebarMenuButton isActive><Component /><span>Components</span><Badge className="ml-auto group-data-[collapsible=icon]:hidden" variant="secondary">{components.length}</Badge></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton><Sparkles /><span>Templates</span></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton><Code2 /><span>Registry</span></SidebarMenuButton></SidebarMenuItem>
            </SidebarMenu></SidebarGroupContent></SidebarGroup>
            {groups.map((group) => {
              const items = components.filter((item) => item.group === group)
              if (!items.length) return null
              return <SidebarGroup key={group} className="py-1"><SidebarGroupLabel>{group}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{items.map((item) => { const slug = item.name.toLowerCase().replaceAll(' ', '-'); return <SidebarMenuItem key={item.name}><SidebarMenuButton asChild isActive={pathname === `/components/${slug}`}><Link to="/components/$component" params={{ component: slug }} onClick={() => setQuery('')}><Circle className="size-2 fill-current" /><span>{item.name}</span></Link></SidebarMenuButton></SidebarMenuItem> })}</SidebarMenu></SidebarGroupContent></SidebarGroup>
            })}
          </SidebarContent>
          <SidebarFooter className="border-t p-2"><SidebarMenu><SidebarMenuItem><SidebarMenuButton><Github /><span>GitHub</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarFooter>
        </Sidebar>
        <SidebarInset className="min-w-0 bg-background">
          <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="relative max-w-md flex-1"><Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search components…" className="pl-7" /></div>
            <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Toggle color mode">{dark ? <Sun /> : <Moon />}</Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex"><Github /> GitHub</Button>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto"><Outlet /></div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </ExplorerContext.Provider>
}
