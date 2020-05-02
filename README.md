![build](https://github.com/gobeli/css-var-theme/workflows/build/badge.svg)

# css-var-theme

A small, dependency-free utility to enable efficient theming with css variables.

## Usage

A theme is basically a JS object following the `Theme` interface:

```ts
export interface Theme {
  meta?: object
  theme: object
}
```

It contains optional `meta` information (like a name) and the actual `theme` which can be any JS object.

Once a theme is defined the `css-var-theme` utility can be initialized with it:

```ts
import { theme } from 'css-var-theme'

const my_theme = {
  meta: {
    name: 'my theme',
  },
  theme: {
    color: {
      background: '#eee',
      text: '#333',
    },
  },
}

const theme_store = theme(my_theme)
```

During initialization a `<style>`-Tag is added to the head which will map this theme to the following css-variables:

```css
:root {
  --color-background: #eee;
  --color-text: #333;
}
```

with `theme_store.set(new_theme)` the current theme can be changed and `theme_store.subscribe(() => ...)` you can subscribe to updates on the theme.
