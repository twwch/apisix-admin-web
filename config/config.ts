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
      'target': 'https://efficient.xiaoduoai.com/',
      'changeOrigin': true,
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/apisix-dashboard/' : '/',
  history: { type: 'hash' },
  hash: true,	// 清除缓存
});