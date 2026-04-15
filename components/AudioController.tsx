"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioController() {
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const rainRef = useRef<HTMLAudioElement | null>(null);
  const jazzRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const createLoop = (src: string, volume: number) => {
      try {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = volume;
        return audio;
      } catch {
        return null;
      }
    };

    rainRef.current = createLoop("/audio/rain.mp3", 0.4);
    jazzRef.current = createLoop("/audio/jazz.mp3", 0.25);

    return () => {
      rainRef.current?.pause();
      jazzRef.current?.pause();
    };
  }, []);

  const startAudio = () => {
    if (!started) {
      setStarted(true);
      setMuted(false);
      rainRef.current?.play().catch(() => {});
      jazzRef.current?.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!started) {
      startAudio();
      return;
    }
    const newMuted = !muted;
    setMuted(newMuted);
    if (rainRef.current) rainRef.current.muted = newMuted;
    if (jazzRef.current) jazzRef.current.muted = newMuted;
  };

  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? "Unmute background audio" : "Mute background audio"}
      title={muted ? "Enable ambient sounds" : "Mute ambient sounds"}
      className="fixed top-4 right-4 z-50 touch-target h-[60px] w-[60px] rounded-full border-2 flex items-center justify-center text-xl transition-all hover:scale-110 focus-visible:outline-2"
      style={{
        borderColor: "var(--noir-sepia)",
        backgroundColor: "var(--noir-dark)",
        color: muted ? "var(--noir-cream)" : "var(--noir-sepia)",
      }}
    >
      {muted ? "🔇" : "🎵"}
    </button>
  );
}
