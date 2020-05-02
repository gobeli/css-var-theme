import { sun, moon } from './images'
import { theme } from '../../src/index'

interface MyTheme {
  name: string
  color: {
    bg: string
    font: string
  }
}

const light_theme: MyTheme = {
  name: 'light theme',
  color: {
    bg: '#eee',
    font: '#222',
  },
}

const dark_theme: MyTheme = {
  name: 'dark theme',
  color: {
    bg: '#222',
    font: '#eee',
  },
}
const theme_store = theme(light_theme)

const $change = document.getElementById('change')

if ($change) {
  let current_theme = light_theme
  theme_store.subscribe((t) => {
    current_theme = t
    $change.innerHTML = t.name === light_theme.name ? moon : sun
  })

  $change.addEventListener('click', () => {
    theme_store.set(
      current_theme.name === light_theme.name ? dark_theme : light_theme
    )
  })
}
