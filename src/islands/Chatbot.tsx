import { useEffect, useRef, useState } from 'preact/hooks';
import { greeting, suggestions, visibleSuggestions } from '../data/chatbot';
import { getAnswer } from '../lib/answer';
import { ASK_EVENT } from '../lib/ask';
import './Chatbot.css';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
}

const TYPING_MS = 700;

const sameQuestion = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: 'bot', text: greeting }]);
  const [asked, setAsked] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(0);

  const panelRef = useRef<HTMLElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  // Given: questions can arrive faster than answers (typing + chips + ask events).
  // Approach: chain every reply onto one promise so answers come back in order.
  const queue = useRef<Promise<void>>(Promise.resolve());

  const push = (from: Message['from'], text: string) =>
    setMessages((m) => [...m, { id: nextId.current++, from, text }]);

  const send = (raw: string) => {
    const question = raw.trim();
    if (!question) return;

    push('user', question);
    const chip = suggestions.find((s) => sameQuestion(s, question));
    if (chip) setAsked((a) => (a.includes(chip) ? a : [...a, chip]));

    setPending((n) => n + 1);
    queue.current = queue.current.then(async () => {
      const [answer] = await Promise.all([
        getAnswer(question),
        new Promise((r) => setTimeout(r, TYPING_MS)),
      ]);
      push('bot', answer);
      setPending((n) => n - 1);
    });
  };

  const onSubmit = (e: Event) => {
    e.preventDefault();
    send(draft);
    setDraft('');
  };

  // Keep the newest message in view. Only the message list scrolls, never the page.
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({ top: log.scrollHeight, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [messages, pending]);

  // "Ask about this" buttons elsewhere on the page dispatch ask-pranavi.
  useEffect(() => {
    const onAsk = (e: WindowEventMap[typeof ASK_EVENT]) => {
      const question = e.detail?.question;
      if (!question) return;
      panelRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'center',
      });
      send(question);
    };
    window.addEventListener(ASK_EVENT, onAsk);
    return () => window.removeEventListener(ASK_EVENT, onAsk);
  }, []);

  const chips = suggestions.filter((s) => !asked.includes(s)).slice(0, visibleSuggestions);

  return (
    <section class="chat" ref={panelRef} aria-label="Ask about Pranavi">
      <header class="chat__header">
        <span class="chat__avatar" aria-hidden="true">
          PG
        </span>
        <div>
          <h2 class="chat__title">Ask about Pranavi</h2>
          <p class="chat__subtitle">
            <span class="chat__status" aria-hidden="true"></span>
            Answers from her resume
          </p>
        </div>
      </header>

      <div class="chat__log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions">
        {messages.map((m) => (
          <p key={m.id} class={`chat__bubble chat__bubble--${m.from}`}>
            <span class="visually-hidden">{m.from === 'bot' ? 'Assistant: ' : 'You: '}</span>
            {m.text}
          </p>
        ))}
        {pending > 0 && (
          <p class="chat__bubble chat__bubble--bot chat__typing">
            <span class="visually-hidden">Assistant is typing</span>
            <span class="chat__dot" aria-hidden="true"></span>
            <span class="chat__dot" aria-hidden="true"></span>
            <span class="chat__dot" aria-hidden="true"></span>
          </p>
        )}
      </div>

      {chips.length > 0 && (
        <ul class="chat__chips" aria-label="Suggested questions">
          {chips.map((s) => (
            <li key={s}>
              <button type="button" class="chat__chip" onClick={() => send(s)}>
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

      <form class="chat__form" onSubmit={onSubmit}>
        <label for="chat-input" class="visually-hidden">
          Your question
        </label>
        <input
          id="chat-input"
          class="chat__input"
          type="text"
          autocomplete="off"
          placeholder="Ask anything about her work…"
          value={draft}
          onInput={(e) => setDraft((e.target as HTMLInputElement).value)}
        />
        <button type="submit" class="chat__send" aria-label="Send question" disabled={!draft.trim()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </section>
  );
}
