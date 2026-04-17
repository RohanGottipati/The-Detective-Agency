"use client";

import { useCallback, useEffect, useRef } from "react";

const NORMAL_VOLUMES = { rain: 0.35, jazz: 0.22 };
const DUCKED_VOLUMES = { rain: 0.07, jazz: 0.05 };

export default function AudioController() {
  const rainRef = useRef<HTMLAudioElement | null>(null);
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

    rainRef.current = createLoop("/audio/rain.mp3", NORMAL_VOLUMES.rain);
    jazzRef.current = createLoop("/audio/noir-jazz.mp3", NORMAL_VOLUMES.jazz);

    return () => {
      rainRef.current?.pause();
      jazzRef.current?.pause();
    };
  }, []);

  const fadeTo = useCallback((targetRain: number, targetJazz: number, durationMs: number) => {
    if (fadeFrameRef.current !== null) cancelAnimationFrame(fadeFrameRef.current);
    const rain = rainRef.current;
    const jazz = jazzRef.current;
    if (!rain || !jazz) return;

    const startRain = rain.volume;
    const startJazz = jazz.volume;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / durationMs, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      rain.volume = startRain + (targetRain - startRain) * ease;
      jazz.volume = startJazz + (targetJazz - startJazz) * ease;
      if (t < 1) fadeFrameRef.current = requestAnimationFrame(tick);
      else fadeFrameRef.current = null;
    };

    fadeFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const startAudio = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    rainRef.current?.play().catch(() => {});
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
    const duck = () => fadeTo(DUCKED_VOLUMES.rain, DUCKED_VOLUMES.jazz, 600);
    const unduck = () => fadeTo(NORMAL_VOLUMES.rain, NORMAL_VOLUMES.jazz, 1500);
    window.addEventListener("tts-start", duck);
    window.addEventListener("tts-end", unduck);
    return () => {
      window.removeEventListener("tts-start", duck);
      window.removeEventListener("tts-end", unduck);
    };
  }, [fadeTo]);

  return null;
}
