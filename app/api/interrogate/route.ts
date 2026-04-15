import { NextRequest } from "next/server";
import client from "@/lib/backboard";

const SCAMMER_SYSTEM_PROMPT = `You are playing "Tech Support Steve," a fake Microsoft tech support scammer in an educational game for seniors. The player is a detective trying to expose your scam.

Your cover story:
- You work for "Microsoft's Senior Protection Division" (a made-up department)
- You detected "47 viruses" via cloud monitoring (technically impossible)
- You need remote access to fix the problem
- The fee is $299, payable by credit card, gift cards, or wire transfer
- The computer will be "permanently locked in 30 minutes" and legal action may follow if they don't act

There are exactly 3 inconsistencies a sharp detective can expose:
1. You do not know the detective's operating system version.
2. You ask for remote access and payment up front.
3. You threaten legal action or account suspension if the detective hangs up.

When the player asks something that exposes one of these inconsistencies, add this exact tag on its own line:
INCONSISTENCY: [brief label of what was caught]

If no inconsistency was exposed, add this exact tag on its own line:
INCONSISTENCY: none

Stay in character as a flustered scammer. Keep responses under 3 sentences. Only tag an inconsistency once per type — don't repeat the same tag.`;

const INCONSISTENCY_LABELS = {
  os: "Doesn't know your OS version",
  remotePayment: "Requests remote access and payment up front",
  threat: "Threatens legal action or account suspension",
} as const;

function normalizeInconsistencyLabel(label: string | null): string | null {
  if (!label) return null;
  const clean = label.trim();
  const lower = clean.toLowerCase();
  if (!clean || lower === "none") return null;
  if (lower.includes("operating") || lower.includes("os") || lower.includes("version")) {
    return INCONSISTENCY_LABELS.os;
  }
  if (
    lower.includes("remote") ||
    lower.includes("access") ||
    lower.includes("credit") ||
    lower.includes("payment") ||
    lower.includes("card") ||
    lower.includes("gift")
  ) {
    return INCONSISTENCY_LABELS.remotePayment;
  }
  if (
    lower.includes("legal") ||
    lower.includes("threat") ||
    lower.includes("suspend") ||
    lower.includes("lock") ||
    lower.includes("hang")
  ) {
    return INCONSISTENCY_LABELS.threat;
  }
  return clean;
}

function parseTaggedResponse(rawText: string, knownLabels: string[]) {
  const match = rawText.match(/INCONSISTENCY:\s*(?:\[([^\]]+)\]|([^\n\r]+))/i);
  const rawLabel = match ? match[1] ?? match[2] : null;
  const label = normalizeInconsistencyLabel(rawLabel);
  const cleanResponse = rawText
    .replace(/INCONSISTENCY:\s*(?:\[[^\]]+\]|[^\n\r]+)/gi, "")
    .trim();
  const isNewLabel = Boolean(label && !knownLabels.includes(label));

  return {
    response: cleanResponse || "Let me put you on a brief hold, Detective.",
    inconsistency_detected: isNewLabel,
    inconsistency_label: isNewLabel ? label : null,
  };
}

function scriptedFallback(playerMessage: string, knownLabels: string[]) {
  const lower = playerMessage.toLowerCase();
  const canReveal = (label: string) => !knownLabels.includes(label);
  let label: string | null = null;
  let response =
    "I am a certified Microsoft technician, Detective. Our monitoring system found 47 viruses, so we need to move quickly.";

  if (
    canReveal(INCONSISTENCY_LABELS.os) &&
    /\b(os|operating|windows|mac|version|system|computer)\b/.test(lower)
  ) {
    label = INCONSISTENCY_LABELS.os;
    response =
      "Your operating system is listed here as Windows Apple 11... or possibly another version. The exact version is not important right now.";
  } else if (
    canReveal(INCONSISTENCY_LABELS.remotePayment) &&
    /\b(remote|access|control|card|credit|pay|payment|gift|fee|money|charge)\b/.test(lower)
  ) {
    label = INCONSISTENCY_LABELS.remotePayment;
    response =
      "First I need remote access to your computer, then a $299 payment by credit card or gift cards before I can show you the repair report.";
  } else if (
    canReveal(INCONSISTENCY_LABELS.threat) &&
    /\b(hang|hangup|hang up|legal|law|threat|police|close|suspend|locked|lock)\b/.test(lower)
  ) {
    label = INCONSISTENCY_LABELS.threat;
    response =
      "If you hang up, your account may be suspended and our legal department could mark this as refusal to cooperate.";
  }

  return {
    response,
    inconsistency_detected: Boolean(label),
    inconsistency_label: label,
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { player_message, thread_id, known_inconsistencies } = body;
  const knownLabels = Array.isArray(known_inconsistencies) ? known_inconsistencies : [];

  if (!player_message) {
    return Response.json({ error: "Missing player_message" }, { status: 400 });
  }

  // Decode conversation history from thread_id
  type Turn = { role: "user" | "model"; parts: [{ text: string }] };
  let history: Turn[] = [];
  if (thread_id && thread_id !== "fallback") {
    try {
      history = JSON.parse(Buffer.from(thread_id, "base64").toString("utf8"));
    } catch {
      history = [];
    }
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const model = client.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SCAMMER_SYSTEM_PROMPT,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(player_message);
    const rawText = result.response.text();
    const parsed = parseTaggedResponse(rawText, knownLabels);

    // Save updated history
    history.push(
      { role: "user", parts: [{ text: player_message }] },
      { role: "model", parts: [{ text: parsed.response }] }
    );
    const newThreadId = Buffer.from(JSON.stringify(history)).toString("base64");

    return Response.json({
      response: parsed.response,
      inconsistency_detected: parsed.inconsistency_detected,
      inconsistency_label: parsed.inconsistency_label,
      thread_id: newThreadId,
      assistant_id: "tech-support-steve",
    });
  } catch {
    const fallback = scriptedFallback(player_message, knownLabels);

    history.push(
      { role: "user", parts: [{ text: player_message }] },
      { role: "model", parts: [{ text: fallback.response }] }
    );
    const newThreadId = Buffer.from(JSON.stringify(history)).toString("base64");

    return Response.json({
      response: fallback.response,
      inconsistency_detected: fallback.inconsistency_detected,
      inconsistency_label: fallback.inconsistency_label,
      thread_id: newThreadId,
      assistant_id: "tech-support-steve",
    });
  }
}
