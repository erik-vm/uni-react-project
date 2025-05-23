import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react(), mkcert()],
    base: "/uni-react-project/",
    define: {
      // Make sure env vars are available - this was the issue!
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'https://sportmap.akaver.com/api/v1/')
    },
    // Optional: Add this for better debugging
    server: {
      port: 3000
    }
  }
})