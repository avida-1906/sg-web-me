// vite.config.ts
import path from 'node:path'
import { defineConfig, loadEnv } from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/vite@4.4.9_@types+node@18.19.4_sass@1.66.1/node_modules/vite/dist/node/index.js'
import Vue from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.9_vue@3.4.4/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import Pages from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/vite-plugin-pages@0.31.0_vite@4.4.9/node_modules/vite-plugin-pages/dist/index.mjs'
import Layouts from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/vite-plugin-vue-layouts@0.8.0_vite@4.4.9_vue-router@4.2.4_vue@3.4.4/node_modules/vite-plugin-vue-layouts/dist/index.mjs'
import Components from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/unplugin-vue-components@0.25.1_rollup@2.79.1_vue@3.4.4/node_modules/unplugin-vue-components/dist/vite.mjs'
import AutoImport from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.2.1_rollup@2.79.1/node_modules/unplugin-auto-import/dist/vite.js'
import VueI18n from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/@intlify+unplugin-vue-i18n@0.12.2_rollup@2.79.1_vue-i18n@9.2.2/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs'
import VueDevTools from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/vite-plugin-vue-devtools@0.5.1_@types+node@18.19.4_axios@1.5.0_nprogress@0.2.0_pug@3.0.2_roll_jk2y36xye7taotksjukttjmkly/node_modules/vite-plugin-vue-devtools/dist/index.mjs'
import VueMacros from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/unplugin-vue-macros@2.3.6_@vueuse+core@10.2.1_rollup@2.79.1_typescript@5.1.6_vite@4.4.9_vue@3.4.4_webpack@5.88.2/node_modules/unplugin-vue-macros/dist/vite.mjs'
import WebfontDownload from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/vite-plugin-webfont-dl@3.7.6_vite@4.4.9/node_modules/vite-plugin-webfont-dl/dist/index.mjs'
import { createSvgIconsPlugin } from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.4.9/node_modules/vite-plugin-svg-icons/dist/index.mjs'
import { visualizer } from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2_rollup@2.79.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js'
import { chunkSplitPlugin } from 'file:///Users/a1/Desktop/work/sg-web/node_modules/.pnpm/vite-plugin-chunk-split@0.4.7_vite@4.4.9/node_modules/vite-plugin-chunk-split/dist/index.js'

const __vite_injected_original_dirname = '/Users/a1/Desktop/work/sg-web'
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
const vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__vite_injected_original_dirname, 'src')}/`,
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
              'floor',
              'flatten',
              'zip',
              'uniqBy',
            ],
            'big.js': ['Big'],
            'vee-validate': ['useField'],
            // https://vee-validate.logaretm.com/v4/api/use-field/
            'dayjs': [['default', 'dayjs']],
            'axios': [[
              'default',
              'axios',
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
        include: [path.resolve(__vite_injected_original_dirname, 'locales/**')],
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
          rewrite: path2 => path2.replace(/^\/api/, ''),
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
export {
  vite_config_default as default,
}
// # sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYTEvRGVza3RvcC93b3JrL3NnLXdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2ExL0Rlc2t0b3Avd29yay9zZy13ZWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2ExL0Rlc2t0b3Avd29yay9zZy13ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnXG5pbXBvcnQgTGF5b3V0cyBmcm9tICd2aXRlLXBsdWdpbi12dWUtbGF5b3V0cydcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IFZ1ZUkxOG4gZnJvbSAnQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZSdcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgVnVlTWFjcm9zIGZyb20gJ3VucGx1Z2luLXZ1ZS1tYWNyb3Mvdml0ZSdcbmltcG9ydCBXZWJmb250RG93bmxvYWQgZnJvbSAndml0ZS1wbHVnaW4td2ViZm9udC1kbCdcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCB7IGNodW5rU3BsaXRQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1jaHVuay1zcGxpdCdcblxuY29uc3QgY29yZTEgPSBbXG4gICd2dWUnLFxuICAndnVlLXJvdXRlcicsXG4gICdwaW5pYScsXG5dXG5jb25zdCBjb3JlMiA9IFtcbiAgJ3Z1ZS1pMThuJyxcbiAgJ0B2dWV1c2UvaGVhZCcsXG4gICdAdnVldXNlL2NvcmUnLFxuXVxuY29uc3QgdXRpbHMgPSBbXG4gICdsb2Rhc2gtZXMnLFxuICAnYmlnLmpzJyxcbiAgJ3ZlZS12YWxpZGF0ZScsXG4gICdkYXlqcycsXG4gICdheGlvcycsXG4gICd2dWUtcmVxdWVzdCcsXG4gICdxcycsXG5dXG5jb25zdCBwcmVjb21waWxlZE1xdHQgPSBbJ3ByZWNvbXBpbGVkLW1xdHQnXVxuY29uc3QgZmxvYXRpbmdWdWUgPSBbJ2Zsb2F0aW5nLXZ1ZSddXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKSBhcyB1bmtub3duIGFzIEltcG9ydE1ldGFFbnZcblxuICByZXR1cm4ge1xuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICd+Lyc6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIHBsdWdpbnM6IFtcbiAgICAgIFZ1ZU1hY3Jvcyh7XG4gICAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgICB2dWU6IFZ1ZSh7XG4gICAgICAgICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10sXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICB9KSxcblxuICAgICAgdmlzdWFsaXplcih7XG4gICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgICBicm90bGlTaXplOiB0cnVlLFxuICAgICAgfSksXG5cbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9pY29ucycpXSxcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtuYW1lXScsXG4gICAgICB9KSxcblxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2hhbm5vZXJ1L3ZpdGUtcGx1Z2luLXBhZ2VzXG4gICAgICBQYWdlcyh7XG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXG4gICAgICB9KSxcblxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0pvaG5DYW1waW9uSnIvdml0ZS1wbHVnaW4tdnVlLWxheW91dHNcbiAgICAgIExheW91dHMoKSxcblxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWF1dG8taW1wb3J0XG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgaW1wb3J0czogW1xuICAgICAgICAgICd2dWUnLFxuICAgICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgICAndnVlLWkxOG4nLFxuICAgICAgICAgICdAdnVldXNlL2hlYWQnLFxuICAgICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICAgICdwaW5pYScsXG4gICAgICAgICAge1xuICAgICAgICAgICAgJ2xvZGFzaC1lcyc6IFtcbiAgICAgICAgICAgICAgJ2ZpbmQnLFxuICAgICAgICAgICAgICAnZGVib3VuY2UnLFxuICAgICAgICAgICAgICAnZmlsdGVyJyxcbiAgICAgICAgICAgICAgJ21hcCcsXG4gICAgICAgICAgICAgICdzb3J0QnknLFxuICAgICAgICAgICAgICAnZ3QnLFxuICAgICAgICAgICAgICAnb21pdCcsXG4gICAgICAgICAgICAgICdlcScsXG4gICAgICAgICAgICAgICdzcGxpdCcsXG4gICAgICAgICAgICAgICdmaW5kS2V5JyxcbiAgICAgICAgICAgICAgJ3Rocm90dGxlJyxcbiAgICAgICAgICAgICAgJ3BhZFN0YXJ0JyxcbiAgICAgICAgICAgICAgJ3RvTnVtYmVyJyxcbiAgICAgICAgICAgICAgJ3JhbmRvbScsXG4gICAgICAgICAgICAgICd1bmlxV2l0aCcsXG4gICAgICAgICAgICAgICdjbG9uZURlZXAnLFxuICAgICAgICAgICAgICAnb21pdEJ5JyxcbiAgICAgICAgICAgICAgJ2lzVW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgJ2hlYWQnLFxuICAgICAgICAgICAgICAnZmluZEluZGV4JyxcbiAgICAgICAgICAgICAgJ2lzTnVsbCcsXG4gICAgICAgICAgICAgICdpc05hTicsXG4gICAgICAgICAgICAgICdpc051bWJlcicsXG4gICAgICAgICAgICAgICdsYXN0JyxcbiAgICAgICAgICAgICAgJ2lzSW50ZWdlcicsXG4gICAgICAgICAgICAgICdpc05pbCcsXG4gICAgICAgICAgICAgICdtZXJnZScsXG4gICAgICAgICAgICAgICdnZXQnLFxuICAgICAgICAgICAgICAnaXNBcnJheScsXG4gICAgICAgICAgICAgICdjb25jYXQnLFxuICAgICAgICAgICAgICAnZmxvb3InLFxuICAgICAgICAgICAgICAnZmxhdHRlbicsXG4gICAgICAgICAgICAgICd6aXAnLFxuICAgICAgICAgICAgICAndW5pcUJ5JyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAnYmlnLmpzJzogWydCaWcnXSxcbiAgICAgICAgICAgICd2ZWUtdmFsaWRhdGUnOiBbJ3VzZUZpZWxkJ10sIC8vIGh0dHBzOi8vdmVlLXZhbGlkYXRlLmxvZ2FyZXRtLmNvbS92NC9hcGkvdXNlLWZpZWxkL1xuICAgICAgICAgICAgJ2RheWpzJzogW1snZGVmYXVsdCcsICdkYXlqcyddXSxcbiAgICAgICAgICAgICdheGlvcyc6IFtbXG4gICAgICAgICAgICAgICdkZWZhdWx0JywgJ2F4aW9zJyxcbiAgICAgICAgICAgIF1dLFxuICAgICAgICAgICAgJ3Z1ZS1yZXF1ZXN0JzogWyd1c2VSZXF1ZXN0JywgJ3VzZVBhZ2luYXRpb24nLCAndXNlTG9hZE1vcmUnXSxcbiAgICAgICAgICAgICdxcyc6IFtbJ2RlZmF1bHQnLCAncXMnXV0sXG4gICAgICAgICAgICAnQHZ1ZXVzZS9pbnRlZ3JhdGlvbnMvdXNlQ29va2llcyc6IFsndXNlQ29va2llcyddLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGR0czogJ3NyYy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgICAgIGRpcnM6IFtcbiAgICAgICAgICAnc3JjL2NvbmZpZycsXG4gICAgICAgICAgJ3NyYy9jb21wb3NhYmxlcycsXG4gICAgICAgICAgJ3NyYy9zdG9yZXMnLFxuICAgICAgICAgICdzcmMvdXRpbHMnLFxuICAgICAgICAgICdzcmMvYXBpcycsXG4gICAgICAgICAgJ3NyYy9odHRwJyxcbiAgICAgICAgICAnc3JjL3R5cGVzJyxcbiAgICAgICAgXSxcbiAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXG4gICAgICB9KSxcblxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzXG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgIC8vIGFsbG93IGF1dG8gbG9hZCBtYXJrZG93biBjb21wb25lbnRzIHVuZGVyIGAuL3NyYy9jb21wb25lbnRzL2BcbiAgICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnLCAndHN4J10sXG4gICAgICAgIC8vIGFsbG93IGF1dG8gaW1wb3J0IGFuZCByZWdpc3RlciBjb21wb25lbnRzIHVzZWQgaW4gbWFya2Rvd25cbiAgICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvLCAvXFwuW3RqXXN4PyQvXSxcbiAgICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXG4gICAgICB9KSxcblxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ludGxpZnkvYnVuZGxlLXRvb2xzL3RyZWUvbWFpbi9wYWNrYWdlcy91bnBsdWdpbi12dWUtaTE4blxuICAgICAgVnVlSTE4bih7XG4gICAgICAgIHJ1bnRpbWVPbmx5OiB0cnVlLFxuICAgICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXG4gICAgICAgIGZ1bGxJbnN0YWxsOiB0cnVlLFxuICAgICAgICBpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xvY2FsZXMvKionKV0sXG4gICAgICB9KSxcblxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZlYXQtYWdlbmN5L3ZpdGUtcGx1Z2luLXdlYmZvbnQtZGxcbiAgICAgIFdlYmZvbnREb3dubG9hZCgpLFxuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vd2ViZmFuc3Bsei92aXRlLXBsdWdpbi12dWUtZGV2dG9vbHNcbiAgICAgIFZ1ZURldlRvb2xzKCksXG5cbiAgICAgIGNodW5rU3BsaXRQbHVnaW4oe1xuICAgICAgICBzdHJhdGVneTogJ2RlZmF1bHQnLFxuICAgICAgICBjdXN0b21TcGxpdHRpbmc6IHtcbiAgICAgICAgICBjb3JlMSxcbiAgICAgICAgICBjb3JlMixcbiAgICAgICAgICB1dGlscyxcbiAgICAgICAgICBwcmVjb21waWxlZE1xdHQsXG4gICAgICAgICAgZmxvYXRpbmdWdWUsXG4gICAgICAgIH0sXG4gICAgICAgIGN1c3RvbUNodW5rOiAoYXJncykgPT4ge1xuICAgICAgICAgIGxldCB7IGZpbGUsIGlkLCBtb2R1bGVJZCwgcm9vdCB9ID0gYXJnc1xuICAgICAgICAgIGlmIChmaWxlLnN0YXJ0c1dpdGgoJ3NyYy9wYWdlcy8nKSkge1xuICAgICAgICAgICAgZmlsZSA9IGZpbGUuc3Vic3RyaW5nKDQpXG4gICAgICAgICAgICBmaWxlID0gZmlsZS5yZXBsYWNlKC9cXC5bXi4kXSskLywgJycpXG4gICAgICAgICAgICByZXR1cm4gZmlsZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZmlsZS5zdGFydHNXaXRoKCdzcmMvdXRpbHMvJykpXG4gICAgICAgICAgICByZXR1cm4gJ3NyYy11dGlscydcblxuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICBdLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVzdC1kZXYvdml0ZXN0XG4gICAgdGVzdDoge1xuICAgICAgaW5jbHVkZTogWyd0ZXN0LyoqLyoudGVzdC50cyddLFxuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBkZXBzOiB7XG4gICAgICAgIGlubGluZTogWydAdnVlJywgJ0B2dWV1c2UnLCAndnVlLWRlbWknXSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIHNzcjoge1xuICAgIC8vIFRPRE86IHdvcmthcm91bmQgdW50aWwgdGhleSBzdXBwb3J0IG5hdGl2ZSBFU01cbiAgICAgIG5vRXh0ZXJuYWw6IFsnd29ya2JveC13aW5kb3cnLCAvdnVlLWkxOG4vXSxcbiAgICB9LFxuXG4gICAgc2VydmVyOiB7XG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9IVFRQX0JBU0VVUkwsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgYnVpbGQ6IHtcbiAgICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgICBhc3NldHNJbmxpbmVMaW1pdDogMCxcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNjAwLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBleHRlcm5hbDogL1xcLm1kJC8sXG4gICAgICB9LFxuICAgICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgICBjb21wcmVzczoge1xuICAgICAgICAgIGRyb3BfY29uc29sZTogYCR7ZW52LlZJVEVfRFJPUF9DT05TT0xFfWAgPT09ICd0cnVlJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiLi9zcmMvc3R5bGVzL2dsb2JhbC1mdW5jdGlvbi1taXhpbi5zY3NzXCI7JyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVEsT0FBTyxVQUFVO0FBQzFSLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxxQkFBcUI7QUFDNUIsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyx3QkFBd0I7QUFiakMsSUFBTSxtQ0FBbUM7QUFlekMsSUFBTSxRQUFRO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFDQSxJQUFNLFFBQVE7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUNBLElBQU0sUUFBUTtBQUFBLEVBQ1o7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUNBLElBQU0sa0JBQWtCLENBQUMsa0JBQWtCO0FBQzNDLElBQU0sY0FBYyxDQUFDLGNBQWM7QUFFbkMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFB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
