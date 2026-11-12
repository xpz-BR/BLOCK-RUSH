/**
 * Identificadores fixos dos ativos disponíveis no jogo.
 * Manter o union fechado evita que o mercado aceite ativos inexistentes.
 */
export type AssetId = 'btc' | 'eth' | 'aqua' | 'coral'

export type AssetType = 'crypto' | 'token'

export interface Asset {
  id: AssetId
  name: string
  symbol: string
  description: string
  color: string
  initialPrice: number
  type: AssetType
  /** Volatilidade entre 0 e 1. Quanto maior, mais intensas são as variações. */
  volatility: number
}
