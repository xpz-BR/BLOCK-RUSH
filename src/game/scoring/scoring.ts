import type { GameState, Player } from '../../types/game'
import { getPlayerById, roundMoney } from '../engine/helpers'
import { getPrice } from '../market/market'

/**
 * Fórmula oficial de pontuação (Fase 01):
 *
 *   pontuação = arredondar(
 *     patrimônioLíquido / 50
 *     + conhecimento * 2
 *     + segurança * 1,5
 *     + reputação * 2
 *   )
 *
 * O patrimônio é apenas um dos componentes. Um jogador com mais dinheiro
 * pode perder para outro com melhor equilíbrio entre conhecimento,
 * segurança e reputação. O divisor 50 foi escolhido para que o saldo
 * inicial de 10.000 valha 200 pontos, mantendo o componente financeiro
 * relevante sem dominar os atributos educativos.
 */
export const SCORE_CONFIG = {
  netWorthDivisor: 50,
  knowledgeWeight: 2,
  securityWeight: 1.5,
  reputationWeight: 2,
} as const

export function calculateNetWorth(
  state: GameState,
  playerId: string,
): number {
  const player = getPlayerById(state, playerId)
  return calculateNetWorthForPlayer(player, state)
}

export function calculateNetWorthForPlayer(
  player: Player,
  state: GameState,
): number {
  const holdingsValue = player.portfolio.holdings.reduce(
    (total, holding) =>
      total + holding.quantity * getPrice(state.market, holding.assetId),
    0,
  )
  return roundMoney(player.portfolio.cash + holdingsValue)
}

export function calculatePlayerScore(
  state: GameState,
  playerId: string,
): number {
  const player = getPlayerById(state, playerId)
  const netWorth = calculateNetWorthForPlayer(player, state)
  const rawScore =
    netWorth / SCORE_CONFIG.netWorthDivisor +
    player.knowledge * SCORE_CONFIG.knowledgeWeight +
    player.security * SCORE_CONFIG.securityWeight +
    player.reputation * SCORE_CONFIG.reputationWeight

  return Math.round(rawScore)
}
