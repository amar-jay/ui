import { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  SkipBackIcon,
  SkipForwardIcon,
  ListMusic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  type AudioPlayerProps,
  formatTime,
  useAudioPlayer,
} from "./common.tsx";

const FloatingAudioPlayer = ({
  currentTime,
  handleSeek,
  audioDuration,
  skipBack,
  skipForward,
  togglePlayPause,
  isPlaying,
  volume,
  setVolume,
}: AudioPlayerProps) => {
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 rounded-full shadow-sm p-2 flex items-center space-x-2 border-primary border-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full"
              size="icon"
              onClick={skipBack}
            >
              <SkipBackIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Skip back 10 seconds</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="rounded-full"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isPlaying ? "Pause" : "Play"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full"
              size="icon"
              onClick={skipForward}
            >
              <SkipForwardIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Skip forward 10 seconds</p>
          </TooltipContent>
        </Tooltip>

        <Slider
          value={[currentTime]}
          max={audioDuration}
          step={0.1}
          onValueChange={handleSeek}
          className="w-48"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size="icon" className="rounded-full">
              <ListMusic className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Live Transcription</p>
          </TooltipContent>
        </Tooltip>
        <div className="relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVolumeVisible(!isVolumeVisible)}
                className="rounded-full"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust Volume</p>
            </TooltipContent>
          </Tooltip>

          {isVolumeVisible && (
            <div className="absolute bottom-full mb-2 px-2 py-2 bg-white left-1/2 transform -translate-x-1/2 rounded-lg border-2 ">
              <Slider
                orientation="vertical"
                className="h-24"
                value={[volume]}
                onValueChange={(newVolume: number[]) => setVolume(newVolume[0])}
                max={100}
                step={1}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

function AudioTranscriptionPage() {
  const {
    isPlaying,
    audioDuration,
    volume,
    setVolume,
    skipBack,
    skipForward,
    currentTime,
    togglePlayPause,
    handleLoadedMetadata,
    handleSeek,
    handleTimeUpdate,
    audioRef,
  } = useAudioPlayer();
  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 gap-6 w-[32rem] md:w-[64rem]">
        <FloatingAudioPlayer
          currentTime={currentTime}
          handleSeek={handleSeek}
          audioDuration={audioDuration}
          isPlaying={isPlaying}
          skipForward={skipForward}
          skipBack={skipBack}
          togglePlayPause={togglePlayPause}
          volume={volume}
          setVolume={setVolume}
        />
        <audio
          ref={audioRef}
          src={"/demo.mp3"}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate} // changed it to handle it in a useEffect
        />
      </div>
    </TooltipProvider>
  );
}
export default AudioTranscriptionPage;
