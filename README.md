# coding-base

Vite・TypeScript・Pug・Sass を組み合わせた**超軽量スターターキット**です。
ブラウザ初期スタイルは `destyle.css` でリセット済み。余計な設定なしで、すぐに開発を始められます。

---

## 🚀 クイックスタート

```bash
# 依存関係をインストール
pnpm install

# 開発サーバー起動（既定: http://localhost:5173）
pnpm dev
```

ファイルを保存するたびに Vite がホットリロードしてくれます。

---

## 📦 採用技術

|ライブラリ|役割・メリット|
|:----|:----|
|Vite 5|超高速ビルド／HMR・静的ファイル出力|
|TypeScript 5|型付け JavaScript で安全・安定|
|Pug|簡潔に書ける HTML テンプレートエンジン|
|Sass (dart‑sass)|ネスト・変数・ミックスインなど強力なプリプロセッサ|
|destyle.css|ブラウザ標準スタイルを徹底的にリセット|

---

## 🛠️ スクリプト一覧

|コマンド|説明|
|:----|:----|
|pnpm dev|開発サーバーを起動|
|pnpm build|tsc で型チェック → vite build で /dist に本番ビルド|
|pnpm preview|本番ビルドをローカルサーバーで確認（デプロイ前の最終チェック）|

---

## 🗂️ 推奨ディレクトリ構成

```
src
 ├─ assets/          # 画像・フォントなど
 ├─ styles/          # 共通 SCSS, 変数, mixin
 ├─ components/      # 再利用 Pug パーシャル／TS コンポーネント
 ├─ pages/           # 画面単位の Pug テンプレート
 ├─ main.ts          # エントリーポイント
 └─ index.pug        # ルートテンプレート
/vite.config.ts
/tsconfig.json
/package.json
```

もちろんプロジェクトに合わせて自由に調整してください。

## ⚙️ ワークフロー概要

- Vite が `.pug` / `.scss` / `.ts` の変更を監視
- pug‑plain‑loader が Pug → HTML に変換
- Sass が CSS にコンパイル。開発中は HMR、本番では抽出
- TypeScript が esbuild で瞬時にトランスパイル

---

## 📤 デプロイ方法

```bash
pnpm build
```

で生成される /dist フォルダをそのままアップロードするだけ。
Netlify / Vercel / Cloudflare Pages / S3 + CloudFront など、静的ホスティングなら何でも OK です。