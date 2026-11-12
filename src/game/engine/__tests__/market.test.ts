import { describe, expect, it } from 'vitest'
import type { GameState } from '../../../types/game'
import { createGame } from '../createGame'
import { resolveTile } from '../resolveTile'
import { skipDecision } from '../decisions'
import { endTurn } from '../turn'
import { buyAsset, sellAsset } from '../../market/trading'
import { createMarket, simulateMarketTick } from '../../market/market'
import { calculateNetWorth } from '../../scoring/scoring'

function withPosition(state: GameState, position: number): GameState {
  return {
    ...state,
    players: state.players.map((player, index) =>
      index === state.currentPlayerIndex
        ? { ...player, position }
        : player,
    ),
  }
}

function pendingMarketGame(): GameState {
  const game = withPosition(createGame(['Ana', 'Beto']), 0)
  return resolveTile(
    { ...game, phase: 'awaiting-end-turn', pendingDecision: null },
    () => 0,
  )
}

describe('mercado e negociação', () => {
  it('compra ativos e calcula a taxa de transação', () => {
    const game = buyAsset(createGame(['Ana', 'Beto']), 'btc', 0.1)
    const player = game.players[0]

    expect(player?.portfolio.holdings).toHaveLength(1)
    expect(player?.portfolio.holdings[0]?.assetId).toBe('btc')
    expect(player?.portfolio.holdings[0]?.quantity).toBe(0.1)
    expect(player?.portfolio.cash).toBe(4925)
    expect(game.transactions[0]?.gross).toBe(5000)
    expect(game.transactions[0]?.fee).toBe(75)
    expect(game.transactions[0]?.net).toBe(5075)
    expect(game.transactions[0]?.kind).toBe('buy')
  })

  it('rejeita compra sem saldo suficiente', () => {
    const game = createGame(['Ana', 'Beto'])

    expect(() => buyAsset(game, 'btc', 1)).toThrow(/saldo insuficiente/i)
    expect(game.players[0]?.portfolio.cash).toBe(10000)
  })

  it('vende ativos e credita o valor líquido da taxa', () => {
    let game = buyAsset(createGame(['Ana', 'Beto']), 'btc', 0.1)
    game = sellAsset(game, 'btc', 0.05)
    const player = game.players[0]

    expect(player?.portfolio.holdings[0]?.quantity).toBe(0.05)
    expect(player?.portfolio.cash).toBe(7387.5)
    expect(game.transactions[1]?.kind).toBe('sell')
    expect(game.transactions[1]?.gross).toBe(2500)
    expect(game.transactions[1]?.fee).toBe(37.5)
    expect(game.transactions[1]?.net).toBe(2462.5)
  })

  it('rejeita venda de ativo inexistente ou em quantidade maior', () => {
    const game = createGame(['Ana', 'Beto'])

    expect(() => sellAsset(game, 'eth', 0.1)).toThrow(/não possui/i)

    const withBtc = buyAsset(game, 'btc', 0.1)
    expect(() => sellAsset(withBtc, 'btc', 0.2)).toThrow(/não possui/i)
  })

  it('remove a posição quando todo o ativo é vendido', () => {
    let game = buyAsset(createGame(['Ana', 'Beto']), 'aqua', 10)
    game = sellAsset(game, 'aqua', 10)

    expect(game.players[0]?.portfolio.holdings).toEqual([])
  })

  it('aplica a taxa mínima em operações pequenas', () => {
    const game = buyAsset(
      createGame(['Ana', 'Beto']),
      'coral',
      0.05,
    )

    expect(game.transactions[0]?.gross).toBe(0.5)
    expect(game.transactions[0]?.fee).toBe(0.01)
  })

  it('não permite negociar como outro jogador', () => {
    const game = createGame(['Ana', 'Beto'])

    expect(() => buyAsset(game, 'btc', 0.1, 'p2')).toThrow(/turno/i)
  })

  it('bloqueia negociação enquanto há desafio pendente', () => {
    const game = withPosition(createGame(['Ana', 'Beto']), 1)
    const resolved = resolveTile(
      { ...game, phase: 'awaiting-end-turn', pendingDecision: null },
      () => 0,
    )

    expect(resolved.pendingDecision?.type).toBe('challenge')
    expect(() => buyAsset(resolved, 'eth', 0.1)).toThrow(/decisão pendente/i)
  })

  it('abre e encerra a janela de mercado', () => {
    const game = pendingMarketGame()

    expect(game.pendingDecision?.type).toBe('market')
    expect(() => endTurn(game)).toThrow(/decisão pendente/i)

    const closed = skipDecision(game)
    expect(closed.pendingDecision).toBeNull()
    expect(closed.phase).toBe('awaiting-end-turn')
    expect(() => endTurn(closed)).not.toThrow()
  })

  it('calcula o patrimônio incluindo a carteira', () => {
    const game = buyAsset(createGame(['Ana', 'Beto']), 'btc', 0.1)

    expect(calculateNetWorth(game, 'p1')).toBe(9925)
  })
})

describe('simulação de preços', () => {
  it('altera preços e respeita a intensidade da volatilidade', () => {
    const market = createMarket()
    const next = simulateMarketTick(market, () => 0.75)
    const btcChange =
      (next.prices.btc - market.prices.btc) / market.prices.btc
    const coralChange =
      (next.prices.coral - market.prices.coral) / market.prices.coral

    expect(next.prices.btc).not.toBe(market.prices.btc)
    expect(next.prices.coral).not.toBe(market.prices.coral)
    expect(coralChange).toBeGreaterThan(btcChange)
    expect(next.previousPrices.btc).toBe(market.prices.btc)
    expect(next.history.length).toBe(market.history.length + 1)
  })

  it('mantém preços positivos em cenários extremos', () => {
    const market = createMarket()
    const next = simulateMarketTick(market, () => 0)

    for (const asset of next.assets) {
      expect(next.prices[asset.id]).toBeGreaterThanOrEqual(1)
    }
  })
})
