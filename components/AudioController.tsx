"use client";

import { useCallback, useEffect, useRef } from "react";

const NORMAL_VOLUME = 0.22;
const DUCKED_VOLUME = 0.05;

export default function AudioController() {
  const jazzRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const fadeFrameRef = useRef<number | null>(null);

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

    jazzRef.current = createLoop("/audio/noir-jazz.mp3", NORMAL_VOLUME);

    return () => {
      jazzRef.current?.pause();
    };
  }, []);

  const fadeTo = useCallback((target: number, durationMs: number) => {
    if (fadeFrameRef.current !== null) cancelAnimationFrame(fadeFrameRef.current);
    const jazz = jazzRef.current;
    if (!jazz) return;

    const start = jazz.volume;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / durationMs, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      jazz.volume = start + (target - start) * ease;
      if (t < 1) fadeFrameRef.current = requestAnimationFrame(tick);
      else fadeFrameRef.current = null;
    };

    fadeFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const startAudio = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    jazzRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    window.addEventListener("pointerdown", startAudio, { once: true });
    window.addEventListener("keydown", startAudio, { once: true });
    return () => {
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("keydown", startAudio);
    };
  }, [startAudio]);

  useEffect(() => {
    const duck = () => fadeTo(DUCKED_VOLUME, 600);
    const unduck = () => fadeTo(NORMAL_VOLUME, 1500);
    window.addEventListener("tts-start", duck);
    window.addEventListener("tts-end", unduck);
    return () => {
      window.removeEventListener("tts-start", duck);
      window.removeEventListener("tts-end", unduck);
    };
  }, [fadeTo]);

  return null;
}
