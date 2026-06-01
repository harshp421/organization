'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { initials } from '@/lib/format';
import { Logo } from './Logo';
import { Button } from './Button';
import { Icon } from './icons';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', Glyph: Icon.Grid },
  { href: '/market', label: 'Marketplace', Glyph: Icon.Store },
  { href: '/portfolio', label: 'Portfolio', Glyph: Icon.Wallet },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {NAV.map(({ href, label, Glyph }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
              active
                ? 'bg-primary/15 text-primary ring-1 ring-primary/20'
                : 'text-muted hover:bg-ink-700/60 hover:text-body'
            }`}
          >
            <Glyph width={18} height={18} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar — desktop */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-ink-600/60 bg-ink-800/40 p-5 lg:flex print:hidden">
        <Link href="/dashboard" className="cursor-pointer" aria-label="Canopy dashboard">
          <Logo />
        </Link>
        <div className="mt-8 flex-1">
          <NavItems />
        </div>
        <BrowseCta />
        <UserCard name={user?.name ?? ''} email={user?.email ?? ''} onLogout={handleLogout} />
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen flex-col">
        {/* Top bar — mobile */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ink-600/60 bg-ink-900/80 px-4 py-3 backdrop-blur lg:hidden print:hidden">
          <Link href="/dashboard" className="cursor-pointer" aria-label="Canopy dashboard">
            <Logo />
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink-600 text-muted hover:text-body cursor-pointer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <Icon.X /> : <Icon.Menu />}
          </button>
        </header>

        {mobileOpen && (
          <div className="border-b border-ink-600/60 bg-ink-800/60 px-4 py-4 lg:hidden">
            <NavItems onNavigate={() => setMobileOpen(false)} />
            <div className="mt-4">
              <BrowseCta onNavigate={() => setMobileOpen(false)} />
            </div>
            <div className="mt-4">
              <UserCard name={user?.name ?? ''} email={user?.email ?? ''} onLogout={handleLogout} />
            </div>
          </div>
        )}

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}

function BrowseCta({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  return (
    <Button
      variant="cta"
      block
      className="mb-5"
      onClick={() => {
        onNavigate?.();
        router.push('/market');
      }}
    >
      <Icon.Store width={18} height={18} />
      Browse marketplace
    </Button>
  );
}

function UserCard({
  name,
  email,
  onLogout,
}: {
  name: string;
  email: string;
  onLogout: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-ink-600/60 bg-ink-700/40 p-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
        {initials(name) || 'O'}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-body">{name || 'Organization'}</p>
        <p className="truncate text-xs text-muted">{email}</p>
      </div>
      <button
        onClick={onLogout}
        className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-ink-700 hover:text-state-rejected cursor-pointer"
        aria-label="Log out"
        title="Log out"
      >
        <Icon.Logout width={18} height={18} />
      </button>
    </div>
  );
}
