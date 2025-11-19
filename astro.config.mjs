import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), mdx(), icon()],
  site: 'https://dev-miu.usmc.dev',
  base: '/',
  redirects: {
    '/contactUs': '/contactUs/getInTouch',
    '/career': '/training',
  },
});