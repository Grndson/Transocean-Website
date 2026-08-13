import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Transocean Marine Surveyors | Marine Electronics & GMDSS Specialists – Kenya",
  description:
    "Kenya's leading marine electronics and GMDSS specialists. Certified surveys, EPIRB programming, AIS installation, and vessel compliance services across East Africa.",
  keywords:
    "marine survey Kenya, GMDSS survey Kenya, EPIRB programming Kenya, AIS installation Mombasa, marine electronics East Africa, LRIT testing Kenya",
  openGraph: {
    title: "Transocean Marine Surveyors | Marine Electronics & GMDSS – Kenya",
    description:
      "Certified marine electronics, GMDSS surveys, and navigation solutions for vessels in East Africa.",
    type: "website",
    url: "https://transoceansurveyors.com",
  },
  verification: {
    google: "iNn_OHtmGHBd9Ekz99bc79X-wL9Oyk0dJrHAWwO0asg",
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <GoogleAnalytics gaId="G-LPH0FCCL0G" />
      </body>
    </html>
  );
}
