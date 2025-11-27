import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// Set base to the repository name for correct asset paths on GitHub Pages
export default defineConfig({
  plugins: [vue()],
  base: '/everyday-food-randomizer/',
})
