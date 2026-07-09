import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['microsoft-clarity'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: ['microsoft-clarity'],
      // manualChunks only applies to the client build. During the SSR pass
      // (vite-react-ssg), react/react-dom are externalized, so forcing them into
      // a manual vendor chunk throws EXTERNAL_MODULES_CANNOT_BE_INCLUDED_IN_MANUAL_CHUNKS.
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
              ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
            },
          },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
}));
