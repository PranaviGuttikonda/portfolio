// Given: the "Things I've built" switcher, six projects in display order.
// Approach: one list drives both the tabs and the stage. Problem/Result are kept for
//   case-study pages and aren't shown in the switcher. Optional fields decide which
//   buttons appear: no `code` → no Code button, no `caseStudy` → no Read case study,
//   no `live` → no Play it live.

export type PreviewKind = 'raft' | 'cafe-video' | 'quidd' | 'text';

export interface Project {
  id: string;
  num: string;
  name: string;
  oneLiner: string;
  built: string;
  highlight?: string; // one mono line under What I built
  tags: string[];
  preview: PreviewKind; // 'text' = name + stack on the dot grid, no illustration
  inProgress?: boolean;
  code?: string;
  caseStudy?: string; // only projects with a case-study page get "Read case study →"
  live?: string; // playable demo → "Play it live →"
  problem?: string;
  result?: string;
}

export const projects: Project[] = [
  {
    id: 'quorum',
    num: '01',
    name: 'quorum',
    oneLiner: 'A replicated key-value store that keeps accepting writes while machines crash.',
    built:
      'Raft from scratch in C++20: leader election, log replication, and a deterministic simulator that replays any failure from a seed.',
    tags: ['C++20', 'Raft', 'Simulation testing'],
    preview: 'raft',
    inProgress: true,
    code: 'https://github.com/PranaviGuttikonda/quorum',
    live: 'https://pranaviguttikonda.github.io/quorum/',
    caseStudy: '/projects/quorum',
    problem:
      'Storage spread across machines has to agree on every write, even when a machine dies mid-request.',
    result:
      '1,000 seeds per fuzz suite · 4 Raft safety invariants checked every tick · linearizability checked on every client history',
  },
  {
    id: 'rush-hour-cafe',
    num: '02',
    name: 'Rush Hour Café',
    oneLiner: 'Robot waiters that plan collision-free routes around a café you lay out.',
    built:
      'A C++20 multi-agent pathfinding sim with three planners (local rules, space-time A* and CBS), compiled to WebAssembly so it runs in the browser.',
    highlight:
      'At 40 robots, CBS delivers 59× more than local rules (29,597 vs 500 orders over 20,000 ticks).',
    tags: ['C++20', 'Pathfinding', 'CBS', 'WebAssembly'],
    preview: 'cafe-video',
    inProgress: true,
    code: 'https://github.com/PranaviGuttikonda/warehouse-world',
    live: 'https://pranaviguttikonda.github.io/warehouse-world/',
    problem:
      'Many robots sharing one floor have to reach their tables without colliding or deadlocking.',
    result:
      'At 40 robots: CBS made 29,597 deliveries in 20,000 ticks; local rules made 500 (mean of 5 seeds).',
  },
  {
    id: 'quidd',
    num: '03',
    name: 'Quidd',
    oneLiner: 'A budgeting app that shows what you can still safely spend.',
    built:
      'A React Native app with a rule-based "spendable-first" budgeting engine on Supabase. I replaced LLM-driven calculations with deterministic logic so the numbers are predictable.',
    tags: ['React Native', 'TypeScript', 'Supabase', 'Zustand'],
    preview: 'quidd',
    inProgress: true,
    code: 'https://github.com/PranaviGuttikonda/Quidd',
    problem:
      "Most budgeting apps tell you what you've already spent, not what you can still safely spend.",
    result: '[RESULT]',
  },
  {
    // Confidential: no code link.
    id: 'trade-simulator',
    num: '04',
    name: 'Real-Time Trade Simulator',
    oneLiner: 'Level-2 market-data pipeline with latency profiling.',
    built: 'Level-2 market-data pipeline with latency profiling.',
    tags: ['Python', 'WebSocket'],
    preview: 'text',
  },
  {
    id: 'fake-news-detection',
    num: '05',
    name: 'Fake News Detection',
    oneLiner: 'TF-IDF + Random Forest / SVM classifier, 86% accuracy.',
    built: 'TF-IDF + Random Forest / SVM classifier, 86% accuracy.',
    tags: ['Python', 'scikit-learn'],
    preview: 'text',
  },
  {
    id: 'price-prediction',
    num: '06',
    name: 'Price Prediction',
    oneLiner: 'ML pipeline with MLflow tracking and CI/CD.',
    built: 'ML pipeline with MLflow tracking and CI/CD.',
    tags: ['Python', 'ZenML', 'MLflow'],
    preview: 'text',
  },
];
