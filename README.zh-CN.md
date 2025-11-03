# Qva 🧐

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/qva?color=yellow)](https://npmjs.com/package/qva)
[![npm downloads](https://img.shields.io/npm/dm/qva?color=yellow)](https://npmjs.com/package/qva)

<!-- /automd -->

一个快速高效的 JavaScript 实用工具库，专为现代应用设计。

简体中文 | [English](./README.md)

## ✨ 特性

- 🚀 **高性能** - 优化的算法确保最高效率
- 📦 **可摇树优化** - 只打包你使用的部分
- 🔧 **TypeScript 优先** - 完整的 TypeScript 支持和类型定义
- 🌐 **通用性** - 适用于 Node.js、浏览器和边缘运行时
- 🧪 **良好测试** - 全面的测试覆盖

## 📚 功能

### 排序

- **`timSort`** - 一个结合了归并排序和插入排序的高效排序算法
  - 对数字数组进行升序/降序排序
  - 使用自定义比较函数对数组排序
  - 按特定键对对象数组排序

### 字符串压缩

- **`compressToBase64`** - 压缩字符串并编码为 URL 安全的 base64 字符串
  - 使用高级压缩（级别 9）
  - URL 安全编码，便于分享
  - 适合压缩大型文本数据
- **`decompressFromBase64`** - 将 base64 编码的压缩字符串解压为原始字符串
  - 自动恢复填充
  - 对无效输入进行错误处理

## 📦 安装

安装包：

<!-- automd:pm-install -->

```sh
# ✨ 自动检测
npx nypm install qva

# npm
npm install qva

# yarn
yarn add qva

# pnpm
pnpm install qva

# bun
bun install qva
```

<!-- /automd -->

## 🚀 使用

### 示例

#### 排序数字数组

```js
import { timSort } from 'qva'

// 升序排序（默认）
const numbers = [3, 1, 4, 1, 5, 9, 2, 6]
const sorted = timSort(numbers)
console.log(sorted) // [1, 1, 2, 3, 4, 5, 6, 9]

// 降序排序
const descending = timSort(numbers, 'desc')
console.log(descending) // [9, 6, 5, 4, 3, 2, 1, 1]
```

#### 使用自定义比较函数排序

```js
import { timSort } from 'qva'

const items = ['apple', 'Banana', 'cherry', 'Date']

// 不区分大小写排序
const sorted = timSort(items, (a, b) => {
  return a.toLowerCase().localeCompare(b.toLowerCase())
})
console.log(sorted) // ['apple', 'Banana', 'cherry', 'Date']
```

#### 排序对象数组

```js
import { timSort } from 'qva'

const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
]

// 按年龄升序排序
const byAge = timSort(users, 'age', 'asc')
console.log(byAge)
// [
//   { name: 'Bob', age: 25 },
//   { name: 'Alice', age: 30 },
//   { name: 'Charlie', age: 35 }
// ]

// 按名字降序排序
const byName = timSort(users, 'name', 'desc')
console.log(byName)
// [
//   { name: 'Charlie', age: 35 },
//   { name: 'Bob', age: 25 },
//   { name: 'Alice', age: 30 }
// ]
```

#### 压缩和解压字符串

```js
import { compressToBase64, decompressFromBase64 } from 'qva'

// 压缩大文本
const longText = '这是一段我们想要压缩的很长的文本...'
const compressed = compressToBase64(longText)
console.log('压缩后:', compressed)
console.log('减少大小:', `${((1 - compressed.length / longText.length) * 100).toFixed(2)}%`)

// 解压回原始内容
const decompressed = decompressFromBase64(compressed)
console.log('解压后:', decompressed)
console.log('匹配:', longText === decompressed) // true

// 适用于 URL 参数
const data = { user: 'Alice', settings: { theme: 'dark', lang: 'zh' } }
const compressedData = compressToBase64(JSON.stringify(data))
const url = `https://example.com?data=${compressedData}`
```

## 📖 API 参考

### 排序

### `timSort(arr, order?)`

对数字数组排序。

**参数：**
- `arr`: `number[]` - 要排序的数组
- `order`: `'asc' | 'desc'` - 排序顺序（默认：`'asc'`）

**返回：** `number[]` - 排序后的数组

### `timSort(arr, comparator)`

使用自定义比较函数对数组排序。

**参数：**
- `arr`: `T[]` - 要排序的数组
- `comparator`: `(a: T, b: T) => number` - 自定义比较函数

**返回：** `T[]` - 排序后的数组

### `timSort(arr, key, order?)`

按特定键对对象数组排序。

**参数：**
- `arr`: `Array<Record<string, string | number>>` - 要排序的对象数组
- `key`: `string` - 用于排序的键名
- `order`: `'asc' | 'desc'` - 排序顺序（默认：`'asc'`）

**返回：** `Array<Record<string, string | number>>` - 排序后的数组

### 字符串压缩

### `compressToBase64(str)`

压缩字符串并编码为 URL 安全的 base64 字符串。

**参数：**
- `str`: `string` - 要压缩的字符串

**返回：** `string` - URL 安全的 base64 编码压缩字符串

**特性：**
- 高级压缩（级别 9）
- URL 安全编码（将 `+` 替换为 `-`，`/` 替换为 `_`，移除 `=` 填充）
- 压缩失败时抛出错误

### `decompressFromBase64(base64)`

将 base64 编码的压缩字符串解压为原始字符串。

**参数：**
- `base64`: `string` - URL 安全的 base64 编码压缩字符串

**返回：** `string` - 原始解压字符串

**特性：**
- 自动将 URL 安全编码恢复为标准 base64
- 根据需要恢复填充
- 解压失败时抛出错误

## 🏗️ 开发

<details>

<summary>本地开发</summary>

- 克隆此仓库
- 安装最新的 LTS 版本 [Node.js](https://nodejs.org/en/)
- 使用 `corepack enable` 启用 [Corepack](https://github.com/nodejs/corepack)
- 使用 `pnpm install` 安装依赖
- 使用 `pnpm dev` 运行交互式测试
- 使用 `pnpm build` 构建项目
- 使用 `pnpm test` 运行测试

</details>

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 📄 许可证

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
