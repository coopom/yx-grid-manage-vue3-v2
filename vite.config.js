import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'

export default ({ mode }) => {

  const {
    VITE_BASE_API: BASE_API,
    VITE_BASE_URI: BASE_URI,
    VITE_GLOB_APP_TITLE: GLOB_APP_TITLE,
    VITE_APP_STD_MS_SERVICE_URL,

    VITE_YT_BASE_API,
    VITE_YT_URI,

    VITE_XH_BASE_API,
    VITE_XH_URI,
    VITE_XH_BASE_API1,
    VITE_XH_URI1
  } = loadEnv(mode, process.cwd());

  return defineConfig({
    base: "./",
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: GLOB_APP_TITLE
          }
        }
      }),
      // glsl()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "src/styles/common/index.scss";`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      open: true,
      proxy: {
        "/stdms/service/": {
          target: VITE_APP_STD_MS_SERVICE_URL,
          changeOrigin: true,
          // rewrite: (path) => path.replace(new RegExp(`^${/api/}`), ''),
        },
        // 云天视频代理
        [`/${VITE_YT_BASE_API}/`]: {
          target: VITE_YT_URI,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(VITE_YT_BASE_API), ''),
        },
        // 星火视频代理
        [`/${VITE_XH_BASE_API}/`]: {
          target: VITE_XH_URI,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(VITE_XH_BASE_API), ''),
        },
        [`/${VITE_XH_BASE_API1}/`]: {
          target: VITE_XH_URI1,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(VITE_XH_BASE_API1), ''),
        }
      },
    },
  })
}
