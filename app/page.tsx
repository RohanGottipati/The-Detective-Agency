"use client";

import Link from "next/link";
import AudioController from "@/components/AudioController";

export default function Home() {
  return (
    <main
      className="page-fade-in min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-5 py-14"
      style={{ backgroundColor: "var(--noir-dark)" }}
    >
      <AudioController />

      {/* Rain and desk-shadow texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(115deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 16px),
            radial-gradient(ellipse at 50% 30%, rgba(200,169,110,0.11), transparent 48%),
            radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.76), transparent 58%)
          `,
          opacity: 0.8,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,26,26,0.2), rgba(26,26,26,0.95)), radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.78) 100%)",
        }}
      />
      <div className="scanlines absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-3xl text-center mx-auto">
        <div
          className="inline-block border-2 px-5 py-3 text-xl font-bold uppercase mb-8"
          style={{ borderColor: "var(--noir-sepia)", color: "var(--noir-sepia)" }}
          aria-hidden="true"
        >
          Digital Crimes Division
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-5"
          style={{
            color: "var(--noir-sepia)",
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          }}
        >
          THE DETECTIVE AGENCY
        </h1>

        <p
          className="text-2xl sm:text-3xl mb-6 leading-relaxed"
          style={{ color: "var(--noir-cream)" }}
        >
          Retired. But not done.
        </p>

        <p
          className="text-[22px] mb-10 leading-relaxed max-w-2xl mx-auto"
          style={{ color: "var(--noir-cream)" }}
        >
          Digital crimes are rising. The young detectives don&apos;t know what
          they&apos;re looking at. They need your wisdom.
        </p>

        <Link
          href="/cases"
          className="inline-flex items-center justify-center px-10 py-5 text-2xl font-bold transition-all hover:translate-y-[-2px] hover:shadow-2xl focus-visible:outline-2"
          style={{
            backgroundColor: "var(--noir-sepia)",
            color: "var(--noir-dark)",
            minHeight: "72px",
            boxShadow: "0 4px 30px rgba(200, 169, 110, 0.3)",
          }}
          aria-label="Accept your assignment and view open cases"
        >
          Accept the Assignment
        </Link>

        <div className="mt-8">
          <Link
            href="/archive"
            className="inline-flex min-h-[60px] items-center px-3 text-xl hover:underline focus-visible:outline-2"
            style={{ color: "var(--noir-sepia)" }}
          >
            View Agency Files
          </Link>
        </div>
      </div>
    </main>
  );
}
