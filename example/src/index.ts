import { sun, moon } from './images'
import { useTheme, Theme } from '../../src/index'

interface MyTheme extends Theme {
  meta: {
    name: string
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
const $h1 = document.getElementById('title')

if ($change && $h1) {
  let current_theme = light_theme
  theme_store.subscribe((t) => {
    current_theme = t
    $h1.textContent = t.meta.name
    $change.innerHTML = t.meta.change_image
  })

  $change.addEventListener('click', () => {
    theme_store.set(
      current_theme.meta.name === light_theme.meta.name
        ? dark_theme
        : light_theme
    )
  })
}
