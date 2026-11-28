import { useEffect, useRef, useState } from 'preact/hooks';
import type { Project, PreviewKind } from '../data/projects';
import { askPranavi } from '../lib/ask';
import RaftCluster from './previews/RaftCluster';
import CafeVideo from './previews/CafeVideo';
import QuiddPhone from './previews/QuiddPhone';
import TextPreview from './previews/TextPreview';
import './Projects.css';

interface Props {
  projects: Project[];
}

const renderPreview = (kind: PreviewKind, p: Project, active: boolean) => {
  switch (kind) {
    case 'raft':
      return <RaftCluster />;
    case 'cafe-video':
      return <CafeVideo active={active} />;
    case 'quidd':
      return <QuiddPhone />;
    case 'text':
      return <TextPreview name={p.name} tags={p.tags} />;
  }
};

// Given: six projects, one shown on the stage at a time, tabs in a grid below.
// Approach:
//   - WAI-ARIA tabs with a roving tabindex. Arrow keys (any direction) step through
//     the grid in reading order; Home/End jump to the ends.
//   - Every project's preview and details stay mounted, stacked in one grid cell.
//     The stage is always as tall as the tallest project, so it never jumps, and
//     switching is a real crossfade. Hidden layers use visibility:hidden, which
//     also removes them from the tab order and the accessibility tree.
export default function Projects({ projects }: Props) {
  const [active, setActive] = useState(0);

  // Given: links like /?project=rush-hour-cafe#projects (from case study pages).
  // Approach: on load, select the project whose id matches the query parameter.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('project');
    const i = projects.findIndex((p) => p.id === id);
    if (i > 0) setActive(i);
  }, []);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    const next = (i + projects.length) % projects.length;
    setActive(next);
    const tab = tabRefs.current[next];
    tab?.focus();
    tab?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => select(active + 1),
      ArrowRight: () => select(active + 1),
      ArrowUp: () => select(active - 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(projects.length - 1),
    };
    const action = keys[e.key];
    if (!action) return;
    e.preventDefault();
    action();
  };

  const current = projects[active]!;
  const layer = (i: number) => `proj__layer${i === active ? ' is-active' : ''}`;

  return (
    <div class="proj">
      <div
        class="proj__stage"
        id="proj-stage"
        role="tabpanel"
        aria-labelledby={`proj-tab-${current.id}`}
      >
        <div class="proj__previews dot-grid">
          {projects.map((p, i) => (
            <div key={p.id} class={layer(i)}>
              {renderPreview(p.preview, p, i === active)}
            </div>
          ))}
        </div>

        <div class="proj__details">
          {projects.map((p, i) => (
            <div key={p.id} class={layer(i)}>
              <div class="proj__title-row">
                <h3 class="proj__title">{p.name}</h3>
                {p.inProgress && <span class="proj__badge">In progress</span>}
              </div>

              <p class="proj__built">{p.built}</p>
              {p.highlight && <p class="proj__highlight">{p.highlight}</p>}

              <ul class="proj__tags" aria-label="Technologies">
                {p.tags.map((t) => (
                  <li key={t} class="chip">
                    {t}
                  </li>
                ))}
              </ul>

              <div class="proj__actions">
                {p.live && (
                  <a
                    href={p.live}
                    class="btn btn--accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Play it live →
                  </a>
                )}
                {/* Accent goes to the live demo when there is one. */}
                {p.caseStudy && (
                  <a href={p.caseStudy} class={`btn ${p.live ? 'btn--outline' : 'btn--accent'}`}>
                    Read case study →
                  </a>
                )}
                {p.code && (
                  <a
                    href={p.code}
                    class="btn btn--outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Code for ${p.name} on GitHub`}
                  >
                    Code
                  </a>
                )}
                <button
                  type="button"
                  class="btn btn--outline"
                  aria-label={`Ask about this: ${p.name}`}
                  onClick={() => askPranavi(`Tell me about ${p.name}`)}
                >
                  <svg class="proj__chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12Z" />
                  </svg>
                  Ask about this
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="proj__tabs" role="tablist" aria-label="Projects" onKeyDown={onKeyDown}>
        {projects.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`proj-tab-${p.id}`}
            class="proj__tab"
            aria-selected={i === active}
            aria-controls="proj-stage"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            <span class="proj__num">{p.num}</span>
            <span class="proj__name">{p.name}</span>
            <span class="proj__line">{p.oneLiner}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
