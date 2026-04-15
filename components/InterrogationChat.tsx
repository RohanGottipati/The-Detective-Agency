"use client";

import { FormEvent, useRef, useState } from "react";

interface Message {
  role: "player" | "scammer";
  content: string;
  inconsistency?: string;
}

interface InterrogationChatProps {
  inconsistenciesFound: number;
  onInconsistencyFound: (label: string) => void;
  onComplete: () => void;
}

export default function InterrogationChat({
  inconsistenciesFound,
  onInconsistencyFound,
  onComplete,
}: InterrogationChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "scammer",
      content:
        "Hello! This is Tech Support Steve from Microsoft's Senior Protection Division. We've detected 47 viruses on your computer and I need to speak with you immediately about securing your system.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [foundLabels, setFoundLabels] = useState<Set<string>>(new Set());
  const endRef = useRef<HTMLDivElement | null>(null);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const playerMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "player", content: playerMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/interrogate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player_message: playerMsg,
          thread_id: threadId,
          assistant_id: null,
        }),
      });

      const data = await res.json();
      setThreadId(data.thread_id);

      const newMsg: Message = { role: "scammer", content: data.response };
      if (data.inconsistency_detected && data.inconsistency_label && !foundLabels.has(data.inconsistency_label)) {
        newMsg.inconsistency = data.inconsistency_label;
        setFoundLabels((prev) => {
          const updated = new Set(prev);
          updated.add(data.inconsistency_label);
          return updated;
        });
        onInconsistencyFound(data.inconsistency_label);

        // Check if this was the 3rd (completing)
        if (inconsistenciesFound + 1 >= 3) {
          setTimeout(() => onComplete(), 1500);
        }
      }

      setMessages((prev) => [...prev, newMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "scammer",
          content: "Uh... look, just trust me on this. I'm a Microsoft technician.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  return (
    <div
      className="rounded-lg border-2 overflow-hidden flex flex-col"
      style={{ borderColor: "var(--noir-sepia)", backgroundColor: "var(--noir-medium)", maxHeight: "70vh" }}
      role="log"
      aria-label="Interrogation chat"
      aria-live="polite"
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between gap-4 border-b"
        style={{ borderColor: "var(--noir-sepia)", backgroundColor: "var(--noir-dark)" }}
      >
        <div>
          <h3 className="font-bold text-lg" style={{ color: "var(--noir-sepia)" }}>
            Interrogation Room
          </h3>
          <p className="text-sm" style={{ color: "var(--text-on-dark-muted)" }}>
            Expose the scammer&apos;s lies
          </p>
        </div>
        <div
          className="text-sm font-bold px-4 py-2 rounded shrink-0"
          style={{
            backgroundColor: inconsistenciesFound >= 3 ? "var(--noir-red)" : "rgba(139,0,0,0.2)",
            color: inconsistenciesFound >= 3 ? "white" : "var(--noir-red)",
            border: "1px solid var(--noir-red)",
          }}
          aria-label={`Inconsistencies exposed: ${inconsistenciesFound} of 3`}
        >
          Inconsistencies: {inconsistenciesFound} / 3
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ minHeight: "200px" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "player" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[80%]">
              <div
                className="px-4 py-3 rounded-lg text-base leading-relaxed"
                style={{
                  backgroundColor:
                    msg.role === "player"
                      ? "var(--noir-sepia)"
                      : "rgba(255,255,255,0.08)",
                  color: msg.role === "player" ? "var(--noir-dark)" : "var(--noir-cream)",
                  borderRadius:
                    msg.role === "player"
                      ? "18px 18px 4px 18px"
                      : "18px 18px 18px 4px",
                }}
              >
                {msg.content}
              </div>
              {msg.inconsistency && (
                <div
                  className="mt-2 text-sm font-bold px-3 py-2 rounded"
                  style={{ backgroundColor: "rgba(139,0,0,0.2)", color: "#ff9999" }}
                  role="status"
                  aria-label={`Inconsistency exposed: ${msg.inconsistency}`}
                >
                  ✓ Caught: {msg.inconsistency}
                </div>
              )}
              <p className="text-sm mt-2 px-1 font-medium" style={{ color: "var(--text-on-dark-soft)" }}>
                {msg.role === "player" ? "You" : "Scammer"}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div
              className="px-4 py-3 rounded-lg text-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "var(--text-on-dark-muted)" }}
              aria-label="Scammer is typing"
            >
              ...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={send}
        className="p-5 border-t flex gap-4"
        style={{ borderColor: "var(--noir-sepia)" }}
        aria-label="Send interrogation message"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the suspect a question..."
          disabled={loading || inconsistenciesFound >= 3}
          className="flex-1 rounded-lg px-4 py-3 text-base border focus-visible:outline-2"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            borderColor: "var(--noir-sepia)",
            color: "var(--text-on-dark)",
            minHeight: "60px",
          }}
          aria-label="Your question for the suspect"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading || inconsistenciesFound >= 3}
          className="px-6 text-base font-bold rounded-lg transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2"
          style={{
            backgroundColor: "var(--noir-sepia)",
            color: "var(--noir-dark)",
            minHeight: "60px",
            minWidth: "60px",
          }}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
}
