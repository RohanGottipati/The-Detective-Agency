import { NextRequest } from "next/server";
import client from "@/lib/backboard";

const FALLBACK_COMMENDATION = `Detective, your work on this case has been exemplary. You identified the key markers of this scam with precision and instinct that only comes from years of experience. The Agency is proud to have an investigator of your caliber on our roster. Case closed — and another scammer stopped in their tracks.`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { case_id, case_title, scam_type, clues_found, total_clues, time_elapsed_seconds } = body;

  if (!case_id || !case_title || !scam_type || !clues_found || !total_clues || time_elapsed_seconds === undefined) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const clueLabels = Array.isArray(clues_found) ? clues_found.join(", ") : clues_found;
  const minutes = Math.floor(time_elapsed_seconds / 60);
  const seconds = time_elapsed_seconds % 60;
  const timeStr = minutes > 0 ? `${minutes} min ${seconds}s` : `${seconds} seconds`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const model = client.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `You are the Chief of The Detective Agency, a noir-styled organization of retired detectives who fight digital scams. Write personalized case commendations in the style of a 1940s detective agency chief — formal, respectful, and proud. Address the detective as "Detective." Keep it to 2–3 sentences. Use noir-appropriate language, warm and encouraging. Never condescending. These are seniors who deserve full respect.`,
    });

    const result = await model.generateContent(
      `Write a commendation for Detective who solved "${case_title}" — a ${scam_type} scam. They found ${Array.isArray(clues_found) ? clues_found.length : total_clues} of ${total_clues} clues (${clueLabels}) in ${timeStr}.`
    );

    const commendation = result.response.text() || FALLBACK_COMMENDATION;
    return Response.json({ commendation });
  } catch {
    return Response.json({ commendation: FALLBACK_COMMENDATION });
  }
}
