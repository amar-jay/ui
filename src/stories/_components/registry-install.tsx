import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const registryBaseUrl = 'https://ui.amarjay.com/r'

export function RegistryInstall({ item }: { item: string }) {
  const [copied, setCopied] = useState(false)
  const command = `npx shadcn@latest add ${registryBaseUrl}/${item}.json`

  const copy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="mt-6 border-t border-border pt-4">
      <p className="mb-2 text-xs font-medium text-foreground">Install with shadcn</p>
      <div className="flex items-center gap-2 rounded-md border border-border bg-background py-1 pl-3 pr-1">
        <code className="min-w-0 flex-1 truncate rounded-none! bg-transparent! px-0! py-0! text-xs text-black! dark:text-black!">{command}</code>
        <Button variant="ghost" size="icon-sm" onClick={() => void copy()} aria-label={copied ? 'Copied' : 'Copy install command'}>
          {copied ? <Check /> : <Copy />}
        </Button>
      </div>
    </div>
  )
}
