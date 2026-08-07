"use client"

import * as React from "react"
import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  Video,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"

const navigation = [
  { name: "Notifications", icon: Bell },
  { name: "Navigation", icon: Menu },
  { name: "Home", icon: Home },
  { name: "Appearance", icon: Paintbrush },
  { name: "Messages & media", icon: MessageCircle },
  { name: "Language & region", icon: Globe },
  { name: "Accessibility", icon: Keyboard },
  { name: "Mark as read", icon: Check },
  { name: "Audio & video", icon: Video },
  { name: "Connected accounts", icon: Link },
  { name: "Privacy & visibility", icon: Lock },
  { name: "Advanced", icon: Settings },
]

export function SettingsDialog() {
  const [open, setOpen] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState("Messages & media")
  const [readReceipts, setReadReceipts] = React.useState(true)
  const [linkPreviews, setLinkPreviews] = React.useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Open settings</Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">Customize your settings here.</DialogDescription>
        <SidebarProvider className="min-h-0 items-start">
          <Sidebar collapsible="none" className="hidden w-52 border-r md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navigation.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.name === activeItem}
                          onClick={() => setActiveItem(item.name)}
                        >
                          <item.icon />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[440px] min-w-0 flex-1 flex-col overflow-hidden">
            <header className="flex h-14 shrink-0 items-center border-b px-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{activeItem}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
              <div>
                <h3 className="text-sm font-medium">Messages & media</h3>
                <p className="mt-1 text-xs text-muted-foreground">Control how conversations and shared content behave.</p>
              </div>
              <SettingRow title="Read receipts" description="Let others know when you have read their messages." checked={readReceipts} onCheckedChange={setReadReceipts} />
              <SettingRow title="Link previews" description="Show a preview when someone sends a supported link." checked={linkPreviews} onCheckedChange={setLinkPreviews} />
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm font-medium">Media quality</p>
                <p className="mt-1 text-xs text-muted-foreground">Photos and videos are sent in high quality on Wi-Fi.</p>
                <Button variant="outline" size="sm" className="mt-3">Manage uploads</Button>
              </div>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

function SettingRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={title} />
    </div>
  )
}
