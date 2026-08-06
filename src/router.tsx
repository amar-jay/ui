import { Link, Outlet, createRootRouteWithContext, createRoute } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Home } from './routes/home'
import { About } from './routes/about'

interface RouterContext {
  queryClient: QueryClient
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link to="/" className="font-semibold tracking-tight">TanStack Starter</Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/" activeProps={{ className: 'text-foreground' }}>Home</Link>
            <Link to="/about" activeProps={{ className: 'text-foreground' }}>About</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-16"><Outlet /></main>
    </div>
  ),
})

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home })
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: About })

export const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])
