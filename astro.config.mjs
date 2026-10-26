import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alvaldes.vercel.app',
  integrations: [react()],
  markdown: {
    // Keep straight quotes as written, like the Works descriptions rendered before.
    smartypants: false,
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