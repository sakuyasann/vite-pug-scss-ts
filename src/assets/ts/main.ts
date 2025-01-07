// クエリパラメータを結合して生成
function combineQueryParams(name: string, values: string[]): string {
  return values.length > 0 ? `${name}=${values.join('|')}` : ''
}

// フォームのサブミットイベントを処理
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll(
    'form.js-search-form'
  ) as unknown as HTMLFormElement[]

  targets.forEach((target) => {
    target.addEventListener('submit', (event) => {
      // デフォルトの挙動を制御
      event.preventDefault()

      const queryParts: string[] = []

      // 処理済みのnameを管理
      const processedNames = new Set<string>()
      const formData = new FormData(target)

      Array.from(target.elements).forEach((elm) => {
        const input = elm as HTMLInputElement
        if (input.type === 'checkbox') {
          const name = input.name
          if (!processedNames.has(name)) {
            processedNames.add(name)
            const values = Array.from(
              target.querySelectorAll(`input[name="${name}"]:checked`)
            ).map((el) => (el as HTMLInputElement).value)
            // "|"で結合
            const combinedParam = combineQueryParams(name, values)
            if (combinedParam) queryParts.push(combinedParam)
          }
        } else {
          // チェックボックス以外の入力フィールド
          const value = formData.get(input.name)
          if (value) {
            queryParts.push(
              `${input.name}=${encodeURIComponent(value.toString())}`
            )
          }
        }
      })

      // 最終的なクエリ文字列を作成
      const queryString = queryParts.join('&')

      // 新しいURLにリダイレクト
      window.location.href = `?${queryString}`
    })
  })
})
