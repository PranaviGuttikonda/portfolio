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
- **Phase 4, Projects** (case-study rows, live quorum cluster island, previews, "Ask about this").
- **Phase 5, Skills, contact, footer, resume PDF link.**
- **Phase 6, quorum project page** at `/projects/quorum`.
- **Phase 7, Polish:** ⌘K command palette, SEO meta + Open Graph image, favicon, sitemap, Lighthouse pass (aim for 95+ on all four scores), deploy config for Vercel.

---

# DESIGN SPEC

## Theme tokens

| Token | Dark: "Midnight Periwinkle" (default) | Light: "Paper & Cobalt" |
|---|---|---|
| `--bg` | `#0B1220` | `#F7F6F2` |
| `--surface` | `#111A2E` | `#FFFFFF` |
| `--surface-2` (chat bot bubble) | `#16203A` | `#EEF0F5` |
| `--surface-3` (chat panel) | `#0E1626` | `#FFFFFF` |
| `--border` | `#1E2940` | `#E4E2DC` |
| `--border-strong` | `#2A3752` | `#D3D1CA` |
| `--border-hover` | `#3A4A70` | `#B9B7B0` |
| `--text` | `#E6EAF2` | `#14161A` |
| `--text-2` | `#C3CAD8` | `#33373F` |
| `--muted` | `#A3ADC2` | `#565B68` |
| `--dot` (background dot grid) | `#1C2740` | `#E2E0D9` |
| `--accent` | `#8FA2FF` | `#2448F5` |
| `--on-accent` (text on accent buttons) | `#0B1220` | `#FFFFFF` |
| `--success` (status dots) | `#4ADE80` | `#4ADE80` |
| `--warn` / `--warn-border` ("In progress" badge) | `#FCD34D` / `#5B4A1A` | `#92400E` / `#F3D9A4` |
| `--ask` / `--bid` (order book) | `#F87171` / `#4ADE80` | `#B91C1C` / `#15803D` |
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
    - H1 (Space Grotesk, ~76px desktop, ~44px mobile, tight letter-spacing): `hi, I'm Pranavi.` with "Pranavi" in accent.
    - Paragraph (19px, muted): "Software engineer in Boston. I spent the last year and a half building exchange integrations and debugging trading systems at **GoQuant**. Now I'm doing my MS in CS at **Northeastern**, and building things on the side." (bold words in `--text`)
    - Buttons: "See my work →" (accent, scrolls to Experience), "Resume ↓" (outline), then GitHub and LinkedIn icon buttons (50×50, outline).
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
| building, project, quorum, raft, cafe, café, side | Right now: quorum, a Raft-replicated key-value store in C++20 with deterministic simulation testing, and Rush Hour Café, a multi-agent pathfinding simulation. Both are in the Projects section below. |
| stack, skill, language, tech, c++, python, java | Mostly C++, Python and Java, plus TypeScript and SQL. Tools: Linux, Docker, Kubernetes, AWS, WebSockets, REST, PostgreSQL. |
| available, looking, hire, co-op, coop, job, open | Yes. She is looking for Summer 2027 internships and co-ops in software engineering. |
| school, study, northeastern, degree, education, ucm, gpa | She is doing an MS in Computer Science at Northeastern (Khoury), 2026–2028. Before that, a B.S. in CS from the University of Central Missouri, Cum Laude. |
| contact, email, reach, linkedin, github, resume | Email p.avigutti05@gmail.com, or find her on GitHub at github.com/PranaviGuttikonda. The resume is at the bottom of the page. |
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

## 02. Things I've built: case-study rows

- **Intro line:** "Each one runs right here in the browser. Open a project for the design decisions and trade-offs behind it."
- **Row layout:** each main project is a full-width row separated by a top border, with the preview and text sides alternating (preview left, then right, then left). On mobile, the preview stacks on top.
- **Preview panel:** 360px tall, radius 16, dot grid.
- **Text side:**
  - Small mono number (01/02/03) and project name (Space Grotesk, 30px).
  - "In progress" badge where noted.
  - Three labeled blocks with mono accent labels: PROBLEM / WHAT I BUILT / RESULT. The result is in mono.
  - Tag chips.
  - Buttons: "Read case study →" (accent), "Code" (outline), "Ask about this" (outline, chat icon; opens the chatbot with "Tell me about <project>").

**1. quorum** (In progress)
- Preview: a **live interactive Raft cluster** (Preact island). 5 nodes on a dashed ring; the leader is filled with accent and has a glow; dead nodes are dashed with a ✕. Corner label "LIVE · term N" with a pulsing dot. Buttons: "Kill leader" and "Reset". Killing the leader elects the next alive node and increments the term. With fewer than 3 of 5 nodes alive, there's no leader and the center reads "no quorum". The center otherwise shows "N/5 up".
- Problem: Storage spread across machines has to agree on every write, even when a machine dies mid-request.
- What I built: Raft from scratch in C++20: leader election, log replication, and a deterministic simulator that replays any failure from a seed.
- Result: [FAILOVER TIME] · [N] simulated runs
- Tags: C++20 · Raft · Simulation testing
- Code: https://github.com/PranaviGuttikonda/quorum
- Case study: /projects/quorum

**2. Rush Hour Café** (In progress)
- Preview: a 10×6 grid. Tables are peach `#FDBA74` squares, 2 robots are glowing accent circles, and a dotted accent path runs between them. Static for now.
- Problem: Many robots sharing one floor have to reach their tables without colliding or deadlocking.
- What I built: A multi-agent pathfinding engine in C++ with a playable front end: place tables, then watch robots plan.
- Result: [N] robots · [ms] planning time
- Tags: C++ · Multi-agent pathfinding · Simulation
- Code: https://github.com/PranaviGuttikonda/warehouse-world

**3. Trading Engine**
- Preview: an order book with 4 asks (red) above a "spread 0.05" line and 4 bids (green) below, each with a depth bar. Prices 101.40 → 101.05.
- Problem: Matching orders correctly while many threads read and write the same book at once.
- What I built: Thread-safe order book with lock-free synchronization, benchmarked under simulated high-throughput load.
- Result: [p99 LATENCY] under [N] orders/s
- Tags: C++ · Multithreading · Lock-free · WebSocket
- Code: [LINK]

**Other projects:** small card grid under the label "OTHER PROJECTS". Each card has name, one line, and stack in mono.
- **Quidd:** Personal finance app with a deterministic budgeting engine. (TS · React Native · Postgres)
- **Real-Time Trade Simulator:** Level-2 market-data pipeline with latency profiling. (Python · WebSocket) **No code link; this one is confidential.**
- **Fake News Detection:** TF-IDF + Random Forest / SVM classifier, 86% accuracy. (Python · scikit-learn)
- **Price Prediction:** ML pipeline with MLflow tracking and CI/CD. (Python · ZenML · MLflow)

## 03. Toolbox

Four cards, each with a mono accent label and chips:
- **LANGUAGES:** C++, Python, Java, TypeScript, JavaScript, SQL
- **SYSTEMS:** Linux, Docker, Kubernetes, AWS, WebSockets, REST
- **DATA & WEB:** PostgreSQL, MongoDB, React, Next.js, FastAPI, Node.js
- **ML:** PyTorch, scikit-learn, MLflow, RAG, NLP

## 04. Contact (centered)

- Mono accent line "04. What's next?", then H2 "Let's talk." (52px).
- Paragraph: "I'm looking for Summer 2027 internships and co-ops. Whether it's a role, a project or just a question, my inbox is open."
- Buttons: "Say hi →" (accent, `mailto:p.avigutti05@gmail.com`) and "Download resume" (outline, `/resume.pdf`; I'll add the file to `public/`).
- **Footer** (mono, small, muted): "Designed & built by Pranavi Guttikonda" on the left; email · GitHub on the right.
- LinkedIn URL: [LINKEDIN URL]

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
