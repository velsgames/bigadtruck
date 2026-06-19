'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().email();

/**
 * Lightweight newsletter capture. Posts to /api/contact with a newsletter flag.
 * Degrades gracefully — shows a confirmation even if email delivery is stubbed.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailSchema.safeParse(email).success) {
      setState('error');
      return;
    }
    setState('loading');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newsletter: true, email }),
      });
      setState('done');
    } catch {
      setState('done'); // never block the UI on a newsletter signup
    }
  }

  if (state === 'done') {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-ink">
        <Check className="h-4 w-4 text-accent" /> You’re on the list. Talk soon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === 'error') setState('idle');
          }}
          placeholder="you@company.com"
          aria-label="Email address"
          aria-invalid={state === 'error'}
          className="w-full rounded-full border border-line bg-transparent px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={state === 'loading'}
        aria-label="Subscribe"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-105 disabled:opacity-60"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
      {state === 'error' && (
        <span className="sr-only" role="alert">
          Please enter a valid email.
        </span>
      )}
    </form>
  );
}
