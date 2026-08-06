import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function About() {
  return <Card className="max-w-2xl"><CardHeader><CardTitle>Start building</CardTitle><CardDescription>Add routes in <code>src/router.tsx</code>, then use React Query wherever you fetch remote data.</CardDescription></CardHeader><CardContent className="text-sm text-muted-foreground">Run <code>npm run dev</code> locally, then import the repository into Vercel. Its default build command is already available.</CardContent></Card>
}
