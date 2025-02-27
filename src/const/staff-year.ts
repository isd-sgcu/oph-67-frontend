export const year = ['one', 'two', 'three', 'four'] as const

export const yearMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
}

export type StaffYear = (typeof year)[number]
