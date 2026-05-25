// components/PrivacyPolicy.jsx
// Drop into your Next.js project and import wherever needed.
// Requires Tailwind CSS (already in most Next.js setups).

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#1a1a1a] font-serif">
      {/* Hero */}
      <div className="bg-[#0b2545] text-white px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="uppercase tracking-[0.25em] text-[#7eb8d4] text-xs font-sans mb-4">
            Legal · Transocean Marine Surveyors E.A. Ltd
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#a8c8dc] font-sans text-sm">
            Effective Date: May 22, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-12">

        <Section number="1" title="Introduction">
          <p>
            Transocean Marine Surveyors E.A. Ltd (&quot;Transocean Marine Surveyors&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
            respects your privacy and is committed to protecting any personal information collected
            through our website and services.
          </p>
          <p className="mt-3">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit{" "}
            <a
              href="https://transoceansurveyors.com"
              className="text-[#0b6fa8] underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              transoceansurveyors.com
            </a>{" "}
            or contact us regarding our marine electronic and communication services.
          </p>
        </Section>

        <Section number="2" title="Information We Collect">
          <Subsection title="Personal Information">
            <BulletList
              items={[
                "Full name",
                "Company name",
                "Email address",
                "Phone number",
                "Vessel information",
                "Details submitted through contact forms or email communication",
              ]}
            />
          </Subsection>
          <Subsection title="Technical Information">
            <BulletList
              items={[
                "IP address",
                "Browser type",
                "Device information",
                "Website usage data",
                "Cookies and analytics data",
              ]}
            />
          </Subsection>
        </Section>

        <Section number="3" title="How We Use Your Information">
          <BulletList
            items={[
              "Respond to inquiries and service requests",
              "Provide quotations and technical support",
              "Deliver marine survey and maintenance services",
              "Improve website functionality and user experience",
              "Maintain communication with clients",
              "Comply with legal and maritime regulatory obligations",
            ]}
          />
        </Section>

        <Section number="4" title="Cookies and Analytics">
          <p>
            Our website may use cookies and analytics tools to improve website performance and
            understand visitor interaction. You may disable cookies through your browser settings;
            however, some website features may not function properly.
          </p>
          <Note>
            By continuing to use our website without adjusting your browser settings, you consent
            to our use of cookies as described in this policy.
          </Note>
        </Section>

        <Section number="5" title="Sharing of Information">
          <p>We do not sell or rent personal information. We may share information:</p>
          <BulletList
            items={[
              "With authorized employees and technicians",
              "With classification societies or maritime authorities when required for compliance",
              "With service providers assisting in website hosting or technical support",
              "When required by law or regulatory authorities",
            ]}
          />
        </Section>

        <Section number="6" title="Data Security">
          <p>
            We implement reasonable administrative and technical measures to protect your information
            from unauthorized access, disclosure, or misuse.
          </p>
          <p className="mt-3">
            However, no online transmission or storage system can be guaranteed to be completely secure.
          </p>
        </Section>

        <Section number="7" title="Third-Party Links">
          <p>
            Our website may contain links to third-party websites. We are not responsible for the
            privacy practices or content of external websites.
          </p>
        </Section>

        <Section number="8" title="Data Retention">
          <p>We retain information only for as long as necessary to:</p>
          <BulletList
            items={[
              "Fulfill service obligations",
              "Maintain business records",
              "Comply with maritime regulations",
              "Satisfy legal requirements",
            ]}
          />
        </Section>

        <Section number="9" title="Children's Privacy">
          <p>
            Our website and services are not directed at children under the age of 18. We do not
            knowingly collect personal information from minors. If you believe a minor has provided
            us personal data, please contact us immediately so we can delete it.
          </p>
        </Section>

        <Section number="10" title="International Data Transfers">
          <p>
            If you are located outside Kenya, please be aware that your information may be transferred
            to, stored, and processed in Kenya or other jurisdictions. By using our services, you
            consent to such transfers. We take steps to ensure your data is treated securely wherever
            it is processed.
          </p>
        </Section>

        <Section number="11" title="Your Rights">
          <p>Depending on applicable laws, you may have the right to:</p>
          <BulletList
            items={[
              "Request access to your personal data",
              "Request correction of inaccurate data",
              "Request deletion of your information",
              "Object to certain processing activities",
            ]}
          />
          <p className="mt-3">
            Requests may be submitted through our official contact email.
          </p>
        </Section>

        <Section number="12" title="Changes to This Policy">
          <p>
            We reserve the right to update this Privacy Policy at any time. Changes will become
            effective upon posting on this website. We encourage you to review this page periodically.
          </p>
        </Section>

        {/* Contact Card */}
        <div className="border border-[#0b2545]/20 rounded-2xl p-8 bg-white shadow-sm">
          <p className="uppercase tracking-widest text-xs text-[#7eb8d4] font-sans mb-3">
            Privacy Inquiries
          </p>
          <h3 className="text-xl font-bold text-[#0b2545] mb-4">
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
      <div className="flex items-baseline gap-3 mb-5 pb-3 border-b border-[#0b2545]/15">
        <span className="text-[#7eb8d4] font-sans text-sm font-semibold tabular-nums">
          {String(number).padStart(2, "0")}
        </span>
        <h2 className="text-xl font-bold text-[#0b2545]">{title}</h2>
      </div>
      <div className="text-[#3a3a3a] leading-relaxed text-[0.97rem]">{children}</div>
    </section>
  );
}

function Subsection({ title, children }) {
  return (
    <div className="mt-5">
      <h3 className="font-sans font-semibold text-[0.8rem] uppercase tracking-widest text-[#555] mb-3">
        {title}
      </h3>
      {children}
    </div>
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