import { sun, moon } from './images'
import { useTheme, Theme } from '../../src/index'

interface MyTheme extends Theme {
  meta: {
    name: string
    hjs_theme: string
    change_image: string
  }
  theme: {
    color: {
      bg: string
      font: string
    }
  }
}

const light_theme: MyTheme = {
  meta: {
    name: 'light theme',
    hjs_theme: 'github',
    change_image: moon,
  },
  theme: {
    color: {
      bg: '#e7e7e7',
      font: '#2d2d2d',
    },
  },
}

const dark_theme: MyTheme = {
  meta: {
    name: 'dark theme',
    hjs_theme: 'monokai-sublime',
    change_image: sun,
  },
  theme: {
    color: {
      bg: '#2d2d2d',
      font: '#e7e7e7',
    },
  },
}
const theme_store = useTheme({
  initial: light_theme,
  dark: dark_theme,
  light: light_theme,
})

const $change = document.getElementById('change')
const $highlightjs = document.getElementById('highlightjs')

if ($change && $highlightjs) {
  let current_theme = light_theme
  theme_store.subscribe((t) => {
    current_theme = t
    $change.innerHTML = t.meta.change_image
    $highlightjs.setAttribute(
      'href',
      `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.1/styles/${t.meta.hjs_theme}.min.css`
    )
  })

  $change.addEventListener('click', () => {
    theme_store.set(
      current_theme.meta.name === light_theme.meta.name
        ? dark_theme
        : light_theme
    )
  })
}
