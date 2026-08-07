"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"

import { cn } from "@/lib/utils"

export type ImageComparisonSliderProps = {
  beforeImage: string
  afterImage: string
  alt: string
  position?: number
  defaultPosition?: number
  onPositionChange?: (position: number) => void
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function ImageComparisonSlider({
  beforeImage,
  afterImage,
  alt,
  position: positionProp,
  defaultPosition = 50,
  onPositionChange,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: ImageComparisonSliderProps) {
  const [uncontrolledPosition, setUncontrolledPosition] = React.useState(() => clamp(defaultPosition))
  const position = clamp(positionProp ?? uncontrolledPosition)

  const setPosition = (nextPosition: number) => {
    const next = clamp(nextPosition)
    if (positionProp === undefined) setUncontrolledPosition(next)
    onPositionChange?.(next)
  }

  return (
    <div className={cn("group relative aspect-[3/2] w-full max-w-3xl touch-none select-none overflow-hidden rounded-xl bg-muted has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring", className)}>
      <img src={afterImage} alt={alt} className="absolute inset-0 size-full object-cover" draggable={false} />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeImage} alt="" className="size-full object-cover" draggable={false} />
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[0.625rem] font-medium text-foreground backdrop-blur">{beforeLabel}</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[0.625rem] font-medium text-foreground backdrop-blur">{afterLabel}</span>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 z-10 w-px bg-background" style={{ left: `${position}%` }} />
      <div aria-hidden className="pointer-events-none absolute top-1/2 z-20 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-background text-foreground shadow-sm" style={{ left: `${position}%` }}>
        <GripVertical className="size-4" />
      </div>
      <input
        aria-label="Adjust image comparison"
        aria-valuetext={`${position}% ${beforeLabel.toLowerCase()}`}
        className="absolute inset-0 z-30 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </div>
  )
}

function clamp(value: number) {
  return Math.min(100, Math.max(0, value))
}
