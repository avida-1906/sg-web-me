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

const core1 = [
  'vue',
  'vue-router',
  'pinia',
]
const core2 = [
  'vue-i18n',
  '@vueuse/head',
  '@vueuse/core',
]
const utils = [
  'lodash-es',
  'big.js',
  'vee-validate',
  'dayjs',
  'axios',
  'vue-request',
  'qs',
]
const precompiledMqtt = ['precompiled-mqtt']
const floatingVue = ['floating-vue']

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv

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
              'uniq',
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
              'floor',
              'flatten',
              'zip',
              'uniqBy',
            ],
            'big.js': ['Big'],
            'vee-validate': ['useField'], // https://vee-validate.logaretm.com/v4/api/use-field/
            'dayjs': [['default', 'dayjs']],
            'axios': [[
              'default', 'axios',
            ]],
            'vue-request': ['useRequest', 'usePagination', 'useLoadMore'],
            'qs': [['default', 'qs']],
            '@vueuse/integrations/useCookies': ['useCookies'],
          },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/config',
          'src/composables',
          'src/stores',
          'src/utils',
          'src/apis',
          'src/http',
          'src/types',
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
          core1,
          core2,
          utils,
          precompiledMqtt,
          floatingVue,
        },
        customChunk: (args) => {
          let { file, id, moduleId, root } = args
          if (file.startsWith('src/pages/')) {
            file = file.substring(4)
            file = file.replace(/\.[^.$]+$/, '')
            return file
          }
          if (file.startsWith('src/utils/'))
            return 'src-utils'

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

    build: {
      minify: 'terser',
      assetsInlineLimit: 0,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        external: /\.md$/,
      },
      terserOptions: {
        compress: {
          drop_console: `${env.VITE_DROP_CONSOLE}` === 'true',
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/global-function-mixin.scss";',
        },
      },
    },
  }
})
