import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type Variant = 'primary' | 'ghost' | 'link';
type Size = 'md' | 'lg';

const base =
  'group/btn inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 ease-expo focus-visible:outline-offset-4 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:brightness-110 hover:shadow-[0_8px_30px_-8px_var(--accent)] active:scale-[0.98]',
  ghost:
    'border border-line text-ink hover:bg-ink hover:text-bg active:scale-[0.98]',
  link: 'text-ink underline-offset-4 hover:text-accent rounded-none',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  withArrow,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], variant !== 'link' && sizes[size], className)} {...props}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  withArrow,
  className,
  children,
  ...props
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, 'href'>) {
  const external = href.startsWith('http');
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], variant !== 'link' && sizes[size], className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
      {withArrow && <Arrow />}
    </Link>
  );
}

function Arrow() {
  return (
    <ArrowUpRight
      className="h-4 w-4 transition-transform duration-300 ease-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
      aria-hidden
    />
  );
}
