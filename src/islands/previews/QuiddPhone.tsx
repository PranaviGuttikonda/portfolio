// Given: a phone mock-up for Quidd with no amounts or currency.
// Approach: a CSS phone frame sized in em, so the whole thing scales from one
//   font-size. The ring and bars only show proportions.

const RING_R = 40;
const RING_C = 2 * Math.PI * RING_R;
const RING_FILL = 0.64;

const CATEGORIES = [
  { name: 'Food', fill: 0.58 },
  { name: 'Transport', fill: 0.34 },
  { name: 'Shopping', fill: 0.76 },
];

export default function QuiddPhone() {
  return (
    <div
      class="quidd"
      role="img"
      aria-label="Quidd app on a phone: a Spendable this week card with a progress ring, and Food, Transport and Shopping rows with progress bars"
    >
      <div class="quidd__phone">
        <span class="quidd__notch" aria-hidden="true"></span>
        <div class="quidd__card">
          <p class="quidd__label">Spendable this week</p>
          <svg class="quidd__ring" viewBox="0 0 100 100" aria-hidden="true">
            <circle class="quidd__track" cx="50" cy="50" r={RING_R} />
            <circle
              class="quidd__arc"
              cx="50"
              cy="50"
              r={RING_R}
              stroke-dasharray={`${RING_C * RING_FILL} ${RING_C}`}
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
        <ul class="quidd__rows" aria-hidden="true">
          {CATEGORIES.map((c) => (
            <li key={c.name} class="quidd__row">
              <span class="quidd__name">{c.name}</span>
              <span class="quidd__bar">
                <span class="quidd__fill" style={{ width: `${c.fill * 100}%` }}></span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
