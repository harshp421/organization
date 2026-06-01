// Small presentation helpers. Keep formatting out of components.
// Shared verbatim with the farmer panel so figures read identically across panels.

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const usdCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function money(value: number, opts: { cents?: boolean } = {}): string {
  if (!Number.isFinite(value)) return '—';
  return (opts.cents ? usdCents : usd).format(value);
}

export function tonnes(value: number, digits = 0): string {
  if (!Number.isFinite(value)) return '—';
  return `${value.toLocaleString('en-US', { maximumFractionDigits: digits })} t`;
}

/** Human date, e.g. "12 Mar 2024". */
export function dateLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

/** Long human date with time, for the certificate. */
export function dateTimeLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

const SPECIES_LABELS: Record<string, string> = {
  acacia: 'Acacia',
  teak: 'Teak',
  eucalyptus: 'Eucalyptus',
  mango: 'Mango',
  bamboo: 'Bamboo',
};

export function speciesLabel(species: string): string {
  return SPECIES_LABELS[species] ?? species;
}
