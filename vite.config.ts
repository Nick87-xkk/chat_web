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
        target: 'http://192.168.31.221:9892',
        changeOrigin: true
      },
      '/fileUpload': {
        target: 'http://192.168.31.221:9892',
        changeOrigin: true
      },
      '/socket': {
        target: 'wss://192.168.31.221:443',
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
