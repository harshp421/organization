'use client';

// Client-rendered (CSR) shell for the authenticated buyer app. Everything under
// this route group fetches from the backend in the browser with the stored JWT —
// in contrast to the server-rendered marketing page at /.
//
// Gates access: waits for the session to hydrate, then bounces unauthenticated
// visitors to /login.

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { AppLayout } from '@/components/AppLayout';
import { Logo } from '@/components/Logo';

export default function AppGroupLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !isAuthenticated) router.replace('/login');
  }, [ready, isAuthenticated, router]);

  // Hold the layout until we know the auth state — avoids a flash of the app
  // shell for signed-out visitors and prevents a hydration mismatch.
  if (!ready || !isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Logo compact />
          <span
            className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"
            aria-hidden
          />
          <span className="sr-only">Loading…</span>
        </div>
      </div>
    );
  }

  return <AppLayout>{children}</AppLayout>;
}
