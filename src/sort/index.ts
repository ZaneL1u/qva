type SortOrder = 'asc' | 'desc'
type Comparator<T> = (a: T, b: T) => number
type RecordType = Record<string, string | number>

export function timSort(arr: number[], order?: SortOrder): number[]
export function timSort<T>(arr: T[], comparator: Comparator<T>): T[]
export function timSort(arr: Array<RecordType>, key: keyof RecordType, order?: SortOrder): Array<RecordType>

export function timSort<T>(
  arr: number[] | T[] | Array<RecordType>,
  arg2?: SortOrder | Comparator<T> | keyof RecordType,
  arg3?: SortOrder,
): any[] {
  const a = [...arr]
  let compare: Comparator<any>

  // Handle custom comparator function
  if (typeof arg2 === 'function') {
    compare = arg2
  }
  // Handle object array sorting by key
  else if (typeof arg2 === 'string' && arg3 !== undefined || arg2 === undefined && isRecordArray(a)) {
    const key = (arg2 ?? (a[0] && Object.keys(a[0] as any)[0])) as keyof RecordType
    const order = arg3 ?? 'asc'
    compare = (x: any, y: any) => {
      const av = x[key]
      const bv = y[key]
      if (av === undefined)
        return 1
      if (bv === undefined)
        return -1
      if (typeof av !== typeof bv)
        return typeof av === 'number' ? -1 : 1
      if (typeof av === 'number')
        return order === 'asc' ? av - bv : bv - av
      return order === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av))
    }
  }
  // Handle number array sorting
  else {
    const order = (arg2 as SortOrder) ?? 'asc'
    compare = (x: number, y: number) => order === 'asc' ? x - y : y - x
  }

  timsortCore(a, compare)
  return a
}

/**
 * Core Timsort algorithm implementation
 * - Detects natural runs in data
 * - Uses binary insertion sort for small runs
 * - Merges runs with galloping mode for efficiency
 */
function timsortCore<T>(arr: T[], cmp: Comparator<T>): void {
  const n = arr.length
  if (n <= 1)
    return

  // Calculate minrun (between 32 and 64)
  let minrun = n
  while (minrun >= 64) minrun = (minrun >>> 1) + (minrun & 1)
  minrun = Math.max(32, Math.min(64, minrun))

  const stack: { start: number, len: number }[] = []

  const pushRun = (start: number, len: number) => stack.push({ start, len })
  const mergeAt = (i: number) => {
    const A = stack[i]; const B = stack[i + 1]
    merge(arr, A.start, A.start + A.len, B.start + B.len, cmp)
    stack.splice(i, 2, { start: A.start, len: A.len + B.len })
  }

  // Detect natural runs in the data
  for (let i = 0; i < n;) {
    let j = i + 1
    if (j === n) { pushRun(i, 1); break }

    const desc = cmp(arr[i], arr[j]) > 0
    while (j < n) {
      const c = cmp(arr[j - 1], arr[j])
      if (desc ? c > 0 : c < 0)
        break
      j++
    }
    if (desc)
      reverse(arr, i, j - 1)

    // Extend run to minrun using binary insertion sort
    while (j - i < minrun && j < n) {
      binaryInsert(arr, i, j, arr[j], cmp)
      j++
    }

    pushRun(i, j - i)
    i = j
  }

  // Merge runs while maintaining invariants: X > Y+Z and Y > Z
  while (stack.length > 1) {
    const len = stack.length
    if (len > 2 && stack[len - 3].len <= stack[len - 2].len + stack[len - 1].len) {
      mergeAt(len - 3)
    }
    else if (stack[len - 2].len <= stack[len - 1].len) {
      mergeAt(len - 2)
    }
    else {
      break
    }
  }
  while (stack.length > 1) mergeAt(stack.length - 2)
}

/**
 * Merge two adjacent sorted runs with galloping mode optimization
 */
function merge<T>(arr: T[], lo: number, mi: number, hi: number, cmp: Comparator<T>): void {
  const tmp = arr.slice(lo, hi)
  let i = 0; let j = mi - lo; let k = lo

  while (i < mi - lo && j < hi - lo) {
    if (gallop(tmp, j, tmp[i], mi - lo, hi - lo, cmp)) {
      while (i < mi - lo) arr[k++] = tmp[i++]
    }
    else if (gallop(tmp, i, tmp[j], 0, mi - lo, (a, b) => -cmp(a, b))) {
      while (j < hi - lo) arr[k++] = tmp[j++]
    }
    else {
      arr[k++] = cmp(tmp[i], tmp[j]) <= 0 ? tmp[i++] : tmp[j++]
    }
  }
  while (i < mi - lo) arr[k++] = tmp[i++]
  while (j < hi - lo) arr[k++] = tmp[j++]
}

/**
 * Galloping mode: exponential search followed by binary search
 * Activated when 7+ consecutive elements come from the same run
 */
function gallop<T>(src: T[], base: number, key: T, lo: number, hi: number, cmp: Comparator<T>): boolean {
  let step = 1; let last = 0
  if (cmp(src[base], key) > 0)
    return true
  while (step < hi - base && cmp(src[base + step], key) <= 0) {
    last = step; step = (step << 1) | 1
  }
  step = Math.min(step, hi - base)
  lo = base + last; hi = base + step
  while (lo < hi) {
    const mid = (lo + hi) >>> 1
    if (cmp(src[mid], key) <= 0)
      lo = mid + 1
    else hi = mid
  }
  return lo - base >= 7
}

/**
 * Insert element using binary search to find position
 */
function binaryInsert<T>(arr: T[], lo: number, hi: number, val: T, cmp: Comparator<T>): void {
  let l = lo; let r = hi
  while (l < r) {
    const m = (l + r) >>> 1
    if (cmp(arr[m], val) > 0)
      r = m
    else l = m + 1
  }
  for (let i = hi; i > l; i--) arr[i] = arr[i - 1]
  arr[l] = val
}

function reverse<T>(arr: T[], lo: number, hi: number): void {
  while (lo < hi) [arr[lo++], arr[hi--]] = [arr[hi], arr[lo]]
}

function isRecordArray(arr: any[]): arr is Array<RecordType> {
  return arr.length > 0 && typeof arr[0] === 'object' && arr[0] !== null
}
