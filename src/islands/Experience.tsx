import { useRef, useState } from 'preact/hooks';
import type { Job } from '../data/experience';
import './Experience.css';

interface Props {
  jobs: Job[];
}

// Given: three jobs, one shown at a time.
// Approach: WAI-ARIA tabs with a roving tabindex. Only the selected tab is in the
//   Tab order; arrow keys (either axis, since the list is vertical on desktop and
//   horizontal on mobile), Home and End move between tabs and select them.
export default function Experience({ jobs }: Props) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    const next = (i + jobs.length) % jobs.length;
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
      End: () => select(jobs.length - 1),
    };
    const action = keys[e.key];
    if (!action) return;
    e.preventDefault();
    action();
  };

  const job = jobs[active]!;

  return (
    <div class="exp">
      <div class="exp__tabs" role="tablist" aria-label="Companies" onKeyDown={onKeyDown}>
        {jobs.map((j, i) => (
          <button
            key={j.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`exp-tab-${j.id}`}
            class="exp__tab"
            aria-selected={i === active}
            aria-controls="exp-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {j.tab}
          </button>
        ))}
      </div>

      <div
        class="exp__panel"
        id="exp-panel"
        role="tabpanel"
        aria-labelledby={`exp-tab-${job.id}`}
        tabIndex={0}
      >
        <div class="exp__head">
          <h3 class="exp__role">
            {job.role} <span class="exp__company">@ {job.company}</span>
          </h3>
          <p class="exp__dates">{job.dates}</p>
        </div>
        <p class="exp__location">{job.location}</p>

        <ul class="exp__bullets">
          {job.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <ul class="exp__tags" aria-label="Technologies">
          {job.tags.map((t) => (
            <li key={t} class="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
