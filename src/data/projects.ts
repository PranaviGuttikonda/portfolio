// Given: the "Things I've built" section.
// Approach: featured projects drive the switcher; others fill the small grid below.
//   Problem/Result are kept for case-study pages and aren't shown in the switcher.

export type PreviewKind = 'raft' | 'cafe' | 'quidd';

export interface FeaturedProject {
  id: string;
  num: string;
  name: string;
  oneLiner: string;
  inProgress: boolean;
  preview: PreviewKind;
  built: string;
  problem: string;
  result: string;
  tags: string[];
  code: string;
  caseStudy?: string; // only projects with a case-study page get "Read case study →"
}

export interface OtherProject {
  name: string;
  line: string;
  stack: string;
  code?: string; // no link is shown when this is empty
}

export const featured: FeaturedProject[] = [
  {
    id: 'quorum',
    num: '01',
    name: 'quorum',
    oneLiner: 'A replicated key-value store that keeps accepting writes while machines crash.',
    inProgress: true,
    preview: 'raft',
    built:
      'Raft from scratch in C++20: leader election, log replication, and a deterministic simulator that replays any failure from a seed.',
    problem:
      'Storage spread across machines has to agree on every write, even when a machine dies mid-request.',
    result: '[FAILOVER TIME] · [N] simulated runs',
    tags: ['C++20', 'Raft', 'Simulation testing'],
    code: 'https://github.com/PranaviGuttikonda/quorum',
    caseStudy: '/projects/quorum',
  },
  {
    id: 'rush-hour-cafe',
    num: '02',
    name: 'Rush Hour Café',
    oneLiner: 'Robot waiters that plan collision-free routes around a café you lay out.',
    inProgress: true,
    preview: 'cafe',
    built:
      'A multi-agent pathfinding engine in C++ with a playable front end: place tables, then watch robots plan.',
    problem:
      'Many robots sharing one floor have to reach their tables without colliding or deadlocking.',
    result: '[N] robots · [ms] planning time',
    tags: ['C++', 'Multi-agent pathfinding', 'Simulation'],
    code: 'https://github.com/PranaviGuttikonda/warehouse-world',
  },
  {
    id: 'quidd',
    num: '03',
    name: 'Quidd',
    oneLiner: 'A budgeting app that shows what you can still safely spend.',
    inProgress: true,
    preview: 'quidd',
    built:
      'A React Native app with a rule-based "spendable-first" budgeting engine on Supabase. I replaced LLM-driven calculations with deterministic logic so the numbers are predictable.',
    problem:
      "Most budgeting apps tell you what you've already spent, not what you can still safely spend.",
    result: '[RESULT]',
    tags: ['React Native', 'TypeScript', 'Supabase', 'Zustand'],
    code: 'https://github.com/PranaviGuttikonda/Quidd',
  },
];

export const others: OtherProject[] = [
  {
    // Confidential: no code link.
    name: 'Real-Time Trade Simulator',
    line: 'Level-2 market-data pipeline with latency profiling.',
    stack: 'Python · WebSocket',
  },
  {
    name: 'Fake News Detection',
    line: 'TF-IDF + Random Forest / SVM classifier, 86% accuracy.',
    stack: 'Python · scikit-learn',
  },
  {
    name: 'Price Prediction',
    line: 'ML pipeline with MLflow tracking and CI/CD.',
    stack: 'Python · ZenML · MLflow',
  },
];
