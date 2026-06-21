'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { contactSchema, serviceInterests, budgetRanges, type ContactInput } from '@/lib/validation';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: 'Not sure yet' },
  });

  async function onSubmit(data: ContactInput) {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-line bg-surface p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-ink">Message on its way.</h3>
        <p className="mx-auto mt-3 max-w-md text-pretty text-muted">
          Thanks — we’ve got your brief and we’ll be in touch shortly. For anything urgent, WhatsApp
          or call us directly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-medium text-ink underline-offset-4 hover:text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register('website')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message} required>
          <input {...register('name')} placeholder="Your name" className={inputCls(!!errors.name)} />
        </Field>
        <Field label="Email" error={errors.email?.message} required>
          <input type="email" {...register('email')} placeholder="you@company.com" className={inputCls(!!errors.email)} />
        </Field>
        <Field label="Phone" error={errors.phone?.message} required>
          <input type="tel" {...register('phone')} placeholder="+91 ..." className={inputCls(!!errors.phone)} />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input {...register('company')} placeholder="Company / organisation" className={inputCls(!!errors.company)} />
        </Field>
        <Field label="Service interest" error={errors.service?.message} required>
          <select {...register('service')} className={inputCls(!!errors.service)}>
            {serviceInterests.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget" error={errors.budget?.message}>
          <select {...register('budget')} className={inputCls(!!errors.budget)} defaultValue="">
            <option value="">Select a range (optional)</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" error={errors.message?.message} required>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us about your brand, your goal and the destination you have in mind."
          className={inputCls(!!errors.message)}
        />
      </Field>

      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm text-red-400" role="alert">
          <AlertCircle className="h-4 w-4" /> Something went wrong sending your message. Please try
          again, or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-white transition-all hover:brightness-110 disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === 'sending' ? 'Sending…' : 'Send the brief'}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-sm font-medium text-ink">
        {label}
        {required && <span className="text-accent">*</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-red-400" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full rounded-xl border bg-surface px-4 py-3 text-ink placeholder:text-muted shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30',
    '[&>option]:bg-surface [&>option]:text-ink',
    hasError ? 'border-red-400/70 focus:border-red-400' : 'border-line focus:border-accent',
  );
}
