import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueMacros from 'unplugin-vue-macros/vite'
import WebfontDownload from 'vite-plugin-webfont-dl'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv
  console.log(env.VITE_HTTP_BASEURL)

  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
          }),
        },
      }),

      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),

      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        symbolId: 'icon-[name]',
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'md'],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/head',
          '@vueuse/core',
          'pinia',
          {
            'lodash-es': ['find', 'debounce', 'filter', 'map', 'sortBy', 'gt', 'omit', 'eq', 'split', 'findKey', 'throttle', 'padStart', 'toNumber', 'random', 'uniqWith', 'cloneDeep', 'omitBy', 'isUndefined', 'head', 'findIndex', 'isNull', 'isNaN', 'isNumber', 'last', 'isInteger', 'isNil', 'merge', 'get', 'isArray'],
            'big.js': ['Big'],
            'vee-validate': ['useField'], // https://vee-validate.logaretm.com/v4/api/use-field/
            'dayjs': [['default', 'dayjs']],
            'axios': [[
              'default', 'axios',
            ]],
            'vue-request': ['useRequest'],
            'qs': [[
              'default', 'qs',
            ]],
          },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/stores',
          'src/utils',
          'src/apis',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
      // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md', 'tsx'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.[tj]sx?$/],
        dts: 'src/components.d.ts',
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),

      // https://github.com/feat-agency/vite-plugin-webfont-dl
      WebfontDownload(),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      VueDevTools(),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse', 'vue-demi'],
      },
    },

    ssr: {
    // TODO: workaround until they support native ESM
      noExternal: ['workbox-window', /vue-i18n/],
    },

    server: {
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_HTTP_BASEURL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
          ws: true,
        },
      },
    },

    build: {
      minify: 'terser',
      assetsInlineLimit: 0,
      chunkSizeWarningLimit: 600,
      // sourcemap: false,
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: true,
      //   },
      // },
      rollupOptions: {
        external: /\.md$/,
        output: {
          chunkFileNames: 'assets/chunks/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (['src/styles/reset.scss', 'src/styles/main.scss', 'src/styles/animate.scss'].some(v => id.includes(v)))
              return 'styles'

            if (id.includes('node_modules/dayjs'))
              return 'dayjs'

            // node_modules/@floating-ui
            if (['node_modules/@floating-ui', 'node_modules/floating-vue'].some(v => id.includes(v)))
              return 'floating-ui'

            if (id.includes('node_modules/axios'))
              return 'axios'

            if (['node_modules/pinia', 'node_modules/@vueuse/core', 'node_modules/@vueuse/shared', 'node_modules/big.js', 'node_modules/vue-request', 'node_modules/vue-i18n', 'node_modules/vue-router'].some(v => id.includes(v)))
              return 'vue-plugins'

            if (['src/utils'].some(v => id.includes(v)))
              return 'utils'
          },
        },
      },
    },
  }
})
