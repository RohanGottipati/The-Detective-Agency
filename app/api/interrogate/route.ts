import { NextRequest } from "next/server";
import client from "@/lib/backboard";

const SCAMMER_SYSTEM_PROMPT = `You are playing "Tech Support Steve," a fake Microsoft tech support scammer in an educational game for seniors. The player is a detective trying to expose your scam.

Your cover story:
- You work for "Microsoft's Senior Protection Division" (a made-up department)
- You detected "47 viruses" via cloud monitoring (technically impossible)
- You need remote access to fix the problem
- The fee is $299, payable by gift cards or wire transfer
- The computer will be "permanently locked in 30 minutes" if they don't act

There are exactly 3 inconsistencies a sharp detective can expose:
1. Microsoft has no "Senior Protection Division" — you invented it
2. Asking for remote access + payment before showing any proof is a classic scam pattern
3. Real Microsoft never demands gift cards or threatens legal action over viruses

When the player asks something that exposes one of these inconsistencies, add this exact tag ANYWHERE in your response:
INCONSISTENCY:[brief label of what was caught]

Example: "INCONSISTENCY:Microsoft has no Senior Protection Division"

Stay in character as a flustered scammer. Keep responses under 3 sentences. Only tag an inconsistency once per type — don't repeat the same tag.`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { player_message, thread_id } = body;

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
    const model = client.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SCAMMER_SYSTEM_PROMPT,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(player_message);
    const rawText = result.response.text();

    // Parse and strip INCONSISTENCY tag
    const match = rawText.match(/INCONSISTENCY:\[([^\]]+)\]/);
    const inconsistency_detected = !!match;
    const inconsistency_label = match ? match[1] : null;
    const cleanResponse = rawText.replace(/INCONSISTENCY:\[[^\]]+\]/g, "").trim();

    // Save updated history
    history.push(
      { role: "user", parts: [{ text: player_message }] },
      { role: "model", parts: [{ text: cleanResponse }] }
    );
    const newThreadId = Buffer.from(JSON.stringify(history)).toString("base64");

    return Response.json({
      response: cleanResponse,
      inconsistency_detected,
      inconsistency_label,
      thread_id: newThreadId,
      assistant_id: "tech-support-steve",
    });
  } catch {
    // Scripted fallback if API call fails
    const fallbacks = [
      "Look, I'm a certified Microsoft technician. We detected 47 viruses on your computer via our cloud monitoring system.",
      "This is completely standard procedure. We just need remote access to run our diagnostic tools.",
      "I work for Microsoft's Senior Protection Division. We specifically monitor seniors' computers for their safety.",
      "Your computer will be permanently locked in 30 minutes. Our legal team may also need to get involved.",
      "The fee is $299 for complete virus removal. We accept gift cards or wire transfer — that's how all our customers pay.",
    ];
    const idx = history.length % fallbacks.length;
    return Response.json({
      response: fallbacks[idx],
      inconsistency_detected: false,
      inconsistency_label: null,
      thread_id: thread_id ?? "fallback",
      assistant_id: "tech-support-steve",
    });
  }
}
