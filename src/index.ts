import { store, Store } from './store'
import { genId, getKeyValue } from './util'

interface Theme {
  meta?: object
  theme: object
}

function genTheme(new_theme: Theme, prefix = '-'): string {
  const get = getKeyValue(new_theme)
  return Object.keys(new_theme)
    .map((key: string) =>
      typeof get(key) === 'object'
        ? genTheme(get(key), `${prefix}-${key}`)
        : `${prefix}-${key}: ${get(key)};`
    )
    .join('\n')
}

function applyTheme($style: HTMLStyleElement, new_theme: object) {
  $style.textContent = `:root {
    ${genTheme(new_theme)}
  }`
}

export function theme<T extends Theme>(
  initial_theme: T,
  id?: string
): Store<T> {
  const themeStore = store(initial_theme)
  const $style = document.createElement('style')
  $style.id = id || genId()
  document.head.appendChild($style)

  themeStore.subscribe((t) => {
    applyTheme($style, t.theme)
  })

  return themeStore
}
