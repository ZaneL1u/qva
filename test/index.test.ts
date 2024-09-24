import { describe, expect, it } from 'vitest'
import { timSort } from '../src'

describe('timSort', () => {
  it('should sort numbers in ascending order', () => {
    const arr = [3, 1, 2]
    const sortedArr = timSort(arr)

    // eslint-disable-next-line no-console
    console.log('sortedArr', sortedArr)

    expect(sortedArr).toEqual([1, 2, 3])
  })

  // 测试对象的排序
  it('should sort objects by key in ascending order', () => {
    const arr = [
      { name: 'Zane', age: 18 },
      { name: 'Alice', age: 20 },
      { name: 'Bob', age: 18 },
    ]

    const sortedArr = timSort(arr, 'age')

    expect(sortedArr).toEqual([
      { name: 'Zane', age: 18 },
      { name: 'Alice', age: 20 },
      { name: 'Bob', age: 18 },
    ])
  })
})
