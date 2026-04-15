"use client";

import { useEffect, useState } from "react";

interface CommendationCardProps {
  text: string;
  caseTitle: string;
  learningSummary: string;
  isLoading?: boolean;
  onAddToArchive: () => void;
  onReturnToCases: () => void;
}

export default function CommendationCard({
  text,
  caseTitle,
  learningSummary,
  isLoading,
  onAddToArchive,
  onReturnToCases,
}: CommendationCardProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        return;
      }
      const nextCharacter = text[i];
      setDisplayed((prev) => prev + nextCharacter);
      i++;
    }, 28);
    return () => clearInterval(interval);
  }, [text]);

  if (isLoading) {
    return (
      <div
        className="rounded-lg p-8 border-2 max-w-2xl mx-auto text-center"
        style={{ backgroundColor: "var(--noir-paper)", borderColor: "var(--noir-sepia)", color: "var(--noir-dark)" }}
        role="status"
        aria-live="polite"
        aria-label="Generating commendation"
      >
        <p
          className="text-2xl italic animate-pulse"
          style={{ color: "var(--noir-dark)" }}
        >
          One moment, Detective...
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg p-8 border-2 max-w-2xl mx-auto"
      style={{ backgroundColor: "var(--noir-paper)", borderColor: "var(--noir-sepia)", color: "var(--noir-dark)" }}
      role="article"
      aria-label="Case commendation"
    >
      {/* Red stamp header */}
      <div className="text-center mb-6">
        <div
          className="case-closed-stamp inline-block border-4 px-8 py-3 text-2xl font-bold tracking-widest mb-4"
          style={{ borderColor: "var(--noir-red)", color: "var(--noir-red)" }}
          aria-label="Case closed stamp"
        >
          CASE CLOSED
        </div>
        <h2
          className="text-2xl font-bold mt-2"
          style={{ color: "var(--noir-dark)" }}
        >
          {caseTitle}
        </h2>
      </div>

      {/* Typewriter commendation */}
      <div
        className="text-[22px] leading-relaxed mb-6 p-4 rounded border-l-4 min-h-[80px]"
        style={{
          borderLeftColor: "var(--noir-sepia)",
          backgroundColor: "rgba(200, 169, 110, 0.1)",
          fontStyle: "italic",
          color: "var(--text-on-paper)",
        }}
        aria-live="polite"
        aria-label="Commendation text"
      >
        {displayed}
        {!done && (
          <span aria-hidden="true" style={{ borderRight: "2px solid var(--noir-dark)" }}>
            &nbsp;
          </span>
        )}
      </div>

      {/* Learning summary */}
      <div
        className="rounded p-4 mb-6 text-[22px]"
        style={{ backgroundColor: "rgba(0,0,0,0.08)", color: "var(--text-on-paper-secondary)" }}
      >
        <p className="font-bold mb-1" style={{ color: "var(--noir-dark)" }}>
          Key Takeaway:
        </p>
        <p>{learningSummary}</p>
      </div>

      {/* Actions */}
      {done && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onAddToArchive}
            className="flex-1 text-center py-4 rounded-lg font-bold text-xl transition-all hover:opacity-90 focus-visible:outline-2"
            style={{
              backgroundColor: "var(--noir-sepia)",
              color: "var(--noir-dark)",
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Add to Archive
          </button>
          <button
            type="button"
            onClick={onReturnToCases}
            className="flex-1 text-center py-4 rounded-lg font-bold text-xl transition-all hover:opacity-90 focus-visible:outline-2"
            style={{
              backgroundColor: "var(--noir-dark)",
              color: "var(--noir-cream)",
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Return to Cases
          </button>
        </div>
      )}
    </div>
  );
}
