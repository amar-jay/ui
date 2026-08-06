import { useQuery } from '@tanstack/react-query'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = ['Type-safe client routing', 'Server-state caching with TanStack Query', 'Reusable shadcn/ui primitives', 'Vercel-ready static deployment']

export function Home() {
  const status = useQuery({
    queryKey: ['starter-status'],
    queryFn: async () => ({ message: 'Your starter is ready to build.' }),
    staleTime: Infinity,
  })

  return (
    <section className="space-y-12">
      <div className="max-w-2xl space-y-6">
        <p className="text-sm font-medium text-primary">React + Vite template</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">A practical foundation for your next web app.</h1>
        <p className="text-lg leading-8 text-muted-foreground">TanStack Router and Query, shadcn/ui conventions, and a deploy configuration that works on Vercel out of the box.</p>
        <Button asChild size="lg"><Link to="/about">Explore the template <ArrowRight /></Link></Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Included</CardTitle>
          <CardDescription>{status.data?.message ?? 'Checking starter status…'}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => <li className="flex items-center gap-2 text-sm" key={feature}><CheckCircle2 className="size-4 text-primary" />{feature}</li>)}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
