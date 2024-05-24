import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  define: {
    "process.env": {
      VITE_GRAPH_API_KEY_MAINNET: JSON.stringify(process.env.VITE_GRAPH_API_KEY_MAINNET),
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
      define: {
        global: "globalThis",
      },
      supported: {
        bigint: true,
      },
    },
  },
  base: "/din-blog/",
  build: {
    target: ["es2020"],
  },
})
