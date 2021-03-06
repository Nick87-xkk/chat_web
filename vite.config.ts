import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import * as fs from 'fs';

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
  define: {
    'process.env': {
      BASE_API: 'https://192.168.28.221:9892'
    }
  },
  server: {
    proxy: {
      '/user': {
        target: 'https://192.168.28.221:9892',
        secure: false,
        changeOrigin: true
      },
      '/fileUpload': {
        target: 'https://192.168.28.221:9892',
        secure: false,
        changeOrigin: true
      },
      '/socket': {
        target: 'https://192.168.28.221:9892',
        secure: false,
        changeOrigin: true,
        ws: true
      },
      '/cvn': {
        target: 'https://192.168.28.221:9892',
        secure: false,
        changeOrigin: true
      },
      '/friend': {
        target: 'https://192.168.28.221:9892',
        secure: false,
        changeOrigin: true
      },
      '/msg': {
        target: 'https://192.168.28.221:9892',
        secure: false,
        changeOrigin: true
      },
      '/file': {
        target: 'https://192.168.28.221:9892',
        secure: false,
        changeOrigin: true
      }
    },
    https: {
      key: fs.readFileSync(
        path.join(__dirname, './public/sslKey/localhost+2-key.pem')
      ),
      cert: fs.readFileSync(
        path.join(__dirname, './public/sslKey/localhost+2.pem')
      )
    }
  },
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src')
    }
  }
});
