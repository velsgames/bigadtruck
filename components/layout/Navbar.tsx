'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { nav, type NavItem } from '@/content/site';
import { ButtonLink } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  // Lock body scroll when the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-expo',
        scrolled || activeMenu
          ? 'border-b border-line bg-bg/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label="Bigadtruck Group — home" className="relative z-10">
          <Logo priority className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              active={activeMenu === item.label}
              onHover={() => setActiveMenu(item.children ? item.label : null)}
              pathname={pathname}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/contact" variant="primary" size="md" withArrow>
            Start a project
          </ButtonLink>
        </div>

        <button
          className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop mega-menu panel */}
      <AnimatePresence>
        {activeMenu && (
          <MegaMenu item={nav.find((n) => n.label === activeMenu)!} />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>{open && <MobileDrawer onClose={() => setOpen(false)} />}</AnimatePresence>
    </header>
  );
}

function NavLink({
  item,
  active,
  onHover,
  pathname,
}: {
  item: NavItem;
  active: boolean;
  onHover: () => void;
  pathname: string;
}) {
  const isCurrent = pathname === item.href || pathname.startsWith(item.href + '/');
  return (
    <Link
      href={item.href}
      onMouseEnter={onHover}
      className={cn(
        'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
        active || isCurrent ? 'text-ink' : 'text-muted hover:text-ink',
      )}
    >
      {item.label}
      {(active || isCurrent) && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 -z-10 rounded-full bg-surface"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}
    </Link>
  );
}

function MegaMenu({ item }: { item: NavItem }) {
  if (!item.children) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 top-full hidden border-b border-line bg-bg/95 backdrop-blur-xl lg:block"
    >
      <div className="container grid grid-cols-2 gap-2 py-8">
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="group flex items-start justify-between gap-4 rounded-2xl border border-transparent p-4 transition-colors hover:border-line hover:bg-surface"
          >
            <div>
              <div className="font-display text-base font-medium text-ink">{child.label}</div>
              {child.description && (
                <div className="mt-1 text-sm text-muted">{child.description}</div>
              )}
            </div>
            <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-bg lg:hidden"
    >
      <nav className="container flex flex-col gap-1 py-6" aria-label="Mobile">
        {nav.map((item) => (
          <div key={item.label} className="border-b border-line py-2">
            <Link href={item.href} className="block py-2 font-display text-2xl font-medium" onClick={onClose}>
              {item.label}
            </Link>
            {item.children && (
              <div className="flex flex-col gap-1 pb-2 pl-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="py-1.5 text-sm text-muted"
                    onClick={onClose}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <ButtonLink href="/contact" variant="primary" size="lg" withArrow className="mt-6 w-full">
          Start a project
        </ButtonLink>
      </nav>
    </motion.div>
  );
}
