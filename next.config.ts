import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const scriptSource = isDevelopment
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com"
  : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Sanity Studio has its own CSP requirements and authentication flow.
        source: "/:path((?!studio(?:/|$)).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; ${scriptSource}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://cdn.sanity.io https://www.google-analytics.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-src https://www.google.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests`,
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
