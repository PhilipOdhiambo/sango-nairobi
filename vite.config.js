
// https://vitejs.dev/config/

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: mode === 'production' ? process.env.VITE_BASE_URL || '/sango-nairobi/' : '/',
    server: {
      host: true
    }
  };
});

