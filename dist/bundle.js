(function () {
  'use strict';

  const sun = `
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="5"></circle>
  <line x1="12" y1="1" x2="12" y2="3"></line>
  <line x1="12" y1="21" x2="12" y2="23"></line>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
  <line x1="1" y1="12" x2="3" y2="12"></line>
  <line x1="21" y1="12" x2="23" y2="12"></line>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
</svg>
`;
  const moon = `
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
</svg>`;

  function store(value) {
      const subscribers = [];
      function subscribe(fn) {
          subscribers.push(fn);
          fn(value);
          return () => {
              const index = subscribers.indexOf(fn);
              if (index !== -1) {
                  subscribers.splice(index, 1);
              }
          };
      }
      function set(new_value) {
          if (new_value !== value) {
              value = new_value;
              subscribers.forEach((subscriber) => {
                  subscriber(value);
              });
          }
      }
      return {
          set,
          subscribe,
      };
  }

  const getKeyValue = (obj) => (key) => obj[key];
  const genId = () => 'theme-' + Math.random().toString(36).substring(2, 12);
  const prefersDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const prefersLightMode = () => window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches;

  function genTheme(new_theme, prefix = '-') {
      const get = getKeyValue(new_theme);
      return Object.keys(new_theme)
          .map((key) => typeof get(key) === 'object'
          ? genTheme(get(key), `${prefix}-${key}`)
          : `${prefix}-${key}: ${get(key)};`)
          .join('\n');
  }
  function createStyleElement(id) {
      const $style = document.createElement('style');
      $style.id = id || genId();
      document.head.appendChild($style);
      return $style;
  }
  function useTheme({ initial, light, dark, id, }) {
      let used_theme = initial;
      if (prefersDarkMode() && dark) {
          used_theme = dark;
      }
      if (prefersLightMode() && light) {
          used_theme = light;
      }
      const theme_store = store(used_theme);
      const $style = createStyleElement(id);
      theme_store.subscribe((t) => {
          $style.textContent = `:root {
  ${genTheme(t.theme)}
}`;
      });
      return theme_store;
  }

  const light_theme = {
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
  };
  const dark_theme = {
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
  };
  const theme_store = useTheme({
      initial: light_theme,
      dark: dark_theme,
      light: light_theme,
  });
  const $change = document.getElementById('change');
  const $h1 = document.getElementById('title');
  if ($change && $h1) {
      let current_theme = light_theme;
      theme_store.subscribe((t) => {
          current_theme = t;
          $h1.textContent = t.meta.name;
          $change.innerHTML = t.meta.change_image;
      });
      $change.addEventListener('click', () => {
          theme_store.set(current_theme.meta.name === light_theme.meta.name
              ? dark_theme
              : light_theme);
      });
  }

}());
//# sourceMappingURL=bundle.js.map
