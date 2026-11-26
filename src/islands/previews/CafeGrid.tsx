// Given: a static picture of the café floor: a 10×6 grid, tables, two robots and a planned path.
// Approach: plain SVG in grid units (1 cell = 10 units). The path runs through cell
//   centres and steers around every table.

const COLS = 10;
const ROWS = 6;
const CELL = 10;

const TABLES: [number, number][] = [
  [2, 1],
  [2, 4],
  [4, 2],
  [4, 5],
  [6, 1],
  [6, 4],
  [8, 3],
];

const ROBOTS: [number, number][] = [
  [0, 3],
  [9, 1],
];

// Cell coordinates the path turns at, from robot A to robot B.
const PATH: [number, number][] = [
  [0, 3],
  [7, 3],
  [7, 1],
  [9, 1],
];

const centre = (n: number) => n * CELL + CELL / 2;

export default function CafeGrid() {
  const points = PATH.map(([x, y]) => `${centre(x)},${centre(y)}`).join(' ');

  return (
    <svg
      class="cafe"
      viewBox={`-2 -2 ${COLS * CELL + 4} ${ROWS * CELL + 4}`}
      role="img"
      aria-label="Café floor plan: a 10 by 6 grid with seven tables and two robots joined by a planned path that avoids the tables"
    >
      <defs>
        <filter id="cafe-glow" x="-1" y="-1" width="3" height="3">
          <feDropShadow dx="0" dy="0" stdDeviation="1.6" class="cafe__glow" />
        </filter>
      </defs>

      <rect class="cafe__floor" x="0" y="0" width={COLS * CELL} height={ROWS * CELL} rx="2" />

      {Array.from({ length: COLS - 1 }, (_, i) => (
        <line key={`v${i}`} class="cafe__line" x1={(i + 1) * CELL} y1="0" x2={(i + 1) * CELL} y2={ROWS * CELL} />
      ))}
      {Array.from({ length: ROWS - 1 }, (_, i) => (
        <line key={`h${i}`} class="cafe__line" x1="0" y1={(i + 1) * CELL} x2={COLS * CELL} y2={(i + 1) * CELL} />
      ))}

      {TABLES.map(([x, y]) => (
        <rect key={`t${x}-${y}`} class="cafe__table" x={x * CELL + 1.5} y={y * CELL + 1.5} width={CELL - 3} height={CELL - 3} rx="1.2" />
      ))}

      <polyline class="cafe__path" points={points} />

      {ROBOTS.map(([x, y]) => (
        <circle key={`r${x}-${y}`} class="cafe__robot" cx={centre(x)} cy={centre(y)} r="3.2" filter="url(#cafe-glow)" />
      ))}
    </svg>
  );
}
