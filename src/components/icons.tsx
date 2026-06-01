// Inline SVG icons (Lucide-style, 24×24 viewBox, currentColor stroke).
// Per design system: SVG only — never emoji as icons. Pure stateless components,
// so they render in both server (marketing) and client (app) trees.

import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width={20}
      height={20}
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  Leaf: (p: IconProps) => (
    <Base {...p}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </Base>
  ),
  Plus: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12h14M12 5v14" />
    </Base>
  ),
  Grid: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </Base>
  ),
  Store: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 9 4.5 4h15L21 9M3 9v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9h18M9 20v-5h6v5" />
    </Base>
  ),
  Cart: (p: IconProps) => (
    <Base {...p}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h2.5l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h8.6a1.5 1.5 0 0 0 1.5-1.2L20 7H5.2" />
    </Base>
  ),
  Wallet: (p: IconProps) => (
    <Base {...p}>
      <path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
      <path d="M21 12a2 2 0 0 0-2-2h-4a2 2 0 0 0 0 4h4a2 2 0 0 0 2-2Z" />
    </Base>
  ),
  Trees: (p: IconProps) => (
    <Base {...p}>
      <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
      <path d="M7 16v6M13 19v3M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
    </Base>
  ),
  Tag: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 7v5.2a2 2 0 0 0 .6 1.4l7.6 7.6a2 2 0 0 0 2.8 0l5.2-5.2a2 2 0 0 0 0-2.8l-7.6-7.6A2 2 0 0 0 10.2 3H5a2 2 0 0 0-2 2Z" />
      <path d="M7.5 7.5h.01" />
    </Base>
  ),
  Lock: (p: IconProps) => (
    <Base {...p}>
      <rect x="4.5" y="11" width="15" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Base>
  ),
  Users: (p: IconProps) => (
    <Base {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
    </Base>
  ),
  Check: (p: IconProps) => (
    <Base {...p}>
      <path d="M20 6 9 17l-5-5" />
    </Base>
  ),
  Clock: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Base>
  ),
  X: (p: IconProps) => (
    <Base {...p}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Base>
  ),
  Logout: (p: IconProps) => (
    <Base {...p}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </Base>
  ),
  Calendar: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Base>
  ),
  Spark: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </Base>
  ),
  Arrow: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  ),
  Info: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </Base>
  ),
  Shield: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  ),
  Search: (p: IconProps) => (
    <Base {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </Base>
  ),
  Download: (p: IconProps) => (
    <Base {...p}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </Base>
  ),
  Building: (p: IconProps) => (
    <Base {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h6v5H9z" />
    </Base>
  ),
  Globe: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </Base>
  ),
  Recycle: (p: IconProps) => (
    <Base {...p}>
      <path d="M7 19H4.8a1.8 1.8 0 0 1-1.5-2.7l1.6-2.8M9.3 5.4l1.1-1.9a1.8 1.8 0 0 1 3.1 0l1.8 3.1M17.5 9.5l1.7 2.9a1.8 1.8 0 0 1-1.5 2.7H14" />
      <path d="m7 19 1.8-3M14 15l3 .1-.1 3M9.3 5.4 6 7M14.5 9.6l3 1.8" />
    </Base>
  ),
  Award: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.2 13.5 7 22l5-3 5 3-1.2-8.5" />
    </Base>
  ),
  Menu: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Base>
  ),
  Star: (p: IconProps) => (
    <Base {...p}>
      <path d="m12 3 2.7 5.5 6 .9-4.4 4.2 1 6L12 17l-5.4 2.8 1-6L3.3 9.4l6-.9Z" />
    </Base>
  ),
  Chart: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 3v17a1 1 0 0 0 1 1h17" />
      <path d="m7 15 3-4 3 2 5-6" />
    </Base>
  ),
  Coins: (p: IconProps) => (
    <Base {...p}>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82" />
    </Base>
  ),
};
