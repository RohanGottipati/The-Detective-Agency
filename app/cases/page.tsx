"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllCases } from "@/lib/case-loader";
import { getArchive } from "@/lib/archive";
import CaseFolder from "@/components/CaseFolder";
import AudioController from "@/components/AudioController";
import { useEffect, useState } from "react";

export default function CasesPage() {
  const router = useRouter();
  const cases = getAllCases();
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const archive = getArchive();
    setSolvedIds(new Set(archive.map((e) => e.case_id)));
  }, []);

  return (
    <main
      className="min-h-screen px-5 sm:px-6 py-10"
      style={{ backgroundColor: "var(--noir-dark)" }}
    >
      <AudioController />

      <div className="max-w-3xl mx-auto">
        {/* Back to HQ */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base mb-8 hover:underline focus-visible:outline-2 rounded"
          style={{ color: "var(--noir-sepia)" }}
          aria-label="Back to headquarters"
        >
          ← Back to HQ
        </Link>

        <div className="mb-10 text-center">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-3"
            style={{ color: "var(--noir-cream)" }}
          >
            Open Cases
          </h1>
          <p className="text-lg" style={{ color: "var(--text-on-dark-muted)" }}>
            Select a case file to begin your investigation, Detective.
          </p>
        </div>

        {/* Case folders */}
        <div className="space-y-6 mt-8">
          {cases.map((c) => (
            <CaseFolder
              key={c.id}
              caseData={c}
              solved={solvedIds.has(c.id)}
              onClick={() => router.push(`/case/${c.id}`)}
            />
          ))}
        </div>

        {/* Archive link */}
        <div className="mt-12 text-center">
          <Link
            href="/archive"
            className="text-base hover:underline focus-visible:outline-2 rounded px-2"
            style={{ color: "var(--text-on-dark-muted)" }}
          >
            Review Closed Cases →
          </Link>
        </div>
      </div>
    </main>
  );
}
