import { NextRequest } from "next/server";
import { assertGeminiConfigured, getGeminiFlash } from "@/lib/gemini";

const SYSTEM_PROMPT = `You are a friendly helper for a detective-themed learning app. The user may be an older adult who is confused about what to do. In 2 to 3 short sentences, answer their question using only what is described about their current screen. Be warm, plain, and direct. Never use technical jargon. If they say they are lost, tell them what they can tap and what it will do.`;

const FALLBACK = "I'm having a little trouble right now. Try tapping one of the items on your screen, and I'll be ready to help in a moment.";

export async function POST(req: NextRequest) {
  try {
    const { question, screenContext } = (await req.json()) as {
      question?: unknown;
      screenContext?: unknown;
    };

    if (!question || typeof question !== "string") {
      return Response.json({ error: "Missing question" }, { status: 400 });
    }

    assertGeminiConfigured();

    const context = typeof screenContext === "string" ? screenContext : "the main screen";
    const prompt = `Current screen: ${context}\n\nUser asked: ${question}`;

    const model = getGeminiFlash(SYSTEM_PROMPT);
    const result = await model.generateContent(prompt);
    const response = result.response.text().trim() || FALLBACK;

    return Response.json({ response });
  } catch (err) {
    console.error("Voice guide error:", err);
    return Response.json({ response: FALLBACK });
  }
}
