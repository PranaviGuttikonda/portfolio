# portfolio

My personal site: who I am, where I've worked, and the things I'm building.

Built with [Astro](https://astro.build) and TypeScript. Pages are static by default; the interactive parts (the chat, the experience tabs, the live Raft cluster demo) are small [Preact](https://preactjs.com) islands that load only when needed. Styling is plain CSS with custom properties for the light and dark themes.

## Running it locally

Requires Node 20+.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check, then build to dist/
npm run preview   # serve the production build
```

## Layout

```
src/
  components/   static Astro components (nav, footer, section headings…)
  islands/      interactive Preact components
  layouts/      page shells
  pages/        routes
  styles/       global CSS and theme tokens
  data/         editable content (chatbot answers, experience, projects)
public/         static files served as-is (resume.pdf, favicon)
docs/SPEC.md    design spec and build plan
```

## Contact

p.avigutti05@gmail.com · [github.com/PranaviGuttikonda](https://github.com/PranaviGuttikonda)
