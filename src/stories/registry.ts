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
  registryItem?: string
}

export type Story = StoryMeta & {
  Content: ComponentType
  icon: LucideIcon
}

export const stories: Story[] = [
  { ...buttonMeta, Content: ButtonStory, icon: MousePointerClick, registryItem: 'button' },
  { ...inputMeta, Content: InputStory, icon: FormInput, registryItem: 'input' },
  { ...badgeMeta, Content: BadgeStory, icon: BadgeIcon, registryItem: 'badge' },
  { ...cardMeta, Content: CardStory, icon: CreditCard, registryItem: 'card' },
  { ...dialogMeta, Content: DialogStory, icon: Layers2, registryItem: 'dialog' },
  { ...alertMeta, Content: AlertStory, icon: AlertCircle, registryItem: 'alert' },
  { ...dropdownMenuMeta, Content: DropdownMenuStory, icon: Menu, registryItem: 'dropdown-menu' },
  { ...contextMenuMeta, Content: ContextMenuStory, icon: SquareMousePointer, registryItem: 'context-menu' },
  { ...audioPlayerMeta, Content: AudioPlayerStory, icon: Headphones, registryItem: 'audio-player' },
  { ...sliderMeta, Content: SliderStory, icon: SlidersHorizontal, registryItem: 'slider' },
  { ...imageComparisonSliderMeta, Content: ImageComparisonSliderStory, icon: SlidersVertical, registryItem: 'image-comparison-slider' },
  { ...chartsMeta, Content: ChartsStory, icon: BarChart3, registryItem: 'chart-examples' },
]

export const storyFromSlug = (slug: string) => stories.find((story) => story.slug === slug)
