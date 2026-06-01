'use client';

import { useMemo, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import { useAsync } from '@/lib/useAsync';
import type { MarketCredit } from '@/lib/types';
import { money, tonnes, dateLabel, speciesLabel } from '@/lib/format';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { SkeletonTile } from '@/components/Skeleton';
import { Alert } from '@/components/Alert';
import { Icon } from '@/components/icons';

export default function MarketPage() {
  const marketState = useAsync<MarketCredit[]>(() => api.market());
  const [query, setQuery] = useState('');
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const credits = marketState.data ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return credits;
    return credits.filter(
      (c) =>
        speciesLabel(c.plot_species).toLowerCase().includes(q) ||
        c.farmer_name.toLowerCase().includes(q) ||
        c.tier.toLowerCase() === q,
    );
  }, [credits, query]);

  async function handleBuy(credit: MarketCredit) {
    setError(null);
    setSuccess(null);
    setBuyingId(credit.id);
    try {
      await api.buy(credit.id);
      setSuccess(
        `Purchased ${tonnes(credit.tonnes_issued)} from ${credit.farmer_name}. Retire it from your portfolio to claim the offset.`,
      );
      marketState.reload();
    } catch (err) {
      setError(
        err instanceof ApiError || err instanceof Error ? err.message : 'Could not complete the purchase.',
      );
    } finally {
      setBuyingId(null);
    }
  }

  return (
    <div>
      <PageHeader
        title="Marketplace"
        subtitle="Verified credits, each backed by a real plot and farmer."
      />

      {/* Hero-style search — the marketplace is the conversion surface. */}
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-ink-600 bg-ink-700 p-2 shadow-soft">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-800 text-muted">
          <Icon.Search width={18} height={18} />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by species, farmer or tier (A/B/C)…"
          className="flex-1 bg-transparent px-1 text-sm text-body placeholder:text-muted/60 focus:outline-none"
          aria-label="Search the marketplace"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="grid h-9 w-9 place-items-center rounded-xl text-muted hover:bg-ink-800 hover:text-body cursor-pointer"
            aria-label="Clear search"
          >
            <Icon.X width={16} height={16} />
          </button>
        )}
      </div>

      {success && (
        <div className="mb-5">
          <Alert tone="success">{success}</Alert>
        </div>
      )}
      {error && (
        <div className="mb-5">
          <Alert tone="error">{error}</Alert>
        </div>
      )}
      {marketState.error && (
        <div className="mb-5">
          <Alert tone="error">
            {marketState.error}{' '}
            <button
              onClick={marketState.reload}
              className="font-medium text-primary hover:underline cursor-pointer"
            >
              Retry
            </button>
          </Alert>
        </div>
      )}

      {marketState.loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonTile />
          <SkeletonTile />
          <SkeletonTile />
        </div>
      ) : credits.length === 0 ? (
        <EmptyState
          icon={<Icon.Store width={26} height={26} />}
          title="No credits listed yet"
          description="When the platform verifies plots and lists credits, they'll appear here ready to buy. Check back shortly."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Icon.Search width={26} height={26} />}
          title="No matches"
          description={`Nothing matches “${query}”. Try a different species, farmer or tier.`}
          action={
            <Button variant="ghost" onClick={() => setQuery('')}>
              Clear search
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <MarketCard
              key={c.id}
              credit={c}
              buying={buyingId === c.id}
              disabled={buyingId !== null}
              onBuy={() => handleBuy(c)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MarketCard({
  credit,
  buying,
  disabled,
  onBuy,
}: {
  credit: MarketCredit;
  buying: boolean;
  disabled: boolean;
  onBuy: () => void;
}) {
  const total = credit.tonnes_issued * credit.price_per_tonne;
  return (
    <div className="card flex flex-col p-6">
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
        {speciesLabel(credit.plot_species)} · {credit.plot_tree_count.toLocaleString()} trees
      </h3>
      <p className="text-sm text-muted">
        by {credit.farmer_name} · Tier {credit.tier}
      </p>
      <p className="mt-1 text-xs text-muted">
        Planted {dateLabel(credit.plot_planting_date)}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-ink-600 pt-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">Available</p>
          <p className="num text-lg font-semibold text-body">{tonnes(credit.tonnes_issued)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-muted">
            {money(credit.price_per_tonne)}/t
          </p>
          <p className="num text-lg font-semibold text-body">{money(total)}</p>
        </div>
      </div>

      <Button
        variant="cta"
        block
        className="mt-5"
        loading={buying}
        disabled={disabled && !buying}
        onClick={onBuy}
      >
        {!buying && <Icon.Cart width={16} height={16} />}
        Buy for {money(total)}
      </Button>
    </div>
  );
}
