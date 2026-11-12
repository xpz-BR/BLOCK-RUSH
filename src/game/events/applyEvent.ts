import type { AssetId } from '../../types/asset'
import type { GameEvent, GameState, StatDelta } from '../../types/game'
import { GameRuleError } from '../engine/errors'
import {
  addLog,
  applyStatDelta,
  assertCurrentActor,
  assertNotFinished,
  describeDelta,
  getCurrentPlayer,
  replacePlayer,
  roundMoney,
} from '../engine/helpers'

export function getEvent(state: GameState, eventId: string): GameEvent {
  const event = state.events.find((item) => item.id === eventId)
  if (!event) {
    throw new GameRuleError(`Evento não encontrado: ${eventId}.`)
  }
  return event
}

function applyPriceChanges(
  state: GameState,
  event: GameEvent,
): GameState {
  const changes = event.effects.priceChanges ?? []
  if (changes.length === 0) return state

  const prices: Record<AssetId, number> = { ...state.market.prices }
  for (const change of changes) {
    prices[change.assetId] = roundMoney(
      Math.max(1, prices[change.assetId] * (1 + change.changePercent)),
    )
  }

  return {
    ...state,
    market: {
      ...state.market,
      previousPrices: { ...state.market.prices },
      prices,
      history: [
        ...state.market.history,
        { round: state.round, prices: { ...prices } },
      ],
    },
  }
}

/**
 * Aplica um evento ao jogador do turno e ao mercado.
 * Se houver um evento pendente, ele precisa ser exatamente o evento informado.
 */
export function applyEvent(
  state: GameState,
  eventId: string,
  playerId?: string,
): GameState {
  assertNotFinished(state)
  assertCurrentActor(state, playerId)

  const event = getEvent(state, eventId)

  if (state.pendingDecision) {
    if (state.pendingDecision.type !== 'event') {
      throw new GameRuleError(
        'Resolva a decisão pendente antes de aplicar um evento.',
      )
    }
    if (state.pendingDecision.eventId !== eventId) {
      throw new GameRuleError('O evento informado não é o evento pendente.')
    }
  }

  const player = getCurrentPlayer(state)
  const delta: StatDelta = {
    cash: event.effects.cash,
    knowledge: event.effects.knowledge,
    security: event.effects.security,
    reputation: event.effects.reputation,
  }
  const updatedPlayer = applyStatDelta(player, delta)

  let next = replacePlayer(state, updatedPlayer)
  next = applyPriceChanges(next, event)
  next = {
    ...next,
    phase: 'awaiting-end-turn',
    pendingDecision: null,
  }
  next = addLog(
    next,
    player.id,
    'event',
    `${event.title}: ${event.description} Efeitos: ${describeDelta(delta)}.`,
    delta.cash,
  )
  return next
}
