# The Detective Agency

A noir-themed digital literacy game for older adults: play a retired detective called back to solve real-world scam cases, and practise everyday phone skills with an AI tutor.

Built for the GenLink Hacks hackathon.

## Features

- **Detective's desk home screen**: a rotary phone plays the Chief's audio briefing with synced captions, the evidence recorder opens the case board, and the teletype manual opens the Lab.
- **Five scam case files** (`data/case-000.json` to `case-004.json`): a tutorial, a grandparent scam, a phishing email, fake tech support, and an app-navigation case with a step-by-step phone simulator. Each case goes briefing, investigation (tap evidence hotspots to stamp clues), deduction, an optional interrogation, then commendation.
- **AI interrogation**: in the tech support case you question a simulated scammer (Gemini); the route flags inconsistencies in the scammer's story.
- **The Informant**: a chat panel on the case board and case pages that answers questions in character (Gemini).
- **AI commendation**: a personalised closing note when a case is solved (Gemini), saved to the browser-local **Agency Files** archive (`/archive`).
- **The Lab** (`/lab`, or the teletype manual on the desk): guided practice scenarios on a simulated smartphone (Wi-Fi setup, prompt engineering, video calling, spotting a scam email, AI for health questions) with an AI tutor chat.
- **Voice help**: a mic button uses the browser's speech recognition, asks the Chief (`/api/voice-guide`) and reads the answer aloud via ElevenLabs text-to-speech.
- **Field Manual** page (`/literacy`): short explainers on LLMs, how scammers use AI, red flags, and a glossary.
- Background noir jazz loop that starts on the first click or keypress.

The Gemini routes return a canned fallback response when `GEMINI_API_KEY` is not set or a request fails. `/api/tts` returns a 503 when `ELEVENLABS_API_KEY` is not set.

## Tech stack

- [Next.js 14](https://nextjs.org) (App Router) + React 18 + TypeScript
- Tailwind CSS and [Framer Motion](https://www.framer.com/motion/)
- [lucide-react](https://lucide.dev) icons
- Google Gemini via `@google/generative-ai` (default model `gemini-2.5-flash`)
- ElevenLabs text-to-speech via the `elevenlabs` SDK

## Project structure

```
app/
  page.tsx              Detective's desk (home)
  cases/                Case board
  case/[id]/            Active case flow
  archive/              Solved-case archive (localStorage)
  lab/                  Lab practice scenarios
  literacy/             Field Manual
  api/
    commendation/       Gemini: case-closed commendation
    interrogate/        Gemini: tech-support scammer interrogation
    informant/          Gemini: in-character help chat
    lab-tutor/          Gemini: Lab tutor chat
    voice-guide/        Gemini: spoken help for the mic button
    tts/                ElevenLabs text-to-speech (returns audio/mpeg)
components/             Game UI (desk props, evidence viewer, chats, phone simulator, ...)
components/lab/         Lab UI (scenario selector, smartphone simulator, tutor chat)
data/                   Case files (JSON)
lib/                    Gemini client, case loader, archive storage, Lab scenarios
public/audio/           Briefing, background jazz and phone ring audio
scripts/test-api.ts     Smoke test for the commendation / interrogate / informant routes
```

Design and planning documents: [`The_Detective_Agency_Full_Build_PRD.md`](The_Detective_Agency_Full_Build_PRD.md) and [`The_Detective_Agency_Master_Spec.md`](The_Detective_Agency_Master_Spec.md). These were written before the build, so details may differ from the code.

## Prerequisites

- Node.js 18.17 or newer (required by Next.js 14) and npm
- Optional: a Google Gemini API key and an ElevenLabs API key

## Setup

```bash
npm install
cp .env.local.example .env.local   # then fill in your keys
npm run dev
```

Open http://localhost:3000.

## Environment variables

Set these in `.env.local` (see [`.env.local.example`](.env.local.example)):

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key used by the commendation, interrogate, informant, lab-tutor and voice-guide routes |
| `GEMINI_MODEL` | Optional Gemini model name (defaults to `gemini-2.5-flash`) |
| `ELEVENLABS_API_KEY` | ElevenLabs API key used by `/api/tts` |
| `API_BASE_URL` | Only for `scripts/test-api.ts`: base URL of the running app (defaults to `http://localhost:3000`) |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (`next lint`) |
| `npx tsx scripts/test-api.ts` | With the app running, smoke-test the commendation, interrogate and informant API routes |

## Deployment

It is a standard Next.js app, so it can be deployed to any Next.js host (e.g. Vercel). Set `GEMINI_API_KEY`, `ELEVENLABS_API_KEY` and optionally `GEMINI_MODEL` in the host's environment settings.
