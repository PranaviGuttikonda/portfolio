# Portfolio spec

The design and build plan for this site. Later phases refer back to this file.

## Rules for the whole project

- **Stack:** Astro + TypeScript. Plain CSS with CSS custom properties (no Tailwind). Interactive parts are small Preact islands (`client:visible` / `client:load`). Everything else should be static and ship little to no JS.
- **Git workflow, every phase:** create a GitHub issue → branch `phase-N-short-name` → commits → open a PR → stop for my review. Use the `gh` CLI. The remote is `github.com/PranaviGuttikonda/portfolio`.
- **Content must stay exactly as given.** Don't invent numbers, metrics, dates, or claims. Anything in `[BRACKETS]` is a placeholder I'll fill in later; keep it visible as-is.
- **Responsive:** must look right at 375px (phone), 768px (tablet), and 1280px+ (desktop).
- **Accessibility:** real `<button>`/`<a>`, visible focus rings, `aria-label` on icon-only buttons, text contrast ≥ 4.5:1 in both themes, and respect `prefers-reduced-motion` (stop animations).
- **Code comments:** short, in "Given: / Approach:" form where it fits.

## Phases

- **Phase 0, Setup:** Astro + TS + Preact, `.gitignore`, `docs/SPEC.md`, folder structure, README, first commit, push.
- **Phase 1, Foundation:** theme tokens (both themes as CSS variables), fonts, base layout, sticky nav with the light/dark toggle, footer, dot-grid background utility, section heading component. Theme logic: default to the OS setting (`prefers-color-scheme`), fall back to dark, save the visitor's choice in `localStorage`, and avoid a flash of the wrong theme on load (inline script in `<head>`).
- **Phase 2, Hero + chatbot** (chatbot spec below).
- **Phase 3, Experience** (tabbed).
- **Phase 4, Projects** (project switcher, live quorum cluster island, previews, "Ask about this").
- **Phase 5, Skills, contact, footer, resume PDF link.**
- **Phase 6, quorum project page** at `/projects/quorum`.
- **Phase 7, Polish:** ⌘K command palette, SEO meta + Open Graph image, favicon, sitemap, Lighthouse pass (aim for 95+ on all four scores), deploy config for Vercel.

---

# DESIGN SPEC

## Theme tokens

| Token | Dark: "Midnight Periwinkle" (default) | Light: "Paper & Cobalt" |
|---|---|---|
| `--bg` | `#0B1220` | `#EDEBE5` |
| `--surface` | `#111A2E` | `#F7F6F2` |
| `--surface-2` (chat bot bubble) | `#16203A` | `#E4E2DB` |
| `--surface-3` (chat panel) | `#0E1626` | `#F7F6F2` |
| `--border` | `#1E2940` | `#DAD7CF` |
| `--border-strong` | `#2A3752` | `#CBC8BF` |
| `--border-hover` | `#3A4A70` | `#B4B1A8` |
| `--text` | `#E6EAF2` | `#14161A` |
| `--text-2` | `#C3CAD8` | `#33373F` |
| `--muted` | `#A3ADC2` | `#565B68` |
| `--dot` (background dot grid) | `#1C2740` | `#D9D6CE` |
| `--accent` | `#8FA2FF` | `#2448F5` |
| `--on-accent` (text on accent buttons) | `#0B1220` | `#FFFFFF` |
| `--success` (status dots) | `#4ADE80` | `#4ADE80` |
| `--warn` / `--warn-border` ("In progress" badge) | `#FCD34D` / `#5B4A1A` | `#92400E` / `#F3D9A4` |
| `--shadow` | `rgba(0,0,0,.45)` | `rgba(20,22,26,.12)` |

- **Fonts (Google Fonts):** Space Grotesk 500/600 for headings; Inter 400/500/600 for body; JetBrains Mono 400/500/600 for labels, numbers, and code.
- **Dot grid:** `background-image: radial-gradient(var(--dot) 1.2px, transparent 1.2px); background-size: 24px 24px`.
- **Layout:** content max-width 1160px, 24px side padding. Cards: radius 16–18px, 1px border, surface background. Card hover: lift 4px + `--border-hover`.
- **Section headings:** mono accent number + Space Grotesk title + a 1px line filling the rest of the row, e.g. `01. Where I've worked ───────`.

## Nav (sticky, bottom border)

- **Left:** `pranavi.g` in JetBrains Mono, with the dot in accent color.
- **Right:** `01. Experience`, `02. Projects`, `03. Skills`, `04. Contact` (numbers in mono accent), then the theme toggle (sun icon in dark mode, moon icon in light mode, 40×40), then a `Jump to… ⌘K` button (wired up in Phase 7).
- **Mobile:** links collapse into a menu button.

## Hero

- **Background:** the dot grid plus two soft radial glows: accent at about 14% opacity near the top-right, and a faint teal near the bottom-left.
- **Two-column layout** (stacks on mobile):
  - **Left column:**
    - Pill badge: pulsing green dot + "Open to Summer 2027 internships & co-ops".
    - H1 (Space Grotesk, ~76px desktop, ~44px mobile, tight letter-spacing): `hi, I'm Pranavi.` with "Pranavi" in accent. Followed by a blinking terminal cursor: a solid accent bar (~0.09em wide × 1.05em tall, border-radius 2px, its bottom ~0.15em below the baseline like a real text cursor, ~0.12em gap after the period; it must not change the heading's line height), blinking on/off every 0.5s with `steps(1)`, `aria-hidden="true"`. With `prefers-reduced-motion` it stays visible but doesn't blink. It never wraps away from "Pranavi." on narrow screens.
    - Paragraph (19px, muted): "Software engineer in Boston. I spent the last year and a half building exchange integrations and debugging trading systems at **GoQuant**. Now I'm doing my MS in CS at **Northeastern**, and building things on the side." (bold words in `--text`)
    - Buttons: "See my work →" (accent, scrolls to Experience), "Resume ↓" (outline, `/resume.pdf` with the `download` attribute), then GitHub and LinkedIn icon buttons (50×50, outline).
  - **Right column:** the chatbot (next section).
- **Quick-facts row** under both columns, separated by a top border; 4 columns that wrap on mobile. Each has a mono label and a value:
  - PREVIOUSLY: GoQuant · DeepEdge · Isaksai
  - STUDYING: MS CS · Northeastern University
  - FOCUS: Backend · distributed systems · C++
  - BASED IN: Boston, MA

## Chatbot (Preact island, scripted, no backend for now)

- **Panel:** `--surface-3`, radius 18, big soft shadow.
- **Header:** circular "PG" avatar in accent, title "Ask about Pranavi", subtitle with a green dot: "Answers from her resume".
- **Messages area** (~330px tall, auto-scrolls to newest):
  - Bot bubbles: `--surface-2`, radius 14/14/14/4.
  - User bubbles: accent background, `--on-accent` text, radius 14/14/4/14.
- **First bot message:** "Hi! I'm a small assistant that knows Pranavi's resume. Ask me about her experience, projects, or what she's looking for."
- **Suggestion chips** (outline pills): show 3 at a time from this list, and hide each one after it's asked:
  - "What did she do at GoQuant?"
  - "What is she building?"
  - "Is she available?"
  - "Tech stack?"
  - "How to contact her?"
- **Input row:** text input ("Ask anything about her work…") plus a send button (accent, arrow icon). Enter sends.
- **Reply behavior:** after sending, show a "typing" bubble (3 pulsing dots) for ~700ms, then the answer.
- **Matching:** keyword lookup over the table below. Keywords of 3 characters or fewer must match whole words only; longer keywords can match as substrings. Fallback when nothing matches: "I don't have that one. Pranavi can answer directly at p.avigutti05@gmail.com."
- **Data file:** keep the Q&A in `src/data/chatbot.ts` so I can edit it, and so it could later be swapped for an LLM backend without changing the UI.

| Keywords | Answer |
|---|---|
| goquant, quant, trading, exchange, last job, previous job | At GoQuant (May 2025 – Sep 2026) she was a Quantitative/Backend Developer. She built trading integrations across 15+ crypto exchanges (auth, request signing, rate limiting, resilient WebSocket sessions), supported 8+ client deployments, and documented 100+ defects. |
| deepedge, edge ai | At DeepEdge (Mar – May 2025) she built C++ and Python backend infrastructure for a low/no-code Edge AI platform and led a legacy data migration. |
| isaksai, nysdot, dmv, intern | At Isaksai Solutions (Aug – Nov 2023) she worked on REST APIs and T-SQL/SSIS pipelines for the NYSDOT–DMV Accident Information System. |
| building, project, projects, side, working on | Right now: quorum, a Raft-replicated key-value store in C++20 with deterministic simulation testing; Rush Hour Café, a multi-agent pathfinding simulation; and Quidd, a personal finance app. All three are in the Projects section below. |
| quorum, raft, consensus, key-value, distributed | quorum is a replicated key-value store she's building in C++20. It implements Raft from scratch, with leader election and log replication, plus a deterministic simulator that replays any failure from a seed. You can crash its leader in the live demo in the Projects section. |
| rush hour, café, cafe, robot, pathfinding, multi-agent, warehouse | Rush Hour Café is a multi-agent pathfinding engine she's building in C++, with a playable front end: you lay out tables in a café and robot waiters plan collision-free routes around them. |
| trade simulator, level-2, market data, latency | The Real-Time Trade Simulator is a Python pipeline that ingests live Level-2 market data over WebSocket, simulates trades, and profiles end-to-end latency. |
| fake news, classifier, nlp, tf-idf | Fake News Detection is a classifier built with TF-IDF and n-gram features and Random Forest / SVM models. It reached 86% accuracy using K-fold cross-validation. |
| price prediction, house price, regression, mlflow, zenml | Price Prediction is an ML pipeline for house price prediction using regression and K-fold cross-validation, with experiment tracking and deployment automated through MLflow and CI/CD. |
| quidd, finance, budget, budgeting, money, app | Quidd is a personal finance app she's building in React Native with Supabase. It uses a rule-based 'spendable-first' budgeting engine, so it shows what you can still safely spend, with deterministic logic instead of LLM calculations. |
| stack, skill, language, tech, c++, python, java | Mostly C++, Python and Java, plus TypeScript and SQL. Tools: Linux, Docker, Kubernetes, AWS, WebSockets, REST, PostgreSQL. |
| available, looking, hire, co-op, coop, job, open | Yes. She is looking for Summer 2027 internships and co-ops in software engineering. |
| school, study, northeastern, degree, education, ucm, gpa | She is doing an MS in Computer Science at Northeastern (Khoury), 2026–2028. Before that, a B.S. in CS from the University of Central Missouri, Cum Laude. |
| contact, email, reach, linkedin, github, resume | Email p.avigutti05@gmail.com, or find her on LinkedIn (linkedin.com/in/pranaviguttikonda) and GitHub (github.com/PranaviGuttikonda). The resume is at the bottom of the page. |
| where, location, based, boston, relocate | She is based in Boston, MA. |
| hi, hello, hey | Hi! Ask me about her experience, projects, skills, or availability. |

- Expose a global way to open the chat with a prefilled question (e.g. a custom DOM event `ask-pranavi` with the question text). The projects' "Ask about this" buttons use it: scroll to the chat, then send the question.

## 01. Where I've worked (tabs, Preact island)

- **Layout:** vertical tab list on the left (mono font, 2px left border; the active tab gets an accent border, accent text, and surface background), detail card on the right. On mobile the tabs become a horizontal scroll row.
- **Detail card:** "Role @ Company" (company in accent), dates in mono on the right, location underneath, bullets with an accent `▹` marker, then tech tags (mono chips).

**GoQuant**
- Role: Quantitative / Backend Developer
- Dates: May 2025 — Sep 2026
- Location: Miami, FL · Remote
- Bullets:
  - Engineered backend trading integrations across 15+ cryptocurrency exchanges using REST APIs and WebSockets.
  - Supported 8+ client deployments by diagnosing and resolving exchange gateway, OMS and execution-logic issues.
  - Implemented authentication, request signing, nonce handling, rate limiting and resilient WebSocket sessions.
  - Investigated and documented 100+ defects across distributed trading workflows and execution algorithms.
- Tags: C++, Python, WebSockets, REST, OMS

**DeepEdge**
- Role: Software Engineer
- Dates: Mar 2025 — May 2025
- Location: San Ramon, CA
- Bullets:
  - Built C++ and Python backend infrastructure for a low/no-code Edge AI platform.
  - Led legacy data extraction and migration using Linux utilities, keeping data intact.
  - Maintained and validated deployment pipelines across development and production.
- Tags: C++, Python, Linux, CI/CD

**Isaksai (NYSDOT)** (tab label)
- Company: Isaksai Solutions
- Role: Software Engineering Intern
- Dates: Aug 2023 — Nov 2023
- Location: Schenectady, NY · client: NYSDOT / DMV
- Bullets:
  - Enhanced REST APIs for the NYSDOT–DMV Accident Information System.
  - Optimized T-SQL queries and SSIS ETL pipelines for high-volume crash data.
  - Validated API integrations with Postman through UAT and bug triage.
- Tags: T-SQL, SSIS, REST, Postman

## 02. Things I've built: project switcher (Preact island)

- **Intro line:** "Pick a project to see what it does and how it's built. quorum runs live, so try crashing its leader."
- **Stage:** full width of the container (surface, border, radius 18, overflow hidden).
  - Desktop (≥900px): a two-column card. Preview on the left (~55%, full card height, min 380px, dot grid); details on the right (~45%, padding 32px): name + "In progress" badge, the "What I built" paragraph, tag chips, then buttons.
  - Below 900px: the preview stacks on top (260px) with the details under it.
  - Tablet and desktop (≥600px): the stage height must not jump when switching projects (it keeps the height of the tallest project).
  - Phones (<600px): the card resizes to fit the selected project, so smaller projects don't leave empty space under their details.
- **Buttons** (each only when it applies):
  - "Read case study →" (accent): only for projects with a case-study page, which for now is only quorum.
  - "Code" (outline): only when the project has a code link.
  - "Ask about this" (outline, chat icon): sends "Tell me about <project name>" to the chatbot. Shown for all 6 projects; each has its own chatbot answer.
- **Project tabs, below the stage:** a grid of all 6 projects. 3 per row on desktop (`repeat(3, minmax(0, 1fr))`, gap 12px), 2 per row on tablet, and a horizontal scroll row of compact pills on phones (<600px). Each tab shows the mono number, the name (Space Grotesk 18px), and the one-liner (14px, muted; hidden on phone pills). Selected: accent border + `--surface-2`; others: `--border` + `--surface`.
- **Tab semantics:** `role=tablist`/`tab`/`tabpanel`, `aria-selected`; arrow keys (left/right/up/down) move through the tabs in grid order; Home/End jump to the first/last.
- **Switching projects:** quick crossfade (~200ms); no animation with `prefers-reduced-motion`.
- **Not shown in the switcher:** each project's Problem and Result. They stay below for the project's case-study page.

The 6 projects, in this order:

**01. quorum** (In progress)
- One-liner: "A replicated key-value store that keeps accepting writes while machines crash."
- Preview: a **live interactive Raft cluster** (Preact island). 5 nodes on a dashed ring; the leader is filled with accent and has a glow; dead nodes are dashed with a ✕. Corner label "LIVE · term N" with a pulsing dot. Buttons: "Kill leader" and "Reset". Killing the leader elects the next alive node and increments the term. With fewer than 3 of 5 nodes alive, there's no leader and the center reads "no quorum". The center otherwise shows "N/5 up".
- Problem (case-study page only): Storage spread across machines has to agree on every write, even when a machine dies mid-request.
- What I built: Raft from scratch in C++20: leader election, log replication, and a deterministic simulator that replays any failure from a seed.
- Result (case-study page only): [FAILOVER TIME] · [N] simulated runs
- Tags: C++20 · Raft · Simulation testing
- Code: https://github.com/PranaviGuttikonda/quorum
- Case study: /projects/quorum

**02. Rush Hour Café** (In progress)
- One-liner: "Robot waiters that plan collision-free routes around a café you lay out."
- Preview: a 10×6 grid. Tables are peach `#FDBA74` squares, 2 robots are glowing accent circles, and a dotted accent path runs between them. Static for now.
- Problem (case-study page only): Many robots sharing one floor have to reach their tables without colliding or deadlocking.
- What I built: A multi-agent pathfinding engine in C++ with a playable front end: place tables, then watch robots plan.
- Result (case-study page only): [N] robots · [ms] planning time
- Tags: C++ · Multi-agent pathfinding · Simulation
- Code: https://github.com/PranaviGuttikonda/warehouse-world
- No case-study page yet, so no "Read case study →" button.

**03. Quidd** (In progress)
- One-liner: "A budgeting app that shows what you can still safely spend."
- Preview: a simple phone frame in the theme colors showing a "Spendable this week" card with a progress ring and 3 category rows (Food, Transport, Shopping) with thin bars. No amounts and no currency symbols.
- Problem (case-study page only): Most budgeting apps tell you what you've already spent, not what you can still safely spend.
- What I built: A React Native app with a rule-based "spendable-first" budgeting engine on Supabase. I replaced LLM-driven calculations with deterministic logic so the numbers are predictable.
- Result (case-study page only): [RESULT]
- Tags: React Native · TypeScript · Supabase · Zustand
- Code: https://github.com/PranaviGuttikonda/Quidd
- No case-study page yet, so no "Read case study →" button.

**Smaller projects (04–06):** no badge. Preview: no illustration; a typographic panel with the project name in JetBrains Mono (~32px, `--text`) and its stack as chips under it, centered on the dot grid, same height as the other previews.

**04. Real-Time Trade Simulator**
- One-liner / What I built: Level-2 market-data pipeline with latency profiling.
- Tags: Python · WebSocket
- No code link; this one is confidential.

**05. Fake News Detection**
- One-liner / What I built: TF-IDF + Random Forest / SVM classifier, 86% accuracy.
- Tags: Python · scikit-learn
- Code: none yet.

**06. Price Prediction**
- One-liner / What I built: ML pipeline with MLflow tracking and CI/CD.
- Tags: Python · ZenML · MLflow
- Code: none yet.

## 03. Toolbox

Four cards, each with a mono accent label and chips:
- **LANGUAGES:** C++, Python, Java, TypeScript, JavaScript, SQL
- **SYSTEMS:** Linux, Docker, Kubernetes, AWS, WebSockets, REST
- **DATA & WEB:** PostgreSQL, MongoDB, React, Next.js, FastAPI, Node.js
- **ML:** PyTorch, scikit-learn, MLflow, RAG, NLP

## 04. Contact (centered)

- Mono accent line "04. What's next?", then H2 "Let's talk." (52px).
- Paragraph: "I'm looking for Summer 2027 internships and co-ops. Whether it's a role, a project or just a question, my inbox is open."
- Buttons: "Say hi →" (accent, `mailto:p.avigutti05@gmail.com`) and "Download resume" (outline, `/resume.pdf` with the `download` attribute; I'll add the file to `public/`).
- **Footer** (mono, small, muted): "Designed & built by Pranavi Guttikonda" on the left; email · GitHub on the right.
- LinkedIn URL: https://www.linkedin.com/in/pranaviguttikonda/

## /projects/quorum (Phase 6)

- **Top:** back link, "In progress" badge plus tags, H1 "quorum", subtitle "A replicated key-value store that keeps accepting writes while machines crash, as long as a majority survives, and refuses them, safely, when it can't." Buttons: "View on GitHub", "Try the live cluster ↓".
- **Demo panel:** a replicated-log view. Each of the 5 nodes is a row: badge, role (leader/follower/down), then a row of log squares (filled = committed, outlined = not yet committed).
  - Buttons: "PUT keyN = v", "Kill the leader", "Reset cluster", plus a log line describing what happened.
  - A PUT replicates to alive nodes and commits only if a majority is alive; otherwise it's rejected with "no majority".
- **Content:** a sticky side menu on desktop (The problem / Design / Testing / Results / What's next).
  - **The problem:** "Any service that stores data on more than one machine has to agree on what was written, even when machines crash or messages arrive late. quorum implements Raft from scratch to make that agreement explicit and testable."
  - **Design:** a flow diagram: Client → Leader (append to log) → Followers ×4 (replicate · ack) → Majority ack (commit · apply to KV). Then 3 decision cards: [DECISION 1/2/3] with [why + trade-off].
  - **Testing:** "Network, clock and disk run inside a seeded simulator, so a failing run can be replayed exactly from its seed." Then a code block: `$ ./quorum_sim --seed [SEED] --nodes 5 --faults partition,crash` / `[SIMULATOR OUTPUT]`.
  - **Results:** three stat cards: [N] simulated runs, [ms] median failover time, [ops/s] write throughput.
  - **What's next:** [placeholder].
- **Footer:** "← Back to all work" and "Next project: Rush Hour Café →".
