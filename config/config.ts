// config/config.ts

import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  routes: routes,
  links: [
    { rel: 'icon', href: 'favicon.png' },
  ],
  proxy: {
    '/apisix_admin/v1': {
      'target': 'http://127.0.0.1:9002/',
      'changeOrigin': true,
    },
  },
});