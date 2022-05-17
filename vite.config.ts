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
        target: 'http://127.0.0.1:9892',
        changeOrigin: true
      },
      '/fileUpload': {
        target: 'http://127.0.0.1:9892',
        changeOrigin: true
      },
      '/socket': {
        target: 'ws://127.0.0.1:9892',
        changeOrigin: true,
        ws: true
      },
      '/cvn': {
        target: 'http://127.0.0.1:9892',
        changeOrigin: true
      },
      '/friend': {
        target: 'http://127.0.0.1:9892',
        changeOrigin: true
      },
      '/msg': {
        target: 'http://127.0.0.1:9892',
        changeOrigin: true
      }
    },
    https: false
  },
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src')
    }
  }
});
