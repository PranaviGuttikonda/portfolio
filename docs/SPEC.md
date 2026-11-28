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
- **Phase 7, Polish:** ⌘K command palette, education (now in About), custom 404 page, SEO meta + Open Graph image, favicon, sitemap + robots.txt, Vercel Web Analytics, Lighthouse pass (95+ on all four scores), Vercel deploy.

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
- **Section headings:** mono accent number + Space Grotesk title + a 1px line filling the rest of the row, e.g. `02. Where I've worked ───────`. Sections in order: 01. About, 02. Where I've worked, 03. Things I've built, 04. Toolbox, 05. Contact ("05. What's next?").

## Nav (sticky, bottom border)

- **Left:** `pranavi.g` in JetBrains Mono, with the dot in accent color.
- **Right:** `01. About`, `02. Experience`, `03. Projects`, `04. Skills`, `05. Contact` (numbers in mono accent), then the theme toggle (sun icon in dark mode, moon icon in light mode, 40×40), then a `Jump to… ⌘K` button that opens the command palette (shows `Ctrl K` off Apple devices). Below 960px the links collapse into the menu and it becomes a 40×40 search icon button.
- **Mobile:** links collapse into a menu button. The open menu ends with a row of mail, GitHub and LinkedIn icon buttons (44×44).

## Hero

- **Background:** the dot grid plus two soft radial glows: accent at about 14% opacity near the top-right, and a faint teal near the bottom-left.
- **Two-column layout** (stacks on mobile):
  - **Left column:**
    - Pill badge: pulsing green dot + "Open to Summer 2027 internships & co-ops".
    - H1 (Space Grotesk, ~76px desktop, ~44px mobile, tight letter-spacing): `hi, I'm Pranavi.` with "Pranavi" in accent. Followed by a blinking terminal cursor: a solid accent bar (~0.09em wide × 1.05em tall, border-radius 2px, its bottom ~0.15em below the baseline like a real text cursor, ~0.12em gap after the period; it must not change the heading's line height), blinking on/off every 0.5s with `steps(1)`, `aria-hidden="true"`. With `prefers-reduced-motion` it stays visible but doesn't blink. It never wraps away from "Pranavi." on narrow screens.
    - One line (19px, muted): "Software engineer in Boston, working on backend and distributed systems."
    - Buttons: "See my work →" (accent, scrolls to Experience), "Resume ↓" (outline, `/resume.pdf` with the `download` attribute), then Email (`mailto:p.avigutti05@gmail.com`), GitHub and LinkedIn icon buttons (50×50, outline, `aria-label`s "Email", "GitHub", "LinkedIn").
  - **Right column:** the chatbot (next section).
- No quick-facts row: that information lives in About.

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
- **Matching:** keyword lookup over the table below. The about/background row is a soft fallback: it answers only when no other row matches, before the "I don't have that one" line. Keywords of 3 characters or fewer must match whole words only; longer keywords can match as substrings. Fallback when nothing matches: "I don't have that one. Pranavi can answer directly at p.avigutti05@gmail.com."
- **Data file:** keep the Q&A in `src/data/chatbot.ts` so I can edit it, and so it could later be swapped for an LLM backend without changing the UI.

| Keywords | Answer |
|---|---|
| goquant, quant, trading, exchange, last job, previous job | At GoQuant (May 2025 – Sep 2026) she was a Quantitative/Backend Developer. She built trading integrations across 15+ crypto exchanges (auth, request signing, rate limiting, resilient WebSocket sessions), supported 8+ client deployments, and documented 100+ defects. |
| deepedge, edge ai | At DeepEdge (Mar – May 2025) she built C++ and Python backend infrastructure for a low/no-code Edge AI platform and led a legacy data migration. |
| isaksai, nysdot, dmv, intern | At Isaksai Solutions (Aug – Nov 2023) she worked on REST APIs and T-SQL/SSIS pipelines for the NYSDOT–DMV Accident Information System. |
| building, project, projects, side project, working on | Right now: quorum, a Raft-replicated key-value store in C++20 with deterministic simulation testing; Rush Hour Café, a multi-agent pathfinding simulation; and Quidd, a personal finance app. All three are in the Projects section below. |
| quorum, raft, consensus, key-value, distributed | quorum is a replicated key-value store she's building in C++20 on Raft, with leader election, log replication and crash-safe storage. It's tested with deterministic simulation: 1,000 seeds per fuzz suite, Raft invariants checked every tick, and every client history checked for linearizability. You can play with it live; the link is in the Projects section. |
| rush hour, café, cafe, robot, pathfinding, multi-agent, warehouse | Rush Hour Café is a C++20 multi-agent pathfinding sim with three planners: local rules, space-time A* and conflict-based search (CBS). You can play it in your browser: two cafés run side by side, and at 40 robots CBS made 29,597 deliveries in 20,000 ticks against 500 for local rules. The link is in the Projects section. |
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
| about, background, hobby, hobbies, outside, reading, books (only when no other row matches) | Pranavi is a software engineer from India, now doing her MS in CS at Northeastern in Boston. Outside of code she's usually reading or building side projects like Rush Hour Café. |

- Expose a global way to open the chat with a prefilled question (e.g. a custom DOM event `ask-pranavi` with the question text). The projects' "Ask about this" buttons use it: scroll to the chat, then send the question.

## 01. About (right after the hero)

- **Layout:** desktop two columns, text on the left (~60%) and an "At a glance" card on the right (~40%); below 900px stacked, text first.
- **Text,** three paragraphs (18px, line-height 1.75, `--text-2`; company and school names in `--accent`, semibold, not links):
  1. "I'm a software engineer currently pursuing my MS in CS at **Northeastern University** in Boston. Before that, I was a backend developer at **GoQuant**, working on exchange integrations and trading systems, and before that at **DeepEdge** and **Isaksai**."
  2. "Right now I'm looking for Summer 2027 internships and co-ops in backend, infrastructure and systems work."
  3. "Outside of code, I'm usually reading or building something that probably didn't need to exist, like a café run by robots."
- **"At a glance" card** (surface, 1px border, radius 16): mono label "AT A GLANCE", then two education rows (dates in mono accent, school in Space Grotesk, degree, details in muted text):
  - Sep 2026 – May 2028 · Northeastern University · MS in Computer Science · Coursework: Programming Design Paradigm, Database Management Systems
  - May 2024 · University of Central Missouri · B.S. in Computer Science · GPA 3.62 · Cum Laude · Dean's List
  - Then two fact rows (mono label left, value right, thin borders between): BASED IN: Boston, MA · WORKS IN: C++ · Python · Java
- Data in `src/data/education.ts`. Education appears only here.

## 02. Where I've worked (tabs, Preact island)

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

## 03. Things I've built: project switcher (Preact island)

- **Intro line:** "Pick a project to see what it does and how it's built. quorum runs live, so try crashing its leader."
- **Stage:** full width of the container (surface, border, radius 18, overflow hidden).
  - Desktop (≥900px): a two-column card. Preview on the left (~55%, full card height, min 380px, dot grid); details on the right (~45%, padding 32px): name + "In progress" badge, the "What I built" paragraph, an optional `highlight` (one mono line, shown only when set), tag chips, then buttons.
  - Below 900px: the preview stacks on top (260px) with the details under it.
  - Desktop text is kept short enough that the card stays ~382px tall at 1280px.
  - Tablet and desktop (≥600px): the stage height must not jump when switching projects (it keeps the height of the tallest project).
  - Phones (<600px): the card resizes to fit the selected project, so smaller projects don't leave empty space under their details.
- **Buttons** (each only when it applies):
  - "Play it live →" (accent, new tab): only for projects with a `live` demo URL (quorum and Rush Hour Café). Same spot as "Read case study →".
  - "Read case study →": only for projects with a case-study page, which for now is only quorum. Accent on its own; outline when the project also has "Play it live →" (which then takes the accent).
  - "Code" (outline): only when the project has a code link.
  - A project with four buttons (quorum) shows them as two pairs: "Play it live →" | "Read case study →", then "Code" | "Ask about this". On phones (<600px) they wrap normally.
  - "Ask about this" (outline, chat icon): sends "Tell me about <project name>" to the chatbot. Shown for all 6 projects; each has its own chatbot answer.
- **Project tabs, below the stage:** a grid of all 6 projects. 3 per row on desktop (`repeat(3, minmax(0, 1fr))`, gap 12px), 2 per row on tablet, and a horizontal scroll row of compact pills on phones (<600px). Each tab shows the mono number, the name (Space Grotesk 18px), and the one-liner (14px, muted; hidden on phone pills). Selected: accent border + `--surface-2`; others: `--border` + `--surface`.
- **Preselecting a project:** `/?project=<id>#projects` (e.g. `/?project=rush-hour-cafe#projects`) opens the home page with that project selected; an unknown id falls back to the first project.
- **Tab semantics:** `role=tablist`/`tab`/`tabpanel`, `aria-selected`; arrow keys (left/right/up/down) move through the tabs in grid order; Home/End jump to the first/last.
- **Switching projects:** quick crossfade (~200ms); no animation with `prefers-reduced-motion`.
- **Not shown in the switcher:** each project's Problem and Result. They stay below for the project's case-study page.

The 6 projects, in this order:

**01. quorum** (In progress)
- One-liner: "A replicated key-value store that keeps accepting writes while machines crash."
- Preview: a **live interactive Raft cluster** (Preact island). 5 nodes on a dashed ring; the leader is filled with accent and has a glow; dead nodes are dashed with a ✕. Corner label "LIVE · term N" with a pulsing dot. Buttons: "Kill leader" and "Reset". Killing the leader elects the next alive node and increments the term. With fewer than 3 of 5 nodes alive, there's no leader and the center reads "no quorum". The center otherwise shows "N/5 up".
- Problem (case-study page only): Storage spread across machines has to agree on every write, even when a machine dies mid-request.
- What I built: Raft from scratch in C++20: leader election, log replication, and a deterministic simulator that replays any failure from a seed.
- Result (case-study page only): 1,000 seeds per fuzz suite · 4 Raft safety invariants checked every tick · linearizability checked on every client history
- Tags: C++20 · Raft · Simulation testing
- Live: https://pranaviguttikonda.github.io/quorum/ (the real engine in WebAssembly)
- Code: https://github.com/PranaviGuttikonda/quorum
- Case study: /projects/quorum
- Buttons: "Play it live →" (accent), "Read case study →" (outline), "Code", "Ask about this".

**02. Rush Hour Café** (In progress)
- One-liner: "Robot waiters that plan collision-free routes around a café you lay out."
- Preview: the recording, `<video autoplay muted loop playsinline preload="metadata" poster=…>` with `public/projects/rush-hour-cafe/rush-hour-cafe.webm` first, then `.mp4`; poster `rush-hour-cafe-poster.jpg`. No inner frame: the whole preview area takes the recording's own background, `#FBF5E6` (same in both themes, since it's part of the recording), with no dot grid, and a subtle 1px inset `--border` line on its edge. The video fills the full width edge to edge with `object-fit: contain`, centered vertically, so the cream above and below blends into it. Plays only while Rush Hour Café is selected and pauses when switching away. With `prefers-reduced-motion` it doesn't autoplay: poster only. aria-label: "Recording of Rush Hour Café: two cafés side by side; robots under local rules jam at the kitchen counter while CBS keeps serving."
- Problem (case-study page only): Many robots sharing one floor have to reach their tables without colliding or deadlocking.
- What I built: A C++20 multi-agent pathfinding sim with three planners (local rules, space-time A* and CBS), compiled to WebAssembly so it runs in the browser.
- Highlight (mono line under What I built): At 40 robots, CBS delivers 59× more than local rules (29,597 vs 500 orders over 20,000 ticks).
- Result (case-study page only): At 40 robots: CBS made 29,597 deliveries in 20,000 ticks; local rules made 500 (mean of 5 seeds).
- Tags: C++20 · Pathfinding · CBS · WebAssembly
- Live: https://pranaviguttikonda.github.io/warehouse-world/
- Code: https://github.com/PranaviGuttikonda/warehouse-world
- Buttons: "Play it live →", "Code", "Ask about this". No case-study page yet.

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

## 04. Toolbox

Four cards, each with a mono accent label and chips:
- **LANGUAGES:** C++, Python, Java, TypeScript, JavaScript, SQL
- **SYSTEMS:** Linux, Docker, Kubernetes, AWS, WebSockets, REST
- **DATA & WEB:** PostgreSQL, MongoDB, React, Next.js, FastAPI, Node.js
- **ML:** PyTorch, scikit-learn, MLflow, RAG, NLP

## 05. Contact (centered)

- Mono accent line "05. What's next?", then H2 "Let's talk." (52px).
- Paragraph: "I'm looking for Summer 2027 internships and co-ops. Whether it's a role, a project or just a question, my inbox is open."
- Buttons: "Say hi →" (accent, `mailto:p.avigutti05@gmail.com`) and "Download resume" (outline, `/resume.pdf` with the `download` attribute; I'll add the file to `public/`).
- **Footer** (mono, small, muted): "Designed & built by Pranavi Guttikonda" on the left; email · GitHub on the right.
- LinkedIn URL: https://www.linkedin.com/in/pranaviguttikonda/

## /projects/quorum (Phase 6)

All facts come from the quorum repo (github.com/PranaviGuttikonda/quorum: README.md and docs/VISION.md). Same layout rules as the home page: sticky nav with the theme toggle, both themes, footer.

- **Top** (dot grid): "← Back to all work" (`/#projects`), "In progress" badge plus tags, H1 "quorum", subtitle "A Raft-based replicated key-value store in C++20, tested with deterministic simulation." Buttons: "Play it live →" (accent, https://pranaviguttikonda.github.io/quorum/, new tab) and "View on GitHub" (outline, new tab).
- **Visualizer screenshot:** `public/projects/quorum/visualizer-split.png` (from the quorum repo's `docs/screenshots/desktop-5-split.png`, 2560×1600, compressed) in a rounded frame, alt text "quorum's visualizer during a network split". Caption: "The real engine, compiled to WebAssembly. Crash servers, split the network and send commands while you watch elections, replication and commits happen." plus a "Play it live →" button.
- **Sticky side menu on desktop** (≥960px; hidden below): The problem / What it does / Design / Testing / Results / What's next. The current section is highlighted; a clicked link stays highlighted until the visitor scrolls by hand, and the page bottom highlights What's next.
- **The problem:** "Bugs in distributed systems usually show up only under rare orderings of delays, message losses, partitions and crashes. quorum makes those orderings reproducible: every source of nondeterminism goes through one seeded simulator, so a failing run can be replayed exactly from its seed."
- **What it does:** a replicated key-value store (`put`, `get`, `delete`, `cas`) with exactly-once client requests; built on Raft (leader election, log replication, persistence); Raft state kept in checksummed files and recovered after crashes.
- **Design:** flow diagram Client (sends a command) → Leader (appends to its log) → Followers ×4 (replicate · ack) → Majority ack (commit · apply to KV); one row on wide screens, stacked with ↓ arrows below 760px. Then three decision cards:
  1. **One source of nondeterminism:** all randomness comes from a seeded, portable RNG; all time is simulated ticks; all messages go through the simulated network.
  2. **Protocol code is I/O-free:** Raft nodes are state machines driven by messages and ticks, so a real transport can replace the simulated one without changing protocol logic.
  3. **Crash-consistent storage:** Raft state lives in checksummed files, tested on a simulated disk where each crash is a power loss that drops or tears unsynced writes.
- **Testing:** the fuzz tests run 1,000 seeds each with random crashes, partitions, 10% message loss and 10% duplicate delivery while clients keep writing. Invariant checkers run after every tick (Election Safety, Log Matching, State Machine Safety, Leader Completeness, shown as chips), and every client history is checked for linearizability. Code block with the real command only: `$ QUORUM_FUZZ_SEEDS=200 ./build/tests/quorum_tests replication_fuzz`.
- **Results:** three stat cards: "1,000" seeds per fuzz suite; "4" Raft safety invariants checked every tick; "Linearizability" checked on every client history.
- **What's next** (from VISION.md): snapshots and log compaction; benchmarks across cluster sizes, delays and loss rates; a real-network transport.
- **Footer links:** "← Back to all work" (`/#projects`) and "Next project: Rush Hour Café →" (`/?project=rush-hour-cafe#projects`, which opens the switcher with Rush Hour Café selected).

## Command palette (Phase 7)

- Opens from the nav's `Jump to… ⌘K` button or Cmd/Ctrl+K on every page (home, /projects/quorum, 404). Cmd/Ctrl+K again closes it.
- Items: About, Experience, Projects, Skills, Contact (scroll on the home page, navigate there from other pages); each of the 6 projects (opens `/?project=<id>#projects`, or selects it in place when already on the home page); quorum case study; Download resume; Email; GitHub; LinkedIn (new tab); Toggle theme.
- Type to filter (label, group and keywords), ↑/↓ to move (wraps), Enter to run, Esc or a backdrop click to close.
- Native `<dialog>` with `showModal()` (page behind is inert), `aria-label="Jump to"`; the input is a `combobox` over a `listbox` with `aria-activedescendant`; Tab stays on the input; focus returns to whatever opened it.
- Desktop: centred panel (max 640px, `--surface-3`, radius 18, soft shadow, blurred backdrop). Phones (<600px): full-width sheet from the top.

## 404 page (Phase 7)

"404: page not found" with the same blinking cursor as the hero (`src/components/Cursor.astro`), a line of muted text, and buttons "Home" (`/`) and "Projects" (`/#projects`). `noindex`, left out of the sitemap.

## SEO, sharing and analytics (Phase 7)

- **Site URL:** one value, `SITE_URL` in `astro.config.mjs` (currently https://pranaviguttikonda.vercel.app). Everything below reads it.
- **Per page:** `<title>`, meta description, canonical URL, Open Graph (`og:title`, `og:description`, `og:url`, `og:image` 1200×630 + alt) and Twitter (`summary_large_image`) tags, `theme-color` for both schemes.
- **Open Graph image:** `public/og-image.png`, rendered from `scripts/images/og-image.html` (dark theme, dot grid, "Pranavi Guttikonda" with the accent surname and cursor, "Software engineer · Boston") by `npm run images`.
- **Favicon:** a "pg" monogram drawn as accent strokes on the dark background, `public/favicon.svg`, with `favicon-32.png` and `apple-touch-icon.png` (180×180) rendered from it by the same script.
- **Sitemap** (`@astrojs/sitemap`, 404 excluded) and **robots.txt** (generated, points to the sitemap).
- **Fonts:** self-hosted through Astro's `fonts` config with metric-matched fallbacks (no layout shift, no render-blocking third-party CSS).
- **Analytics:** Vercel Web Analytics (`@vercel/analytics`), only included in builds that run on Vercel; no cookies, no banner.
- **Lighthouse target:** 95+ on Performance, Accessibility, Best Practices and SEO for `/` and `/projects/quorum`, mobile and desktop.
