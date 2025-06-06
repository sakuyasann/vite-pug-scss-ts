import fs from 'fs'
import { compileFile } from 'pug'
import type { Plugin, ViteDevServer } from 'vite'
import { send } from 'vite'

const transformPugToHtml = (server: ViteDevServer, path: string) => {
  try {
    const compiled = compileFile(path)()
    return server.transformIndexHtml(path, compiled)
  } catch (error) {
    console.log(error)
    return server.transformIndexHtml(path, 'Pug Compile Error')
  }
}

export const vitePluginPugServe = (): Plugin => {
  return {
    name: 'vite-plugin-pug-serve',
    enforce: 'pre',
    // 開発サーバー時のみ
    apply: 'serve',
    handleHotUpdate(context) {
      // ファイルが保存された時にホットリロードする
      // この記述がないと xxxx.pug を保存した時にリロードされない
      context.server.ws.send({
        type: 'full-reload',
      })
      return []
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const root = server.config.root

        // クエリやハッシュを除去した pathname を取得
        const url = new URL(req.url || '/', 'http://localhost')
        let pathname = url.pathname
        let fullReqPath = root + pathname

        if (fullReqPath.endsWith('/')) {
          fullReqPath += 'index.html'
        }

        if (fullReqPath.endsWith('.html')) {
          // xxxx.html にリクエストがきた時
          if (fs.existsSync(fullReqPath)) {
            // xxxx.html が存在するならそのまま次の処理へ
            return next()
          }

          // xxxx.htmlが存在しないときは xxxx.pug があるか確認する
          const pugPath = `${
            fullReqPath.slice(0, Math.max(0, fullReqPath.lastIndexOf('.'))) ||
            fullReqPath
          }.pug`
          if (!fs.existsSync(pugPath)) {
            // xxxx.pug が存在しないなら 404 を返す
            return send(req, res, '404 Not Found', 'html', {})
          }

          // xxxx.pug が存在するときは xxxx.pug をコンパイルした結果を返す
          const html = await transformPugToHtml(server, pugPath)
          return send(req, res, html, 'html', {})
        } else {
          // xxxx.html 以外へのリクエストはそのまま次の処理へ
          return next()
        }
      })
    },
  }
}
