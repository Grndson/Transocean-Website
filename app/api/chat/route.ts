// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/systemPrompt";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request — messages array required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY not configured" },
        { status: 500 }
      );
    }

    const systemPrompt = buildSystemPrompt();

    // Strip frontend-only fields (timestamp, etc.) — Groq only accepts role + content
    const cleanMessages = messages
      .slice(-10)
      .map(({ role, content }: { role: string; content: string }) => ({ role, content }));

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          ...cleanMessages,
        ],
        max_tokens: 400,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API error:", response.status, error);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ??
      "Sorry, I could not generate a response. Please contact us directly.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Sorry, I encountered an error. Please call us on +254 722 251 598." },
      { status: 500 }
    );
  }
}