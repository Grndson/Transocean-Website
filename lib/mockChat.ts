// lib/mockChat.ts
// Simulates AI responses using real company data.
// Used in MOCK MODE — no API key needed.
// When you have your API key, the ChatWidget switches to the real /api/chat route automatically.

export interface MockResponse {
  text: string;
  delay: number; // ms — simulates thinking time
}

const CONTACT = {
  phone: "+254 738 036 617",
  email: "info@transoceansurveyors.com",
  whatsapp: "https://wa.me/254738036617",
};

// Keyword → response map
const responses: Array<{ keywords: string[]; reply: string }> = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "hujambo"],
    reply:
      "Hello! Welcome to Transocean Marine Surveyors EA Limited. How can I assist you today?",
  },
  {
    keywords: ["gmdss", "radio survey", "radio inspection", "vhf", "mf/hf", "epirb", "sart", "navtex", "inmarsat"],
    reply:
      "We conduct full GMDSS radio surveys on behalf of Lloyd's Register, Bureau Veritas, IRS, and ZMA. Our inspections cover VHF, MF/HF, INMARSAT, EPIRB, SART, and NAVTEX systems — with complete certification and reporting. To book a survey, call us on " +
      CONTACT.phone +
      " or email " +
      CONTACT.email +
      ".",
  },
  {
    keywords: ["maintenance", "shore-based", "sbm", "shore based", "repair", "fault"],
    reply:
      "Our GMDSS shore-based maintenance (SBM) service covers inspection, fault diagnosis, repair, and testing of all GMDSS components. We issue SBM Agreement Licenses and offer emergency call-out support. Contact us at " +
      CONTACT.phone +
      " to set up a maintenance plan.",
  },
  {
    keywords: ["lrit", "ais", "tracking", "ssas", "vessel tracking", "transponder"],
    reply:
      "We handle certified setup, testing, and compliance for LRIT, AIS (Class A & B), and SSAS systems. We also provide Class A and Class B AIS transponder installation, MMSI programming, and integration with ECDIS. Reach us at " +
      CONTACT.phone +
      " for details.",
  },
  {
    keywords: ["programming", "mmsi", "dsc", "epirb program", "vhf program"],
    reply:
      "We program EPIRBs (406 MHz), VHF radios with DSC, MF/HF transceivers, and NAVTEX receivers. Correct MMSI registration and IMO compliance verification are included. Contact us at " +
      CONTACT.email +
      " or call " +
      CONTACT.phone +
      ".",
  },
  {
    keywords: ["installation", "radar", "autopilot", "gyro", "compass", "echo sounder", "ecdis"],
    reply:
      "Our engineers handle installation, servicing, and calibration of radar, autopilot systems, gyro and magnetic compasses, echo sounders, and ECDIS — all to international standards. We also have a full workshop for electronics repair. Call " +
      CONTACT.phone +
      " to schedule onboard service.",
  },
  {
    keywords: ["supply", "equipment", "icom", "jotron", "samyung", "koden", "martek", "mcmurdo", "spare parts", "buy"],
    reply:
      "We supply genuine, type-approved marine electronics from ICOM, Jotron, Samyung, Koden, Martek, and McMurdo. This includes VHF/MF/HF radios, EPIRBs, SARTs, radar systems, and spare parts. Email " +
      CONTACT.email +
      " with your vessel requirements for a quote.",
  },
  {
    keywords: ["nemo", "vms", "fishing", "fisheries", "kenya fisheries"],
    reply:
      "We install and maintain the NEMO Vessel Monitoring System (VMS) for fishing vessels operating in Kenyan waters, ensuring compliance with Kenya Fisheries Service requirements. Contact us at " +
      CONTACT.phone +
      " for installation details.",
  },
  {
    keywords: ["book", "booking", "appointment", "schedule", "survey", "request", "quote", "enquiry", "inquiry"],
    reply:
      "To book a survey or request a quote, you can: (1) Fill the contact form on our website at /contact, (2) Call us on " +
      CONTACT.phone +
      ", (3) Email us at " +
      CONTACT.email +
      ", or (4) WhatsApp us. We respond to all enquiries within 24 hours on business days.",
  },
  {
    keywords: ["price", "cost", "how much", "rate", "fee", "charges"],
    reply:
      "Our pricing depends on the vessel type, service required, and scope of work. We provide customised quotes for every job. Please contact us directly on " +
      CONTACT.phone +
      " or email " +
      CONTACT.email +
      " for an accurate quote tailored to your vessel.",
  },
  {
    keywords: ["contact", "phone", "call", "email", "whatsapp", "location", "address", "mombasa", "find you", "where"],
    reply:
      "You can reach us at:\n📞 Phone: " +
      CONTACT.phone +
      "\n📧 Email: " +
      CONTACT.email +
      "\n📍 Location: Mombasa, Kenya — East African Waters\nWe are available on business days and respond within 24 hours.",
  },
  {
    keywords: ["lloyd", "bureau veritas", "bv", "irs", "zma", "classification", "class society"],
    reply:
      "Transocean Marine Surveyors is an approved service provider for Lloyd's Register (LR), Bureau Veritas (BV), Indian Register of Shipping (IRS), and ZMA Classification. Our surveys are fully accepted by these societies.",
  },
  {
    keywords: ["experience", "how long", "years", "established", "history", "about"],
    reply:
      "Transocean Marine Surveyors EA Limited has over 15 years of experience serving vessels across East African waters. We have surveyed more than 500 vessels and maintain 100% SOLAS compliance across all our services.",
  },
  {
    keywords: ["solas", "compliance", "regulation", "imo", "international", "standard"],
    reply:
      "All our services are carried out to SOLAS and IMO standards. We ensure full compliance for GMDSS surveys, AIS/LRIT systems, navigation equipment, and safety equipment. Our documentation and certification support is comprehensive.",
  },
  {
    keywords: ["thank", "thanks", "asante", "appreciate"],
    reply:
      "You're welcome! If you have any other questions or need to book a service, don't hesitate to ask. You can also reach us directly on " +
      CONTACT.phone +
      ". Have a great day!",
  },
];

const FALLBACK =
  "Thank you for your message. I'm not sure I have a specific answer for that, but our team will be happy to help. Please contact us directly on " +
  CONTACT.phone +
  " or email " +
  CONTACT.email +
  " and we'll respond within 24 hours.";

export function getMockResponse(userMessage: string): MockResponse {
  const lower = userMessage.toLowerCase();

  for (const item of responses) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return {
        text: item.reply,
        delay: 900 + Math.random() * 800, // 0.9s – 1.7s
      };
    }
  }

  return {
    text: FALLBACK,
    delay: 1000,
  };
}