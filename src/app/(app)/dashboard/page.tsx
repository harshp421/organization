'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { useAsync } from '@/lib/useAsync';
import type { Credit } from '@/lib/types';
import { money, tonnes, dateLabel } from '@/lib/format';
import { PageHeader } from '@/components/PageHeader';
import { Stat } from '@/components/Stat';
import { Button } from '@/components/Button';
import { CreditChip } from '@/components/CreditChip';
import { EmptyState } from '@/components/EmptyState';
import { SkeletonCard } from '@/components/Skeleton';
import { Alert } from '@/components/Alert';
import { Icon } from '@/components/icons';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const creditsState = useAsync<Credit[]>(() => api.myCredits());

  const credits = creditsState.data ?? [];
  const retired = credits.filter((c) => c.status === 'retired');
  const active = credits.filter((c) => c.status === 'sold');
  const offsetTonnes = retired.reduce((s, c) => s + c.tonnes_issued, 0);
  const readyTonnes = active.reduce((s, c) => s + c.tonnes_issued, 0);
  const spend = credits.reduce((s, c) => s + c.tonnes_issued * c.price_per_tonne, 0);
  const recent = [...credits]
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
    .slice(0, 4);

  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        subtitle="Your carbon credit portfolio at a glance."
        action={
          <Button variant="cta" onClick={() => router.push('/market')}>
            <Icon.Store width={18} height={18} />
            Browse marketplace
          </Button>
        }
      />

      {creditsState.error && (
        <div className="mb-5">
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {creditsState.loading ? (
          <>
            <SkeletonCard />
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
              hint={`${retired.length} retired`}
              icon={<Icon.Lock width={18} height={18} />}
              accent="emerald"
            />
            <Stat
              label="Ready to retire"
              value={tonnes(readyTonnes)}
              hint={`${active.length} owned, not retired`}
              icon={<Icon.Recycle width={18} height={18} />}
              accent="green"
            />
            <Stat
              label="Total spend"
              value={money(spend)}
              hint="Across all credits"
              icon={<Icon.Coins width={18} height={18} />}
              accent="muted"
            />
          </>
        )}
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-body">Recent credits</h2>
          {credits.length > 0 && (
            <Link
              href="/portfolio"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-soft"
            >
              View portfolio
              <Icon.Arrow width={16} height={16} />
            </Link>
          )}
        </div>

        {creditsState.loading ? (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : recent.length === 0 ? (
          <EmptyState
            icon={<Icon.Store width={26} height={26} />}
            title="Buy your first credit"
            description="Browse the marketplace to find verified credits backed by real plots. Buying a credit makes it yours to retire."
            action={
              <Button variant="cta" onClick={() => router.push('/market')}>
                <Icon.Store width={18} height={18} />
                Browse marketplace
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {recent.map((c) => (
              <Link
                key={c.id}
                href="/portfolio"
                className="card flex items-center justify-between gap-4 p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon.Trees width={20} height={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-body">
                      {tonnes(c.tonnes_issued)} · Tier {c.tier}
                    </p>
                    <p className="text-xs text-muted">
                      {money(c.tonnes_issued * c.price_per_tonne)} · bought {dateLabel(c.created_at)}
                    </p>
                  </div>
                </div>
                <CreditChip status={c.status} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
