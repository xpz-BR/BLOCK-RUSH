import type { Asset, AssetId } from './asset'
import type { ChallengeCategory } from './challenge'

export type GamePhase =
  | 'awaiting-roll'
  | 'awaiting-decision'
  | 'awaiting-end-turn'
  | 'finished'

export type TileCategory =
  | 'MARKET'
  | 'VALIDATION'
  | 'SECURITY'
  | 'EVENT'
  | 'KNOWLEDGE'
  | 'OPPORTUNITY'
  | 'NETWORK_FEE'

export type EventCategory =
  | 'market'
  | 'security'
  | 'technology'
  | 'regulation'

export type LogType =
  | 'game'
  | 'roll'
  | 'move'
  | 'market'
  | 'transaction'
  | 'challenge'
  | 'event'
  | 'fee'
  | 'opportunity'
  | 'turn'
  | 'score'

export type TransactionKind = 'buy' | 'sell'

export interface Holding {
  assetId: AssetId
  symbol: string
  quantity: number
  averageBuyPrice: number
}

export interface Portfolio {
  cash: number
  holdings: Holding[]
}

export interface GameLog {
  id: string
  round: number
  playerId?: string
  type: LogType
  message: string
  amount?: number
}

export interface Player {
  id: string
  name: string
  color: string
  position: number
  portfolio: Portfolio
  knowledge: number
  security: number
  reputation: number
  history: GameLog[]
}

export interface PricePoint {
  round: number
  prices: Record<AssetId, number>
}

export interface MarketState {
  assets: Asset[]
  prices: Record<AssetId, number>
  previousPrices: Record<AssetId, number>
  history: PricePoint[]
}

export interface StatDelta {
  cash?: number
  knowledge?: number
  security?: number
  reputation?: number
}

export interface BoardTile {
  id: string
  index: number
  name: string
  description: string
  category: TileCategory
  /** Ativo em destaque quando a casa é de mercado. */
  assetId?: AssetId
  /** Categoria de desafio sorteada pelas casas de conhecimento/validação/segurança. */
  challengeCategory?: ChallengeCategory
  /** Taxa fixa cobrada pelas casas de taxa de rede. */
  fee?: number
  /** Efeito imediato das casas de oportunidade. */
  opportunity?: StatDelta
}

export interface EventPriceChange {
  assetId: AssetId
  /** Variação percentual: -0.25 = queda de 25%; 0.15 = alta de 15%. */
  changePercent: number
}

export interface EventEffect {
  cash?: number
  knowledge?: number
  security?: number
  reputation?: number
  priceChanges?: EventPriceChange[]
}

export interface GameEvent {
  id: string
  title: string
  description: string
  category: EventCategory
  effects: EventEffect
}

export interface Transaction {
  id: string
  round: number
  playerId: string
  assetId: AssetId
  symbol: string
  kind: TransactionKind
  quantity: number
  unitPrice: number
  gross: number
  fee: number
  /** Valor efetivamente debitado (compra) ou creditado (venda). */
  net: number
}

export type PendingDecision =
  | { type: 'challenge'; challengeId: string }
  | { type: 'event'; eventId: string }
  | { type: 'market'; featuredAssetId?: AssetId }

export interface GameRules {
  maxRounds: number
  startingCash: number
  transactionFeeRate: number
}

export interface PlayerSetup {
  name: string
  color?: string
}

export interface PlayerResult {
  playerId: string
  name: string
  netWorth: number
  knowledge: number
  security: number
  reputation: number
  score: number
  rank: number
}

export interface GameResult {
  winnerId: string
  winnerName: string
  roundsPlayed: number
  players: PlayerResult[]
}

export interface GameState {
  id: string
  players: Player[]
  currentPlayerIndex: number
  round: number
  rules: GameRules
  phase: GamePhase
  market: MarketState
  board: BoardTile[]
  events: GameEvent[]
  logs: GameLog[]
  transactions: Transaction[]
  pendingDecision: PendingDecision | null
  result: GameResult | null
  lastRoll: number | null
  nextLogId: number
}
