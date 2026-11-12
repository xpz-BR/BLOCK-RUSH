import { describe, expect, it } from 'vitest'
import type { GameState, Player } from '../../../types/game'
import { EVENTS } from '../../events/events'
import { createGame } from '../createGame'
import { resolveTile } from '../resolveTile'
import { applyEvent } from '../../events/applyEvent'
import { endTurn } from '../turn'

function updateCurrentPlayer(
  state: GameState,
  updater: (player: Player) => Player,
): GameState {
  return {
    ...state,
    players: state.players.map((player, index) =>
      index === state.currentPlayerIndex ? updater(player) : player,
    ),
  }
}

function withPosition(state: GameState, position: number): GameState {
  return updateCurrentPlayer(state, (player) => ({ ...player, position }))
}

describe('eventos', () => {
  it('aplica queda de preço e alteração de reputação', () => {
    const game = applyEvent(createGame(['Ana', 'Beto']), 'ev-btc-crash')

    expect(game.market.prices.btc).toBe(37500)
    expect(game.players[0]?.reputation).toBe(0)
    expect(game.logs.at(-1)?.type).toBe('event')
  })

  it('aplica perdas de saldo e segurança', () => {
    const initial = updateCurrentPlayer(
      createGame(['Ana', 'Beto']),
      (player) => ({ ...player, security: 20 }),
    )
    const game = applyEvent(initial, 'ev-phishing')

    expect(game.players[0]?.portfolio.cash).toBe(9700)
    expect(game.players[0]?.security).toBe(8)
    expect(game.players[1]?.portfolio.cash).toBe(10000)
  })

  it('aplica valorização de ativo', () => {
    const game = applyEvent(createGame(['Ana', 'Beto']), 'ev-eth-rally')

    expect(game.market.prices.eth).toBe(3600)
    expect(game.market.previousPrices.eth).toBe(3000)
  })

  it('nunca deixa o saldo ficar negativo', () => {
    const initial = updateCurrentPlayer(
      createGame(['Ana', 'Beto']),
      (player) => ({
        ...player,
        portfolio: { ...player.portfolio, cash: 50 },
      }),
    )
    const game = applyEvent(initial, 'ev-security-breach')

    expect(game.players[0]?.portfolio.cash).toBe(0)
    expect(game.players[0]?.security).toBe(0)
  })

  it('resolve evento pendente e limpa a decisão', () => {
    let game = withPosition(createGame(['Ana', 'Beto']), 3)
    game = resolveTile(
      { ...game, phase: 'awaiting-end-turn', pendingDecision: null },
      () => 0,
    )

    expect(game.pendingDecision).toEqual({
      type: 'event',
      eventId: 'ev-btc-crash',
    })
    expect(() => applyEvent(game, 'ev-eth-rally')).toThrow(/não é o evento/i)

    const resolved = applyEvent(game, 'ev-btc-crash')
    expect(resolved.pendingDecision).toBeNull()
    expect(resolved.phase).toBe('awaiting-end-turn')
  })

  it('não encerra o turno com evento pendente', () => {
    let game = withPosition(createGame(['Ana', 'Beto']), 3)
    game = resolveTile(
      { ...game, phase: 'awaiting-end-turn', pendingDecision: null },
      () => 0,
    )

    expect(() => endTurn(game)).toThrow(/decisão pendente/i)
  })

  it('mantém um catálogo com pelo menos 16 eventos e efeitos reais', () => {
    expect(EVENTS.length).toBeGreaterThanOrEqual(16)

    for (const event of EVENTS) {
      const effects = event.effects
      const hasRealEffect =
        (effects.cash ?? 0) !== 0 ||
        (effects.knowledge ?? 0) !== 0 ||
        (effects.security ?? 0) !== 0 ||
        (effects.reputation ?? 0) !== 0 ||
        (effects.priceChanges?.length ?? 0) > 0
      expect(hasRealEffect).toBe(true)

      for (const change of effects.priceChanges ?? []) {
        expect(change.changePercent).toBeGreaterThan(-1)
        expect(change.changePercent).toBeLessThan(1)
      }
    }
  })
})
