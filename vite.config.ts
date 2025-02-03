import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/販售水果/' : '/',  // 在GitHub Pages上的base URL
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
