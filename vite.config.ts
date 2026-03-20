import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      recharts: path.resolve(__dirname, "./node_modules/recharts/lib/index.js"),
      "get-nonce": path.resolve(__dirname, "./node_modules/get-nonce/dist/es5/index.js"),
    },
  },
}));
