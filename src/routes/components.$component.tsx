import { createFileRoute } from '@tanstack/react-router'
import { StoryPage } from '@/stories/story-page'

export const Route = createFileRoute('/components/$component')({
  component: ComponentRoute,
})

function ComponentRoute() {
  const { component } = Route.useParams()
  return <StoryPage slug={component} />
}
