import Link from 'next/link';
import { Logo } from '../Logo';

const COLS = [
  {
    title: 'Product',
    links: [
      { href: '#how', label: 'How it works' },
      { href: '#marketplace', label: 'Marketplace' },
      { href: '#pricing', label: 'Pricing' },
      { href: '/register', label: 'Get started' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { href: '#trust', label: 'The ledger' },
      { href: '#trust', label: 'Verification' },
      { href: '#trust', label: 'Provenance' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '#', label: 'About' },
      { href: '#', label: 'Contact' },
      { href: '#', label: 'Careers' },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-ink-600/60 bg-ink-800/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            A carbon credit marketplace built on traceable provenance and an
            append-only ledger. Every credit is backed by a real plot.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-body">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l, i) => (
                <li key={`${l.label}-${i}`}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-body"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-600/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Canopy. A carbon credit marketplace.</p>
          <p className="flex items-center gap-4">
            <Link href="#" className="hover:text-body">Privacy</Link>
            <Link href="#" className="hover:text-body">Terms</Link>
            <span>Prices in USD · MVP demo</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
