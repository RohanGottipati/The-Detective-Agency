"use client";

import { CaseSummary } from "@/lib/case-loader";

interface CaseFolderProps {
  caseData: CaseSummary;
  onClick: () => void;
  solved?: boolean;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "#2d6a4f",
  Intermediate: "#b5838d",
  Advanced: "#8B0000",
};

const SCAM_ICONS: Record<string, string> = {
  "Grandparent Scam": "📱",
  "Phishing Email": "📧",
  "Tech Support Scam": "💻",
};

export default function CaseFolder({ caseData, onClick, solved }: CaseFolderProps) {
  const diffColor = DIFFICULTY_COLORS[caseData.difficulty] ?? "#C8A96E";
  const icon = SCAM_ICONS[caseData.scam_type] ?? "🔍";

  return (
    <button
      onClick={onClick}
      aria-label={`Open case: ${caseData.title}`}
      className="group relative w-full text-left transition-all duration-200 hover:-translate-y-1 hover:rotate-1 focus-visible:outline-2 rounded-lg"
      style={{ minHeight: "60px" }}
    >
      {/* Folder tab */}
      <div
        className="absolute -top-3 left-6 px-3 py-1 rounded-t-md text-sm font-bold z-10"
        style={{ backgroundColor: "var(--noir-paper)", color: "var(--noir-dark)" }}
      >
        CASE FILE
      </div>

      {/* Folder body */}
      <div
        className="relative rounded-lg p-6 pt-8 border-2 transition-all duration-200"
        style={{
          backgroundColor: "var(--noir-paper)",
          borderColor: "var(--noir-sepia)",
          color: "var(--noir-dark)",
        }}
      >
        {solved && (
          <div
            className="absolute top-3 right-4 text-sm font-bold rotate-[-12deg] border-2 px-2 py-1 opacity-80"
            style={{ color: "var(--noir-red)", borderColor: "var(--noir-red)" }}
          >
            CLOSED
          </div>
        )}

        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl" aria-hidden="true">{icon}</span>
          <div>
            <h3
              className="text-xl font-bold leading-tight"
              style={{ fontFamily: "'Special Elite', serif", color: "var(--noir-dark)" }}
            >
              {caseData.title}
            </h3>
            <p className="text-sm mt-1" style={{ color: "#555" }}>
              {caseData.scam_type}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span
            className="text-xs font-bold px-2 py-1 rounded uppercase tracking-wide text-white"
            style={{ backgroundColor: diffColor }}
          >
            {caseData.difficulty}
          </span>
          <span className="text-xs" style={{ color: "#777" }}>
            Click to open file
          </span>
        </div>
      </div>
    </button>
  );
}
