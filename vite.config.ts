import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  assetsInclude: ['**/*.gltf', '**/*.glb']  // Aquí es donde debes agregar las extensiones
});
