// Given: the "Where I've worked" tabs.
// Approach: one entry per job, in display order. Edit text here, not in the component.

export interface Job {
  id: string;
  tab: string; // label in the tab list
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  tags: string[];
}

export const jobs: Job[] = [
  {
    id: 'goquant',
    tab: 'GoQuant',
    company: 'GoQuant',
    role: 'Quantitative / Backend Developer',
    dates: 'May 2025 — Sep 2026',
    location: 'Miami, FL · Remote',
    bullets: [
      'Engineered backend trading integrations across 15+ cryptocurrency exchanges using REST APIs and WebSockets.',
      'Supported 8+ client deployments by diagnosing and resolving exchange gateway, OMS and execution-logic issues.',
      'Implemented authentication, request signing, nonce handling, rate limiting and resilient WebSocket sessions.',
      'Investigated and documented 100+ defects across distributed trading workflows and execution algorithms.',
    ],
    tags: ['C++', 'Python', 'WebSockets', 'REST', 'OMS'],
  },
  {
    id: 'deepedge',
    tab: 'DeepEdge',
    company: 'DeepEdge',
    role: 'Software Engineer',
    dates: 'Mar 2025 — May 2025',
    location: 'San Ramon, CA',
    bullets: [
      'Built C++ and Python backend infrastructure for a low/no-code Edge AI platform.',
      'Led legacy data extraction and migration using Linux utilities, keeping data intact.',
      'Maintained and validated deployment pipelines across development and production.',
    ],
    tags: ['C++', 'Python', 'Linux', 'CI/CD'],
  },
  {
    id: 'isaksai',
    tab: 'Isaksai (NYSDOT)',
    company: 'Isaksai Solutions',
    role: 'Software Engineering Intern',
    dates: 'Aug 2023 — Nov 2023',
    location: 'Schenectady, NY · client: NYSDOT / DMV',
    bullets: [
      'Enhanced REST APIs for the NYSDOT–DMV Accident Information System.',
      'Optimized T-SQL queries and SSIS ETL pipelines for high-volume crash data.',
      'Validated API integrations with Postman through UAT and bug triage.',
    ],
    tags: ['T-SQL', 'SSIS', 'REST', 'Postman'],
  },
];
