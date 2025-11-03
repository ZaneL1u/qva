# Qva 🧐

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/qva?color=yellow)](https://npmjs.com/package/qva)
[![npm downloads](https://img.shields.io/npm/dm/qva?color=yellow)](https://npm.chart.dev/qva)

<!-- /automd -->

A fast and efficient JavaScript utility library for modern applications.

[简体中文](./README.zh-CN.md) | English

## ✨ Features

- 🚀 **High Performance** - Optimized algorithms for maximum efficiency
- 📦 **Tree-shakeable** - Only bundle what you use
- 🔧 **TypeScript First** - Full TypeScript support with type definitions
- 🌐 **Universal** - Works in Node.js, browsers, and edge runtimes
- 🧪 **Well Tested** - Comprehensive test coverage

## 📚 Functions

### Sorting

- **`timSort`** - An efficient sorting algorithm that combines merge sort and insertion sort
  - Sort number arrays in ascending/descending order
  - Sort arrays with custom comparator functions
  - Sort object arrays by specific keys

### String Compression

- **`compressToBase64`** - Compress a string and encode it as a URL-safe base64 string
  - Uses high-level compression (level 9)
  - URL-safe encoding for easy sharing
  - Perfect for compressing large text data
- **`decompressFromBase64`** - Decompress a base64-encoded compressed string back to the original
  - Automatic padding restoration
  - Error handling for invalid input

## 📦 Installation

Install package:

<!-- automd:pm-install -->

```sh
# ✨ Auto-detect
npx nypm install qva

# npm
npm install qva

# yarn
yarn add qva

# pnpm
pnpm add qva

# bun
bun install qva

# deno
deno install npm:qva
```

<!-- /automd -->

## 🚀 Usage

### Examples

#### Sort Number Arrays

```js
import { timSort } from 'qva'

// Sort in ascending order (default)
const numbers = [3, 1, 4, 1, 5, 9, 2, 6]
const sorted = timSort(numbers)
console.log(sorted) // [1, 1, 2, 3, 4, 5, 6, 9]

// Sort in descending order
const descending = timSort(numbers, 'desc')
console.log(descending) // [9, 6, 5, 4, 3, 2, 1, 1]
```

#### Sort with Custom Comparator

```js
import { timSort } from 'qva'

const items = ['apple', 'Banana', 'cherry', 'Date']

// Case-insensitive sorting
const sorted = timSort(items, (a, b) => {
  return a.toLowerCase().localeCompare(b.toLowerCase())
})
console.log(sorted) // ['apple', 'Banana', 'cherry', 'Date']
```

#### Sort Object Arrays

```js
import { timSort } from 'qva'

const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
]

// Sort by age in ascending order
const byAge = timSort(users, 'age', 'asc')
console.log(byAge)
// [
//   { name: 'Bob', age: 25 },
//   { name: 'Alice', age: 30 },
//   { name: 'Charlie', age: 35 }
// ]

// Sort by name in descending order
const byName = timSort(users, 'name', 'desc')
console.log(byName)
// [
//   { name: 'Charlie', age: 35 },
//   { name: 'Bob', age: 25 },
//   { name: 'Alice', age: 30 }
// ]
```

#### Compress and Decompress Strings

```js
import { compressToBase64, decompressFromBase64 } from 'qva'

// Compress a large text
const longText = 'This is a very long text that we want to compress...'
const compressed = compressToBase64(longText)
console.log('Compressed:', compressed)
console.log('Size reduction:', ((1 - compressed.length / longText.length) * 100).toFixed(2) + '%')

// Decompress back to original
const decompressed = decompressFromBase64(compressed)
console.log('Decompressed:', decompressed)
console.log('Match:', longText === decompressed) // true

// Perfect for URL parameters
const data = { user: 'Alice', settings: { theme: 'dark', lang: 'en' } }
const compressedData = compressToBase64(JSON.stringify(data))
const url = `https://example.com?data=${compressedData}`
```

## 📖 API Reference

### Sorting

### `timSort(arr, order?)`

Sort a number array.

**Parameters:**
- `arr`: `number[]` - The array to sort
- `order`: `'asc' | 'desc'` - Sort order (default: `'asc'`)

**Returns:** `number[]` - The sorted array

### `timSort(arr, comparator)`

Sort an array with a custom comparator function.

**Parameters:**
- `arr`: `T[]` - The array to sort
- `comparator`: `(a: T, b: T) => number` - Custom comparison function

**Returns:** `T[]` - The sorted array

### `timSort(arr, key, order?)`

Sort an object array by a specific key.

**Parameters:**
- `arr`: `Array<Record<string, string | number>>` - The array of objects to sort
- `key`: `string` - The key to sort by
- `order`: `'asc' | 'desc'` - Sort order (default: `'asc'`)

**Returns:** `Array<Record<string, string | number>>` - The sorted array

### String Compression

### `compressToBase64(str)`

Compress a string and encode it as a URL-safe base64 string.

**Parameters:**
- `str`: `string` - The string to compress

**Returns:** `string` - URL-safe base64 encoded compressed string

**Features:**
- High-level compression (level 9)
- URL-safe encoding (replaces `+` with `-`, `/` with `_`, removes `=` padding)
- Throws error if compression fails

### `decompressFromBase64(base64)`

Decompress a base64-encoded compressed string back to the original.

**Parameters:**
- `base64`: `string` - URL-safe base64 encoded compressed string

**Returns:** `string` - The original decompressed string

**Features:**
- Automatically restores URL-safe encoding to standard base64
- Restores padding if needed
- Throws error if decompression fails

## 🏗️ Development

<details>

<summary>Local Development</summary>

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`
- Build the project using `pnpm build`
- Run tests using `pnpm test`

</details>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

<!-- automd:contributors license=MIT -->

Published under the [MIT](https://github.com/ZaneL1u/qva/blob/main/LICENSE) license.
Made by [community](https://github.com/ZaneL1u/qva/graphs/contributors) 💛
<br><br>
<a href="https://github.com/ZaneL1u/qva/graphs/contributors">
<img src="https://contrib.rocks/image?repo=ZaneL1u/qva" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
