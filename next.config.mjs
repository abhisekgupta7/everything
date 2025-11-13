/**
 * Next.js dev server expects a JS or MJS config at runtime.
 * This file mirrors the previous TypeScript config and is safe for development.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Development-only allowed origins for local tunnels (ngrok/localtunnel)
  allowedDevOrigins: [
    "http://localhost:3000",
    "https://*.loca.lt",
    "https://*.ngrok.io",
    // Add your exact tunnel host when running, e.g. 'https://myapp.loca.lt'
  ],
};

export default nextConfig;
