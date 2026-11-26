import { useState } from 'preact/hooks';

// Given: a 5-node Raft cluster you can break from the browser.
// Approach: keep only what the picture needs — which nodes are alive, who leads, and
//   the term. Killing the leader hands leadership to the next alive node clockwise
//   and bumps the term, but only while a majority (3 of 5) is still up.

const N = 5;
const MAJORITY = Math.floor(N / 2) + 1;

// Ring geometry in SVG units (centred in a 300×300 box; viewBox trims the empty margin).
const CX = 150;
const CY = 150;
const RING = 108;
const NODE_R = 24;

const pos = (i: number) => {
  const a = (-90 + (360 / N) * i) * (Math.PI / 180);
  return { x: CX + RING * Math.cos(a), y: CY + RING * Math.sin(a) };
};

interface Cluster {
  alive: boolean[];
  leader: number | null;
  term: number;
  message: string;
}

const initial = (): Cluster => ({
  alive: Array(N).fill(true),
  leader: 0,
  term: 1,
  message: 'Cluster reset. Node 1 is leader, term 1.',
});

export default function RaftCluster() {
  const [c, setC] = useState<Cluster>(initial);
  const up = c.alive.filter(Boolean).length;

  const killLeader = () =>
    setC((prev) => {
      if (prev.leader === null) return prev;
      const alive = prev.alive.map((a, i) => (i === prev.leader ? false : a));
      const upNow = alive.filter(Boolean).length;
      const killed = prev.leader + 1;

      if (upNow < MAJORITY) {
        return {
          alive,
          leader: null,
          term: prev.term,
          message: `Node ${killed} is down. ${upNow} of ${N} up: no quorum, so no leader.`,
        };
      }

      let next = prev.leader;
      do next = (next + 1) % N;
      while (!alive[next]);

      return {
        alive,
        leader: next,
        term: prev.term + 1,
        message: `Node ${killed} is down. Node ${next + 1} elected leader, term ${prev.term + 1}.`,
      };
    });

  const reset = () => setC(initial());

  const leaderPos = c.leader === null ? null : pos(c.leader);

  return (
    <div class="raft">
      <div class="raft__bar">
        <p class="raft__live">
          <span class="raft__pulse" aria-hidden="true"></span>
          LIVE · term {c.term}
        </p>
        <div class="raft__actions">
          <button type="button" class="raft__btn" onClick={killLeader} disabled={c.leader === null}>
            Kill leader
          </button>
          <button type="button" class="raft__btn" onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      <svg
        class="raft__svg"
        viewBox="12 12 276 276"
        role="img"
        aria-label={
          c.leader === null
            ? `${up} of ${N} nodes up, no quorum, term ${c.term}`
            : `${up} of ${N} nodes up, node ${c.leader + 1} is leader, term ${c.term}`
        }
      >
        <defs>
          <filter id="raft-glow" x="-1" y="-1" width="3" height="3">
            <feDropShadow dx="0" dy="0" stdDeviation="7" class="raft__glow" />
          </filter>
        </defs>

        <circle class="raft__ring" cx={CX} cy={CY} r={RING} />

        {/* Heartbeats from the leader to each live follower */}
        {leaderPos &&
          c.alive.map((a, i) =>
            a && i !== c.leader ? (
              <line
                key={`hb-${i}`}
                class="raft__heartbeat"
                x1={leaderPos.x}
                y1={leaderPos.y}
                x2={pos(i).x}
                y2={pos(i).y}
              />
            ) : null,
          )}

        {c.alive.map((a, i) => {
          const p = pos(i);
          const role = !a ? 'dead' : i === c.leader ? 'leader' : 'follower';
          return (
            <g key={i} class={`raft__node raft__node--${role}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                filter={role === 'leader' ? 'url(#raft-glow)' : undefined}
              />
              <text x={p.x} y={p.y} dy="0.35em" text-anchor="middle">
                {a ? `n${i + 1}` : '✕'}
              </text>
            </g>
          );
        })}

        <text class="raft__center" x={CX} y={CY} dy="0.35em" text-anchor="middle">
          {c.leader === null ? 'no quorum' : `${up}/${N} up`}
        </text>
      </svg>

      <p class="visually-hidden" aria-live="polite">
        {c.message}
      </p>
    </div>
  );
}
