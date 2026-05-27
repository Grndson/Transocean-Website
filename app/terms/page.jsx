import Link from "next/link";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#1a1a1a] font-serif">
      {/* Hero */}
      <div className="bg-[#12263a] text-white px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
            <Link
      href="/"
      className="inline-flex items-center gap-2 text-[#7eb8d4] text-xs font-sans tracking-wide mb-6 hover:text-white transition-colors duration-200"
    >
      ← Back to Home
    </Link>
          <p className="uppercase tracking-[0.25em] text-[#7eb8d4] text-xs font-sans mb-4">
            Legal · Transocean Marine Surveyors E.A. Ltd
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Terms of Use
          </h1>
          <p className="text-[#a8c8dc] font-sans text-sm">
            Effective Date: May 22, 2026
          </p>
        </div>
      </div>

      {/* Intro banner */}
      <div className="bg-[#e8f1f7] border-b border-[#c5dcea] px-6 py-4">
        <div className="max-w-3xl mx-auto font-sans text-sm text-[#0b2545]">
          By accessing this website, you agree to these Terms
          of Use. If you do not agree, please do not use this website.
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-12">

        <Section number="1" title="Acceptance of Terms">
          <p>
            By accessing or using this website, you agree to comply with these Terms of Use and
            all applicable laws and regulations. If you do not agree with these terms, please do
            not use this website.
          </p>
        </Section>

        <Section number="2" title="Website Purpose">
          <p>
            This website provides information regarding marine electronic services, surveys,
            maintenance, communication systems, and related maritime solutions offered by
            Transocean Marine Surveyors E.A. Ltd.
          </p>
        </Section>

        <Section number="3" title="Intellectual Property">
          <p>All website content, including but not limited to:</p>
          <BulletList
            items={[
              "Text and written content",
              "Graphics and images",
              "Logos and branding",
              "Service descriptions",
              "Website design and layout",
            ]}
          />
          <p className="mt-3">
            …is the property of Transocean Marine Surveyors E.A. Ltd unless otherwise stated.
            Unauthorized reproduction, distribution, or modification is prohibited.
          </p>
        </Section>

        <Section number="4" title="User Conduct">
          <p>Users agree not to:</p>
          <BulletList
            items={[
              "Misuse the website or its content",
              "Attempt unauthorized access to any part of the website",
              "Transmit harmful, malicious, or disruptive code",
              "Interfere with website functionality or server integrity",
              "Submit false or misleading information through any contact channel",
            ]}
          />
        </Section>

        <Section number="5" title="Service Information">
          <p>
            While we strive to keep website information accurate and updated, we do not guarantee:
          </p>
          <BulletList
            items={[
              "Completeness or accuracy of content",
              "Uninterrupted availability of the website",
              "Suitability of information for specific purposes",
            ]}
          />
          <p className="mt-3">Service availability may change without notice.</p>
          <Note>
            All quotations provided through this website or by email are valid for 30 days from
            the date of issue unless otherwise stated in writing.
          </Note>
        </Section>

        <Section number="6" title="Disclaimer of Professional Liability">
          <p>
            Marine surveys, assessments, and technical recommendations provided by Transocean
            Marine Surveyors E.A. Ltd are professional opinions based on conditions observed at
            the time of inspection. They do not constitute guarantees of seaworthiness, fitness for
            purpose, or compliance with all applicable regulations.
          </p>
          <p className="mt-3">
            Reliance on survey findings without independent verification is at the sole risk of the
            user. Transocean Marine Surveyors E.A. Ltd&apos;s liability shall not exceed the value of
            the specific service rendered.
          </p>
        </Section>

        <Section number="7" title="Limitation of Liability">
          <p>Transocean Marine Surveyors E.A. Ltd shall not be liable for:</p>
          <BulletList
            items={[
              "Indirect or consequential damages",
              "Data loss or corruption",
              "Business interruption",
              "Website downtime or unavailability",
            ]}
          />
          <p className="mt-3">Users access the website at their own risk.</p>
        </Section>

        <Section number="8" title="Force Majeure">
          <p>
            Transocean Marine Surveyors E.A. Ltd shall not be held liable for delays or failures
            in service delivery caused by circumstances beyond our reasonable control, including
            but not limited to severe weather conditions, port closures, government restrictions,
            acts of God, or maritime emergencies.
          </p>
        </Section>

        <Section number="9" title="Third-Party Services and Links">
          <p>
            The website may contain links to third-party websites or services. We do not endorse
            or assume responsibility for third-party content, practices, or accuracy.
          </p>
        </Section>

        <Section number="10" title="Privacy">
          <p>
            Use of this website is also governed by our{" "}
            <a href="/privacy" className="text-[#0b6fa8] underline underline-offset-2">
              Privacy Policy
            </a>
            , which is incorporated into these Terms by reference.
          </p>
        </Section>

        <Section number="11" title="Governing Law">
          <p>
            These Terms shall be governed by and interpreted in accordance with the laws of Kenya.
            Any disputes arising from website use shall fall under the exclusive jurisdiction of
            Kenyan courts.
          </p>
        </Section>

        <Section number="12" title="Changes to Terms">
          <p>
            We reserve the right to modify these Terms of Use at any time without prior notice.
            Continued use of the website after changes are posted constitutes acceptance of the
            revised Terms.
          </p>
        </Section>

        {/* Contact Card */}
        <div className="border border-[#12263a]/20 rounded-2xl p-8 bg-white shadow-sm">
          <p className="uppercase tracking-widest text-xs text-[#7eb8d4] font-sans mb-3">
            Legal Inquiries
          </p>
          <h3 className="text-xl font-bold text-[#12263a] mb-4">
            Transocean Marine Surveyors E.A. Ltd
          </h3>
          <div className="space-y-2 font-sans text-sm text-[#333]">
            <p>
              Email:{" "}
              <a
                href="mailto:info@transoceansurveyors.com"
                className="text-[#0b6fa8] underline underline-offset-2"
              >
                info@transoceansurveyors.com
              </a>
            </p>
            <p>
              Website:{" "}
              <a
                href="https://transoceansurveyors.com"
                className="text-[#0b6fa8] underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                transoceansurveyors.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function Section({ number, title, children }) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-5 pb-3 border-b border-[#12263a]/15">
        <span className="text-[#7eb8d4] font-sans text-sm font-semibold tabular-nums">
          {String(number).padStart(2, "0")}
        </span>
        <h2 className="text-xl font-bold text-[#12263a]">{title}</h2>
      </div>
      <div className="text-[#3a3a3a] leading-relaxed text-[0.97rem]">{children}</div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#7eb8d4] flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Note({ children }) {
  return (
    <div className="mt-4 border-l-4 border-[#7eb8d4] pl-4 py-1 text-sm text-[#555] font-sans bg-[#eef6fb] rounded-r-lg">
      {children}
    </div>
  );
}