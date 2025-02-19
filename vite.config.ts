/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@yowari/xremote'],
  },
  build: {
    commonjsOptions: {
      include: [/@yowari\/xremote/, /node_modules/],
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
  server: {
    host: '0.0.0.0',  // Exposes the server externally
    port: 10000,      // Keeps the port 10000
    proxy: {
      '/api/proxy/xhome': {
        target: 'https://uks.core.gssv-play-prodxhome.xboxlive.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/xhome/, ''),
      },
      '/api/proxy/auth': {
        target: 'https://xhome.gssv-play-prod.xboxlive.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/auth/, ''),
      },
    },
  },
});
