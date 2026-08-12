"use client";

// components/ChatWidget.tsx
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { getMockResponse } from "@/lib/mockChat";

const USE_MOCK = false;

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

const BRAND_NAVY    = "#000080";
const BRAND_OCEAN   = "#1e90b8";
const BRAND_DARK    = "#0a1628";
const BRAND_GOLD    = "#c8a84b";

const ASSISTANT_NAME = "Marina";
const ASSISTANT_SUBTITLE = "Transocean Surveyors AI";

// No timestamp here — Date.now() at module load causes SSR/client hydration mismatch
const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hi there! 👋 I'm Marina, your Transocean assistant. I can help you with GMDSS surveys, equipment, bookings, and anything about our marine services.\n\nHow can I help you today?",
};

const QUICK_REPLIES = [
  "What services do you offer?",
  "Book a survey",
  "GMDSS information",
  "Contact & location",
];

// ── Linkify helper ───────────────────────────────────────────────────────────
function renderMessageContent(text: string) {
  const parts: Array<{ type: "text" | "url" | "email"; value: string }> = [];
  const urlPattern = /https?:\/\/[^\s<>".,!?;)][^\s<>".,!?;)]*(?:[.,!?;)][^\s<>".,!?;)]+)*/g;
  const emailPattern = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

  const allMatches: Array<{ index: number; value: string; type: "url" | "email" }> = [];
  let m: RegExpExecArray | null;

  while ((m = urlPattern.exec(text)) !== null)
    allMatches.push({ index: m.index, value: m[0], type: "url" });

  while ((m = emailPattern.exec(text)) !== null) {
    const insideUrl = allMatches.some(
      (u) => u.type === "url" && m!.index >= u.index && m!.index < u.index + u.value.length
    );
    if (!insideUrl) allMatches.push({ index: m.index, value: m[0], type: "email" });
  }

  allMatches.sort((a, b) => a.index - b.index);
  let cursor = 0;
  for (const match of allMatches) {
    if (match.index > cursor) parts.push({ type: "text", value: text.slice(cursor, match.index) });
    parts.push({ type: match.type, value: match.value });
    cursor = match.index + match.value.length;
  }
  if (cursor < text.length) parts.push({ type: "text", value: text.slice(cursor) });

  return parts.map((part, i) => {
    if (part.type === "url")
      return (
        <a key={i} href={part.value} target="_blank" rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "underline", fontWeight: 600 }}>
          {part.value.includes("wa.me") ? "Chat on WhatsApp ↗" : part.value}
        </a>
      );
    if (part.type === "email")
      return (
        <a key={i} href={`mailto:${part.value}`}
          style={{ color: BRAND_OCEAN, textDecoration: "underline", fontWeight: 600 }}>
          {part.value}
        </a>
      );
    return <span key={i}>{part.value}</span>;
  });
}

// ── Timestamp helper ─────────────────────────────────────────────────────────
function formatTime(date?: Date) {
  if (!date) return "";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWidget() {
  const [open, setOpen]                   = useState(false);
  // Lazy initializer runs only on client — avoids SSR/hydration timestamp mismatch
  const [messages, setMessages]           = useState<Message[]>(() => [
    { ...WELCOME_MESSAGE, timestamp: new Date() },
  ]);
  const [input, setInput]                 = useState("");
  const [loading, setLoading]             = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isMobile, setIsMobile]           = useState(false);
  const [teaser, setTeaser]               = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);

  const [mounted, setMounted]             = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  // Only render on client — prevents SSR/hydration mismatches from
  // timestamps, isMobile, teaser state, and browser-extension DOM mutations
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  // Responsive detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 480);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input on open, clear new-message dot
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasNewMessage(false);
      setTeaser(false);
    }
  }, [open]);

  // Teaser bubble — appears after 3 s, dismissed automatically after 8 s
  useEffect(() => {
    if (teaserDismissed) return;
    const show = setTimeout(() => setTeaser(true), 3000);
    const hide = setTimeout(() => setTeaser(false), 11000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [teaserDismissed]);

  const dismissTeaser = useCallback(() => {
    setTeaser(false);
    setTeaserDismissed(true);
  }, []);

  const startNewConversation = useCallback(() => {
    setMessages([{ ...WELCOME_MESSAGE, timestamp: new Date() }]);
    setShowQuickReplies(true);
    setInput("");
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: Message = { role: "user", content: text.trim(), timestamp: new Date() };
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

          // ── Better error logging ─────────────────────────────
          if (!res.ok) {
            const statusText = res.statusText;
            const bodyText = await res.text().catch(() => "(unreadable body)");
            console.error(
              `[ChatWidget] API error — status: ${res.status} ${statusText}\nBody: ${bodyText}`
            );
            throw new Error(`API error ${res.status}: ${statusText}`);
          }

          const data = await res.json();
          reply = data.reply ?? "Sorry, something went wrong. Please try again.";
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: reply, timestamp: new Date() },
        ]);
        if (!open) setHasNewMessage(true);
      } catch (err) {
        // ── Log the actual error so you can see it in console ──
        console.error("[ChatWidget] sendMessage error:", err);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please call us directly on +254 738 036 617.",
            timestamp: new Date(),
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

  // Don't render anything on the server — the widget is 100% client state
  if (!mounted) return null;

  const chatWidth    = isMobile ? "calc(100vw - 24px)" : "368px";
  const chatBottom   = isMobile ? "88px" : "96px";

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          CHAT WINDOW
      ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "fixed",
          bottom: chatBottom,
          right: isMobile ? "12px" : "24px",
          width: chatWidth,
          maxHeight: isMobile ? "72vh" : "580px",
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 32px 80px rgba(0,0,128,0.22), 0 8px 24px rgba(0,0,0,0.10)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 9999,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.22s cubic-bezier(0.34,1.3,0.64,1), transform 0.22s cubic-bezier(0.34,1.3,0.64,1)",
          transformOrigin: "bottom right",
        }}
        aria-hidden={!open}
      >
        {/* ── Header ────────────────────────────────────────────── */}
        <div
          style={{
            background: `linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND_NAVY} 60%, #00008a 100%)`,
            padding: "16px 16px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative wave lines in header */}
          <svg
            style={{ position: "absolute", right: 0, top: 0, opacity: 0.06, pointerEvents: "none" }}
            width="180" height="80" viewBox="0 0 180 80" fill="none"
          >
            <path d="M0 40 Q45 10 90 40 Q135 70 180 40" stroke="white" strokeWidth="24" fill="none"/>
            <path d="M0 60 Q45 30 90 60 Q135 90 180 60" stroke="white" strokeWidth="16" fill="none"/>
          </svg>

          {/* ── FIX 1: Plain logo avatar — no green dot ── */}
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "rgba(30,144,184,0.2)",
              border: "2px solid rgba(30,144,184,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
              padding: 5,
            }}
          >
            <Image src="/logo.png" alt="Marina" width={34} height={34} style={{ objectFit: "contain" }} />
            
          </div>

          {/* ── FIX 2: Restructured name block ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Line 1: Marina */}
            <div style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: "0.01em",
              fontFamily: "var(--font-syne, sans-serif)",
              lineHeight: 1.2,
            }}>
              {ASSISTANT_NAME}
            </div>

            {/* Line 2: Transocean Surveyors AI */}
            <div style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 11,
              marginTop: 2,
              lineHeight: 1.2,
            }}>
              {ASSISTANT_SUBTITLE}
            </div>

            {/* Line 3: Online with green dot */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              marginTop: 5,
            }}>
              <span style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                flexShrink: 0,
                boxShadow: "0 0 6px rgba(34,197,94,0.7)",
              }} />
              <span style={{
                color: "#22c55e",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}>
                Online
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button
              onClick={startNewConversation}
              title="New conversation"
              style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8, padding: "0 10px", height: 30, cursor: "pointer",
                color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.04em", whiteSpace: "nowrap",
                WebkitTapHighlightColor: "transparent", touchAction: "manipulation",
              }}
            >
              NEW
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8, width: 30, height: 30, cursor: "pointer",
                color: "rgba(255,255,255,0.8)", fontSize: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                WebkitTapHighlightColor: "transparent", touchAction: "manipulation",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Messages area ─────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 14px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            background: "#f7fafd",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column",
              alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>

              {msg.role === "assistant" && (i === 0 || messages[i - 1].role === "user") && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: BRAND_NAVY, display: "flex", alignItems: "center",
                    justifyContent: "center", overflow: "hidden", padding: 2,
                  }}>
                    <Image src="/logo.png" alt="" width={14} height={14} style={{ objectFit: "contain" }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: BRAND_NAVY, letterSpacing: "0.02em" }}>
                    {ASSISTANT_NAME}
                  </span>
                </div>
              )}

              <div style={{
                maxWidth: "84%",
                padding: msg.role === "user" ? "9px 14px" : "11px 14px",
                borderRadius: msg.role === "user"
                  ? "18px 18px 4px 18px"
                  : "4px 18px 18px 18px",
                background: msg.role === "user"
                  ? `linear-gradient(135deg, ${BRAND_NAVY} 0%, #0000aa 100%)`
                  : "#ffffff",
                color: msg.role === "user" ? "#fff" : "#1e293b",
                fontSize: 13.5,
                lineHeight: 1.55,
                boxShadow: msg.role === "user"
                  ? "0 2px 12px rgba(0,0,128,0.3)"
                  : "0 2px 10px rgba(0,0,0,0.07)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                border: msg.role === "assistant" ? "1px solid #e8f0f8" : "none",
              }}>
                {renderMessageContent(msg.content)}
              </div>

              {msg.timestamp && (
                <span style={{
                  fontSize: 10, color: "#94a3b8", marginTop: 3,
                  paddingLeft: msg.role === "assistant" ? 4 : 0,
                  paddingRight: msg.role === "user" ? 4 : 0,
                }}>
                  {formatTime(msg.timestamp)}
                </span>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: BRAND_NAVY, display: "flex", alignItems: "center",
                  justifyContent: "center", overflow: "hidden", padding: 2,
                }}>
                  <Image src="/logo.png" alt="" width={14} height={14} style={{ objectFit: "contain" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: BRAND_NAVY }}>{ASSISTANT_NAME}</span>
              </div>
              <div style={{
                background: "#ffffff",
                border: "1px solid #e8f0f8",
                borderRadius: "4px 18px 18px 18px",
                padding: "12px 16px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                display: "flex", gap: 5, alignItems: "center",
              }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    width: 7, height: 7, borderRadius: "50%", background: BRAND_OCEAN,
                    display: "inline-block",
                    animation: `marinaDot 1.3s ${i * 0.18}s infinite ease-in-out`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Quick reply chips */}
          {showQuickReplies && !loading && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 4 }}>
              {QUICK_REPLIES.map((qr) => (
                <button key={qr} onClick={() => sendMessage(qr)}
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${BRAND_NAVY}`,
                    borderRadius: 20,
                    padding: "5px 13px",
                    fontSize: 12, fontWeight: 700,
                    color: BRAND_NAVY, cursor: "pointer",
                    transition: "all 0.15s",
                    WebkitTapHighlightColor: "transparent",
                    touchAction: "manipulation",
                    boxShadow: "0 1px 4px rgba(0,0,128,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = BRAND_NAVY;
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                    (e.currentTarget as HTMLButtonElement).style.color = BRAND_NAVY;
                  }}
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input bar ─────────────────────────────────────────── */}
        <div style={{
          padding: "10px 12px",
          borderTop: "1px solid #e8f0f8",
          background: "#ffffff",
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexShrink: 0,
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about our services..."
            disabled={loading}
            style={{
              flex: 1,
              border: "1.5px solid #dde8f4",
              borderRadius: 24,
              padding: "9px 16px",
              fontSize: 13.5,
              outline: "none",
              color: "#1e293b",
              background: loading ? "#f8fafc" : "#f7fafd",
              transition: "border-color 0.15s, background 0.15s",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = BRAND_OCEAN;
              e.target.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#dde8f4";
              e.target.style.background = "#f7fafd";
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            aria-label="Send"
            style={{
              width: 40, height: 40, borderRadius: "50%", border: "none",
              background: loading || !input.trim()
                ? "#e2e8f0"
                : `linear-gradient(135deg, ${BRAND_NAVY}, #0033cc)`,
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "all 0.15s",
              boxShadow: loading || !input.trim() ? "none" : "0 2px 12px rgba(0,0,128,0.35)",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke={loading || !input.trim() ? "#94a3b8" : "#fff"}
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", fontSize: 10.5, color: "#b0bec5",
          padding: "5px 14px 9px", background: "#ffffff",
          flexShrink: 0, letterSpacing: "0.02em",
        }}>
          Powered by AI · Transocean Marine Surveyors EA Ltd
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          TEASER BUBBLE
      ═══════════════════════════════════════════════════════════ */}
      {!open && teaser && (
        <div style={{
          position: "fixed",
          bottom: isMobile ? "96px" : "104px",
          right: isMobile ? "12px" : "24px",
          zIndex: 9998,
          width: isMobile ? "calc(100vw - 80px)" : "290px",
          maxWidth: 290,
          animation: "marinaSlideUp 0.3s cubic-bezier(0.34,1.4,0.64,1)",
        }}>
          <div style={{
            background: BRAND_DARK,
            borderRadius: 16,
            padding: "14px 14px 14px 14px",
            boxShadow: "0 16px 48px rgba(0,0,128,0.25), 0 4px 16px rgba(0,0,0,0.15)",
            border: "1px solid rgba(30,144,184,0.2)",
            position: "relative",
          }}>
            <button onClick={dismissTeaser}
              style={{
                position: "absolute", top: 10, right: 10,
                background: "rgba(255,255,255,0.08)", border: "none",
                borderRadius: "50%", width: 22, height: 22, cursor: "pointer",
                color: "rgba(255,255,255,0.6)", fontSize: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                WebkitTapHighlightColor: "transparent",
              }}
            >✕</button>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(30,144,184,0.15)",
                border: "2px solid rgba(30,144,184,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", padding: 4, flexShrink: 0,
              }}>
                <Image src="/logo.png" alt={ASSISTANT_NAME} width={28} height={28}
                  style={{ objectFit: "contain" }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                  <span style={{
                    color: BRAND_OCEAN, fontSize: 11, fontWeight: 800,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    fontFamily: "var(--font-syne, sans-serif)",
                  }}>
                    {ASSISTANT_NAME}
                  </span>
                  <span style={{
                    background: "rgba(34,197,94,0.15)", borderRadius: 20,
                    padding: "1px 6px", fontSize: 9, fontWeight: 700,
                    color: "#22c55e", letterSpacing: "0.06em",
                  }}>
                    ONLINE
                  </span>
                </div>
                <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, margin: "0 0 3px", lineHeight: 1.4 }}>
                  Need help with a survey?
                </p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, margin: 0, lineHeight: 1.4 }}>
                  Ask me anything about GMDSS, equipment, or bookings.
                </p>
              </div>
            </div>

            <button
              onClick={() => { setOpen(true); dismissTeaser(); }}
              style={{
                marginTop: 12, width: "100%",
                background: `linear-gradient(135deg, ${BRAND_OCEAN}, #1a7aaa)`,
                border: "none", borderRadius: 10, padding: "9px 0",
                color: "#fff", fontSize: 13, fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.02em",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
                fontFamily: "var(--font-syne, sans-serif)",
              }}
            >
              Start a conversation →
            </button>
          </div>

          <div style={{
            position: "absolute", bottom: -8, right: 28,
            width: 0, height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: `9px solid ${BRAND_DARK}`,
          }} />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          FLOATING BUBBLE — FIX 3: Alive AI breathing glow
      ═══════════════════════════════════════════════════════════ */}
      <button
        onClick={() => { setOpen((o) => !o); dismissTeaser(); }}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        style={{
          position: "fixed",
          bottom: isMobile ? "20px" : "24px",
          right: isMobile ? "12px" : "24px",
          width: 60, height: 60,
          borderRadius: "50%",
          background: open
            ? `linear-gradient(135deg, #333, #555)`
            : `linear-gradient(135deg, ${BRAND_NAVY} 0%, ${BRAND_OCEAN} 100%)`,
          border: "none",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: open
            ? "0 4px 16px rgba(0,0,0,0.3)"
            : "none",
          zIndex: 10000,
          transition: "transform 0.2s, background 0.2s",
          padding: open ? 0 : 8,
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
          // Breathing animation on the button itself when closed
          animation: open ? "none" : "marinaBreath 3s ease-in-out infinite",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.12)";
          (e.currentTarget as HTMLButtonElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.animationPlayState = "running";
        }}
      >
        {/* Notification dot */}
        {hasNewMessage && !open && (
          <span style={{
            position: "absolute", top: 2, right: 2,
            width: 13, height: 13, borderRadius: "50%",
            background: "#ef4444", border: "2.5px solid #fff",
            animation: "marinaPing 1.5s infinite",
          }} />
        )}

        {/* Alive: orbital ring that slowly rotates */}
        {!open && (
          <span style={{
            position: "absolute",
            inset: -5,
            borderRadius: "50%",
            border: `1.5px solid transparent`,
            borderTopColor: BRAND_OCEAN,
            borderRightColor: "rgba(30,144,184,0.3)",
            animation: "marinaOrbit 4s linear infinite",
            pointerEvents: "none",
          }} />
        )}

        {/* Alive: outer glow pulse ring */}
        {!open && (
          <span style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(30,144,184,0.18) 0%, transparent 70%)`,
            animation: "marinaGlow 3s ease-in-out infinite",
            pointerEvents: "none",
          }} />
        )}

        {open ? (
          <span style={{ color: "#fff", fontSize: 20, fontWeight: 700, lineHeight: 1 }}>✕</span>
        ) : (
          <Image src="/logo.png" alt="Transocean AI" width={38} height={38}
            style={{ objectFit: "contain", borderRadius: "50%" }} />
        )}
      </button>

      {/* ═══════════════════════════════════════════════════════════
          ANIMATIONS
      ═══════════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes marinaSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes marinaDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes marinaPing {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes marinaRing {
          0%   { transform: scale(1); opacity: 0.8; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        /* FIX 3 — Alive button animations */

        /* Slow breathing scale pulse */
        @keyframes marinaBreath {
          0%, 100% { transform: scale(1);    box-shadow: 0 6px 24px rgba(0,0,128,0.45), 0 0 0 0 rgba(30,144,184,0.4); }
          50%       { transform: scale(1.05); box-shadow: 0 10px 36px rgba(0,0,128,0.55), 0 0 0 10px rgba(30,144,184,0); }
        }

        /* Rotating orbital ring */
        @keyframes marinaOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Radial glow expand/fade */
        @keyframes marinaGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.15); }
        }
      `}</style>
    </>
  );
}