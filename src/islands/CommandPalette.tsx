import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { navLinks, site } from '../data/site';
import { projects } from '../data/projects';
import { SELECT_PROJECT_EVENT } from '../lib/selectProject';
import './CommandPalette.css';

interface Item {
  id: string;
  label: string;
  group: string;
  hint?: string;
  keywords?: string;
  run: () => void;
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const onHome = () => window.location.pathname === '/';

// Section links: scroll in place on the home page, navigate there from other pages.
const goToSection = (id: string) => {
  if (!onHome()) {
    window.location.href = `/#${id}`;
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
  history.replaceState(null, '', `/#${id}`);
};

// Projects: select it in the switcher on the home page, or open /?project=<id>#projects.
const openProject = (id: string) => {
  const url = `/?project=${id}#projects`;
  if (!onHome()) {
    window.location.href = url;
    return;
  }
  window.dispatchEvent(new CustomEvent(SELECT_PROJECT_EVENT, { detail: { id } }));
  document
    .getElementById('projects')
    ?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
  history.replaceState(null, '', url);
};

const openInNewTab = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

const download = (href: string) => {
  const a = document.createElement('a');
  a.href = href;
  a.download = '';
  a.click();
};

const buildItems = (): Item[] => [
  ...navLinks.map((l) => {
    const id = l.href.split('#')[1]!;
    return {
      id: `go-${id}`,
      label: l.label,
      group: 'Go to',
      hint: l.num,
      keywords: id,
      run: () => goToSection(id),
    };
  }),
  ...projects.map((p) => ({
    id: `project-${p.id}`,
    label: p.name,
    group: 'Project',
    keywords: p.tags.join(' '),
    run: () => openProject(p.id),
  })),
  {
    id: 'case-quorum',
    label: 'quorum case study',
    group: 'Page',
    keywords: 'raft read',
    run: () => (window.location.href = '/projects/quorum'),
  },
  {
    id: 'resume',
    label: 'Download resume',
    group: 'Action',
    keywords: 'cv pdf',
    run: () => download(site.resume),
  },
  {
    id: 'email',
    label: 'Email',
    group: 'Link',
    hint: site.email,
    keywords: 'contact mail',
    run: () => (window.location.href = `mailto:${site.email}`),
  },
  {
    id: 'github',
    label: 'GitHub',
    group: 'Link',
    keywords: 'code repo',
    run: () => openInNewTab(site.github),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    group: 'Link',
    keywords: 'profile',
    run: () => openInNewTab(site.linkedin),
  },
  {
    id: 'theme',
    label: 'Toggle theme',
    group: 'Action',
    keywords: 'dark light mode',
    // Reuse the nav toggle so the theme logic lives in one place.
    run: () => document.querySelector<HTMLButtonElement>('[data-theme-toggle]')?.click(),
  },
];

// Given: a "Jump to…" palette opened from the nav button or Cmd/Ctrl+K on any page.
// Approach: a native <dialog> opened with showModal(), so the page behind is inert
//   and Esc closes it. The input is a combobox over a listbox; arrow keys move the
//   active option, Enter runs it. Tab is held on the input (the only focusable
//   control), and focus goes back to whatever opened the palette when it closes.
export default function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const items = useMemo(buildItems, []);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      `${it.label} ${it.group} ${it.keywords ?? ''}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    setQuery('');
    setActive(0);
    dialog.showModal();
    inputRef.current?.focus();
  };

  const close = () => dialogRef.current?.close();

  const run = (item: Item | undefined) => {
    if (!item) return;
    close();
    item.run();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-command-palette]')) open();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // Keep the active option in view while moving with the keyboard.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active, results]);

  const onKeyDown = (e: KeyboardEvent) => {
    const n = results.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (n) setActive((a) => (a + 1) % n);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (n) setActive((a) => (a - 1 + n) % n);
    } else if (e.key === 'Home' && e.ctrlKey) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End' && e.ctrlKey) {
      e.preventDefault();
      setActive(Math.max(n - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === 'Tab') {
      // The input is the only focusable control; keep focus inside the dialog.
      e.preventDefault();
    }
  };

  const onClose = () => {
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener && document.contains(opener)) opener.focus();
  };

  // A click on the dialog element itself (not its content) is a click on the backdrop.
  const onDialogClick = (e: MouseEvent) => {
    if (e.target === dialogRef.current) close();
  };

  const activeId = results[active] ? `cmdk-${results[active]!.id}` : undefined;

  return (
    <dialog
      ref={dialogRef}
      class="cmdk"
      aria-label="Jump to"
      onClose={onClose}
      onClick={onDialogClick}
    >
      <div class="cmdk__panel">
        <div class="cmdk__search">
          <svg class="cmdk__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            class="cmdk__input"
            type="text"
            role="combobox"
            aria-label="Search pages, projects and actions"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            autocomplete="off"
            spellcheck={false}
            placeholder="Jump to…"
            value={query}
            onInput={(e) => {
              setQuery((e.target as HTMLInputElement).value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
          />
          <button type="button" class="cmdk__esc" onClick={close} aria-label="Close" tabIndex={-1}>
            Esc
          </button>
        </div>

        <ul id="cmdk-list" ref={listRef} class="cmdk__list" role="listbox" aria-label="Results">
          {results.map((it, i) => (
            <li
              key={it.id}
              id={`cmdk-${it.id}`}
              data-index={i}
              role="option"
              aria-selected={i === active}
              class="cmdk__item"
              onMouseMove={() => i !== active && setActive(i)}
              onClick={() => run(it)}
            >
              <span class="cmdk__label">{it.label}</span>
              {it.hint && <span class="cmdk__hint">{it.hint}</span>}
              <span class="cmdk__group">{it.group}</span>
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <p class="cmdk__empty" role="status">
            No matches for "{query}"
          </p>
        )}

        <p class="cmdk__footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>Enter</kbd> open
          </span>
          <span>
            <kbd>Esc</kbd> close
          </span>
        </p>
      </div>
    </dialog>
  );
}
