import { sum } from '@root/misc/basics'

describe('Sum function', () => {
  it('should add two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
