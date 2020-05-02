import typescript from '@rollup/plugin-typescript'

import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.module, format: 'es', sourcemap: true },
      { file: pkg.main, format: 'umd', name: pkg.name, sourcemap: true },
    ],
    plugins: [typescript()],
  },
  {
    input: 'example/src/index.ts',
    output: [
      { file: 'example/dist/bundle.js', format: 'iife', sourcemap: true },
    ],
    plugins: [typescript()],
  },
]
