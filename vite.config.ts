import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@mediapipe/tasks-vision'],
  },
  build: {
    rollupOptions: {
      // @mediapipe/tasks-vision is a drei optional dep (FaceControls) we never use.
      // Its dist bundle has an EOF issue that breaks Rollup parsing — exclude it.
      external: ['@mediapipe/tasks-vision'],
    },
  },
})
