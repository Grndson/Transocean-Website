// Server component — fetches hero from Sanity via PageHero
// Form logic lives in ContactForm (client component)

import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Transocean Marine Surveyors Kenya",
  description:
    "Get in touch with Transocean Marine Surveyors for GMDSS surveys, marine electronics installation, and vessel compliance services in East Africa.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        page="contact"
        defaultLabel="Get In Touch"
        defaultHeadline="Request a Service or Quote"
        defaultSubtitle="Fill in the form and our team will get back to you within 24 hours. For urgent vessel requirements, call us directly."
      />
      <ContactForm />
    </>
  );
}