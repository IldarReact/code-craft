import { defineConfig } from 'vite'
import VitePluginEnvCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [VitePluginEnvCompatible()],
});