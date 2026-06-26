"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { SITE } from "@/lib/constants";
import { services } from "@/lib/services";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      vessel: formData.get("vessel"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
                      name="firstName"
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
                      name="lastName"
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
                    name="email"
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
                    name="phone"
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
                    name="vessel"
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
                    name="service"
                    className="px-4 py-3 rounded border text-[14px] outline-none transition-all focus:border-[#1e90b8] focus:ring-2 focus:ring-[#1e90b8]/10"
                    style={{ border: "1px solid #e8edf4", background: "#f4f6f9", color: "#2c3e5a" }}
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.shortTitle}>{s.shortTitle}</option>
                    ))}
                    <option value="General Enquiry">General Enquiry</option>
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
                    name="message"
                    rows={5}
                    placeholder="Tell us about your vessel and requirements..."
                    className="px-4 py-3 rounded border text-[14px] outline-none transition-all focus:border-[#1e90b8] focus:ring-2 focus:ring-[#1e90b8]/10 resize-y"
                    style={{ border: "1px solid #e8edf4", background: "#f4f6f9", color: "#2c3e5a", minHeight: 120 }}
                  />
                </div>

                <p className="text-[12px] text-[#8a9ab5]">
                  We typically respond within 24 hours on business days.
                </p>

                {error && (
                  <div className="flex items-center gap-2 text-[13px] text-red-600">
                    <AlertCircle size={15} />
                    {error}
                  </div>
                )}

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

          {/* Right — info */}
          <div className="flex flex-col gap-6">
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
                      +254 738 036 617
                    </a>
                    <a href="tel:+254722251598" className="hover:text-[#1e90b8] transition-colors block">
                      +254 722 251 598
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
                      Ruman Plaza Ground Floor Suite 203<br />
                      St. Benard Street, Ganjoni<br />
                      Mombasa, Kenya
                    </p>
                  </div>
                  <div>
                    <strong className="block text-[#0a1628] mb-1">Working Hours</strong>
                    <p className="leading-relaxed">
                      8:00 AM – 5:00 PM (Monday – Friday)<br />
                      8:00 AM – 1:00 PM (Saturday)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-[26px] sm:text-[32px] font-bold text-[#0a1628] mb-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Our Location
          </h2>
          <div className="rounded-3xl overflow-hidden border border-[#e8edf4] shadow-lg aspect-video">
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