import case001 from "@/data/case-001.json";
import case002 from "@/data/case-002.json";
import case003 from "@/data/case-003.json";

export interface Hotspot {
  id: string;
  label: string;
  explanation: string;
  position: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

export interface DeductionOption {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface CaseData {
  id: string;
  title: string;
  scam_type: string;
  difficulty: string;
  briefing: string;
  evidence: {
    type: "sms" | "email" | "popup";
    html: string;
  };
  hotspots: Hotspot[];
  min_clues_to_deduce: number;
  deduction_options: DeductionOption[];
  learning_summary: string;
  has_interrogation: boolean;
}

export interface CaseSummary {
  id: string;
  title: string;
  scam_type: string;
  difficulty: string;
}

const allCases = [case001, case002, case003] as CaseData[];

export function getAllCases(): CaseSummary[] {
  return allCases.map(({ id, title, scam_type, difficulty }) => ({
    id,
    title,
    scam_type,
    difficulty,
  }));
}

export function getCaseById(id: string): CaseData | null {
  return allCases.find((c) => c.id === id) ?? null;
}
