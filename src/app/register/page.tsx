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

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, ready } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && isAuthenticated) router.replace('/dashboard');
  }, [ready, isAuthenticated, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      await register({ name: name.trim(), email: email.trim(), password });
      router.replace('/dashboard');
    } catch (err) {
      setError(
        err instanceof ApiError || err instanceof Error ? err.message : 'Could not create account.',
      );
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create your organization account"
      subtitle="Start buying and retiring verified carbon credits."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:text-primary-soft">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && <Alert tone="error">{error}</Alert>}
        <TextField
          label="Organization name"
          type="text"
          autoComplete="organization"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Acme Inc."
        />
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
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          hint="Use 8 or more characters."
        />
        <Button type="submit" variant="cta" block loading={loading}>
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}
