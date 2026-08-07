import type { ComponentType } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  AlertCircle,
  BarChart3,
  Badge as BadgeIcon,
  CreditCard,
  FormInput,
  Headphones,
  Layers2,
  Menu,
  MousePointerClick,
  SquareMousePointer,
  SlidersHorizontal,
  SlidersVertical,
} from 'lucide-react'
import ButtonStory, { meta as buttonMeta } from './button.mdx'
import InputStory, { meta as inputMeta } from './input.mdx'
import BadgeStory, { meta as badgeMeta } from './badge.mdx'
import CardStory, { meta as cardMeta } from './card.mdx'
import DialogStory, { meta as dialogMeta } from './dialog.mdx'
import AlertStory, { meta as alertMeta } from './alert.mdx'
import DropdownMenuStory, { meta as dropdownMenuMeta } from './dropdown-menu.mdx'
import ContextMenuStory, { meta as contextMenuMeta } from './context-menu.mdx'
import AudioPlayerStory, { meta as audioPlayerMeta } from './audio-player.mdx'
import SliderStory, { meta as sliderMeta } from './slider.mdx'
import ImageComparisonSliderStory, { meta as imageComparisonSliderMeta } from './image-comparison-slider.mdx'
import ChartsStory, { meta as chartsMeta } from './charts.mdx'

export type StoryMeta = {
  title: string
  slug: string
  category: string
  description: string
}

export type Story = StoryMeta & {
  Content: ComponentType
  icon: LucideIcon
}

export const stories: Story[] = [
  { ...buttonMeta, Content: ButtonStory, icon: MousePointerClick },
  { ...inputMeta, Content: InputStory, icon: FormInput },
  { ...badgeMeta, Content: BadgeStory, icon: BadgeIcon },
  { ...cardMeta, Content: CardStory, icon: CreditCard },
  { ...dialogMeta, Content: DialogStory, icon: Layers2 },
  { ...alertMeta, Content: AlertStory, icon: AlertCircle },
  { ...dropdownMenuMeta, Content: DropdownMenuStory, icon: Menu },
  { ...contextMenuMeta, Content: ContextMenuStory, icon: SquareMousePointer },
  { ...audioPlayerMeta, Content: AudioPlayerStory, icon: Headphones },
  { ...sliderMeta, Content: SliderStory, icon: SlidersHorizontal },
  { ...imageComparisonSliderMeta, Content: ImageComparisonSliderStory, icon: SlidersVertical },
  { ...chartsMeta, Content: ChartsStory, icon: BarChart3 },
]

export const storyFromSlug = (slug: string) => stories.find((story) => story.slug === slug)
