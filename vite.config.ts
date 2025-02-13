import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: true,  // Allow external access
    port: 8080,  // Use Azure's default port
  },
});

