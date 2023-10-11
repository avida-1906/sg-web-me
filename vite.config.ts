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
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

/**
 "dependencies": {
    "@types/qs": "^6.9.8",
    "@unhead/vue": "^1.1.30",
    "@unocss/reset": "^0.53.5",
    "@vueuse/core": "^10.2.1",
    "@vueuse/head": "^1.1.26",
    "axios": "^1.5.0",
    "big.js": "^6.2.1",
    "dayjs": "^1.11.9",
    "floating-vue": "2.0.0-beta.24",
    "lodash": "^4.17.21",
    "nprogress": "^0.2.0",
    "pinia": "^2.1.4",
    "precompiled-mqtt": "4.3.14-beta",
    "qrcode.vue": "^3.4.1",
    "qs": "^6.11.2",
    "vee-validate": "^4.11.3",
    "vue": "^3.3.4",
    "vue-demi": "^0.14.5",
    "vue-i18n": "^9.2.2",
    "vue-request": "^2.0.3",
    "vue-router": "^4.2.4"
  },
  src: {
    components
    composables
    pages
    styles
    utils
  }
 */

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
            'lodash-es': [
              'find',
              'debounce',
              'filter',
              'map',
              'sortBy',
              'gt',
              'omit',
              'eq',
              'split',
              'findKey',
              'throttle',
              'padStart',
              'toNumber',
              'random',
              'uniqWith',
              'cloneDeep',
              'omitBy',
              'isUndefined',
              'head',
              'findIndex',
              'isNull',
              'isNaN',
              'isNumber',
              'last',
              'isInteger',
              'isNil',
              'merge',
              'get',
              'isArray',
              'concat',
            ],
            'big.js': ['Big'],
            'vee-validate': ['useField'], // https://vee-validate.logaretm.com/v4/api/use-field/
            'dayjs': [['default', 'dayjs']],
            'axios': [[
              'default', 'axios',
            ]],
            'vue-request': ['useRequest', 'usePagination', 'useLoadMore'],
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
          'src/http',
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

      chunkSplitPlugin({
        strategy: 'default',
        customSplitting: {

        },
        customChunk: (args) => {
          // files into pages directory is export in single files
          let { file, id, moduleId, root } = args
          if (file.startsWith('src/pages/')) {
            console.log('file', file)
            file = file.substring(4)
            file = file.replace(/\.[^.$]+$/, '')
            return file
          }
          return null
        },
      }),
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

    // build: {
    //   minify: 'terser',
    //   assetsInlineLimit: 0,
    //   chunkSizeWarningLimit: 600,
    //   rollupOptions: {
    //     external: /\.md$/,
    //     // output: {
    //     //   chunkFileNames: 'assets/chunks/[name]-[hash].js',
    //     //   entryFileNames: 'assets/js/[name]-[hash].js',
    //     //   assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
    //     //   manualChunks(id) {
    //     //     if (['src/styles/reset.scss', 'src/styles/main.scss', 'src/styles/animate.scss'].some(v => id.includes(v)))
    //     //       return 'styles'

    //     //     if (['src/components'].some(v => id.includes(v)))
    //     //       return 'src-components'

    //     //     if (id.includes('node_modules/dayjs'))
    //     //       return 'dayjs'

    //     //     // node_modules/@floating-ui
    //     //     if (['node_modules/@floating-ui', 'node_modules/floating-vue'].some(v => id.includes(v)))
    //     //       return 'floating-ui'

    //     //     if (id.includes('node_modules/axios'))
    //     //       return 'axios'

    //     //     if (['node_modules/pinia', 'node_modules/@vueuse/core', 'node_modules/@vueuse/shared', 'node_modules/big.js', 'node_modules/vue-request', 'node_modules/vue-i18n', 'node_modules/vue-router'].some(v => id.includes(v)))
    //     //       return 'vue-plugins'

    //     //     if (['src/utils'].some(v => id.includes(v)))
    //     //       return 'utils'
    //     //   },
    //     // },
    //   },
    // },
  }
})
