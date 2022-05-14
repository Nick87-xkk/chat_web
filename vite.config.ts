import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  server: {
    proxy: {
      '/user': {
        target: 'http://49.232.185.124:19100',
        changeOrigin: true
      },
      '/fileUpload': {
        target: 'http://49.232.185.124:19100',
        changeOrigin: true
      },
      '/socket': {
        target: 'wss://49.232.185.124:19100',
        changeOrigin: true,
        ws: true
      }
    },
    https: true
  },
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src')
    }
  }
});
