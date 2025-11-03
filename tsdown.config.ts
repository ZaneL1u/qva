import { defineConfig } from 'tsdown'
import { description, name, version } from './package.json'

export default defineConfig([
  {
    entry: 'src/index.ts',
    outputOptions: {
      name: 'Qva',
      globals: {
        fflate: 'fflate',
      },
    },
    sourcemap: true,
    target: ['chrome69', 'safari11'],
    platform: 'browser',
    banner: {
      js: `/**
  * ${name} v${version}
  * ${description}
  * (c) 2022-present, Zane Liu
  * @license MIT
  */`,
    },
    format: 'umd',
    minify: true,
    dts: false,
  },
  {
    entry: 'src/index.ts',
    exports: {
      devExports: true,
    },
    sourcemap: true,
    platform: 'neutral',
    banner: {
      js: `/**
  * ${name} v${version}
  * ${description}
  * (c) 2022-present, Zane Liu
  * @license MIT
  */`,
    },
    format: 'esm',
    dts: true,
  },
])
