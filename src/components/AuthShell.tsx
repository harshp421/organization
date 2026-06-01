'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Icon } from './icons';

// Split auth layout: a brand panel (the "why") on the left, the form on the right.
// Used by both /login and /register so the two pages feel like one flow.

const POINTS = [
  'Browse verified credits with full plot provenance',
  'Buy at a fixed, transparent price',
  'Retire credits and download a permanent certificate',
];

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-ink-800/40 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div aria-hidden className="blob pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/20" />
        <div aria-hidden className="blob pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-secondary/15" />
        <Link href="/" className="relative w-fit cursor-pointer" aria-label="Canopy home">
          <Logo />
        </Link>
        <div className="relative max-w-md">
          <h2 className="text-3xl font-semibold leading-tight text-body">
            Carbon credits your auditors can trust.
          </h2>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-body/90">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/25">
                  <Icon.Check width={15} height={15} />
                </span>
                <span className="text-sm">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-muted">© {new Date().getFullYear()} Canopy</p>
      </aside>

      {/* Form panel */}
      <main className="flex min-h-screen flex-col px-4 py-10 sm:px-6">
        <div className="lg:hidden">
          <Link href="/" className="w-fit cursor-pointer" aria-label="Canopy home">
            <Logo />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm animate-fade-up">
            <h1 className="text-2xl font-semibold text-body">{title}</h1>
            <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
            <div className="mt-7">{children}</div>
            <div className="mt-6 text-center text-sm text-muted">{footer}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
