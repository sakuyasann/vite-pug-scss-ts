import globule from 'globule'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vitePluginPug from './plugins/vite-plugin-pug'

const htmlFiles = globule.find('src/**/*.pug', {
  ignore: ['src/**/_*.pug'],
})

export default defineConfig({
  base: './',
  root: 'src',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: htmlFiles,
      output: {
        entryFileNames: `assets/js/bundle.js`,
        chunkFileNames: `assets/js/[name].js`,
        assetFileNames: (assetInfo) => {
          const { name } = assetInfo

          if (/\.(jpe?g|png|gif|svg|webp|avif)$/.test(name ?? '')) {
            return 'assets/img/[name][extname]'
          }
          if (/\.(woff?2|ttf|otf)$/.test(name ?? '')) {
            return 'assets/fonts/[name][extname]'
          }
          if (/\.(css|scss)$/.test(name ?? '')) {
            return 'assets/css/[name][extname]'
          }
          return 'assets/[name][extname]'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/assets'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  plugins: [vitePluginPug()],
})
