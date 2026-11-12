import type {
  GameResult,
  GameState,
  PlayerResult,
} from '../../types/game'
import { simulateMarketTick } from '../market/market'
import {
  calculateNetWorth,
  calculatePlayerScore,
} from '../scoring/scoring'
import { GameRuleError } from './errors'
import {
  addLog,
  assertNotFinished,
  assertPhase,
  getCurrentPlayer,
} from './helpers'

interface IndexedResult extends PlayerResult {
  order: number
}

function buildGameResult(state: GameState): GameResult {
  const indexed: IndexedResult[] = state.players.map((player, order) => ({
    playerId: player.id,
    name: player.name,
    netWorth: calculateNetWorth(state, player.id),
    knowledge: player.knowledge,
    security: player.security,
    reputation: player.reputation,
    score: calculatePlayerScore(state, player.id),
    rank: 0,
    order,
  }))

  indexed.sort(
    (a, b) =>
      b.score - a.score ||
      b.netWorth - a.netWorth ||
      b.knowledge - a.knowledge ||
      b.security - a.security ||
      b.reputation - a.reputation ||
      a.order - b.order,
  )

  const players: PlayerResult[] = indexed.map((entry, index) => ({
    playerId: entry.playerId,
    name: entry.name,
    netWorth: entry.netWorth,
    knowledge: entry.knowledge,
    security: entry.security,
    reputation: entry.reputation,
    score: entry.score,
    rank: index + 1,
  }))

  const winner = players[0]
  if (!winner) {
    throw new GameRuleError('Não há jogadores para calcular o vencedor.')
  }

  return {
    winnerId: winner.playerId,
    winnerName: winner.name,
    roundsPlayed: state.rules.maxRounds,
    players,
  }
}

/**
 * Retorna o resultado final apenas quando a temporada terminou.
 * Durante as rodadas regulares retorna `null`.
 */
export function checkVictory(state: GameState): GameResult | null {
  if (state.result) return state.result
  if (state.round <= state.rules.maxRounds) return null
  return buildGameResult(state)
}

/**
 * Encerra o turno, atualiza o mercado e avança jogador/rodada.
 * A partida termina depois do último turno da última rodada.
 */
export function endTurn(
  state: GameState,
  random: () => number = Math.random,
): GameState {
  assertNotFinished(state)

  if (state.pendingDecision) {
    throw new GameRuleError(
      'Não é possível encerrar o turno com uma decisão pendente.',
    )
  }
  assertPhase(state, 'awaiting-end-turn')

  const player = getCurrentPlayer(state)
  const isLastPlayer =
    state.currentPlayerIndex >= state.players.length - 1

  let next: GameState = {
    ...state,
    market: simulateMarketTick(state.market, random, state.round),
    pendingDecision: null,
    lastRoll: null,
  }
  next = addLog(
    next,
    player.id,
    'turn',
    `${player.name} encerrou o turno.`,
  )

  if (isLastPlayer && state.round >= state.rules.maxRounds) {
    next = {
      ...next,
      round: state.round + 1,
      phase: 'finished',
    }
    const result = checkVictory(next)
    if (!result) {
      throw new GameRuleError('Falha ao calcular o resultado final.')
    }
    next = { ...next, result }
    next = addLog(
      next,
      undefined,
      'score',
      `Partida encerrada. Vencedor: ${result.winnerName} com ${result.players[0]?.score ?? 0} pontos.`,
    )
    return next
  }

  if (isLastPlayer) {
    next = {
      ...next,
      round: state.round + 1,
      currentPlayerIndex: 0,
      phase: 'awaiting-roll',
    }
    next = addLog(
      next,
      undefined,
      'turn',
      `Rodada ${next.round} iniciada.`,
    )
    return next
  }

  return {
    ...next,
    currentPlayerIndex: state.currentPlayerIndex + 1,
    phase: 'awaiting-roll',
  }
}

export { buildGameResult }
