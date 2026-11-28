# portfolio

My personal site: who I am, where I've worked, and the things I'm building.

Built with [Astro](https://astro.build) and TypeScript. Pages are static by default; the interactive parts (the chat, the experience tabs, the live Raft cluster demo) are small [Preact](https://preactjs.com) islands that load only when needed. Styling is plain CSS with custom properties for the light and dark themes.

## Running it locally

Requires Node 22.23.4 or newer (Astro 7).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check, then build to dist/
npm run preview   # serve the production build
npm run images    # re-render og-image.png and the favicon PNGs (needs Chrome installed)
```

## Configuration

- **Site URL:** `SITE_URL` in `astro.config.mjs`. Canonical URLs, Open Graph tags, the sitemap and `robots.txt` all read it, so a custom domain is a one-line change.
- **Fonts:** Inter, Space Grotesk and JetBrains Mono are downloaded at build time and self-hosted (the `fonts` option in `astro.config.mjs`).
- **Analytics:** Vercel Web Analytics is only included in builds that run on Vercel. No cookies.

## Deploying

The site is a static Astro build, so Vercel needs no extra config: import the GitHub repo in Vercel and it detects Astro (`npm run build`, output `dist/`). Turn on Web Analytics in the project's Analytics tab.

## Layout

```
src/
  components/   static Astro components (nav, footer, section headings…)
  islands/      interactive Preact components
  layouts/      page shells
  pages/        routes
  styles/       global CSS and theme tokens
  data/         editable content (chatbot answers, experience, education, projects, skills)
public/         static files served as-is (resume.pdf, favicons, og-image.png, project media)
scripts/        image sources (Open Graph template, favicon) and the script that renders them
docs/SPEC.md    design spec and build plan
```

## Contact

p.avigutti05@gmail.com · [github.com/PranaviGuttikonda](https://github.com/PranaviGuttikonda)
