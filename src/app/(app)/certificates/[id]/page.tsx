'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAsync } from '@/lib/useAsync';
import type { Certificate } from '@/lib/types';
import { money, tonnes, dateLabel, dateTimeLabel, speciesLabel } from '@/lib/format';
import { Button } from '@/components/Button';
import { Alert } from '@/components/Alert';
import { SkeletonLine } from '@/components/Skeleton';
import { Logo } from '@/components/Logo';
import { Icon } from '@/components/icons';

export default function CertificatePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const certState = useAsync<Certificate>(() => api.certificate(id), [id]);
  const cert = certState.data;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-body"
        >
          <Icon.Arrow width={16} height={16} className="rotate-180" />
          Back to portfolio
        </Link>
        {cert && (
          <Button variant="ghost" onClick={() => window.print()}>
            <Icon.Download width={16} height={16} />
            Download / print
          </Button>
        )}
      </div>

      {certState.error && (
        <Alert tone="error">
          {certState.error}{' '}
          <button
            onClick={certState.reload}
            className="font-medium text-primary hover:underline cursor-pointer"
          >
            Retry
          </button>
        </Alert>
      )}

      {certState.loading ? (
        <div className="card mx-auto max-w-2xl space-y-4 p-8">
          <SkeletonLine className="h-8 w-48" />
          <SkeletonLine className="h-4 w-64" />
          <SkeletonLine className="h-24 w-full" />
          <SkeletonLine className="h-4 w-40" />
        </div>
      ) : cert ? (
        <article className="card mx-auto max-w-2xl overflow-hidden p-0">
          {/* Certificate header */}
          <div className="relative overflow-hidden border-b border-ink-600 bg-ink-800/50 p-8">
            <div aria-hidden className="blob pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <Logo />
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">
                  Certificate of retirement
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-body">
                  {tonnes(cert.tonnes_issued)} CO₂e permanently retired
                </h1>
              </div>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-state-verified/10 text-state-verified ring-1 ring-state-verified/30">
                <Icon.Award width={28} height={28} />
              </span>
            </div>
          </div>

          {/* Certificate ID band */}
          <div className="flex items-center justify-between border-b border-ink-600 bg-ink-700 px-8 py-4">
            <span className="text-xs uppercase tracking-wider text-muted">Certificate ID</span>
            <span className="num text-sm font-semibold text-body">{cert.certificate_id}</span>
          </div>

          {/* Detail grid */}
          <dl className="grid grid-cols-1 gap-x-8 gap-y-6 p-8 sm:grid-cols-2">
            <Detail label="Retired by" value={cert.owner_name ?? '—'} icon={<Icon.Building width={16} height={16} />} />
            <Detail
              label="Retired on"
              value={cert.retired_at ? dateTimeLabel(cert.retired_at) : '—'}
              icon={<Icon.Calendar width={16} height={16} />}
            />
            <Detail
              label="Tonnes CO₂e"
              value={tonnes(cert.tonnes_issued)}
              icon={<Icon.Leaf width={16} height={16} />}
            />
            <Detail
              label="Verification tier"
              value={`Tier ${cert.tier}`}
              icon={<Icon.Shield width={16} height={16} />}
            />
            <Detail
              label="Source plot"
              value={`${speciesLabel(cert.plot_species)} · ${cert.plot_tree_count.toLocaleString()} trees`}
              icon={<Icon.Trees width={16} height={16} />}
            />
            <Detail
              label="Grown by"
              value={cert.farmer_name}
              icon={<Icon.Users width={16} height={16} />}
            />
            <Detail
              label="Planted"
              value={dateLabel(cert.plot_planting_date)}
              icon={<Icon.Calendar width={16} height={16} />}
            />
            <Detail
              label="Price paid"
              value={money(cert.tonnes_issued * cert.price_per_tonne)}
              icon={<Icon.Coins width={16} height={16} />}
            />
          </dl>

          {/* Footer / integrity note */}
          <div className="flex items-center gap-3 border-t border-ink-600 bg-state-verified/5 px-8 py-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-state-verified/10 text-state-verified ring-1 ring-state-verified/30">
              <Icon.Lock width={16} height={16} />
            </span>
            <p className="text-sm text-muted">
              This credit is <span className="font-medium text-body">retired and frozen</span>. It
              can never be resold, transferred or double-counted — the retirement is recorded
              permanently on Canopy&apos;s append-only ledger.
            </p>
          </div>
        </article>
      ) : null}
    </div>
  );
}

function Detail({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
        <span className="text-primary">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-medium text-body">{value}</dd>
    </div>
  );
}
