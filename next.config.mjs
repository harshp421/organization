/** @type {import('next').NextConfig} */
// The organization panel is one of three separate frontends (farmer / org / platform).
// It talks to the single Canopy backend (spac/001_poc.md §7).
//
// In dev we proxy `/api/*` to the backend so the browser sees same-origin requests
// (mirrors the farmer panel's Vite proxy). The app's API client uses BASE = '/api'.
const BACKEND_ORIGIN = process.env.BACKEND_ORIGIN ?? 'http://localhost:3000';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_ORIGIN}/:path*`,
      },
    ];
  },
};

export default nextConfig;
