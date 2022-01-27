import { describe, expect, it } from 'vitest'
import { similarObject } from './similar-object'

describe('similarObject', () => {
  it('should calculate same score', () => {
    const score = similarObject({ a: 100 }, { a: 100 }, { a: 1 })
    expect(score).toBe(1)
  })

  it('should calculate less than original', () => {
    const score = similarObject({ a: 100 }, { a: 50 }, { a: 1 })
    expect(score).toBe(0.5)
  })

  it('should calculate larger than original', () => {
    const score = similarObject({ a: 100 }, { a: 200 }, { a: 1 })
    expect(score).toBe(0.5)
  })

  it('should calculate using weight', () => {
    const score = similarObject({ a: 100 }, { a: 100 }, { a: 2 })
    expect(score).toBe(2)
  })

  it('should add upp score for each field', () => {
    const score = similarObject({ a: 100, b: 2 }, { a: 100, b: 2 }, { a: 1, b: 1 })
    expect(score).toBe(2)
  })

  it('should add upp score for each field when using weights', () => {
    const score = similarObject({ a: 1, b: 1 }, { a: 1, b: 1 }, { a: 2, b: 3 })
    expect(score).toBe(5)
  })

  it('should support more complex scenario', () => {
    const score = similarObject(
      { price: 500_000, rooms: 5, area: 2_500 },
      { price: 650_000, rooms: 7, area: 4_000 },
      { price: 1, rooms: 5, area: 3 },
    )
    expect(score).toBe(6.215659340659341)
  })

  it('should support undefined values, will ignore that fields score', () => {
    const score = similarObject(
      { price: 500_000, rooms: 5, area: 2_500 },
      { price: 650_000, rooms: 7 },
      { price: 1, rooms: 1, area: 1 },
    )
    expect(score).toBe(1.4835164835164836)
  })
})
