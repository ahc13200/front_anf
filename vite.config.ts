import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueUseDirectiveResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dirs: ['src/example/dir/here', 'other/example'],
      resolvers: [
        (componentName) => {
          // console.log('Component: ', componentName)
          // if (componentName.startsWith('K')) {
          //   return { name: componentName.slice(6), from: 'konsta' }
          // }
        },
        VueUseDirectiveResolver() // pass the resolver in the config; you can configure the resolver by passing options in an object parameter
      ]
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: ['vue', 'vue-router', 'vue-i18n', 'vue/macros', '@vueuse/head', '@vueuse/core'],
      dts: 'src/types/auto-imports.d.ts',
      dirs: ['src/core/composables', 'src/core/store'],
      vueTemplate: true,
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    })
  ],
  build: {
    cssCodeSplit: false,
    outDir: 'dist',
    // Turning off brotliSize display can slightly reduce packaging time
    chunkSizeWarningLimit: 1200,
    sourcemap: process.env.SOURCE_MAP === 'true'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~a': fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core'],
    exclude: ['vue-demi']
  }
})
