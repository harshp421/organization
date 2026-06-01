// Auth context — holds the current organization session and persists it across
// reloads. The backend issues a JWT (spec §8); we cache it plus the returned user
// so the app shell can render without a round-trip on every refresh.
//
// Because the org panel is a Next app whose marketing page is server-rendered, the
// provider must not touch localStorage during SSR — it hydrates the session inside
// an effect and exposes a `ready` flag so guards can wait for it.

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { api, setToken } from './api';
import type { User } from './types';

const USER_KEY = 'canopy.org.user';

function loadUser(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  /** False until the session has been read from storage on the client. */
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  // Hydrate the persisted session once, on the client only.
  useEffect(() => {
    setUser(loadUser());
    setReady(true);
  }, []);

  const persist = useCallback((u: User, token: string) => {
    setToken(token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await api.login({ email, password });
      assertOrg(res.user.role);
      persist(res.user, res.token);
    },
    [persist],
  );

  const register = useCallback(
    async (input: { email: string; password: string; name: string }) => {
      // The org panel only ever creates organization accounts.
      const res = await api.register({ ...input, role: 'org' });
      assertOrg(res.user.role);
      persist(res.user, res.token);
    },
    [persist],
  );

  const logout = useCallback(() => {
    setToken(null);
    window.localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({ user, isAuthenticated: user !== null, ready, login, register, logout }),
    [user, ready, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function assertOrg(role: string): void {
  if (role !== 'org') {
    throw new Error(
      'This account is not an organization account. Use the matching panel for your role.',
    );
  }
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
