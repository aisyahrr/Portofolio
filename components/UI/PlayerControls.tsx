"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import type { TPlaylist } from "@/data/data";

interface Props {
  playlist: TPlaylist[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
}

export default function PlayerControls({
  playlist,
  currentIndex,
  setCurrentIndex,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = playlist[currentIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const nextSong = useCallback(() => {
    const newIndex = currentIndex + 1 >= playlist.length ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, playlist.length, setCurrentIndex]);

  const prevSong = useCallback(() => {
    const newIndex = currentIndex - 1 < 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, playlist.length, setCurrentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    if (playing) audio.play();

    const onTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const onLoaded = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      nextSong();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentIndex]);

  const seek = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime =
      (value / 100) * audioRef.current.duration;
    setProgress(value);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <audio ref={audioRef} src={currentSong.url} />

      {/* PROGRESS */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs">{formatTime((progress / 100) * duration)}</span>

        <div
          className="relative flex-1 h-1 rounded-full bg-white/20 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent =
              ((e.clientX - rect.left) / rect.width) * 100;
            seek(percent);
          }}
        >
          <div
            className="absolute left-0 top-0 h-1 rounded-full bg-[var(--color-bluePrimary)]"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2
              w-3 h-3 rounded-full
              bg-[var(--color-bluePrimary)]
              shadow-[0_0_20px_var(--glow-primary)]"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>

        <span className="text-xs">{formatTime(duration)}</span>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-center gap-6">
        <button onClick={prevSong}>
          <IoPlaySkipBack size={22} />
        </button>

        <button
          onClick={togglePlay}
          className="p-2 rounded-full shadow-[0_0_25px_var(--glow-primary)]"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-bluePrimary)]">
            {playing ? (
              <IoPause size={22} className="text-white" />
            ) : (
              <IoPlay size={22} className="text-white ml-0.5" />
            )}
          </div>
        </button>

        <button onClick={nextSong}>
          <IoPlaySkipForward size={22} />
        </button>
      </div>
    </div>
  );
}

function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
