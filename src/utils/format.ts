const moneyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const compactNumberFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
})

const quantityFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 6,
})

export function formatMoney(value: number): string {
  return moneyFormatter.format(value)
}

export function formatNumber(value: number): string {
  return compactNumberFormatter.format(value)
}

export function formatQuantity(value: number): string {
  return quantityFormatter.format(value)
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${(value * 100).toFixed(1)}%`
}

export function formatMultiplier(value: number): string {
  return `${value.toFixed(1)}×`
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase()
}
