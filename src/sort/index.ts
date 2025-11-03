type SortOrder = 'asc' | 'desc'
type Comparator<T> = (a: T, b: T) => number
type RecordType = Record<string, string | number>

// 函数重载签名
export function timSort(arr: number[], order?: SortOrder): number[]
export function timSort<T>(arr: T[], comparator: Comparator<T>): T[]
export function timSort(arr: Array<RecordType>, key: keyof RecordType, order?: SortOrder): Array<RecordType>

// 实现函数
export function timSort<T>(
  arr: number[] | T[] | Array<RecordType>,
  arg2?: SortOrder | Comparator<T> | keyof RecordType,
  arg3?: SortOrder,
): number[] | T[] | Array<RecordType> {
  const sortedArr: any[] = [...arr] // 复制数组，避免修改原数组

  if (typeof arg2 === 'function') {
    // 情况 2: 自定义比较函数
    customSort(sortedArr, arg2)
  }
  else if (typeof arg2 === 'string' && arg3 === undefined) {
    // 情况 1: 数字数组，升序或降序
    const order = arg2 ?? 'asc'
    const comparator = (a: number, b: number) => {
      return order === 'asc' ? a - b : b - a
    }
    defaultSort(sortedArr as number[], comparator)
  }
  else if (arg2 === undefined) {
    // 新增：处理没有提供排序顺序的情况
    const comparator = (a: number, b: number) => a - b
    defaultSort(sortedArr as number[], comparator)
  }
  else if (typeof arg2 === 'string' && arg3 !== undefined) {
    // 情况 3: 对象数组，按 key 排序
    const key = arg2 as keyof RecordType
    const order = arg3 ?? 'asc'
    const comparator = (a: RecordType, b: RecordType) => {
      const aValue = a[key]
      const bValue = b[key]

      // 处理 undefined 值
      if (aValue === undefined)
        return 1
      if (bValue === undefined)
        return -1

      // 如果是不同类型，数字在前，字符串在后
      if (typeof aValue !== typeof bValue) {
        return typeof aValue === 'number' ? -1 : 1
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      return 0 // 如果值相等，保持原有顺序
    }
    customSort(sortedArr as RecordType[], comparator)
  }

  return sortedArr // 返回排序结果
}

// 默认的比较函数
function defaultSort(arr: number[], compare: Comparator<number>): void {
  timSortCore(arr, compare)
}

// 自定义比较排序
function customSort<T>(arr: T[], compare: Comparator<T>): void {
  timSortCore(arr, compare)
}

// Timsort 核心算法
function timSortCore<T>(arr: T[], compare: Comparator<T>): void {
  const MIN_RUN = 32

  // 插入排序
  function insertionSort(arr: T[], left: number, right: number): void {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i]
      let j = i - 1
      while (j >= left && compare(arr[j], key) > 0) {
        arr[j + 1] = arr[j]
        j--
      }
      arr[j + 1] = key
    }
  }

  // 合并两个子数组
  function merge(arr: T[], left: number, mid: number, right: number): void {
    const leftArray = arr.slice(left, mid + 1)
    const rightArray = arr.slice(mid + 1, right + 1)

    let i = 0
    let j = 0
    let k = left

    while (i < leftArray.length && j < rightArray.length) {
      if (compare(leftArray[i], rightArray[j]) <= 0) {
        arr[k++] = leftArray[i++]
      }
      else {
        arr[k++] = rightArray[j++]
      }
    }

    while (i < leftArray.length) {
      arr[k++] = leftArray[i++]
    }

    while (j < rightArray.length) {
      arr[k++] = rightArray[j++]
    }
  }

  // Timsort 主逻辑
  const n = arr.length

  for (let start = 0; start < n; start += MIN_RUN) {
    const end = Math.min(start + MIN_RUN - 1, n - 1)
    insertionSort(arr, start, end)
  }

  for (let size = MIN_RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += size * 2) {
      const mid = left + size - 1
      const right = Math.min(left + 2 * size - 1, n - 1)
      if (mid < right) {
        merge(arr, left, mid, right)
      }
    }
  }
}
