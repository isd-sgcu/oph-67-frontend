export function validatePhone(phone: string): boolean {
  const regex = /^0[689]\d{8}$/
  return regex.test(phone)
}
