import type { Metadata } from 'next';
import { Fira_Code, Fira_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth';

// Headings Fira Code, body Fira Sans (CLAUDE.md §Typography). Exposed as CSS vars
// so the Tailwind config can reference them (font-heading / font-sans).
const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fira-code',
  display: 'swap',
});

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fira-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Canopy — Verified carbon credits for organizations',
    template: '%s · Canopy',
  },
  description:
    'Canopy is the carbon credit marketplace where organizations buy verified, traceable forestry credits and retire them with a permanent certificate. Every credit is backed by a real plot and an append-only ledger.',
  keywords: [
    'carbon credits',
    'carbon offset',
    'verified credits',
    'reforestation',
    'net zero',
    'ESG',
  ],
  openGraph: {
    title: 'Canopy — Verified carbon credits for organizations',
    description:
      'Buy verified, traceable forestry carbon credits and retire them with a permanent certificate.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${firaCode.variable} ${firaSans.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
