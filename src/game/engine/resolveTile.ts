import type {
  BoardTile,
  GameEvent,
  GameState,
  PendingDecision,
  StatDelta,
} from '../../types/game'
import { pickChallenge } from '../challenges/challenges'
import { GameRuleError } from './errors'
import {
  addLog,
  applyStatDelta,
  assertNotFinished,
  getCurrentPlayer,
  replacePlayer,
  roundMoney,
} from './helpers'

function pickEvent(
  events: GameEvent[],
  random: () => number,
): GameEvent {
  if (events.length === 0) {
    throw new GameRuleError('Nenhum evento disponível no catálogo.')
  }
  const index = Math.min(
    events.length - 1,
    Math.floor(random() * events.length),
  )
  return events[index]
}

function resolveChallengeTile(
  state: GameState,
  tile: BoardTile,
  random: () => number,
): GameState {
  if (!tile.challengeCategory) {
    throw new GameRuleError(`A casa ${tile.id} não define uma categoria de desafio.`)
  }

  const challenge = pickChallenge(tile.challengeCategory, random)
  const pendingDecision: PendingDecision = {
    type: 'challenge',
    challengeId: challenge.id,
  }

  let next: GameState = {
    ...state,
    phase: 'awaiting-decision',
    pendingDecision,
  }
  next = addLog(
    next,
    getCurrentPlayer(state).id,
    'challenge',
    `Desafio sorteado na casa "${tile.name}": ${challenge.id}.`,
  )
  return next
}

/**
 * Resolve a casa onde o jogador atual parou.
 * Casas de mercado, desafio e evento abrem uma decisão pendente.
 * Casas de taxa e oportunidade são aplicadas imediatamente.
 */
export function resolveTile(
  state: GameState,
  random: () => number = Math.random,
): GameState {
  assertNotFinished(state)

  if (state.phase !== 'awaiting-end-turn') {
    throw new GameRuleError(
      'A casa só pode ser resolvida após a movimentação do jogador.',
    )
  }
  if (state.pendingDecision) {
    throw new GameRuleError('Já existe uma decisão pendente.')
  }

  const player = getCurrentPlayer(state)
  const tile = state.board[player.position]
  if (!tile) {
    throw new GameRuleError('A posição do jogador não corresponde a uma casa.')
  }

  switch (tile.category) {
    case 'MARKET': {
      const pendingDecision: PendingDecision = tile.assetId
        ? { type: 'market', featuredAssetId: tile.assetId }
        : { type: 'market' }
      let next: GameState = {
        ...state,
        phase: 'awaiting-decision',
        pendingDecision,
      }
      next = addLog(
        next,
        player.id,
        'market',
        `${player.name} chegou ao mercado "${tile.name}".`,
      )
      return next
    }

    case 'VALIDATION':
    case 'SECURITY':
    case 'KNOWLEDGE':
      return resolveChallengeTile(state, tile, random)

    case 'EVENT': {
      const event = pickEvent(state.events, random)
      let next: GameState = {
        ...state,
        phase: 'awaiting-decision',
        pendingDecision: { type: 'event', eventId: event.id },
      }
      next = addLog(
        next,
        player.id,
        'event',
        `Evento sorteado na casa "${tile.name}": ${event.title}.`,
      )
      return next
    }

    case 'NETWORK_FEE': {
      const fee = roundMoney(tile.fee ?? 0)
      const paid = roundMoney(Math.min(fee, player.portfolio.cash))
      const updatedPlayer = {
        ...player,
        portfolio: {
          ...player.portfolio,
          cash: roundMoney(player.portfolio.cash - paid),
        },
      }
      let next = replacePlayer(state, updatedPlayer)
      next = addLog(
        next,
        player.id,
        'fee',
        paid < fee
          ? `${player.name} pagou ${paid} de taxa de rede (saldo insuficiente para a taxa de ${fee}).`
          : `${player.name} pagou ${paid} de taxa de rede.`,
        paid,
      )
      return next
    }

    case 'OPPORTUNITY': {
      const delta: StatDelta = { ...(tile.opportunity ?? {}) }
      const updatedPlayer = applyStatDelta(player, delta)
      let next = replacePlayer(state, updatedPlayer)
      next = addLog(
        next,
        player.id,
        'opportunity',
        `${player.name} aproveitou "${tile.name}".`,
        delta.cash,
      )
      return next
    }

    default: {
      const category: never = tile.category
      throw new GameRuleError(`Categoria de casa não suportada: ${category}.`)
    }
  }
}
