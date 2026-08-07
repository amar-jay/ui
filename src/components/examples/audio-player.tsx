import { useCallback, useEffect, useRef, useState } from 'react'
import { FastForward, ListMusic, Pause, Play, Rewind, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export function InlineAudioPlayer() {
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
    <Avatar size="lg"><AvatarImage src="/images/alpine-cabin.png" alt="Night Drive artwork" /><AvatarFallback>ND</AvatarFallback></Avatar>
    <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-medium text-foreground">Night Drive</p><p className="truncate text-xs text-muted-foreground">Demo synth loop</p></div><span className="hidden text-[0.625rem] tabular-nums text-muted-foreground sm:inline">{formatTime(currentTime)} / {formatTime(duration)}</span></div><input aria-label="Track progress" className="mt-2 block h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-foreground" type="range" min="0" max="100" value={progress} onChange={(event) => seek(Number(event.target.value))} /></div>
    <div className="flex shrink-0 items-center gap-0.5"><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon-sm" className="hidden sm:inline-flex" aria-label="Previous track"><SkipBack /></Button></TooltipTrigger><TooltipContent>Previous track</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><Button variant="default" size="icon" className="rounded-full" onClick={() => void togglePlayback()} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current" />}</Button></TooltipTrigger><TooltipContent>{isPlaying ? 'Pause' : 'Play'}</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon-sm" className="hidden sm:inline-flex" aria-label="Next track"><SkipForward /></Button></TooltipTrigger><TooltipContent>Next track</TooltipContent></Tooltip><Popover><Tooltip><TooltipTrigger asChild><PopoverTrigger asChild><Button variant="ghost" size="icon-sm" aria-label="Adjust volume"><Volume2 /></Button></PopoverTrigger></TooltipTrigger><TooltipContent>Adjust volume</TooltipContent></Tooltip><PopoverContent side="top" className="z-50 w-auto items-center gap-3 p-3"><span className="text-[0.625rem] tabular-nums text-muted-foreground">{volume[0]}%</span><Slider orientation="vertical" aria-label="Volume" className="!h-36 !min-h-0" value={volume} onValueChange={setVolume} /></PopoverContent></Popover></div>
  </div>
}

export type AudioPlayerProps = {
  currentTime: number
  handleSeek: (value: number[]) => void
  audioDuration: number
  skipBack: () => void
  skipForward: () => void
  togglePlayPause: () => void
  isPlaying: boolean
  volume: number
  setVolume: (value: number) => void
}

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
}

export function FloatingAudioPlayer({ className, fixed = true, currentTime, handleSeek, audioDuration, skipBack, skipForward, togglePlayPause, isPlaying, volume, setVolume }: AudioPlayerProps & { className?: string; fixed?: boolean }) {
  return <div className={cn(fixed ? 'fixed' : 'absolute', 'bottom-4 left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-center gap-1.5 rounded-full border-2 border-primary bg-background p-2 shadow-sm sm:w-auto sm:gap-2', className)}>
    <Tooltip><TooltipTrigger asChild><Button variant="outline" className="rounded-full" size="icon" onClick={skipBack} aria-label="Skip back 10 seconds"><Rewind /></Button></TooltipTrigger><TooltipContent>Skip back 10 seconds</TooltipContent></Tooltip>
    <Tooltip><TooltipTrigger asChild><Button variant="default" size="icon" className="rounded-full" onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause /> : <Play className="fill-current" />}</Button></TooltipTrigger><TooltipContent>{isPlaying ? 'Pause' : 'Play'}</TooltipContent></Tooltip>
    <Tooltip><TooltipTrigger asChild><Button variant="outline" className="hidden rounded-full sm:inline-flex" size="icon" onClick={skipForward} aria-label="Skip forward 10 seconds"><FastForward /></Button></TooltipTrigger><TooltipContent>Skip forward 10 seconds</TooltipContent></Tooltip>
    <Slider value={[currentTime]} max={audioDuration} step={0.1} onValueChange={handleSeek} aria-label="Track progress" className="mx-1 w-16 sm:w-32 md:w-48" />
    <span className="hidden min-w-9 text-right text-[0.625rem] tabular-nums text-muted-foreground sm:inline">{formatTime(currentTime)}</span>
    <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="hidden rounded-full md:inline-flex" aria-label="Live transcription"><ListMusic /></Button></TooltipTrigger><TooltipContent>Live transcription</TooltipContent></Tooltip>
    <Popover><Tooltip><TooltipTrigger asChild><PopoverTrigger asChild><Button variant="ghost" size="icon" className="rounded-full" aria-label="Adjust volume"><Volume2 /></Button></PopoverTrigger></TooltipTrigger><TooltipContent>Adjust volume</TooltipContent></Tooltip><PopoverContent side="top" className="z-50 w-auto items-center gap-2 p-3"><span className="text-[0.625rem] tabular-nums text-muted-foreground">{volume}%</span><Slider orientation="vertical" className="h-24" value={[volume]} onValueChange={(newVolume) => setVolume(newVolume[0])} max={100} step={1} aria-label="Volume" /></PopoverContent></Popover>
  </div>
}

export function FloatingAudioPlayerDemo() {
  const [currentTime, setCurrentTime] = useState(78)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(72)
  const audioDuration = 243

  useEffect(() => {
    if (!isPlaying) return
    const timer = window.setInterval(() => setCurrentTime((time) => time >= audioDuration ? 0 : time + 1), 1000)
    return () => window.clearInterval(timer)
  }, [isPlaying])

  return <div className="relative h-36 w-full max-w-3xl"><FloatingAudioPlayer fixed={false} className="bottom-3" currentTime={currentTime} handleSeek={(value) => setCurrentTime(value[0])} audioDuration={audioDuration} skipBack={() => setCurrentTime((time) => Math.max(0, time - 10))} skipForward={() => setCurrentTime((time) => Math.min(audioDuration, time + 10))} togglePlayPause={() => setIsPlaying((value) => !value)} isPlaying={isPlaying} volume={volume} setVolume={setVolume} /></div>
}
