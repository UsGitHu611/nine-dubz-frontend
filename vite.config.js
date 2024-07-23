import { defineConfig } from 'vite'
import path from "node:path"
import react from '@vitejs/plugin-react'
import { patchCssModules } from 'vite-css-modules'

export default defineConfig({
  plugins: [react(), patchCssModules()],
  resolve: {
    alias: {
      "@" : path.resolve(__dirname, "./src/"),
      "@public" : path.resolve(__dirname, "public"),
      "@ui" : path.resolve(__dirname, "./src/", "UI"),
      "@components": path.resolve(__dirname, "./src/", "components"),
      "@modules": path.resolve(__dirname, "./src/", "modules"),
      "@pages": path.resolve(__dirname, "./src/", "pages")
    }
  }
})
