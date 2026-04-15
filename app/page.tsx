"use client";

import Link from "next/link";
import AudioController from "@/components/AudioController";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{ backgroundColor: "var(--noir-dark)" }}
    >
      <AudioController />

      {/* Atmospheric background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(200,169,110,0.3) 40px, rgba(200,169,110,0.3) 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(200,169,110,0.3) 40px, rgba(200,169,110,0.3) 41px)
          `,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Agency badge */}
        <div
          className="inline-block border-2 rounded-full px-6 py-2 text-sm font-bold uppercase tracking-widest mb-8"
          style={{ borderColor: "var(--noir-sepia)", color: "var(--noir-sepia)" }}
          aria-hidden="true"
        >
          Est. 2024 — Digital Crimes Division
        </div>

        {/* Main headline */}
        <h1
          className="text-5xl sm:text-6xl font-bold leading-tight mb-4"
          style={{
            fontFamily: "'Special Elite', serif",
            color: "var(--noir-cream)",
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          }}
        >
          THE DETECTIVE
          <br />
          <span style={{ color: "var(--noir-sepia)" }}>AGENCY</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-xl sm:text-2xl mb-4 leading-relaxed"
          style={{ color: "#aaa", fontStyle: "italic" }}
        >
          Your experience is needed, Detective.
        </p>

        <p
          className="text-base sm:text-lg mb-10 leading-relaxed max-w-lg mx-auto"
          style={{ color: "#888" }}
        >
          Scammers are targeting seniors with sophisticated digital tricks.
          Three open cases are waiting for a detective of your skill.
        </p>

        {/* CTA */}
        <Link
          href="/cases"
          className="inline-block px-10 py-5 rounded-lg text-xl font-bold transition-all hover:scale-105 hover:shadow-2xl focus-visible:outline-2"
          style={{
            backgroundColor: "var(--noir-sepia)",
            color: "var(--noir-dark)",
            minHeight: "60px",
            fontFamily: "'Special Elite', serif",
            boxShadow: "0 4px 30px rgba(200, 169, 110, 0.3)",
          }}
          aria-label="Accept your assignment and view open cases"
        >
          Accept the Assignment →
        </Link>

        {/* Archive link */}
        <div className="mt-8">
          <Link
            href="/archive"
            className="text-base hover:underline focus-visible:outline-2 rounded"
            style={{ color: "#666" }}
          >
            Review closed cases →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p
        className="absolute bottom-6 text-sm"
        style={{ color: "#444" }}
        aria-hidden="true"
      >
        Digital Literacy · Protecting Our Community Since Day One
      </p>
    </main>
  );
}
