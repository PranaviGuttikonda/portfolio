// Given: the chat answers questions from a fixed list.
// Approach: everything the bot says lives here, so it can be edited without touching the UI.
//   Keywords are matched case-insensitively. Keywords of 3 characters or fewer
//   only match whole words; longer ones also match inside other words.

export interface QA {
  keywords: string[];
  answer: string;
}

export const greeting =
  "Hi! I'm a small assistant that knows Pranavi's resume. Ask me about her experience, projects, or what she's looking for.";

export const fallback =
  "I don't have that one. Pranavi can answer directly at p.avigutti05@gmail.com.";

export const suggestions: string[] = [
  'What did she do at GoQuant?',
  'What is she building?',
  'Is she available?',
  'Tech stack?',
  'How to contact her?',
];

// How many suggestion chips are shown at once.
export const visibleSuggestions = 3;

export const qa: QA[] = [
  {
    keywords: ['goquant', 'quant', 'trading', 'exchange', 'last job', 'previous job'],
    answer:
      'At GoQuant (May 2025 – Sep 2026) she was a Quantitative/Backend Developer. She built trading integrations across 15+ crypto exchanges (auth, request signing, rate limiting, resilient WebSocket sessions), supported 8+ client deployments, and documented 100+ defects.',
  },
  {
    keywords: ['deepedge', 'edge ai'],
    answer:
      'At DeepEdge (Mar – May 2025) she built C++ and Python backend infrastructure for a low/no-code Edge AI platform and led a legacy data migration.',
  },
  {
    keywords: ['isaksai', 'nysdot', 'dmv', 'intern'],
    answer:
      'At Isaksai Solutions (Aug – Nov 2023) she worked on REST APIs and T-SQL/SSIS pipelines for the NYSDOT–DMV Accident Information System.',
  },
  {
    keywords: ['building', 'project', 'quorum', 'raft', 'cafe', 'café', 'side'],
    answer:
      'Right now: quorum, a Raft-replicated key-value store in C++20 with deterministic simulation testing; Rush Hour Café, a multi-agent pathfinding simulation; and Quidd, a personal finance app. All three are in the Projects section below.',
  },
  {
    keywords: ['quidd', 'finance', 'budget', 'budgeting', 'money', 'app'],
    answer:
      "Quidd is a personal finance app she's building in React Native with Supabase. It uses a rule-based 'spendable-first' budgeting engine, so it shows what you can still safely spend, with deterministic logic instead of LLM calculations.",
  },
  {
    keywords: ['stack', 'skill', 'language', 'tech', 'c++', 'python', 'java'],
    answer:
      'Mostly C++, Python and Java, plus TypeScript and SQL. Tools: Linux, Docker, Kubernetes, AWS, WebSockets, REST, PostgreSQL.',
  },
  {
    keywords: ['available', 'looking', 'hire', 'co-op', 'coop', 'job', 'open'],
    answer:
      'Yes. She is looking for Summer 2027 internships and co-ops in software engineering.',
  },
  {
    keywords: ['school', 'study', 'northeastern', 'degree', 'education', 'ucm', 'gpa'],
    answer:
      'She is doing an MS in Computer Science at Northeastern (Khoury), 2026–2028. Before that, a B.S. in CS from the University of Central Missouri, Cum Laude.',
  },
  {
    keywords: ['contact', 'email', 'reach', 'linkedin', 'github', 'resume'],
    answer:
      'Email p.avigutti05@gmail.com, or find her on GitHub at github.com/PranaviGuttikonda. The resume is at the bottom of the page.',
  },
  {
    keywords: ['where', 'location', 'based', 'boston', 'relocate'],
    answer: 'She is based in Boston, MA.',
  },
  {
    keywords: ['hi', 'hello', 'hey'],
    answer: 'Hi! Ask me about her experience, projects, skills, or availability.',
  },
];
