import type { ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HighlightedCode } from './highlighted-code'

export function Story({
  title,
  description,
  code,
  children,
}: {
  title: string
  description?: string
  code?: string
  children: ReactNode
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const preview = (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[20px_20px] opacity-40 dark:opacity-25"
      />
      <div className="relative flex min-h-48 flex-wrap items-center justify-center gap-3 p-6 md:min-h-52 md:p-10">
        {children}
      </div>
    </div>
  )

  return (
    <section className="mt-10 first:mt-0">
      <div className="mb-4 space-y-1">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {code ? (
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-3">
            {preview}
          </TabsContent>
          <TabsContent value="code" className="relative mt-3">
            <HighlightedCode code={code} />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={copy}
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
              aria-label={copied ? 'Copied' : 'Copy code'}
            >
              {copied ? <Check /> : <Copy />}
            </Button>
          </TabsContent>
        </Tabs>
      ) : (
        preview
      )}
    </section>
  )
}
