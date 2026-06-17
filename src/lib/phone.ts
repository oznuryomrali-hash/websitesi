export function normalizePhoneForWa(raw: string): string {
  let n = (raw || '').replace(/\D/g, '')
  if (n.startsWith('0')) n = n.slice(1)
  if (n.startsWith('90')) n = n.slice(2)
  return '90' + n
}
