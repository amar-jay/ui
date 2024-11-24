import { useState, useRef, useEffect, useCallback } from "react";

export interface AudioPlayerProps {
  isPlaying: boolean;
  volume: number;
  setVolume: (value: number) => void;
  skipBack: () => void;
  skipForward: () => void;
  togglePlayPause: () => void;
  currentTime: number;
  audioDuration: number;
  handleSeek: (value: number[]) => void;
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, _setVolume] = useState(70);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const skipForward = () => {
    // skip 10 seconds forward
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime += 10;
  };

  const skipBack = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime -= 10;
  };
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTimeUpdate = () => {
    // throttle this function

    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  useEffect(() => {
    setDuration(audioRef.current?.duration || 0);
  }, [audioRef.current]);
  const setVolume = useCallback(
    (newVolume: number) => {
      if (audioRef.current) {
        _setVolume(newVolume);
        audioRef.current.volume = newVolume / 100; // Set the volume of the audio element
      }
    },
    [audioRef.current],
  );
  return {
    volume,
    currentTime,
    audioDuration: duration,
    setVolume,
    skipBack,
    skipForward,
    togglePlayPause,
    isPlaying,
    setIsPlaying,
    audioRef,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleSeek,
  };
}
