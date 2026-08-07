const tokenPattern = /(\/\/[^\n]*|`[^`]*`|'[^']*'|"[^"]*"|<\/?[A-Za-z][\w.-]*|\b[A-Za-z_$][\w$-]*(?=\s*=)|\b(?:import|from|export|function|return|const|let|if|else|new|async|await|type|interface|extends|as|true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|\b[A-Z][A-Za-z0-9_]*\b)/g

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function highlightTsx(code: string) {
  let html = ''
  let index = 0
  for (const match of code.matchAll(tokenPattern)) {
    const token = match[0]
    const start = match.index ?? 0
    html += escapeHtml(code.slice(index, start))
    const kind = token.startsWith('//')
      ? 'comment'
      : token.startsWith('"') || token.startsWith("'") || token.startsWith('`')
        ? 'string'
        : token.startsWith('<')
          ? 'tag'
          : /^\d/.test(token)
            ? 'number'
            : /^(import|from|export|function|return|const|let|if|else|new|async|await|type|interface|extends|as|true|false|null|undefined)$/.test(token)
              ? 'keyword'
              : /^[A-Z]/.test(token)
                ? 'component'
                : 'attribute'
    html += `<span class="code-token-${kind}">${escapeHtml(token)}</span>`
    index = start + token.length
  }
  return html + escapeHtml(code.slice(index))
}

export function HighlightedCode({ code }: { code: string }) {
  return <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-xs leading-6 text-foreground md:p-5"><code className="font-mono" dangerouslySetInnerHTML={{ __html: highlightTsx(code) }} /></pre>
}
