import type { GameState } from '../../types/game'
import { GameRuleError } from './errors'
import {
  addLog,
  assertNotFinished,
  getCurrentPlayer,
} from './helpers'

/**
 * Encerra a janela de mercado sem comprar ou vender.
 * Desafios e eventos não podem ser ignorados.
 */
export function skipDecision(state: GameState): GameState {
  assertNotFinished(state)

  if (!state.pendingDecision) {
    throw new GameRuleError('Não há decisão pendente para encerrar.')
  }
  if (state.pendingDecision.type !== 'market') {
    throw new GameRuleError(
      'Somente decisões de mercado podem ser encerradas sem ação.',
    )
  }

  const player = getCurrentPlayer(state)
  let next: GameState = {
    ...state,
    phase: 'awaiting-end-turn',
    pendingDecision: null,
  }
  next = addLog(
    next,
    player.id,
    'market',
    `${player.name} encerrou a janela de negociação.`,
  )
  return next
}
