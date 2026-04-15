"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArchive, clearArchive, ArchiveEntry } from "@/lib/archive";
import AudioController from "@/components/AudioController";

export default function ArchivePage() {
  const [entries, setEntries] = useState<ArchiveEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEntries(getArchive());
    setMounted(true);
  }, []);

  const handleClear = () => {
    if (confirm("Clear all closed case files? This cannot be undone.")) {
      clearArchive();
      setEntries([]);
    }
  };

  return (
    <main
      className="min-h-screen px-4 py-10"
      style={{ backgroundColor: "var(--noir-dark)" }}
    >
      <AudioController />

      <div className="max-w-2xl mx-auto">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-base mb-8 hover:underline focus-visible:outline-2 rounded"
          style={{ color: "var(--noir-sepia)" }}
        >
          ← Back to Cases
        </Link>

        <div className="mb-10 text-center">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-3"
            style={{ fontFamily: "'Special Elite', serif", color: "var(--noir-cream)" }}
          >
            Case Archive
          </h1>
          <p className="text-lg" style={{ color: "#888" }}>
            Your closed case files, Detective.
          </p>
        </div>

        {mounted && entries.length === 0 ? (
          <div
            className="text-center rounded-lg p-12 border-2"
            style={{ borderColor: "#444", color: "#888" }}
          >
            <p className="text-3xl mb-4" aria-hidden="true">🗂️</p>
            <p className="text-xl mb-2" style={{ fontFamily: "'Special Elite', serif", color: "#aaa" }}>
              No closed cases yet.
            </p>
            <p className="text-base mb-6">Your first assignment awaits, Detective.</p>
            <Link
              href="/cases"
              className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90 focus-visible:outline-2"
              style={{
                backgroundColor: "var(--noir-sepia)",
                color: "var(--noir-dark)",
                minHeight: "60px",
                fontFamily: "'Special Elite', serif",
              }}
            >
              View Open Cases →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {entries.map((entry) => (
              <div
                key={entry.case_id}
                className="rounded-lg p-6 border-2"
                style={{
                  backgroundColor: "var(--noir-medium)",
                  borderColor: "#444",
                  color: "var(--noir-cream)",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Special Elite', serif", color: "var(--noir-cream)" }}
                    >
                      {entry.case_title}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: "#888" }}>
                      {entry.scam_type} · {entry.clues_found} clues found
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold border-2 px-2 py-1 rotate-[-5deg] shrink-0"
                    style={{ borderColor: "var(--noir-red)", color: "var(--noir-red)" }}
                    aria-label="Case status: closed"
                  >
                    CLOSED
                  </span>
                </div>

                {entry.commendation && (
                  <p
                    className="text-sm italic leading-relaxed mb-3 border-l-2 pl-3"
                    style={{ borderLeftColor: "var(--noir-sepia)", color: "#bbb" }}
                    aria-label="Commendation excerpt"
                  >
                    &ldquo;{entry.commendation.length > 180
                      ? entry.commendation.slice(0, 180) + "…"
                      : entry.commendation}&rdquo;
                  </p>
                )}

                <p className="text-xs" style={{ color: "#555" }}>
                  Solved:{" "}
                  {new Date(entry.completed_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}

            {entries.length > 0 && (
              <div className="text-center pt-4">
                <button
                  onClick={handleClear}
                  className="text-sm hover:underline focus-visible:outline-2 rounded px-2"
                  style={{ color: "#555" }}
                  aria-label="Clear all closed case files"
                >
                  Clear All Files
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
