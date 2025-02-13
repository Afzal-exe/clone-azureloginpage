import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows external access
    port: process.env.PORT || 5173, // Uses Azure's assigned port or 5173 for local
  },
});
