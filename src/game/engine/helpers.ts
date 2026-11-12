import {
  MONEY_DECIMALS,
  QUANTITY_DECIMALS,
} from '../constants'
import type {
  GameLog,
  GameState,
  LogType,
  Player,
  StatDelta,
} from '../../types/game'
import { GameRuleError } from './errors'

export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals
  const rounded = Math.round((value + Number.EPSILON) * factor) / factor
  return Object.is(rounded, -0) ? 0 : rounded
}

export function roundMoney(value: number): number {
  return roundTo(value, MONEY_DECIMALS)
}

export function roundQuantity(value: number): number {
  return roundTo(value, QUANTITY_DECIMALS)
}

export function getCurrentPlayer(state: GameState): Player {
  const player = state.players[state.currentPlayerIndex]
  if (!player) {
    throw new GameRuleError('Jogador atual inválido.')
  }
  return player
}

export function getPlayerById(state: GameState, playerId: string): Player {
  const player = state.players.find((item) => item.id === playerId)
  if (!player) {
    throw new GameRuleError(`Jogador não encontrado: ${playerId}.`)
  }
  return player
}

export function replacePlayer(state: GameState, player: Player): GameState {
  const players = state.players.map((item) =>
    item.id === player.id ? player : item,
  )
  return { ...state, players }
}

/**
 * Valida se a ação está sendo executada pelo jogador do turno.
 * Quando `playerId` não é informado, a ação é aplicada ao jogador atual.
 */
export function assertCurrentActor(
  state: GameState,
  playerId?: string,
): void {
  if (playerId && playerId !== getCurrentPlayer(state).id) {
    throw new GameRuleError('Ação permitida apenas para o jogador do turno.')
  }
}

export function assertNotFinished(state: GameState): void {
  if (state.phase === 'finished') {
    throw new GameRuleError('A partida já foi encerrada.')
  }
}

export function assertPhase(
  state: GameState,
  expected: GameState['phase'],
): void {
  if (state.phase !== expected) {
    throw new GameRuleError(
      `Ação inválida na fase "${state.phase}". Fase esperada: "${expected}".`,
    )
  }
}

/**
 * Negociação é permitida durante o turno do jogador, exceto quando existe
 * uma decisão pendente de desafio ou evento.
 */
export function assertTradingAllowed(state: GameState): void {
  assertNotFinished(state)
  if (
    state.pendingDecision &&
    state.pendingDecision.type !== 'market'
  ) {
    throw new GameRuleError(
      'Resolva a decisão pendente antes de negociar ativos.',
    )
  }
}

export function assertPositiveQuantity(quantity: number): number {
  const normalized = roundQuantity(quantity)
  if (!Number.isFinite(normalized) || normalized <= 0) {
    throw new GameRuleError('A quantidade deve ser maior que zero.')
  }
  return normalized
}

export function applyStatDelta(player: Player, delta: StatDelta): Player {
  const cash = Math.max(
    0,
    roundMoney(player.portfolio.cash + (delta.cash ?? 0)),
  )
  return {
    ...player,
    portfolio: { ...player.portfolio, cash },
    knowledge: Math.max(0, player.knowledge + (delta.knowledge ?? 0)),
    security: Math.max(0, player.security + (delta.security ?? 0)),
    reputation: Math.max(0, player.reputation + (delta.reputation ?? 0)),
  }
}

export function addLog(
  state: GameState,
  playerId: string | undefined,
  type: LogType,
  message: string,
  amount?: number,
): GameState {
  const id = `log-${state.nextLogId}`
  const log: GameLog = {
    id,
    round: state.round,
    type,
    message,
    ...(playerId ? { playerId } : {}),
    ...(amount !== undefined ? { amount: roundMoney(amount) } : {}),
  }

  const players = playerId
    ? state.players.map((player) =>
        player.id === playerId
          ? { ...player, history: [...player.history, log] }
          : player,
      )
    : state.players

  return {
    ...state,
    players,
    logs: [...state.logs, log],
    nextLogId: state.nextLogId + 1,
  }
}

export function describeDelta(delta: StatDelta): string {
  const parts: string[] = []
  if (delta.cash) parts.push(`${delta.cash > 0 ? '+' : ''}${delta.cash} de saldo`)
  if (delta.knowledge) {
    parts.push(`${delta.knowledge > 0 ? '+' : ''}${delta.knowledge} de Conhecimento`)
  }
  if (delta.security) {
    parts.push(`${delta.security > 0 ? '+' : ''}${delta.security} de Segurança`)
  }
  if (delta.reputation) {
    parts.push(`${delta.reputation > 0 ? '+' : ''}${delta.reputation} de Reputação`)
  }
  return parts.length > 0 ? parts.join(', ') : 'sem alterações'
}
