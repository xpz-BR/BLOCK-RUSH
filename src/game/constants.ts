export const TOTAL_ROUNDS = 8

export const MIN_PLAYERS = 2
export const MAX_PLAYERS = 4

export const STARTING_CASH = 10_000
export const TRANSACTION_FEE_RATE = 0.015

export const DICE_MIN = 1
export const DICE_MAX = 6

export const PLAYER_COLORS = [
  '#AA3BFF',
  '#00BAFF',
  '#F7931A',
  '#2ECC71',
] as const

/** Taxa mínima de negociação para evitar valores residuais em centavos. */
export const MIN_TRANSACTION_FEE = 0.01

/** Quantidade máxima de casas decimais para frações de ativos. */
export const QUANTITY_DECIMALS = 8

/** Arredondamento monetário em centavos. */
export const MONEY_DECIMALS = 2
