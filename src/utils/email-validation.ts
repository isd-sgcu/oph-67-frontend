export function validateEmail(email: string): boolean {
  const regex =
    /^(?:[A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@(?:[A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i // src https://colinhacks.com/essays/reasonable-email-regex
  return regex.test(email)
}
