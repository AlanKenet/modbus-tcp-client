export type ValidAddress = number & { __brand: 'ValidAddress' }

export type ValidRange = [ValidAddress, ValidAddress]

export type ReadCoilsParams = { addresses: ValidAddress[], range?: never } | { range: ValidRange, addresses?: never }

export const isAddressValid = (n: number): n is ValidAddress =>
  Number.isInteger(n) && n >= 1 && n <= 10

export const isRangeValid = (arr: number[]): arr is ValidRange =>
  arr.length === 2 &&
    isAddressValid(arr[0]) &&
    isAddressValid(arr[1]) &&
    arr[0] <= arr[1]
