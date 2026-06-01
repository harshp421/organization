// Public marketing landing page — server-rendered (SSR). This is the client-facing
// surface: it has no auth, no client data fetching, and renders entirely on the
// server. The buyer application (dashboard, marketplace, portfolio) lives under
// the (app) route group and is client-rendered (CSR).
//
// Design: Organic Biophilic — rounded forms, soft natural shadows, flowing blobs,
// warm-paper light base with a single confident green accent (CLAUDE.md §Design).

import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { Icon } from '@/components/icons';
import { money, tonnes } from '@/lib/format';

// Indicative figures derived from the MVP constants (spec §5). Real numbers come
// from the live marketplace once you sign in — this is illustrative context only.
const PRICE = 18;
const FARMER_SHARE = 0.7;

const STEPS = [
  {
    Glyph: Icon.Search,
    title: 'Browse the marketplace',
    body: 'Every listed credit shows its plot, species, tree count and the farmer behind it. No mystery offsets.',
  },
  {
    Glyph: Icon.Cart,
    title: 'Buy at a fair, fixed price',
    body: `Credits are priced at ${money(PRICE)}/tonne. ${Math.round(
      FARMER_SHARE * 100,
    )}% goes straight to the farmer who grew the trees.`,
  },
  {
    Glyph: Icon.Recycle,
    title: 'Retire to claim the offset',
    body: 'Retiring a credit freezes it forever — it can never be resold or double-counted against another organization.',
  },
  {
    Glyph: Icon.Award,
    title: 'Download your certificate',
    body: 'Each retired credit mints a unique certificate ID you can share with auditors, partners and stakeholders.',
  },
];

const FEATURES = [
  {
    Glyph: Icon.Trees,
    title: 'Real provenance',
    body: 'Every credit links back to a specific plot and the farmer who planted it — traceable from forest to certificate.',
  },
  {
    Glyph: Icon.Shield,
    title: 'Verified before listing',
    body: 'Credits only reach the marketplace after the platform verifies the plot and issues tonnes net of a 15% buffer.',
  },
  {
    Glyph: Icon.Chart,
    title: 'Append-only ledger',
    body: 'Every state change is written to an immutable ledger. Nothing is edited or deleted — the record is the proof.',
  },
  {
    Glyph: Icon.Lock,
    title: 'Permanent retirement',
    body: 'A retired credit is final. The system rejects any further change, so your offset claim can never be undone.',
  },
];

// Illustrative featured listings for the marketing preview. The live data appears
// once you sign in to the marketplace — these are clearly a sample.
const SAMPLE_LISTINGS = [
  { species: 'Teak', farmer: 'Asha Rao', trees: 1200, tonnes: 78, tier: 'A' },
  { species: 'Bamboo', farmer: 'Green Valley Co-op', trees: 3400, tonnes: 54, tier: 'B' },
  { species: 'Acacia', farmer: 'Samuel Okoye', trees: 2100, tonnes: 41, tier: 'A' },
];

export default function MarketingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* Organic flowing blobs — soft natural background, never flat. */}
          <div
            aria-hidden
            className="blob pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-primary/20"
          />
          <div
            aria-hidden
            className="blob pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-secondary/15"
          />

          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Icon.Leaf width={14} height={14} />
                Carbon credits you can actually trace
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-body sm:text-5xl lg:text-6xl">
                Offset with credits
                <br />
                <span className="text-primary">you can prove.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Canopy is the marketplace where organizations buy verified forestry
                carbon credits, retire them for good, and walk away with a permanent
                certificate — each one backed by a real plot and an append-only ledger.
              </p>

              {/* Hero search affordance — the marketplace is the conversion surface. */}
              <div className="mt-8 flex max-w-md items-center gap-2 rounded-2xl border border-ink-600 bg-ink-700 p-2 shadow-soft">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-800 text-muted">
                  <Icon.Search width={18} height={18} />
                </span>
                <span className="flex-1 truncate text-sm text-muted">
                  Search credits by species, region, tier…
                </span>
                <Link
                  href="/register"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-cta px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-cta-hover cursor-pointer"
                >
                  Browse
                  <Icon.Arrow width={16} height={16} />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-2">
                  <Icon.Check width={16} height={16} className="text-primary" />
                  No mystery offsets
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon.Check width={16} height={16} className="text-primary" />
                  {Math.round(FARMER_SHARE * 100)}% to farmers
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon.Check width={16} height={16} className="text-primary" />
                  Permanent retirement
                </span>
              </div>
            </div>

            {/* Floating credit preview card */}
            <div className="relative animate-fade-up lg:animate-float">
              <div className="card overflow-hidden p-0">
                <div className="flex items-center justify-between border-b border-ink-600 bg-ink-800/60 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
                      <Icon.Trees width={20} height={20} />
                    </span>
                    <div>
                      <p className="font-medium text-body">Teak · 1,200 trees</p>
                      <p className="text-xs text-muted">Planted 2019 · Asha Rao</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-state-verified/30 bg-state-verified/10 px-2.5 py-1 text-xs font-medium text-state-verified">
                    <Icon.Tag width={13} height={13} />
                    Listed
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-px bg-ink-600">
                  <div className="bg-ink-700 p-5">
                    <p className="text-xs uppercase tracking-wider text-muted">Available</p>
                    <p className="num mt-1 text-2xl font-semibold text-body">{tonnes(78)}</p>
                  </div>
                  <div className="bg-ink-700 p-5">
                    <p className="text-xs uppercase tracking-wider text-muted">Price</p>
                    <p className="num mt-1 text-2xl font-semibold text-body">
                      {money(PRICE)}
                      <span className="text-sm font-normal text-muted">/t</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-ink-600 p-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">Total</p>
                    <p className="num text-xl font-semibold text-body">{money(78 * PRICE)}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-xl bg-cta px-4 py-2.5 text-sm font-semibold text-white shadow-soft">
                    <Icon.Cart width={16} height={16} />
                    Buy credit
                  </span>
                </div>
              </div>
              <span className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-ink-600 bg-ink-700 px-4 py-3 shadow-soft sm:block">
                <span className="flex items-center gap-2 text-sm font-medium text-body">
                  <Icon.Lock width={16} height={16} className="text-primary" />
                  Certificate #CERT-…
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* ── Trust strip ──────────────────────────────────────────────── */}
        <section className="border-y border-ink-600/60 bg-ink-800/40">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              { value: money(PRICE), label: 'Fixed price per tonne' },
              { value: `${Math.round(FARMER_SHARE * 100)}%`, label: 'Goes to the farmer' },
              { value: '15%', label: 'Buffer held in reserve' },
              { value: '100%', label: 'On an append-only ledger' },
            ].map((s) => (
              <div key={s.label} className="px-2 py-8 text-center">
                <p className="num text-3xl font-semibold text-primary sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────────────── */}
        <section id="how" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-body sm:text-4xl">
              From marketplace to certificate in four steps
            </h2>
            <p className="mt-4 text-lg text-muted">
              The whole loop is designed so your offset claim is defensible — every
              step leaves a record you can point an auditor to.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="card relative p-6">
                <span className="num absolute right-5 top-5 text-sm font-semibold text-ink-600">
                  0{i + 1}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <step.Glyph width={22} height={22} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-body">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features / why Canopy ────────────────────────────────────── */}
        <section className="border-y border-ink-600/60 bg-ink-800/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Icon.Shield width={14} height={14} />
                  Built for trust
                </span>
                <h2 className="mt-5 text-3xl font-semibold text-body sm:text-4xl">
                  The carbon market has a credibility problem. We fixed the plumbing.
                </h2>
                <p className="mt-4 text-lg text-muted">
                  Canopy enforces its integrity rules on the server, not just in the
                  UI. A credit can only move forward, can be sold once, and once
                  retired it is frozen — permanently.
                </p>
                <Link
                  href="/register"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cta px-5 py-3 text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-cta-hover cursor-pointer"
                >
                  Create an organization account
                  <Icon.Arrow width={16} height={16} />
                </Link>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {FEATURES.map((f) => (
                  <div key={f.title} className="card p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <f.Glyph width={20} height={20} />
                    </span>
                    <h3 className="mt-4 font-semibold text-body">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Marketplace preview ──────────────────────────────────────── */}
        <section id="marketplace" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold text-body sm:text-4xl">
                A marketplace where every listing has a backstory
              </h2>
              <p className="mt-4 text-lg text-muted">
                A sample of what you&apos;ll see inside. Sign in to browse live
                credits, with full plot provenance on every card.
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-soft"
            >
              View live marketplace
              <Icon.Arrow width={16} height={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_LISTINGS.map((c) => (
              <div key={c.species + c.farmer} className="card p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon.Trees width={20} height={20} />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-state-verified/30 bg-state-verified/10 px-2.5 py-1 text-xs font-medium text-state-verified">
                    <Icon.Tag width={13} height={13} />
                    Listed
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-body">
                  {c.species} · {c.trees.toLocaleString()} trees
                </h3>
                <p className="text-sm text-muted">
                  by {c.farmer} · Tier {c.tier}
                </p>
                <div className="mt-5 flex items-end justify-between border-t border-ink-600 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">Available</p>
                    <p className="num text-xl font-semibold text-body">{tonnes(c.tonnes)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider text-muted">Total</p>
                    <p className="num text-xl font-semibold text-body">
                      {money(c.tonnes * PRICE)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-muted">
            Illustrative listings · live data shown after sign in
          </p>
        </section>

        {/* ── Trust / ledger ───────────────────────────────────────────── */}
        <section id="trust" className="scroll-mt-20 border-y border-ink-600/60 bg-ink-800/40">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Icon.Chart width={14} height={14} />
                The ledger
              </span>
              <h2 className="mt-5 text-3xl font-semibold text-body sm:text-4xl">
                Every credit&apos;s whole life, written down once and never erased
              </h2>
              <p className="mt-4 text-lg text-muted">
                Issued, listed, sold, retired — each transition is appended to an
                immutable ledger. We never update or delete a row. That record is
                what makes a Canopy offset auditable.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'A credit moves forward only — never backward, never skipping.',
                  'A credit can be sold exactly once.',
                  'A retired credit is frozen — the API rejects any further change.',
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-body/90">
                    <Icon.Check width={18} height={18} className="mt-0.5 shrink-0 text-primary" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini ledger timeline */}
            <div className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Credit lifecycle
              </p>
              <ol className="mt-5 space-y-0">
                {[
                  { event: 'Issued', detail: '78 t · tier A · buffer applied', Glyph: Icon.Spark, tone: 'text-secondary' },
                  { event: 'Listed', detail: 'Live on the marketplace', Glyph: Icon.Tag, tone: 'text-state-verified' },
                  { event: 'Sold', detail: 'Split 70/30 · farmer paid', Glyph: Icon.Users, tone: 'text-state-sold' },
                  { event: 'Retired', detail: 'Certificate minted · frozen', Glyph: Icon.Lock, tone: 'text-state-verified' },
                ].map((e, i, arr) => (
                  <li key={e.event} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className={`grid h-9 w-9 place-items-center rounded-full bg-ink-800 ring-1 ring-ink-600 ${e.tone}`}>
                        <e.Glyph width={16} height={16} />
                      </span>
                      {i < arr.length - 1 && <span className="my-1 w-px flex-1 bg-ink-600" />}
                    </div>
                    <div className={i < arr.length - 1 ? 'pb-5' : ''}>
                      <p className="font-medium text-body">{e.event}</p>
                      <p className="text-sm text-muted">{e.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Pricing / economics ──────────────────────────────────────── */}
        <section id="pricing" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-body sm:text-4xl">
              Simple, honest pricing
            </h2>
            <p className="mt-4 text-lg text-muted">
              One transparent price. A split that puts most of the money where the
              carbon actually came from.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="card p-8">
              <p className="text-sm font-medium uppercase tracking-wider text-muted">
                Per tonne CO₂e
              </p>
              <p className="num mt-2 text-5xl font-semibold text-body">{money(PRICE)}</p>
              <p className="mt-2 text-sm text-muted">
                Fixed list price across the marketplace. What you see is what you pay.
              </p>
              <Link
                href="/register"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cta px-5 py-3 text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-cta-hover cursor-pointer"
              >
                Start buying credits
                <Icon.Arrow width={16} height={16} />
              </Link>
            </div>

            <div className="card p-8">
              <p className="text-sm font-medium uppercase tracking-wider text-muted">
                Where each dollar goes
              </p>
              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-body">Farmer</span>
                    <span className="num text-body">{Math.round(FARMER_SHARE * 100)}%</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-600">
                    <div className="h-full rounded-full bg-primary" style={{ width: '70%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-body">Platform</span>
                    <span className="num text-body">{Math.round((1 - FARMER_SHARE) * 100)}%</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-600">
                    <div className="h-full rounded-full bg-secondary" style={{ width: '30%' }} />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                The platform&apos;s 30% covers verification, the ledger and the
                marketplace. The farmer keeps the rest.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA band ─────────────────────────────────────────────────── */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 px-6 py-16 text-center sm:px-12">
            <div aria-hidden className="blob pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-body sm:text-4xl">
                Start offsetting with credits you can defend
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
                Create an organization account, browse the marketplace, and retire
                your first credit today.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-cta px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-cta-hover cursor-pointer"
                >
                  Get started
                  <Icon.Arrow width={16} height={16} />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-700 px-6 py-3.5 text-sm font-semibold text-body transition-colors duration-200 hover:border-primary/50 cursor-pointer"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
