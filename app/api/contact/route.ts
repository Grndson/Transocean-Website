import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, vessel, service, message } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Transocean Website <onboarding@resend.dev>", // swap once domain verified — see Step 7
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New Enquiry: ${service || "General Enquiry"} — ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="color:#0a1628;">New Website Enquiry</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Vessel:</strong> ${vessel || "Not provided"}</p>
          <p><strong>Service Required:</strong> ${service || "Not specified"}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f4f6f9; padding:12px; border-radius:6px;">${message || "No message provided"}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}