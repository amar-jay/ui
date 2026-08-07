import { storyFromSlug } from './registry'
import { RegistryInstall } from './_components/registry-install'

export function StoryPage({ slug }: { slug: string }) {
  const story = storyFromSlug(slug)

  if (!story) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-muted-foreground">Story not found.</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground">
          This component has not been documented yet.
        </h1>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
          Choose an available story from the sidebar.
        </p>
      </div>
    )
  }

  const Content = story.Content

  return (
    <article className="mx-auto max-w-3xl px-5 py-8 md:px-10 md:py-12">
      <header className="mb-8 border-b border-border pb-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {story.title}
        </h1>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
          {story.description}
        </p>
        {story.registryItem ? <RegistryInstall item={story.registryItem} /> : null}
      </header>

      {/* Style only direct MDX prose so demos keep their own component colors */}
      <div
        className={[
          'story-content',
          '[&>h1:first-child]:hidden',
          '[&>p]:mb-6 [&>p]:max-w-prose [&>p]:text-sm [&>p]:leading-relaxed [&>p]:text-muted-foreground',
          '[&>h2]:mt-10 [&>h2]:font-heading [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:text-foreground',
          '[&>h3]:mt-6 [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-foreground',
          '[&>ul]:my-3 [&>ul]:list-disc [&>ul]:space-y-1 [&>ul]:pl-5 [&>ul]:text-sm [&>ul]:text-muted-foreground',
          '[&>ol]:my-3 [&>ol]:list-decimal [&>ol]:space-y-1 [&>ol]:pl-5 [&>ol]:text-sm [&>ol]:text-muted-foreground',
        ].join(' ')}
      >
        <Content />
      </div>
    </article>
  )
}
