// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

// The site's public URL. Change this one value when moving to a custom domain:
// canonical URLs, Open Graph tags, the sitemap and robots.txt all read it.
const SITE_URL = 'https://pranaviguttikonda.vercel.app';

export default defineConfig({
  site: SITE_URL,
  integrations: [preact(), sitemap({ filter: (page) => !page.includes('/404') })],
  // Self-hosted at build time, with size-adjusted local fallbacks so text
  // doesn't shift when the web fonts arrive.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
      weights: [500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
});
