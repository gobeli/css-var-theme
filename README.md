# css-var-theme

![build](https://github.com/gobeli/css-var-theme/workflows/build/badge.svg)

A small, dependency-free utility to enable efficient theming with css variables.

[Repo](https://github.com/gobeli/css-var-theme) /
[Demo](https://gobeli.github.io/css-var-theme/)

## Usage

A theme is basically a JS object implementing the `Theme` interface:

```ts
export interface Theme {
  meta?: object
  theme: object
}
```

It contains optional `meta` information (like a name) and the actual `theme` which can be any JS object.

Once a theme is defined the `css-var-theme` utility can be initialized with it:

```ts
import { useTheme } from 'css-var-theme'

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

const theme_store = useTheme({ initial: my_theme })
```

During initialization a `<style>`-Tag is added to the head which will map this theme to the following css-variables:

```css
:root {
  --color-background: #eee;
  --color-text: #333;
}
```

with `theme_store.set(new_theme)` the current theme can be changed and `theme_store.subscribe(() => ...)` you can subscribe to updates on the theme.

## API

The `useTheme` function consumes an object implementing the `ThemingOptions` interface:

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>initial</code></td>
      <td><code>Theme</code></td>
      <td>Initial theme to be used.</td>
    </tr>
    <tr>
      <td><code>dark?</code></td>
      <td><code>Theme</code></td>
      <td>
        Optional, overrides the initial theme if user prefers darkmode.
      </td>
    </tr>
    <tr>
      <td><code>light?</code></td>
      <td><code>Theme</code></td>
      <td>
        Optional, overrides the initial theme if user prefers lightmode.
      </td>
    </tr>
    <tr>
      <td><code>id?</code></td>
      <td><code>string</code></td>
      <td>
        Optional, id of the style element used to set the css variables.
        Will be generated if not set.
      </td>
    </tr>
  </tbody>
</table>
