import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  assetsInclude: ['**/*.gltf', '**/*.glb'],  // Include 3D model formats
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          'three-core': ['three'],
          'react-core': ['react', 'react-dom'],
        }
      }
    }
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    },
    cors: {
      origin: '*',
      methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      credentials: true
    },
    // Proxy Sanity requests in development to avoid CORS issues
    proxy: {
      '/sanity': {
        target: 'https://ut4uykcs.apicdn.sanity.io',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/sanity/, ''),
      }
    },
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true,
  },
});
