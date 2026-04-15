"use client";

import type { MouseEvent } from "react";
import { CaseData, Hotspot } from "@/lib/case-loader";

interface EvidenceViewerProps {
  evidence: CaseData["evidence"];
  hotspots: Hotspot[];
  foundClues: string[];
  onClueFound: (hotspot: Hotspot) => void;
  onWrongClick: (message: string) => void;
}

const EVIDENCE_LABELS: Record<string, string> = {
  sms: "SMS Message",
  email: "Email",
  popup: "Browser Pop-up",
  phone_sim: "Phone Simulator",
};

export default function EvidenceViewer({
  evidence,
  hotspots,
  foundClues,
  onClueFound,
  onWrongClick,
}: EvidenceViewerProps) {
  const evidenceHtml = evidence.html
    .replace(/<a\b([^>]*)href=(["']).*?\2([^>]*)>/gi, "<span$1$3>")
    .replace(/<\/a>/gi, "</span>");

  const handleHotspotClick = (
    event: MouseEvent<HTMLButtonElement>,
    hotspot: Hotspot
  ) => {
    event.stopPropagation();
    if (foundClues.includes(hotspot.id)) {
      onWrongClick("You already marked that clue, Detective.");
      return;
    }
    onClueFound(hotspot);
  };

  return (
    <div className="w-full">
      <div
        className="text-xl font-bold uppercase tracking-widest mb-3 px-1"
        style={{ color: "var(--noir-sepia)" }}
        aria-label={`Evidence type: ${EVIDENCE_LABELS[evidence.type]}`}
      >
        EXHIBIT A — {EVIDENCE_LABELS[evidence.type]}
      </div>

      <div
        className="relative overflow-hidden border-2"
        style={{ borderColor: "var(--noir-sepia)" }}
        onClick={(event) => {
          event.preventDefault();
          onWrongClick("Nothing suspicious there, Detective. Keep scanning the evidence.");
        }}
      >
        {/* Evidence content */}
        <div
          className="evidence-document relative"
          dangerouslySetInnerHTML={{ __html: evidenceHtml }}
          aria-label="Evidence document"
        />

        {/* Hotspot overlays */}
        {hotspots.map((hotspot) => {
          const isFound = foundClues.includes(hotspot.id);
          return (
            <button
              key={hotspot.id}
              onClick={(event) => handleHotspotClick(event, hotspot)}
              aria-label={isFound ? `Clue already found: ${hotspot.label}` : `Tap to investigate this area`}
              aria-pressed={isFound}
              className="absolute transition-all duration-200 group"
              style={{
                top: hotspot.position.top,
                left: hotspot.position.left,
                width: hotspot.position.width,
                height: hotspot.position.height,
                minWidth: "60px",
                minHeight: "60px",
                backgroundColor: isFound
                  ? "rgba(139, 0, 0, 0.15)"
                  : "rgba(200, 169, 110, 0.0)",
                border: isFound
                  ? "2px solid rgba(139, 0, 0, 0.6)"
                  : "2px solid transparent",
                cursor: isFound ? "default" : "crosshair",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                if (!isFound) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(200, 169, 110, 0.2)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200, 169, 110, 0.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isFound) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(200, 169, 110, 0.0)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
                }
              }}
            >
              {isFound && (
                <span
                  className="absolute inset-0 flex items-center justify-center text-xl font-bold opacity-80 select-none pointer-events-none"
                  style={{ color: "var(--noir-red)" }}
                  aria-hidden="true"
                >
                  NOTED
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p
        className="mt-3 text-center text-xl italic"
        style={{ color: "var(--noir-cream)" }}
        aria-label="Instruction: tap highlighted areas to find clues"
      >
        Tap suspicious areas of the evidence to mark clues
      </p>

      <p
        className="mt-4 text-center font-bold"
        style={{ fontSize: "22px", color: "var(--noir-cream)" }}
        aria-live="polite"
        aria-label={`${foundClues.length} of ${hotspots.length} clues found`}
      >
        Clues Found: {foundClues.length} of {hotspots.length}
      </p>
    </div>
  );
}
