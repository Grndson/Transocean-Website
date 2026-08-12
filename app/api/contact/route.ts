import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]!);
}

function getString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length <= maxLength ? trimmed : null;
}

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(`contact:${getClientIp(req)}`, 3, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    if (typeof body.website === "string" && body.website.trim()) {
      // Honeypot field: return a generic success response to avoid training bots.
      return NextResponse.json({ success: true });
    }
    const firstName = getString(body.firstName, 100);
    const lastName = getString(body.lastName, 100);
    const email = getString(body.email, 254);
    const phone = getString(body.phone, 50);
    const vessel = getString(body.vessel, 150);
    const service = getString(body.service, 100);
    const message = getString(body.message, 4_000);

    if (!firstName || !lastName || !email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid first name, last name, and email address." },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail || !EMAIL_PATTERN.test(contactEmail)) {
      console.error("CONTACT_EMAIL is not configured correctly");
      return NextResponse.json(
        { error: "The contact form is temporarily unavailable." },
        { status: 503 }
      );
    }

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeVessel = escapeHtml(vessel || "Not provided");
    const safeService = escapeHtml(service || "Not specified");
    const safeMessage = escapeHtml(message || "No message provided");

    const { error } = await resend.emails.send({
      from: "Transocean Website <info@transoceansurveyors.com>",
      to: contactEmail,
      replyTo: email,
      subject: `New Enquiry: ${service || "General Enquiry"} - ${firstName} ${lastName}`.slice(0, 180),
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="color:#0a1628;">New Website Enquiry</h2>
          <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Vessel:</strong> ${safeVessel}</p>
          <p><strong>Service Required:</strong> ${safeService}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f4f6f9; padding:12px; border-radius:6px; white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);
      return NextResponse.json(
        { error: "Unable to send your message right now. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
