import type { GameState } from '../../types/game'
import { GameRuleError } from './errors'
import {
  addLog,
  assertNotFinished,
  assertPhase,
  getCurrentPlayer,
  replacePlayer,
} from './helpers'

/**
 * Move o jogador atual no percurso circular.
 * A resolução da casa é feita separadamente por `resolveTile`.
 */
export function movePlayer(state: GameState, steps: number): GameState {
  assertNotFinished(state)
  assertPhase(state, 'awaiting-roll')

  if (!Number.isInteger(steps) || steps <= 0) {
    throw new GameRuleError('O avanço deve ser um inteiro positivo.')
  }
  if (state.board.length === 0) {
    throw new GameRuleError('O tabuleiro não possui casas.')
  }

  const player = getCurrentPlayer(state)
  if (player.position < 0 || player.position >= state.board.length) {
    throw new GameRuleError('Posição atual do jogador é inválida.')
  }

  const previousPosition = player.position
  const nextPosition = (previousPosition + steps) % state.board.length
  const updatedPlayer = { ...player, position: nextPosition }

  let next = replacePlayer(state, updatedPlayer)
  next = {
    ...next,
    phase: 'awaiting-end-turn',
    pendingDecision: null,
    lastRoll: steps,
  }
  next = addLog(
    next,
    player.id,
    'move',
    `${player.name} rolou ${steps} e avançou da casa ${previousPosition} para a casa ${nextPosition}.`,
  )
  return next
}
