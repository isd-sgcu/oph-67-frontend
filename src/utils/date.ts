import { format, isValid } from 'date-fns'

export function formatDateSafe(
  value: Date | string | number | null | undefined,
  formatStr = 'dd/MM/yyyy'
): string {
  if (!value) return ''

  const date = new Date(value)
  return isValid(date) ? format(date, formatStr) : ''
}
