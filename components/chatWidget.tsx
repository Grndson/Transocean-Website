"use client";

// components/ChatWidget.tsx
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { getMockResponse } from "@/lib/mockChat";

const USE_MOCK = false;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const BRAND_NAVY = "#000080";
const BRAND_ACCENT = "#1e90b8";
const BRAND_DARK = "#0a1628";

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hello! 👋 Welcome to Transocean Marine Surveyors EA Limited. How can I assist you today?",
};

const QUICK_REPLIES = [
  "What services do you offer?",
  "How do I book a survey?",
  "What is GMDSS?",
  "Contact information",
];

function renderMessageContent(text: string) {
  const parts: Array<{ type: "text" | "url" | "email"; value: string }> = [];
  const urlPattern =
    /https?:\/\/[^\s<>".,!?;)][^\s<>".,!?;)]*(?:[.,!?;)][^\s<>".,!?;)]+)*/g;
  const emailPattern =
    /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

  const allMatches: Array<{
    index: number;
    value: string;
    type: "url" | "email";
  }> = [];

  let m: RegExpExecArray | null;
  while ((m = urlPattern.exec(text)) !== null) {
    allMatches.push({ index: m.index, value: m[0], type: "url" });
  }
  while ((m = emailPattern.exec(text)) !== null) {
    const insideUrl = allMatches.some(
      (u) =>
        u.type === "url" &&
        m!.index >= u.index &&
        m!.index < u.index + u.value.length
    );
    if (!insideUrl) {
      allMatches.push({ index: m.index, value: m[0], type: "email" });
    }
  }

  allMatches.sort((a, b) => a.index - b.index);

  let cursor = 0;
  for (const match of allMatches) {
    if (match.index > cursor) {
      parts.push({ type: "text", value: text.slice(cursor, match.index) });
    }
    parts.push({ type: match.type, value: match.value });
    cursor = match.index + match.value.length;
  }
  if (cursor < text.length) {
    parts.push({ type: "text", value: text.slice(cursor) });
  }

  return parts.map((part, i) => {
    if (part.type === "url") {
      return (
        <a
          key={i}
          href={part.value}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "underline",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {part.value.includes("wa.me") ? "Chat on WhatsApp ↗" : part.value}
        </a>
      );
    }
    if (part.type === "email") {
      return (
        <a
          key={i}
          href={`mailto:${part.value}`}
          style={{
            color: "#1e90b8",
            textDecoration: "underline",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {part.value}
        </a>
      );
    }
    return <span key={i}>{part.value}</span>;
  });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 480);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasNewMessage(false);
      setShowTooltip(false); // hide tooltip once opened
    }
  }, [open]);

  // Auto-hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const startNewConversation = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setShowQuickReplies(true);
    setInput("");
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: Message = { role: "user", content: text.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);
      setShowQuickReplies(false);

      try {
        let reply = "";

        if (USE_MOCK) {
          const { text: mockText, delay } = getMockResponse(text);
          await new Promise((r) => setTimeout(r, delay));
          reply = mockText;
        } else {
          const history: Message[] = [...messages, userMsg];
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: history }),
          });

          if (!res.ok) throw new Error("API error");

          const data = await res.json();
          reply =
            data.reply ?? "Sorry, something went wrong. Please try again.";
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: reply },
        ]);

        if (!open) setHasNewMessage(true);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I encountered an error. Please call us directly on +254 722 251 598.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, open]
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const chatWidth = isMobile ? "calc(100vw - 32px)" : "360px";
  const chatMaxHeight = isMobile ? "70vh" : "560px";

  return (
    <>
      {/* ── Chat Window ─────────────────────────────────────────── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: isMobile ? "96px" : "100px",
            right: "24px",
            width: chatWidth,
            maxHeight: chatMaxHeight,
            background: "#ffffff",
            borderRadius: "16px",
            boxShadow:
              "0 24px 64px rgba(0,0,128,0.18), 0 4px 16px rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            animation: "chatSlideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* ── Header ──────────────────────────────────────────── */}
          <div
            style={{
              background: `linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND_NAVY} 100%)`,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            {/* Logo avatar */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "2px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
                padding: 6,
              }}
            >
              <Image
                src="/logo.png"
                alt="Transocean"
                width={32}
                height={32}
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Name + status */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.02em",
                  fontFamily: "var(--font-syne, sans-serif)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Transocean AI Assistant
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "11px",
                  marginTop: "2px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Marine Electronics · GMDSS Specialists
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 3,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>
                  Online · Replies instantly
                </span>
              </div>
            </div>

            {/* New Chat button */}
            <button
              onClick={startNewConversation}
              title="Start a new conversation"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                padding: "0 8px",
                height: 28,
                cursor: "pointer",
                color: "#fff",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.1)";
              }}
            >
              New Chat
            </button>

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "8px",
                width: 28,
                height: 28,
                cursor: "pointer",
                color: "#fff",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* ── Messages ────────────────────────────────────────── */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              background: "#f8fafc",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 14px",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background:
                      msg.role === "user"
                        ? `linear-gradient(135deg, ${BRAND_NAVY}, #0000aa)`
                        : "#ffffff",
                    color: msg.role === "user" ? "#ffffff" : "#1e293b",
                    fontSize: "13.5px",
                    lineHeight: "1.55",
                    boxShadow:
                      msg.role === "user"
                        ? "0 2px 8px rgba(0,0,128,0.25)"
                        : "0 2px 8px rgba(0,0,0,0.07)",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px 16px 16px 4px",
                    padding: "10px 16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: BRAND_ACCENT,
                        display: "inline-block",
                        animation: `typingDot 1.2s ${i * 0.2}s infinite ease-in-out`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuickReplies && !loading && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginTop: "4px",
                }}
              >
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    style={{
                      background: "transparent",
                      border: `1.5px solid ${BRAND_NAVY}`,
                      borderRadius: "20px",
                      padding: "5px 12px",
                      fontSize: "12px",
                      color: BRAND_NAVY,
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.background =
                        BRAND_NAVY;
                      (e.target as HTMLButtonElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.background =
                        "transparent";
                      (e.target as HTMLButtonElement).style.color = BRAND_NAVY;
                    }}
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input bar ───────────────────────────────────────── */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid #e2e8f0",
              background: "#ffffff",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about our marine services..."
              disabled={loading}
              style={{
                flex: 1,
                border: "1.5px solid #e2e8f0",
                borderRadius: "10px",
                padding: "9px 13px",
                fontSize: "13.5px",
                outline: "none",
                color: "#1e293b",
                background: loading ? "#f8fafc" : "#fff",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = BRAND_ACCENT)}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                background:
                  loading || !input.trim()
                    ? "#e2e8f0"
                    : `linear-gradient(135deg, ${BRAND_NAVY}, #0000aa)`,
                border: "none",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.15s",
              }}
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke={loading || !input.trim() ? "#94a3b8" : "#fff"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "#94a3b8",
              padding: "6px 14px 10px",
              background: "#ffffff",
              flexShrink: 0,
            }}
          >
            AI Assistant · Transocean Marine Surveyors EA Ltd
          </div>
        </div>
      )}

      {/* ── Tooltip hint (auto-hides after 5s) ───────────────────── */}
      {!open && showTooltip && (
        <div
          style={{
            position: "fixed",
            bottom: "94px",
            right: "24px",
            zIndex: 9998,
            animation: "chatSlideUp 0.3s ease",
          }}
        >
          <div
            style={{
              background: BRAND_DARK,
              color: "#fff",
              fontSize: "12px",
              fontWeight: 600,
              padding: "8px 14px",
              borderRadius: "10px",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              fontFamily: "var(--font-syne, sans-serif)",
            }}
          >
            💬 Ask our AI Assistant
            {/* Arrow pointing down */}
            <span
              style={{
                position: "absolute",
                bottom: -6,
                right: 22,
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: `6px solid ${BRAND_DARK}`,
              }}
            />
          </div>
        </div>
      )}

      {/* ── Floating Bubble ──────────────────────────────────────── */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        title="Ask our AI Assistant"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${BRAND_NAVY} 0%, ${BRAND_ACCENT} 100%)`,
          border: "2px solid rgba(255,255,255,0.15)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,128,0.35)",
          zIndex: 10000,
          transition: "transform 0.2s, box-shadow 0.2s",
          padding: open ? 0 : 10,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 12px 32px rgba(0,0,128,0.45)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 8px 24px rgba(0,0,128,0.35)";
        }}
      >
        {/* Notification dot */}
        {hasNewMessage && !open && (
          <span
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid #fff",
            }}
          />
        )}

        {/* Logo when closed, X when open */}
        {open ? (
          <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>✕</span>
        ) : (
          <Image
            src="/logo.png"
            alt="Transocean AI"
            width={38}
            height={38}
            style={{ objectFit: "contain", borderRadius: "50%" }}
          />
        )}
      </button>

      {/* ── CSS Animations ───────────────────────────────────────── */}
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0);    opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1;   }
        }
      `}</style>
    </>
  );
}