'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { ApiError } from '@/lib/api';
import { AuthShell } from '@/components/AuthShell';
import { TextField } from '@/components/Field';
import { Button } from '@/components/Button';
import { Alert } from '@/components/Alert';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, ready } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Keep signed-in orgs out of the auth pages.
  useEffect(() => {
    if (ready && isAuthenticated) router.replace('/dashboard');
  }, [ready, isAuthenticated, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof ApiError || err instanceof Error ? err.message : 'Could not sign in.');
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your organization account."
      footer={
        <>
          New to Canopy?{' '}
          <Link href="/register" className="font-medium text-primary hover:text-primary-soft">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && <Alert tone="error">{error}</Alert>}
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <Button type="submit" variant="cta" block loading={loading}>
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
