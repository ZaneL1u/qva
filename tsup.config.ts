import { defineConfig } from 'tsup'
import { description, name, version } from './package.json'

export default defineConfig({
  globalName: 'qva',
  entry: {
    qva: 'src/index.ts',
  },
  outDir: 'build',
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  target: ['chrome69', 'safari11'],
  minify: true,
  platform: 'browser',
  treeshake: 'smallest',
  // 注入 CDN 的 banner
  banner: {
    js: `/**
  * ${name} v${version}
  * ${description}
  * (c) 2022-present, Zane Liu
  * @license MIT
  */`,
  },
  format: ['esm', 'iife'],
})
