'use client';

// The only interactive island on the otherwise server-rendered marketing page:
// a sticky top nav with a mobile menu toggle. Keeping this small preserves SSR
// for the rest of the landing content.

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../Logo';
import { Icon } from '../icons';

const LINKS = [
  { href: '#how', label: 'How it works' },
  { href: '#marketplace', label: 'Marketplace' },
  { href: '#trust', label: 'Trust' },
  { href: '#pricing', label: 'Pricing' },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-600/60 bg-ink-900/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="cursor-pointer" aria-label="Canopy home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-body"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-3 py-2 text-sm font-medium text-body transition-colors duration-200 hover:bg-ink-700/60 cursor-pointer"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-cta px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-cta-hover cursor-pointer"
          >
            Get started
            <Icon.Arrow width={16} height={16} />
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-ink-600 text-muted hover:text-body md:hidden cursor-pointer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <Icon.X /> : <Icon.Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-600/60 bg-ink-800/80 px-4 py-4 md:hidden">
          <nav className="space-y-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-ink-700/60 hover:text-body"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-ink-600 px-4 py-2.5 text-center text-sm font-medium text-body hover:bg-ink-700/60 cursor-pointer"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-cta px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-cta-hover cursor-pointer"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
