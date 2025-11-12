import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    Development-only: allowlisted dev origins for the Next.js dev server.
    Add any tunnel hostnames (ngrok/localtunnel/loca.lt) you test from so the
    dev server will allow cross-origin requests to Next's internal assets
    (/_next/*). Example values below — replace or add the exact host your
    tunnel prints (including the scheme when applicable).
  */
  allowedDevOrigins: [
    "http://localhost:3000",
    // common tunnel patterns (helps for ngrok/localtunnel)
    "https://*.loca.lt",
    "https://*.ngrok.io",
    // add your exact tunnel hostname when you run it, e.g.:
    // 'https://myapp.loca.lt',
    // 'https://abcd-1234.ngrok.io',
  ],
};

export default nextConfig;
