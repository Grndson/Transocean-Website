export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  details: string[];
  icon: string; // lucide icon name
  keywords: string[];
}

export const services: Service[] = [
  {
    slug: "gmdss-survey",
    shortTitle: "GMDSS Radio Survey",
    title: "GMDSS Radio Survey",
    tagline: "Certified surveys accepted by Lloyd's Register, BV, IRS & ZMA",
    description:
      "We conduct GMDSS radio surveys on behalf of major classification societies to ensure vessel communication systems operate within international standards. Our inspections cover VHF, MF/HF, INMARSAT, EPIRB, SART, and NAVTEX systems, with complete certification and reporting support.",
    details: [
      "Full inspection of all GMDSS equipment onboard",
      "VHF, MF/HF, INMARSAT, EPIRB, SART & NAVTEX systems",
      "Survey documentation and certification issuance",
      "Accepted by Lloyd's Register, BV, IRS, and ZMA",
      "SOLAS compliance verification",
      "Post-survey deficiency reporting and support",
    ],
    icon: "Radio",
    keywords: ["GMDSS radio survey Kenya", "GMDSS survey Mombasa", "vessel radio inspection Kenya"],
  },
  {
    slug: "gmdss-maintenance",
    shortTitle: "GMDSS Maintenance",
    title: "GMDSS Shore-Based Maintenance",
    tagline: "SBM Agreement License issuance and full system maintenance",
    description:
      "We provide shore-based maintenance agreements covering inspection, fault diagnosis, and testing of all GMDSS components. Our certified support ensures vessels remain operational, compliant, and ready for any maritime emergency.",
    details: [
      "Inspection, repair, and testing of all GMDSS systems",
      "SBM Agreement License issuance and management",
      "Fault diagnosis and corrective maintenance",
      "Scheduled preventive maintenance plans",
      "Emergency call-out support",
      "Full documentation and compliance records",
    ],
    icon: "Wrench",
    keywords: ["GMDSS shore maintenance Kenya", "SBM agreement Kenya", "GMDSS maintenance Mombasa"],
  },
  {
    slug: "lrit-ais",
    shortTitle: "LRIT & AIS Systems",
    title: "LRIT & AIS Tracking Systems",
    tagline: "Certified setup, testing, and compliance for vessel tracking",
    description:
      "Certified setup and testing of Long-Range Identification and Tracking (LRIT), Automatic Identification System (AIS), and Ship Security Alert System (SSAS) units. We ensure full compliance, reliable tracking, and secure vessel monitoring.",
    details: [
      "LRIT system installation and certification",
      "Class A and Class B AIS transponder programming",
      "SSAS configuration and testing",
      "Compliance with SOLAS Chapter V requirements",
      "Vessel tracking performance verification",
      "Post-installation compliance certificates",
    ],
    icon: "Navigation",
    keywords: ["LRIT installation Kenya", "AIS installation Mombasa", "vessel tracking Kenya"],
  },
  {
    slug: "gmdss-programming",
    shortTitle: "GMDSS Programming",
    title: "GMDSS Programming (EPIRB / VHF / DSC)",
    tagline: "Expert programming for reliable distress alerting and IMO compliance",
    description:
      "Expert programming of EPIRBs, VHF radios, MF/HF transceivers, and DSC controllers for reliable distress alerting and full IMO compliance. Correct MMSI registration and vessel identification configured for every unit.",
    details: [
      "EPIRB registration and programming (406 MHz)",
      "VHF radio DSC programming and MMSI setup",
      "MF/HF transceiver configuration",
      "SART and PLB testing",
      "NAVTEX receiver setup",
      "IMO compliance verification and documentation",
    ],
    icon: "Broadcast",
    keywords: ["EPIRB programming Kenya", "VHF programming Mombasa", "DSC radio Kenya"],
  },
  {
    slug: "installation-repairs",
    shortTitle: "Installation & Repairs",
    title: "Installation, Repairs & Maintenance",
    tagline: "Onboard and workshop service for all marine electronics",
    description:
      "Our engineers handle installation, servicing, and calibration of all shipboard navigation and communication equipment. Each installation follows international standards. We also offer comprehensive workshop repair services for electronics.",
    details: [
      "Radar installation, alignment, and maintenance",
      "Autopilot system installation and calibration",
      "Gyro and magnetic compass servicing",
      "Echo sounder and ECDIS installation",
      "Workshop electronics repair facility",
      "Onboard field service — minimal vessel downtime",
    ],
    icon: "Cpu",
    keywords: ["marine electronics installation Kenya", "marine repairs Mombasa", "radar installation Kenya"],
  },
  {
    slug: "equipment-supply",
    shortTitle: "Equipment Supply",
    title: "Marine Navigation & Communication Equipment Supply",
    tagline: "Genuine, type-approved equipment from leading manufacturers",
    description:
      "Supply of genuine, type-approved marine navigation and communication equipment from trusted manufacturers. We stock and source equipment for all vessel types, ensuring compatibility, performance, and long-term reliability.",
    details: [
      "ICOM VHF, MF/HF, and satellite radios",
      "Jotron EPIRBs, SARTs, and distress beacons",
      "Samyung radar and navigation systems",
      "Koden radar and echo sounders",
      "Martek marine safety equipment",
      "Genuine spare parts and type-approved replacements",
    ],
    icon: "Package",
    keywords: ["marine equipment supply Kenya", "ICOM dealer Kenya", "Jotron EPIRB Kenya"],
  },
  {
    slug: "nemo-vms",
    shortTitle: "NEMO VMS",
    title: "NEMO VMS for Fishing Vessels",
    tagline: "Kenyan fisheries compliance — installation and maintenance",
    description:
      "Reliable installation, configuration, and maintenance of NEMO Vessel Monitoring System (VMS) tracking for fishing vessels operating in Kenyan waters — ensuring compliance with Kenya Fisheries Service requirements and real-time vessel monitoring.",
    details: [
      "NEMO-VMS hardware installation and configuration",
      "Kenya Fisheries Service compliance setup",
      "Real-time vessel position reporting",
      "System testing and certification",
      "Ongoing maintenance and support contracts",
      "Fault diagnosis and unit replacement",
    ],
    icon: "Anchor",
    keywords: ["NEMO VMS Kenya", "fishing vessel tracking Kenya", "Kenya fisheries VMS"],
  },
  {
    slug: "ais-transponder",
    shortTitle: "AIS Transponders",
    title: "AIS Transponder Services",
    tagline: "Class A & Class B installation, programming, and maintenance",
    description:
      "Professional installation, programming, and maintenance of Class A and Class B AIS transponders. We enhance vessel tracking, collision avoidance capability, and maritime safety compliance for all vessel types.",
    details: [
      "Class A AIS transponder installation",
      "Class B AIS installation for smaller vessels",
      "MMSI programming and vessel data configuration",
      "Integration with ECDIS and chart plotters",
      "Performance testing and calibration",
      "Annual maintenance and inspection",
    ],
    icon: "Signal",
    keywords: ["AIS transponder Kenya", "Class A AIS Mombasa", "AIS installation East Africa"],
  },
  {
    slug: "compass-autopilot",
    shortTitle: "Compass & Autopilot",
    title: "Compass & Autopilot Systems",
    tagline: "Calibration and maintenance for precise navigation",
    description:
      "Installation, calibration, and maintenance of magnetic compasses, gyro compasses, and autopilot systems. We ensure precise navigation, optimal steering performance, and full compliance with marine safety standards.",
    details: [
      "Magnetic compass adjustment and deviation card",
      "Gyro compass installation and calibration",
      "Autopilot system installation and sea trials",
      "Heading sensor and rate gyro servicing",
      "Integration with navigation systems",
      "Compliance certification and documentation",
    ],
    icon: "Compass",
    keywords: ["compass calibration Kenya", "autopilot installation Mombasa", "gyro compass Kenya"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
