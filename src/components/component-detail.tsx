import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Check, ChevronRight, Component, Copy, PackagePlus } from 'lucide-react'
import { componentFile, componentFromSlug, components } from '@/lib/component-catalog'
import { useExplorer } from '@/components/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function LivePreview({ name }: { name: string }) {
  if (name === 'Button') return <div className="flex flex-wrap items-center justify-center gap-3"><Button>Default</Button><Button variant="outline">Outline</Button><Button variant="secondary">Secondary</Button></div>
  if (name === 'Input') return <div className="w-full max-w-sm"><Input placeholder="name@example.com" /></div>
  if (name === 'Badge') return <div className="flex gap-2"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge></div>
  if (name === 'Card') return <Card className="w-full max-w-sm"><CardHeader><CardTitle>Project settings</CardTitle><CardDescription>Manage your team and billing.</CardDescription></CardHeader><CardContent><Button size="sm">Open settings</Button></CardContent></Card>
  if (name === 'Dialog') return <Dialog><DialogTrigger asChild><Button variant="outline">Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Ready to publish?</DialogTitle><DialogDescription>This is a live preview of the dialog component.</DialogDescription></DialogHeader><DialogFooter><Button>Continue</Button></DialogFooter></DialogContent></Dialog>
  if (name === 'Skeleton') return <div className="flex w-full max-w-sm items-center gap-3"><div className="size-10 animate-pulse rounded-full bg-muted" /><div className="flex-1 space-y-2"><div className="h-3 w-2/3 animate-pulse rounded bg-muted" /><div className="h-3 w-full animate-pulse rounded bg-muted" /></div></div>
  return <div className="flex flex-col items-center gap-3 text-center"><div className="grid size-12 place-items-center rounded-xl border bg-background shadow-sm"><Component className="size-5" /></div><div><p className="font-medium">{name}</p><p className="text-xs text-muted-foreground">Preview surface is ready for this component.</p></div></div>
}

export function ComponentDetail({ componentSlug }: { componentSlug: string }) {
  const { query, setQuery } = useExplorer()
  const [copied, setCopied] = useState(false)
  const selectedComponent = componentFromSlug(componentSlug) ?? components[0]
  const selected = selectedComponent.name
  const filtered = useMemo(() => components.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.group.toLowerCase().includes(query.toLowerCase())), [query])
  const installCommand = `npx shadcn@latest add ${componentFile(selected)}`
  const copy = async () => { await navigator.clipboard.writeText(installCommand); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }

  return <div className="grid min-h-full lg:grid-cols-[minmax(0,1fr)_280px]">
    <section className="min-w-0 border-r"><div className="mx-auto max-w-4xl px-5 py-8 md:px-10 md:py-12">
      <div className="mb-8 flex items-start justify-between gap-4"><div><div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><span>Components</span><ChevronRight className="size-3" /><span>{selectedComponent.group}</span></div><h1 className="font-heading text-3xl font-semibold tracking-tight">{selectedComponent.name}</h1><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{selectedComponent.description}</p></div><Badge variant="outline">Installed</Badge></div>
      {query && <div className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2">{filtered.map((item) => <Link key={item.name} to="/components/$component" params={{ component: componentFile(item.name) }} onClick={() => setQuery('')} className="flex items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted"><div className="grid size-8 place-items-center rounded-md bg-muted"><Component className="size-4" /></div><div><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-muted-foreground">{item.group}</p></div></Link>)}{filtered.length === 0 && <p className="text-sm text-muted-foreground">No components match your search.</p>}</div>}
      <Tabs defaultValue="preview"><TabsList><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="code">Code</TabsTrigger></TabsList><TabsContent value="preview" className="mt-5"><div className="relative grid min-h-75 place-items-center overflow-hidden rounded-xl border bg-muted/30 p-6 md:p-12"><div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[22px_22px] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent)]" /><div className="relative"><LivePreview name={selected} /></div></div></TabsContent><TabsContent value="code" className="mt-5"><pre className="overflow-x-auto rounded-xl border bg-muted/40 p-5 text-xs leading-6"><code>{`import { ${selected.replaceAll(' ', '')} } from '@/components/ui/${componentFile(selected)}'\n\nexport function Example() {\n  return <${selected.replaceAll(' ', '')} />\n}`}</code></pre></TabsContent></Tabs>
      <div className="mt-10 border-t pt-8"><h2 className="font-heading text-xl font-semibold">Usage</h2><p className="mt-2 text-sm text-muted-foreground">Import this component directly from your local registry. You own the source and can adapt it to your product.</p><div className="mt-4 flex items-center justify-between gap-3 rounded-lg border bg-muted/30 p-3 font-mono text-xs"><code className="truncate bg-transparent p-0">{installCommand}</code><Button variant="ghost" size="icon-sm" onClick={copy} aria-label="Copy install command">{copied ? <Check className="text-green-600" /> : <Copy />}</Button></div></div>
    </div></section>
    <aside className="hidden bg-muted/20 p-6 lg:block"><p className="text-xs font-medium text-muted-foreground">ON THIS PAGE</p><nav className="mt-4 space-y-1 text-sm"><a className="block text-foreground" href="#">Preview</a><a className="block text-muted-foreground hover:text-foreground" href="#">Usage</a><a className="block text-muted-foreground hover:text-foreground" href="#">API reference</a></nav><div className="mt-10 rounded-xl border bg-background p-4"><PackagePlus className="size-4" /><p className="mt-3 text-sm font-medium">Your component registry</p><p className="mt-1 text-xs leading-5 text-muted-foreground">All {components.length} installed components are available in this workspace.</p></div></aside>
  </div>
}
