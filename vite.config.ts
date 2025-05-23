import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig(({mode}) =>{
   const env = loadEnv(mode, process.cwd(), '');
  // server:{
  //   port:3000
  // },
return{
    plugins: [react(), mkcert()],
  base:"/uni-react-project/",
  define: {
      // Make sure env vars are available
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL)
    }
}
})
