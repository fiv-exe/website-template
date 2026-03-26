"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send } from "lucide-react";

// ─── Configure your webhook URL here ───
const WEBHOOK_URL = "https://n8n.aivanov.agency/webhook/20a38992-85e6-400d-91e5-380d3381024e";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  text: "Hallo! Ich helfe Ihnen gerne bei der Terminbuchung. Wie kann ich Ihnen helfen?",
  sender: "bot",
  timestamp: new Date(),
};

export default function BookingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Listen for clicks on any "Termin" buttons across the page
  const handleGlobalClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a, button");
    if (!anchor) return;

    const text = anchor.textContent?.trim().toLowerCase() || "";
    if (
      text.includes("termin vereinbaren") ||
      text.includes("termin buchen") ||
      text.includes("termin anfragen")
    ) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, [handleGlobalClick]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data[0]?.output || data?.output || data?.response || data?.message || "Danke für Ihre Nachricht! Wir melden uns bei Ihnen.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Entschuldigung, es gab ein Problem. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[9990] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Chat Window */}
      <div
        className={`fixed z-[9991] transition-all duration-300 ease-out
          bottom-0 left-0 right-0 w-full
          md:w-[480px] md:max-h-[640px] md:inset-0 md:m-auto md:h-[600px]
          ${
            isOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-8 opacity-0 pointer-events-none"
          }`}
      >
        <div className="bg-white md:rounded-2xl shadow-2xl flex flex-col h-[100dvh] md:h-[600px] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-teal-900 text-white shrink-0">
            <div>
              <h3 className="font-display text-lg font-light tracking-wide">
                Termin buchen
              </h3>
              <p className="text-teal-300 text-xs font-light">
                Wir antworten sofort
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200"
              aria-label="Schliessen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 text-sm font-light leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-teal-600 text-white rounded-2xl rounded-br-md"
                      : "bg-white text-slate-700 rounded-2xl rounded-bl-md shadow-sm border border-slate-100"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: msg.text
                          .replace(/BOOKING_DATA:\{[^}]*\}/g, "")
                          .trim()
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\n/g, "<br/>"),
                      }}
                    />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 rounded-2xl rounded-bl-md shadow-sm border border-slate-100 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-slate-100 shrink-0">
            <div className="flex items-center gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nachricht schreiben..."
                rows={1}
                className="flex-1 px-4 py-3 bg-slate-50 rounded-xl text-sm font-light text-slate-800 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/30 transition-all duration-200 resize-none max-h-32 overflow-y-auto"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 flex items-center justify-center bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Senden"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
