import { storyFromSlug } from './registry'

export function StoryPage({ slug }: { slug: string }) {
  const story = storyFromSlug(slug)
  if (!story) return <div className="mx-auto max-w-3xl px-6 py-16"><p className="text-sm text-muted-foreground">Story not found.</p><h1 className="mt-2 font-heading text-3xl font-semibold">This component has not been documented yet.</h1><p className="mt-3 text-sm text-muted-foreground">Choose an available story from the sidebar.</p></div>

  const Content = story.Content
  return <article className="mx-auto max-w-3xl px-5 py-8 md:px-10 md:py-12 [&_h1]:font-heading [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_p]:text-sm [&_p]:leading-6 [&_p]:text-muted-foreground"><Content /></article>
}
