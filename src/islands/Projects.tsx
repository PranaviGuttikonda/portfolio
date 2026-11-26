import { useRef, useState } from 'preact/hooks';
import type { FeaturedProject, PreviewKind } from '../data/projects';
import { askPranavi } from '../lib/ask';
import RaftCluster from './previews/RaftCluster';
import CafeGrid from './previews/CafeGrid';
import QuiddPhone from './previews/QuiddPhone';
import './Projects.css';

interface Props {
  projects: FeaturedProject[];
}

const PREVIEWS: Record<PreviewKind, () => preact.JSX.Element> = {
  raft: RaftCluster,
  cafe: CafeGrid,
  quidd: QuiddPhone,
};

// Given: three featured projects, one shown on the stage at a time.
// Approach: WAI-ARIA tabs (the list) controlling one tabpanel (the stage), with a
//   roving tabindex. The list comes first in the DOM so keyboard users reach the
//   tabs before the panel; CSS puts it on the right on desktop.
export default function Projects({ projects }: Props) {
  const [active, setActive] = useState(0);
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

  const p = projects[active]!;
  const Preview = PREVIEWS[p.preview];

  return (
    <div class="proj">
      <div class="proj__list" role="tablist" aria-label="Projects" onKeyDown={onKeyDown}>
        {projects.map((proj, i) => (
          <button
            key={proj.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`proj-tab-${proj.id}`}
            class="proj__tab"
            aria-selected={i === active}
            aria-controls="proj-stage"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            <span class="proj__num">{proj.num}</span>
            <span class="proj__name">{proj.name}</span>
            <span class="proj__line">{proj.oneLiner}</span>
          </button>
        ))}
      </div>

      <div class="proj__stage" id="proj-stage" role="tabpanel" aria-labelledby={`proj-tab-${p.id}`}>
        {/* Keyed so the content remounts and fades in on every switch. */}
        <div class="proj__fade" key={p.id}>
          <div class="proj__preview dot-grid">
            <Preview />
          </div>

          <div class="proj__body">
            <div class="proj__title-row">
              <h3 class="proj__title">{p.name}</h3>
              {p.inProgress && <span class="proj__badge">In progress</span>}
            </div>

            <p class="proj__built">{p.built}</p>

            <ul class="proj__tags" aria-label="Technologies">
              {p.tags.map((t) => (
                <li key={t} class="chip">
                  {t}
                </li>
              ))}
            </ul>

            <div class="proj__actions">
              {p.caseStudy && (
                <a href={p.caseStudy} class="btn btn--accent">
                  Read case study →
                </a>
              )}
              <a
                href={p.code}
                class="btn btn--outline"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Code for ${p.name} on GitHub`}
              >
                Code
              </a>
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
        </div>
      </div>
    </div>
  );
}
