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
  type LucideIcon,
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

type Setting = {
  key: string
  title: string
  description: string
  defaultValue: boolean
}

type SettingsSection = {
  name: string
  icon: LucideIcon
  description: string
  settings: Setting[]
}

const sections: SettingsSection[] = [
  { name: "Notifications", icon: Bell, description: "Choose how and when you receive updates.", settings: [{ key: "push-notifications", title: "Push notifications", description: "Receive notifications for new activity.", defaultValue: true }, { key: "email-summary", title: "Email summary", description: "Get a daily summary of unread activity.", defaultValue: false }] },
  { name: "Navigation", icon: Menu, description: "Tune the way you move through your workspace.", settings: [{ key: "compact-navigation", title: "Compact navigation", description: "Use a denser navigation layout.", defaultValue: false }, { key: "remember-last-page", title: "Remember last page", description: "Return to the page you last visited.", defaultValue: true }] },
  { name: "Home", icon: Home, description: "Personalize what you see when you open the app.", settings: [{ key: "recent-items", title: "Show recent items", description: "Show recently opened content on your home screen.", defaultValue: true }, { key: "suggestions", title: "Show suggestions", description: "Show recommendations based on your activity.", defaultValue: true }] },
  { name: "Appearance", icon: Paintbrush, description: "Adjust your visual preferences.", settings: [{ key: "reduced-motion", title: "Reduce motion", description: "Limit non-essential animations.", defaultValue: false }, { key: "high-contrast", title: "High contrast", description: "Increase contrast for interface elements.", defaultValue: false }] },
  { name: "Messages & media", icon: MessageCircle, description: "Control how conversations and shared content behave.", settings: [{ key: "read-receipts", title: "Read receipts", description: "Let others know when you have read their messages.", defaultValue: true }, { key: "link-previews", title: "Link previews", description: "Show a preview when someone sends a supported link.", defaultValue: true }] },
  { name: "Language & region", icon: Globe, description: "Choose language, region, and formatting preferences.", settings: [{ key: "auto-translate", title: "Auto-translate", description: "Offer translations for messages in other languages.", defaultValue: false }, { key: "local-time", title: "Use local time", description: "Display dates and times in your local time zone.", defaultValue: true }] },
  { name: "Accessibility", icon: Keyboard, description: "Make the interface easier to use your way.", settings: [{ key: "keyboard-hints", title: "Keyboard shortcuts", description: "Show available shortcuts in menus and tooltips.", defaultValue: true }, { key: "focus-indicator", title: "Enhanced focus indicator", description: "Use a more visible keyboard focus ring.", defaultValue: false }] },
  { name: "Mark as read", icon: Check, description: "Choose when activity is considered seen.", settings: [{ key: "mark-on-open", title: "Mark on open", description: "Mark a message as read when it is opened.", defaultValue: true }, { key: "mark-all-confirmation", title: "Confirm mark all read", description: "Ask before marking every message as read.", defaultValue: true }] },
  { name: "Audio & video", icon: Video, description: "Control media behavior in calls and messages.", settings: [{ key: "join-muted", title: "Join calls muted", description: "Start calls with your microphone muted.", defaultValue: false }, { key: "autoplay-video", title: "Autoplay video", description: "Play videos automatically when they are visible.", defaultValue: false }] },
  { name: "Connected accounts", icon: Link, description: "Manage services connected to your account.", settings: [{ key: "sync-calendar", title: "Sync calendar", description: "Keep connected calendar events up to date.", defaultValue: true }, { key: "share-presence", title: "Share presence", description: "Share your availability with connected services.", defaultValue: false }] },
  { name: "Privacy & visibility", icon: Lock, description: "Decide what information other people can see.", settings: [{ key: "activity-status", title: "Activity status", description: "Show others when you are active.", defaultValue: true }, { key: "profile-discovery", title: "Profile discovery", description: "Allow people to find you by your profile details.", defaultValue: true }] },
  { name: "Advanced", icon: Settings, description: "Manage advanced behavior and diagnostics.", settings: [{ key: "beta-features", title: "Beta features", description: "Enable early access to experimental features.", defaultValue: false }, { key: "diagnostics", title: "Usage diagnostics", description: "Share anonymous diagnostics to improve the app.", defaultValue: true }] },
]

export type SettingsPreferences = Record<string, boolean>

export type SettingsDialogProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  preferences?: SettingsPreferences
  onPreferencesChange?: (preferences: SettingsPreferences) => void
  trigger?: React.ReactElement
}

const defaultPreferences = Object.fromEntries(
  sections.flatMap((section) => section.settings.map((setting) => [setting.key, setting.defaultValue]))
) as SettingsPreferences

export function SettingsDialog({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  preferences: preferencesProp,
  onPreferencesChange,
  trigger,
}: SettingsDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const [activeItem, setActiveItem] = React.useState("Messages & media")
  const [uncontrolledPreferences, setUncontrolledPreferences] = React.useState<SettingsPreferences>(defaultPreferences)
  const open = openProp ?? uncontrolledOpen
  const preferences = preferencesProp ?? uncontrolledPreferences
  const activeSection = sections.find((section) => section.name === activeItem) ?? sections[0]

  const handleOpenChange = (nextOpen: boolean) => {
    if (openProp === undefined) setUncontrolledOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  const handlePreferenceChange = (key: string, value: boolean) => {
    const nextPreferences = { ...preferences, [key]: value }
    if (preferencesProp === undefined) setUncontrolledPreferences(nextPreferences)
    onPreferencesChange?.(nextPreferences)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger ?? <Button size="sm">Open settings</Button>}</DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">Customize your settings here.</DialogDescription>
        <SidebarProvider className="min-h-0 items-start">
          <Sidebar collapsible="none" className="hidden w-52 border-r md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sections.map((section) => (
                      <SidebarMenuItem key={section.name}>
                        <SidebarMenuButton isActive={section.name === activeSection.name} onClick={() => setActiveItem(section.name)}>
                          <section.icon />
                          <span>{section.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[440px] min-w-0 flex-1 flex-col overflow-hidden">
            <header className="flex min-h-14 shrink-0 items-center border-b px-4">
              <Breadcrumb className="hidden md:block">
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink href="#">Settings</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>{activeSection.name}</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <label className="sr-only" htmlFor="settings-section">Settings section</label>
              <select id="settings-section" className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm md:hidden" value={activeSection.name} onChange={(event) => setActiveItem(event.target.value)}>
                {sections.map((section) => <option key={section.name}>{section.name}</option>)}
              </select>
            </header>
            <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
              <div>
                <h3 className="text-sm font-medium">{activeSection.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{activeSection.description}</p>
              </div>
              {activeSection.settings.map((setting) => (
                <SettingRow key={setting.key} title={setting.title} description={setting.description} checked={preferences[setting.key]} onCheckedChange={(value) => handlePreferenceChange(setting.key, value)} />
              ))}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

function SettingRow({ title, description, checked, onCheckedChange }: Pick<Setting, "title" | "description"> & { checked: boolean; onCheckedChange: (checked: boolean) => void }) {
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
