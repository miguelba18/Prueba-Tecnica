import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import envCompatible from 'vite-plugin-env-compatible'; 
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  plugins: [react(), envCompatible(), tailwindcss()],
});
