import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/systemPrompt";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(`chat:${getClientIp(req)}`, 10, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many messages. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is not configured");
      return NextResponse.json({ error: "Chat is temporarily unavailable" }, { status: 503 });
    }

    // Only untrusted user messages are accepted. This prevents callers from
    // injecting additional system or assistant messages into the model prompt.
    const cleanMessages = messages
      .filter(
        (message: unknown): message is { role: "user"; content: string } =>
          typeof message === "object" &&
          message !== null &&
          (message as { role?: unknown }).role === "user" &&
          typeof (message as { content?: unknown }).content === "string" &&
          (message as { content: string }).content.trim().length > 0 &&
          (message as { content: string }).content.length <= 1_000
      )
      .slice(-6)
      .map(({ content }) => ({ role: "user" as const, content: content.trim() }));

    if (cleanMessages.length === 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "system", content: buildSystemPrompt() }, ...cleanMessages],
        max_tokens: 400,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API error:", response.status, error);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content
      ?? "Sorry, I could not generate a response. Please contact us directly.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Sorry, I encountered an error. Please call us on +254 722 251 598." },
      { status: 500 }
    );
  }
}
