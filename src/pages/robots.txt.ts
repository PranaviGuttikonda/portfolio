import type { APIRoute } from 'astro';

// Given: robots.txt should point at the sitemap on whatever domain the site uses.
// Approach: build it from `site` in astro.config.mjs instead of hard-coding the URL.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
