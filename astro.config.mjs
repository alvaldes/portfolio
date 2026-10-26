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
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});