// components/Testimonials.tsx

import { Star } from "lucide-react";
import { client } from "@/lib/sanity";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

// Fallback data — used if no testimonials in Sanity yet
const fallbackTestimonials = [
  {
    _id: "1",
    name: "Capt. K. Mwangi",
    role: "Fleet Manager, East Africa Shipping",
    text: "Transocean handled our vessel's GMDSS survey with exceptional professionalism. Their team was thorough, fast, and ensured we left port fully compliant with zero surprises during inspection.",
    rating: 5,
  },
  {
    _id: "2",
    name: "J. Odhiambo",
    role: "Port Operations, Mombasa",
    text: "We rely on Transocean for all our EPIRB programming and AIS installation work. Their engineers know these systems inside out, and the turnaround time is always impressive.",
    rating: 5,
  },
  {
    _id: "3",
    name: "A. Njoroge",
    role: "Owner, Coastal Fishing Ltd.",
    text: "The NEMO-VMS installation they did on our fishing fleet was seamless. The team was knowledgeable about Kenyan fisheries compliance and got us sorted quickly.",
    rating: 5,
  },
];

async function getTestimonials() {
  try {
    const results = await client.fetch(
      `*[_type == "testimonial" && featured == true] | order(order asc){
        _id,
        name,
        role,
        text,
        rating
      }`
    );
    
    return results?.length > 0 ? results : fallbackTestimonials;
  } catch {
    return fallbackTestimonials;
  }
}

function getInitials(name: string) {
  return name
    .replace(/^(Capt\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n: string) => n[0].toUpperCase())
    .join("");
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section className="py-24" style={{ background: "#0a1628" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className="block text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-syne)", color: "#c8a84b" }}
          >
            Client Testimonials
          </span>
          <h2
            className="text-[clamp(28px,4vw,42px)] font-extrabold text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            What Our Clients Say
          </h2>
          <p className="text-white/50 text-[17px] max-w-[480px] mx-auto leading-relaxed">
            Vessel operators, fleet managers, and shipping companies trust
            Transocean across East African ports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t: Testimonial) => (
            <div
              key={t._id}
              className="rounded-lg p-8 flex flex-col transition-all duration-300 hover:border-[#1e90b8]/30"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating ?? 5)].map((_, i) => (
                  <Star key={i} size={14} fill="#c8a84b" color="#c8a84b" />
                ))}
              </div>

              <p className="text-white/65 text-[15px] leading-relaxed mb-6 italic flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0"
                  style={{
                    background: "rgba(30,144,184,0.18)",
                    color: "#1e90b8",
                    fontFamily: "var(--font-syne)",
                  }}
                >
                  {getInitials(t.name)}
                </div>
                <div>
                  <strong
                    className="block text-white text-[13px] font-semibold"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {t.name}
                  </strong>
                  <span className="text-[#8a9ab5] text-[12px]">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}