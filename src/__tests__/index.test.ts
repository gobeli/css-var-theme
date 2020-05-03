import { useTheme } from '../index'

interface MyTheme {
  theme: {
    colors: {
      bg: string
      accent: string
    }
    sizes: {
      spacing: string
      border: {
        width: string
        radius: string
      }
    }
  }
}

const initial_theme: MyTheme = {
  theme: {
    colors: {
      bg: '#eee',
      accent: 'blue',
    },
    sizes: {
      spacing: '8px',
      border: {
        width: '3px',
        radius: '6px',
      },
    },
  },
}

const dark_theme: MyTheme = {
  theme: {
    ...initial_theme.theme,
    colors: {
      bg: '#222',
      accent: 'blue',
    },
  },
}

beforeEach(() => {
  document.head.innerHTML = ''
})

it('should initialize theme', () => {
  // given
  const id = '1'

  // when
  useTheme({ initial: initial_theme, id })
  const $style = document.getElementById(id)

  // then
  expect($style?.innerHTML).toContain('--colors-bg: #eee;')
  expect($style?.innerHTML).toContain('--sizes-border-radius: 6px;')
})

it('should be able to switch the theme', () => {
  // given
  const id = '2'
  const theme_store = useTheme({ initial: initial_theme, id })

  // when
  theme_store.set(dark_theme)
  const $style = document.getElementById(id)

  // then
  expect($style?.innerHTML).toContain('--colors-bg: #222;')
  expect($style?.innerHTML).toContain('--sizes-border-radius: 6px;')
})

it('should use prefered mode', () => {
  // given
  const id = '3'
  window.matchMedia = jest.fn((query): any => ({
    matches: query === '(prefers-color-scheme: dark)',
  }))

  // when
  useTheme({ initial: initial_theme, dark: dark_theme, id })
  const $style = document.getElementById(id)

  // then
  expect($style?.innerHTML).toContain('--colors-bg: #222;')
  expect($style?.innerHTML).toContain('--sizes-border-radius: 6px;')
})
