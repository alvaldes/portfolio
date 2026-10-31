import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.alvaldes.dev',
  // Static by default; the adapter only serves pages that opt out of prerendering (the 404).
  adapter: vercel(),
  integrations: [react()],
  markdown: {
    shikiConfig: {
      // Both themes are emitted as CSS variables; global.css applies the one of the site theme.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});