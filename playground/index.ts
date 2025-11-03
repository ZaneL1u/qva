import { describe, expect, it } from 'vitest'
import { timSort } from '../src/sort'

describe('timSort', () => {
  it('should sort numbers in ascending order', () => {
    const arr = [3, 1, 2]
    const sortedArr = timSort(arr)
    expect(sortedArr).toEqual([1, 2, 3])
  })
})
