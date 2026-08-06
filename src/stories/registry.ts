import type { ComponentType } from 'react'
import ButtonStory, { meta as buttonMeta } from './button.mdx'
import InputStory, { meta as inputMeta } from './input.mdx'
import BadgeStory, { meta as badgeMeta } from './badge.mdx'
import CardStory, { meta as cardMeta } from './card.mdx'
import DialogStory, { meta as dialogMeta } from './dialog.mdx'
import AlertStory, { meta as alertMeta } from './alert.mdx'
import DropdownMenuStory, { meta as dropdownMenuMeta } from './dropdown-menu.mdx'
import ContextMenuStory, { meta as contextMenuMeta } from './context-menu.mdx'

export type StoryMeta = {
  title: string
  slug: string
  category: string
  description: string
}

export type Story = StoryMeta & { Content: ComponentType }

export const stories: Story[] = [
  { ...buttonMeta, Content: ButtonStory },
  { ...inputMeta, Content: InputStory },
  { ...badgeMeta, Content: BadgeStory },
  { ...cardMeta, Content: CardStory },
  { ...dialogMeta, Content: DialogStory },
  { ...alertMeta, Content: AlertStory },
  { ...dropdownMenuMeta, Content: DropdownMenuStory },
  { ...contextMenuMeta, Content: ContextMenuStory },
]
export const storyFromSlug = (slug: string) => stories.find((story) => story.slug === slug)
