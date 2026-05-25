"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/constants";
import { services } from "@/lib/services";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: wire to your backend / Formspree / Sanity form handler
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  }

  const faqs = [
    {
      q: "How quickly do you respond to enquiries?",
      a: "We aim to respond to all enquiries within 24 hours on business days. For urgent vessel requirements, call us directly.",
    },
    {
      q: "Do you work with all vessel types?",
      a: "Yes — we serve cargo vessels, fishing boats, tankers, offshore support vessels, and pleasure craft. All vessel sizes and types.",
    },
    {
      q: "Can you come to the vessel at port?",
      a: "Absolutely. Our engineers provide onboard service at port. We also have a full workshop for equipment brought in.",
    },
  ];

  return (
    <>
      {/* Header */}
      <section
        className="pt-[120px] pb-20 relative overflow-hidden"
        style={{ background: "#0a1628" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <span
            className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#1e90b8] mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Get In Touch
          </span>
          <h1
            className="text-[clamp(36px,5vw,56px)] font-extrabold text-white leading-tight mb-6 max-w-[580px]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Request a Service or Quote
          </h1>
          <p className="text-white/55 text-[18px] leading-relaxed max-w-[480px]">
            Fill in the form and our team will get back to you within 24 hours.
            For urgent vessel requirements, call us directly.
          </p>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form — spans 2 cols */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div
                className="rounded-lg p-10 flex flex-col items-center text-center"
                style={{ background: "rgba(30,144,184,0.07)", border: "1px solid rgba(30,144,184,0.25)" }}
              >
                <CheckCircle2 size={48} className="text-[#1e90b8] mb-5" strokeWidth={1.5} />
                <h2
                  className="text-[24px] font-bold text-[#0a1628] mb-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Message Received!
                </h2>
                <p className="text-[16px] text-[#6b7e9a]">
                  We&apos;ll get back to you within 24 hours with a quote or service plan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#0a1628]"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      className="px-4 py-3 rounded border text-[14px] outline-none transition-all focus:border-[#1e90b8] focus:ring-2 focus:ring-[#1e90b8]/10"
                      style={{ border: "1px solid #e8edf4", background: "#f4f6f9", color: "#2c3e5a" }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#0a1628]"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      className="px-4 py-3 rounded border text-[14px] outline-none transition-all focus:border-[#1e90b8] focus:ring-2 focus:ring-[#1e90b8]/10"
                      style={{ border: "1px solid #e8edf4", background: "#f4f6f9", color: "#2c3e5a" }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#0a1628]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="px-4 py-3 rounded border text-[14px] outline-none transition-all focus:border-[#1e90b8] focus:ring-2 focus:ring-[#1e90b8]/10"
                    style={{ border: "1px solid #e8edf4", background: "#f4f6f9", color: "#2c3e5a" }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#0a1628]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+254 700 000 000"
                    className="px-4 py-3 rounded border text-[14px] outline-none transition-all focus:border-[#1e90b8] focus:ring-2 focus:ring-[#1e90b8]/10"
                    style={{ border: "1px solid #e8edf4", background: "#f4f6f9", color: "#2c3e5a" }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#0a1628]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    Vessel Name (if applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="MV Example"
                    className="px-4 py-3 rounded border text-[14px] outline-none transition-all focus:border-[#1e90b8] focus:ring-2 focus:ring-[#1e90b8]/10"
                    style={{ border: "1px solid #e8edf4", background: "#f4f6f9", color: "#2c3e5a" }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#0a1628]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    Service Required
                  </label>
                  <select
                    className="px-4 py-3 rounded border text-[14px] outline-none transition-all focus:border-[#1e90b8] focus:ring-2 focus:ring-[#1e90b8]/10"
                    style={{ border: "1px solid #e8edf4", background: "#f4f6f9", color: "#2c3e5a" }}
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>{s.shortTitle}</option>
                    ))}
                    <option value="general">General Enquiry</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#0a1628]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your vessel and requirements..."
                    className="px-4 py-3 rounded border text-[14px] outline-none transition-all focus:border-[#1e90b8] focus:ring-2 focus:ring-[#1e90b8]/10 resize-y"
                    style={{ border: "1px solid #e8edf4", background: "#f4f6f9", color: "#2c3e5a", minHeight: 120 }}
                  />
                </div>

                <p className="text-[12px] text-[#8a9ab5]">
                  We typically respond within 24 hours on business days.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="self-start inline-flex items-center gap-2 px-8 py-3.5 rounded font-bold text-[14px] tracking-wide text-white transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60"
                  style={{ fontFamily: "var(--font-syne)", background: "#1e90b8" }}
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>
            )}
          </div>

          {/* Right — info + FAQs */}
          <div className="flex flex-col gap-6">
            {/* Contact information */}
            <div className="grid gap-4">
              <div
                className="p-5 rounded-lg border transition-all hover:border-[#1e90b8]"
                style={{ border: "1px solid #e8edf4", background: "#f4f6f9" }}
              >
                <h3
                  className="text-[16px] font-bold text-[#0a1628] mb-4"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Contact Information
                </h3>
                <div className="space-y-4 text-[14px] text-[#6b7e9a]">
                  <div>
                    <strong className="block text-[#0a1628] mb-1">Email</strong>
                    <a href="mailto:info@transoceansurveyors.com" className="hover:text-[#1e90b8] transition-colors block">
                      info@transoceansurveyors.com
                    </a>
                    <a href="mailto:transoceanmarinesurveyors@gmail.com" className="hover:text-[#1e90b8] transition-colors block">
                      transoceanmarinesurveyors@gmail.com
                    </a>
                  </div>
                  <div>
                    <strong className="block text-[#0a1628] mb-1">Phone</strong>
                    <a href="tel:+254738036617" className="hover:text-[#1e90b8] transition-colors block">
                      +254 738036617
                    </a>
                    <a href="tel:+254722251598" className="hover:text-[#1e90b8] transition-colors block">
                      +254 722251598
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="p-5 rounded-lg border transition-all hover:border-[#1e90b8]"
                style={{ border: "1px solid #e8edf4", background: "#f4f6f9" }}
              >
                <h3
                  className="text-[16px] font-bold text-[#0a1628] mb-4"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Address Details
                </h3>
                <div className="space-y-4 text-[14px] text-[#6b7e9a]">
                  <div>
                    <strong className="block text-[#0a1628] mb-1">Office</strong>
                    <p className="leading-relaxed">
                      Ruman Plaza Ground Floor Suite 203
                      <br />
                      St. Benard Street, Ganjoni
                      <br />
                      Mombasa, Kenya
                    </p>
                  </div>
                  <div>
                    <strong className="block text-[#0a1628] mb-1">Working Hours</strong>
                    <p className="leading-relaxed">
                      8:00 AM – 5:00 PM (Monday – Friday)
                      <br />
                      8:00 AM – 1:00 PM (Saturday)
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-[26px] sm:text-[32px] font-bold text-[#0a1628] mb-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Our Location
          </h2>
          <div className="map rounded-3xl overflow-hidden border border-[#e8edf4] shadow-lg aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.161944565381!2d39.650004198122275!3d-4.063082548809984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184013730039303b%3A0x828d9db26084dc64!2sRuman%20Plaza!5e0!3m2!1sen!2ske!4v1673086478752!5m2!1sen!2ske"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
