import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
      name: 'vuesax-alpha-new',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          Vue: 'vue',
        },
      },
    },
  },
  plugins: [vue(),  cssInjectedByJsPlugin(), dts()],
});