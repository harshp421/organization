'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api';
import { useAsync } from '@/lib/useAsync';
import type { Credit, CreditStatus } from '@/lib/types';
import { money, tonnes, dateLabel } from '@/lib/format';
import { PageHeader } from '@/components/PageHeader';
import { Stat } from '@/components/Stat';
import { Button } from '@/components/Button';
import { CreditChip } from '@/components/CreditChip';
import { EmptyState } from '@/components/EmptyState';
import { SkeletonCard } from '@/components/Skeleton';
import { Alert } from '@/components/Alert';
import { Icon } from '@/components/icons';

type Filter = 'all' | 'sold' | 'retired';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'sold', label: 'Owned' },
  { key: 'retired', label: 'Retired' },
];

export default function PortfolioPage() {
  const creditsState = useAsync<Credit[]>(() => api.myCredits());
  const [filter, setFilter] = useState<Filter>('all');
  const [retiringId, setRetiringId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const credits = creditsState.data ?? [];
  const retired = credits.filter((c) => c.status === 'retired');
  const active = credits.filter((c) => c.status === 'sold');
  const offsetTonnes = retired.reduce((s, c) => s + c.tonnes_issued, 0);
  const readyTonnes = active.reduce((s, c) => s + c.tonnes_issued, 0);

  const visible = useMemo(() => {
    const sorted = [...credits].sort(
      (a, b) => +new Date(b.created_at) - +new Date(a.created_at),
    );
    if (filter === 'all') return sorted;
    return sorted.filter((c) => c.status === filter);
  }, [credits, filter]);

  async function handleRetire(credit: Credit) {
    setError(null);
    setSuccess(null);
    setRetiringId(credit.id);
    try {
      const updated = await api.retire(credit.id);
      setSuccess(
        `Retired ${tonnes(credit.tonnes_issued)}. Certificate ${updated.certificate_id ?? ''} is ready.`,
      );
      creditsState.reload();
    } catch (err) {
      setError(
        err instanceof ApiError || err instanceof Error ? err.message : 'Could not retire the credit.',
      );
    } finally {
      setRetiringId(null);
    }
  }

  return (
    <div>
      <PageHeader
        title="Portfolio"
        subtitle="The credits you own. Retire them to lock in your offset."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {creditsState.loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <Stat
              label="Credits owned"
              value={credits.length}
              hint={`${tonnes(offsetTonnes + readyTonnes)} total`}
              icon={<Icon.Wallet width={18} height={18} />}
              accent="amber"
            />
            <Stat
              label="Offset secured"
              value={tonnes(offsetTonnes)}
              hint={`${retired.length} retired & frozen`}
              icon={<Icon.Lock width={18} height={18} />}
              accent="emerald"
            />
            <Stat
              label="Ready to retire"
              value={tonnes(readyTonnes)}
              hint={`${active.length} awaiting retirement`}
              icon={<Icon.Recycle width={18} height={18} />}
              accent="green"
            />
          </>
        )}
      </div>

      {success && (
        <div className="mt-6">
          <Alert tone="success">{success}</Alert>
        </div>
      )}
      {error && (
        <div className="mt-6">
          <Alert tone="error">{error}</Alert>
        </div>
      )}
      {creditsState.error && (
        <div className="mt-6">
          <Alert tone="error">
            {creditsState.error}{' '}
            <button
              onClick={creditsState.reload}
              className="font-medium text-primary hover:underline cursor-pointer"
            >
              Retry
            </button>
          </Alert>
        </div>
      )}

      <div className="mt-8">
        {/* Filter pills */}
        {!creditsState.loading && credits.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const count =
                f.key === 'all' ? credits.length : credits.filter((c) => c.status === f.key).length;
              const isOn = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isOn
                      ? 'border-primary/30 bg-primary/15 text-primary'
                      : 'border-ink-600 text-muted hover:text-body'
                  }`}
                >
                  {f.label}
                  <span className="num text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {creditsState.loading ? (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : credits.length === 0 ? (
          <EmptyState
            icon={<Icon.Store width={26} height={26} />}
            title="No credits yet"
            description="Buy verified credits from the marketplace. Once they're yours, retire them here to claim the offset and mint a certificate."
            action={
              <Link href="/market">
                <Button variant="cta">
                  <Icon.Store width={18} height={18} />
                  Browse marketplace
                </Button>
              </Link>
            }
          />
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<Icon.Recycle width={26} height={26} />}
            title="Nothing here"
            description="No credits match this filter."
          />
        ) : (
          <div className="space-y-3">
            {visible.map((c) => (
              <PortfolioCard
                key={c.id}
                credit={c}
                retiring={retiringId === c.id}
                disabled={retiringId !== null}
                onRetire={() => handleRetire(c)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PortfolioCard({
  credit,
  retiring,
  disabled,
  onRetire,
}: {
  credit: Credit;
  retiring: boolean;
  disabled: boolean;
  onRetire: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const total = credit.tonnes_issued * credit.price_per_tonne;

  return (
    <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon.Trees width={20} height={20} />
        </span>
        <div className="min-w-0">
          <p className="font-medium text-body">
            {tonnes(credit.tonnes_issued)} · Tier {credit.tier}
          </p>
          <p className="text-xs text-muted">
            {money(total)} · bought {dateLabel(credit.created_at)}
          </p>
          {credit.certificate_id && (
            <p className="num mt-0.5 text-xs text-primary">{credit.certificate_id}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:flex-row-reverse">
        {/* Retired credits expose ZERO write affordances — view certificate only. */}
        {credit.status === 'retired' && credit.certificate_id ? (
          <Link href={`/certificates/${credit.certificate_id}`}>
            <Button variant="ghost">
              <Icon.Award width={16} height={16} />
              View certificate
            </Button>
          </Link>
        ) : credit.status === 'sold' ? (
          confirming ? (
            <div className="flex items-center gap-2">
              <Button variant="cta" loading={retiring} disabled={disabled && !retiring} onClick={onRetire}>
                {!retiring && <Icon.Lock width={16} height={16} />}
                Confirm retire
              </Button>
              {!retiring && (
                <Button variant="subtle" onClick={() => setConfirming(false)}>
                  Cancel
                </Button>
              )}
            </div>
          ) : (
            <Button variant="ghost" disabled={disabled} onClick={() => setConfirming(true)}>
              <Icon.Recycle width={16} height={16} />
              Retire
            </Button>
          )
        ) : null}
        <CreditChip status={credit.status} />
      </div>
    </div>
  );
}
