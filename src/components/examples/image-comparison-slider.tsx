import { useRef, useState } from 'react'
import { GripVertical } from 'lucide-react'

export function ImageComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(48)
  const [dragging, setDragging] = useState(false)

  const updatePosition = (clientX: number) => {
    const bounds = containerRef.current?.getBoundingClientRect()
    if (!bounds) return
    setPosition(Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100)))
  }

  return <div ref={containerRef} className="relative aspect-[3/2] w-full max-w-3xl touch-none select-none overflow-hidden rounded-xl bg-muted" onPointerMove={(event) => { if (dragging) updatePosition(event.clientX) }} onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)}>
    <img src="/images/alpine-cabin.png" alt="Sharp alpine cabin beside a lake" className="absolute inset-0 size-full object-cover" draggable={false} />
    <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><img src="/images/alpine-cabin.png" alt="" className="size-full scale-[1.03] object-cover blur-[7px]" draggable={false} /></div>
    <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[0.625rem] font-medium text-foreground backdrop-blur">Before</span>
    <span className="absolute right-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[0.625rem] font-medium text-foreground backdrop-blur">After</span>
    <div className="absolute inset-y-0 z-10 w-px bg-background" style={{ left: `${position}%` }} />
    <button type="button" aria-label="Drag to compare before and after" className="absolute top-1/2 z-20 grid size-9 -translate-x-1/2 -translate-y-1/2 cursor-col-resize place-items-center rounded-full border bg-background text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" style={{ left: `${position}%` }} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDragging(true); updatePosition(event.clientX) }}><GripVertical className="size-4" /></button>
  </div>
}
