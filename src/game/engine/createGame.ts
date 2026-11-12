import { BOARD_TILES } from '../board/tiles'
import { EVENTS } from '../events/events'
import {
  MAX_PLAYERS,
  MIN_PLAYERS,
  PLAYER_COLORS,
  STARTING_CASH,
  TOTAL_ROUNDS,
  TRANSACTION_FEE_RATE,
} from '../constants'
import { createMarket } from '../market/market'
import type {
  GameRules,
  GameState,
  Player,
  PlayerSetup,
} from '../../types/game'
import { GameRuleError } from './errors'
import { addLog, roundMoney } from './helpers'

export type GameSetup =
  | number
  | ReadonlyArray<string | PlayerSetup>

export interface CreateGameOptions {
  id?: string
  maxRounds?: number
  startingCash?: number
  transactionFeeRate?: number
}

function normalizeSetups(setup: GameSetup): PlayerSetup[] {
  if (typeof setup === 'number') {
    if (!Number.isInteger(setup) || setup < MIN_PLAYERS || setup > MAX_PLAYERS) {
      throw new GameRuleError(
        `A partida exige entre ${MIN_PLAYERS} e ${MAX_PLAYERS} jogadores.`,
      )
    }
    return Array.from({ length: setup }, (_, index) => ({
      name: `Jogador ${index + 1}`,
    }))
  }

  if (setup.length < MIN_PLAYERS || setup.length > MAX_PLAYERS) {
    throw new GameRuleError(
      `A partida exige entre ${MIN_PLAYERS} e ${MAX_PLAYERS} jogadores.`,
    )
  }

  return setup.map((item, index) => {
    const base = typeof item === 'string' ? { name: item } : { ...item }
    const name = base.name.trim()
    if (!name) {
      throw new GameRuleError('Todos os jogadores precisam de um nome.')
    }
    return { ...base, name: name || `Jogador ${index + 1}` }
  })
}

function createRules(options: CreateGameOptions): GameRules {
  const rules: GameRules = {
    maxRounds: options.maxRounds ?? TOTAL_ROUNDS,
    startingCash: options.startingCash ?? STARTING_CASH,
    transactionFeeRate:
      options.transactionFeeRate ?? TRANSACTION_FEE_RATE,
  }

  if (!Number.isInteger(rules.maxRounds) || rules.maxRounds < 1) {
    throw new GameRuleError('O número de rodadas deve ser um inteiro positivo.')
  }
  if (!Number.isFinite(rules.startingCash) || rules.startingCash < 0) {
    throw new GameRuleError('O saldo inicial deve ser um valor não negativo.')
  }
  if (
    !Number.isFinite(rules.transactionFeeRate) ||
    rules.transactionFeeRate < 0 ||
    rules.transactionFeeRate >= 1
  ) {
    throw new GameRuleError('A taxa de transação deve estar entre 0% e 100%.')
  }

  return {
    maxRounds: rules.maxRounds,
    startingCash: roundMoney(rules.startingCash),
    transactionFeeRate: rules.transactionFeeRate,
  }
}

function createPlayers(
  setups: PlayerSetup[],
  startingCash: number,
): Player[] {
  const seenNames = new Set<string>()

  return setups.map((setup, index) => {
    if (seenNames.has(setup.name.toLowerCase())) {
      throw new GameRuleError('Os nomes dos jogadores devem ser únicos.')
    }
    seenNames.add(setup.name.toLowerCase())

    return {
      id: `p${index + 1}`,
      name: setup.name,
      color: setup.color ?? PLAYER_COLORS[index % PLAYER_COLORS.length],
      position: 0,
      portfolio: {
        cash: roundMoney(startingCash),
        holdings: [],
      },
      knowledge: 0,
      security: 0,
      reputation: 0,
      history: [],
    }
  })
}

export function createGame(
  setup: GameSetup,
  options: CreateGameOptions = {},
): GameState {
  const setups = normalizeSetups(setup)
  const rules = createRules(options)
  const players = createPlayers(setups, rules.startingCash)

  const base: GameState = {
    id: options.id ?? 'game-1',
    players,
    currentPlayerIndex: 0,
    round: 1,
    rules,
    phase: 'awaiting-roll',
    market: createMarket(),
    board: BOARD_TILES.map((tile) => ({ ...tile })),
    events: EVENTS.map((event) => ({ ...event })),
    logs: [],
    transactions: [],
    pendingDecision: null,
    result: null,
    lastRoll: null,
    nextLogId: 1,
  }

  return addLog(
    base,
    undefined,
    'game',
    `Partida criada com ${players.length} jogadores e ${rules.maxRounds} rodadas.`,
  )
}
