import globule from 'globule'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vitePluginPug from './plugins/vite-plugin-pug'

const htmlFiles = globule.find('src/**/*.pug', {
  ignore: ['src/**/_*.pug'],
})

// `pnpm build` で出力されない画像を対策
const usedImages = []

export default defineConfig({
  base: './',
  root: 'src',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ...htmlFiles.reduce((acc, file) => {
          acc[file] = file
          return acc
        }, {}),
        // 使用する画像ファイルのみをエントリーポイントとして追加
        ...usedImages.reduce((acc, file) => {
          acc[file] = file
          return acc
        }, {}),
      },
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
    assetsDir: './', // ビルドされたファイルを相対パスにするための設定
    assetsInlineLimit: 0, // 全てのアセットを相対パスで出力するための設定
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
