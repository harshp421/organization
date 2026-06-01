// Typed client for the Canopy backend (spac/001_poc.md §7).
// The organization panel calls the Auth + Organization endpoints; the farmer and
// platform panels own the rest.
//
// All errors leave the server in a single envelope (backend skill convention):
//   { error: { code, message, details? } }
// We unwrap that into an `ApiError` so UI can show `message` and branch on `code`.

import type {
  AuthResponse,
  Certificate,
  Credit,
  MarketCredit,
  Role,
} from './types';

// Backend base URL — same approach as the farmer/platform panels, adapted to
// Next. Two ways to point at the backend:
//   1. NEXT_PUBLIC_API_TARGET = backend origin → direct calls (baked at build).
//   2. leave it unset → '/api', which next.config.mjs rewrites to BACKEND_ORIGIN
//      server-side (works in dev AND prod, same-origin, no CORS).
// Normalized so a trailing slash or a stray `/api` suffix doesn't break the path.
function resolveBase(): string {
  let base =
    (process.env.NEXT_PUBLIC_API_TARGET as string | undefined)?.trim() ||
    (process.env.NEXT_PUBLIC_API_BASE as string | undefined)?.trim() ||
    '/api';
  base = base.replace(/\/+$/, ''); // drop trailing slash(es)
  // For an absolute backend origin, routes live at the root — drop a `/api` suffix.
  if (/^https?:\/\//i.test(base)) {
    base = base.replace(/\/api$/, '');
  }
  return base;
}

const BASE = resolveBase();

const TOKEN_KEY = 'canopy.org.token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  /** Set false for auth calls that must not carry a stale token. */
  auth?: boolean;
}

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = true } = opts;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const token = auth ? getToken() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    // Network / CORS / backend-not-running.
    throw new ApiError('NETWORK', 'Could not reach the Canopy server. Is the backend running?', 0);
  }

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  const payload = text ? safeJson(text) : null;

  if (!res.ok) {
    const env = (payload as { error?: { code?: string; message?: string; details?: unknown } } | null)
      ?.error;
    throw new ApiError(
      env?.code ?? 'ERROR',
      env?.message ?? `Request failed (${res.status})`,
      res.status,
      env?.details,
    );
  }
  return payload as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const api = {
  // Auth
  register: (input: { email: string; password: string; name: string; role: Role }) =>
    request<AuthResponse>('/auth/register', { method: 'POST', body: input, auth: false }),

  login: (input: { email: string; password: string }) =>
    request<AuthResponse>('/auth/login', { method: 'POST', body: input, auth: false }),

  // Organization
  market: () => request<MarketCredit[]>('/market'),

  buy: (creditId: string) =>
    request<Credit>(`/credits/${creditId}/buy`, { method: 'POST' }),

  myCredits: () => request<Credit[]>('/credits/mine'),

  retire: (creditId: string) =>
    request<Credit>(`/credits/${creditId}/retire`, { method: 'POST' }),

  certificate: (certificateId: string) =>
    request<Certificate>(`/certificates/${certificateId}`),
};
