// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  integrations: [react()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
