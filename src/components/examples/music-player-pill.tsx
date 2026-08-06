import { useCallback, useEffect, useRef, useState } from 'react'
import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'

export function MusicPlayerPill() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([72])
  const audioContextRef = useRef<AudioContext | null>(null)
  const sequenceStepRef = useRef(0)
  const volumeRef = useRef(volume[0])
  const duration = 243
  const elapsedBeforePlayRef = useRef(102)
  const playbackStartedAtRef = useRef(0)
  const [currentTime, setCurrentTime] = useState(102)
  const progress = (currentTime / duration) * 100
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
  volumeRef.current = volume[0]

  const playStep = useCallback(() => {
    const context = audioContextRef.current
    if (!context || context.state !== 'running') return
    const notes = [261.63, 329.63, 392, 493.88, 440, 392, 329.63, 293.66]
    const note = notes[sequenceStepRef.current % notes.length]
    sequenceStepRef.current += 1
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'triangle'
    oscillator.frequency.setValueAtTime(note, context.currentTime)
    gain.gain.setValueAtTime((volumeRef.current / 100) * 0.035, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.42)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.43)
  }, [])

  const togglePlayback = async () => {
    if (isPlaying) {
      const context = audioContextRef.current
      if (context) {
        const elapsed = Math.min(duration, Math.floor(elapsedBeforePlayRef.current + context.currentTime - playbackStartedAtRef.current))
        elapsedBeforePlayRef.current = elapsed
        setCurrentTime(elapsed)
        await context.suspend()
      }
      setIsPlaying(false)
      return
    }
    audioContextRef.current ??= new AudioContext()
    await audioContextRef.current.resume()
    playbackStartedAtRef.current = audioContextRef.current.currentTime
    sequenceStepRef.current = Math.floor(elapsedBeforePlayRef.current / 0.48)
    setIsPlaying(true)
  }

  const seek = (percentage: number) => {
    const nextTime = Math.round((percentage / 100) * duration)
    elapsedBeforePlayRef.current = nextTime
    sequenceStepRef.current = Math.floor(nextTime / 0.48)
    if (audioContextRef.current) playbackStartedAtRef.current = audioContextRef.current.currentTime
    setCurrentTime(nextTime)
  }

  useEffect(() => {
    if (!isPlaying) return
    playStep()
    const progressTimer = window.setInterval(() => {
      const context = audioContextRef.current
      if (!context) return
      const elapsed = Math.floor(elapsedBeforePlayRef.current + context.currentTime - playbackStartedAtRef.current)
      if (elapsed >= duration) {
        elapsedBeforePlayRef.current = 0
        playbackStartedAtRef.current = context.currentTime
        sequenceStepRef.current = 0
        setCurrentTime(0)
        return
      }
      setCurrentTime(elapsed)
    }, 100)
    const audioTimer = window.setInterval(playStep, 480)
    return () => { window.clearInterval(progressTimer); window.clearInterval(audioTimer) }
  }, [isPlaying, playStep])

  return <div className="flex w-full max-w-2xl items-center gap-3 rounded-full border bg-background p-2 shadow-sm sm:gap-4 sm:px-3">
    <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-300 text-white sm:size-12"><span className="font-heading text-lg italic">M</span></div>
    <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-medium text-foreground">Night Drive</p><p className="truncate text-xs text-muted-foreground">Demo synth loop</p></div><span className="hidden text-[0.625rem] tabular-nums text-muted-foreground sm:inline">{formatTime(currentTime)} / {formatTime(duration)}</span></div><input aria-label="Track progress" className="mt-2 block h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-foreground" type="range" min="0" max="100" value={progress} onChange={(event) => seek(Number(event.target.value))} /></div>
    <div className="flex shrink-0 items-center gap-0.5"><Button variant="ghost" size="icon-sm" className="hidden sm:inline-flex" aria-label="Previous track"><SkipBack /></Button><Button variant="default" size="icon" className="rounded-full" onClick={() => void togglePlayback()} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current" />}</Button><Button variant="ghost" size="icon-sm" className="hidden sm:inline-flex" aria-label="Next track"><SkipForward /></Button><Popover><PopoverTrigger asChild><Button variant="ghost" size="icon-sm" aria-label="Adjust volume"><Volume2 /></Button></PopoverTrigger><PopoverContent side="top" className="z-50 w-auto items-center gap-3 p-3"><span className="text-[0.625rem] tabular-nums text-muted-foreground">{volume[0]}%</span><Slider orientation="vertical" aria-label="Volume" className="!h-36 !min-h-0" value={volume} onValueChange={setVolume} /></PopoverContent></Popover></div>
  </div>
}
