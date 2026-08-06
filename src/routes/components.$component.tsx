import { createFileRoute } from '@tanstack/react-router'
import { ComponentDetail } from '@/components/component-detail'

export const Route = createFileRoute('/components/$component')({
  component: ComponentRoute,
})

function ComponentRoute() {
  const { component } = Route.useParams()
  return <ComponentDetail componentSlug={component} />
}
