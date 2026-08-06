import type { ReactNode } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Story({ title, description, code, children }: { title: string; description?: string; code?: string; children: ReactNode }) {
  const copy = () => navigator.clipboard.writeText(code ?? '')
  const preview = <div className="relative grid min-h-52 place-items-center overflow-hidden rounded-xl border bg-muted/30 p-6 md:p-10"><div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[22px_22px] opacity-35" /><div className="relative flex flex-wrap items-center justify-center gap-3">{children}</div></div>

  return <section className="mt-8 first:mt-0"><div className="mb-4"><h2 className="font-heading text-xl font-semibold">{title}</h2>{description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}</div>{code ? <Tabs defaultValue="preview"><TabsList><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="code">Code</TabsTrigger></TabsList><TabsContent value="preview" className="mt-3">{preview}</TabsContent><TabsContent value="code" className="relative mt-3"><pre className="overflow-x-auto rounded-xl border bg-muted/40 p-5 text-xs leading-6"><code>{code}</code></pre><Button variant="ghost" size="icon-sm" onClick={copy} className="absolute right-2 top-2" aria-label="Copy code"><Copy /></Button></TabsContent></Tabs> : preview}</section>
}
