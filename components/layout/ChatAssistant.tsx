'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type Msg = { role: 'user' | 'assistant'; content: string };

const URL_RE = /(https?:\/\/[^\s]+[^\s.,!?)\]])/g;

/** Render plain text with any URLs as clickable links. */
function linkify(text: string) {
  return text.split(URL_RE).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline underline-offset-2 hover:opacity-80"
      >
        {part.includes('wa.me') ? 'Message us on WhatsApp →' : part}
      </a>
    ) : (
      part
    ),
  );
}

const GREETING: Msg = {
  role: 'assistant',
  content:
    "Hi, I'm Truck — the Bigadtruck assistant. Ask me about our services, divisions or process, or tell me what you're working on and I'll get the right team on it.",
};

const SUGGESTIONS = [
  'What services do you offer?',
  'I want a quote for a website',
  'Help with social media marketing',
];

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    const next = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(next);
    setInput('');
    setSending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Drop the static greeting; send only real turns.
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            data?.reply ||
            'Sorry — something went wrong. Please email vivek@bigadtruck.com and we’ll help.',
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            'Sorry — I couldn’t reach the server. Please email vivek@bigadtruck.com or call +91 79723 61076.',
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close assistant' : 'Chat with our assistant'}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105 focus-visible:outline-none sm:bottom-6 sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Bigadtruck assistant"
            className="fixed bottom-24 right-3 left-3 z-[60] flex h-[min(70vh,560px)] flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl sm:left-auto sm:right-6 sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line bg-bg/40 px-5 py-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-ink">Truck — AI assistant</p>
                <p className="truncate text-xs text-muted">Bigadtruck Group · usually replies instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[85%] whitespace-pre-wrap text-pretty rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'bg-accent text-white'
                        : 'border border-line bg-surface text-ink',
                    )}
                  >
                    {linkify(m.content)}
                  </div>
                </div>
              ))}

              {sending && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-line bg-bg/40 px-4 py-2.5 text-sm text-muted">
                    <Loader2 className="h-4 w-4 animate-spin" /> Truck is typing…
                  </div>
                </div>
              )}

              {messages.length === 1 && !sending && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-line px-3 py-1.5 text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-line bg-bg/40 p-3"
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask anything, or share your brief…"
                  className="max-h-28 flex-1 resize-none rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  aria-label="Send message"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-all hover:brightness-110 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 px-1 text-[11px] text-muted">
                AI assistant — may make mistakes. For anything urgent, call +91 79723 61076.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
