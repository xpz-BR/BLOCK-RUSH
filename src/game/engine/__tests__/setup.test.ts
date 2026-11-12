import { describe, expect, it } from 'vitest'
import type { GameState } from '../../../types/game'
import { BOARD_TILES } from '../../board/tiles'
import { createGame } from '../createGame'
import { rollDice } from '../dice'
import { movePlayer } from '../movement'
import { resolveTile } from '../resolveTile'
import { endTurn } from '../turn'

function withPhase(state: GameState, phase: GameState['phase']): GameState {
  return { ...state, phase }
}

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

function readyToEnd(state: GameState): GameState {
  return { ...state, phase: 'awaiting-end-turn', pendingDecision: null }
}

describe('tabuleiro', () => {
  it('define 30 casas circulares com todas as categorias', () => {
    expect(BOARD_TILES).toHaveLength(30)
    expect(BOARD_TILES.map((tile) => tile.index)).toEqual(
      Array.from({ length: 30 }, (_, index) => index),
    )
    expect(new Set(BOARD_TILES.map((tile) => tile.id)).size).toBe(30)

    const categories = new Set(BOARD_TILES.map((tile) => tile.category))
    expect(categories).toEqual(
      new Set([
        'MARKET',
        'VALIDATION',
        'SECURITY',
        'EVENT',
        'KNOWLEDGE',
        'OPPORTUNITY',
        'NETWORK_FEE',
      ]),
    )
  })

  it('preenche os dados exigidos por cada categoria', () => {
    for (const tile of BOARD_TILES) {
      if (tile.category === 'NETWORK_FEE') {
        expect(tile.fee).toBeGreaterThan(0)
      }
      if (tile.category === 'OPPORTUNITY') {
        expect(tile.opportunity).toBeDefined()
      }
      if (
        tile.category === 'VALIDATION' ||
        tile.category === 'SECURITY' ||
        tile.category === 'KNOWLEDGE'
      ) {
        expect(tile.challengeCategory).toBeDefined()
      }
    }
  })
})

describe('criação de partidas', () => {
  it('cria uma partida com dois jogadores e configuração inicial', () => {
    const game = createGame(['Ana', 'Beto'])

    expect(game.players).toHaveLength(2)
    expect(game.players[0]?.name).toBe('Ana')
    expect(game.players[1]?.name).toBe('Beto')
    expect(game.currentPlayerIndex).toBe(0)
    expect(game.round).toBe(1)
    expect(game.rules.maxRounds).toBe(8)
    expect(game.phase).toBe('awaiting-roll')
    expect(game.board).toHaveLength(30)
    expect(game.market.prices.btc).toBe(50000)
    expect(game.players[0]?.portfolio.cash).toBe(10000)
    expect(game.players[0]?.portfolio.holdings).toEqual([])
    expect(game.result).toBeNull()
    expect(game.logs.length).toBeGreaterThan(0)
  })

  it('aceita de 2 a 4 jogadores', () => {
    expect(createGame(2).players).toHaveLength(2)
    expect(createGame(3).players).toHaveLength(3)
    expect(createGame(4).players).toHaveLength(4)
  })

  it('rejeita quantidade inválida de jogadores', () => {
    expect(() => createGame(1)).toThrow()
    expect(() => createGame(5)).toThrow()
    expect(() => createGame(['Ana'])).toThrow()
  })

  it('rejeita nomes vazios e duplicados', () => {
    expect(() => createGame(['Ana', '   '])).toThrow()
    expect(() => createGame(['Ana', 'ana'])).toThrow()
  })

  it('aplica opções de regras e saldo inicial', () => {
    const game = createGame(['Ana', 'Beto'], {
      startingCash: 5000,
      maxRounds: 3,
      transactionFeeRate: 0.02,
    })

    expect(game.rules.startingCash).toBe(5000)
    expect(game.rules.maxRounds).toBe(3)
    expect(game.rules.transactionFeeRate).toBe(0.02)
    expect(game.players[0]?.portfolio.cash).toBe(5000)
  })
})

describe('rolagem de dado', () => {
  it('gera valores de 1 a 6 com gerador determinístico', () => {
    expect(rollDice(() => 0)).toBe(1)
    expect(rollDice(() => 0.2)).toBe(2)
    expect(rollDice(() => 0.5)).toBe(4)
    expect(rollDice(() => 0.999)).toBe(6)
  })
})

describe('movimentação circular', () => {
  it('avança e dá a volta no tabuleiro', () => {
    const game = withPhase(withPosition(createGame(2), 28), 'awaiting-roll')
    const moved = movePlayer(game, 5)

    expect(moved.players[0]?.position).toBe(3)
    expect(moved.phase).toBe('awaiting-end-turn')
    expect(moved.lastRoll).toBe(5)
    expect(moved.logs.at(-1)?.type).toBe('move')
  })

  it('rejeita movimentação em fase incompatível', () => {
    const game = createGame(2)
    const moved = movePlayer(game, 3)

    expect(() => movePlayer(moved, 2)).toThrow()
  })

  it('rejeita avanço inválido', () => {
    const game = createGame(2)

    expect(() => movePlayer(game, 0)).toThrow()
    expect(() => movePlayer(game, 1.5)).toThrow()
  })
})

describe('sistema de turnos', () => {
  it('alterna jogadores e avança a rodada após o último jogador', () => {
    const initial = readyToEnd(createGame(2))
    const afterFirst = endTurn(initial, () => 0.5)

    expect(afterFirst.currentPlayerIndex).toBe(1)
    expect(afterFirst.round).toBe(1)
    expect(afterFirst.phase).toBe('awaiting-roll')

    const afterSecond = endTurn(
      { ...afterFirst, phase: 'awaiting-end-turn' },
      () => 0.5,
    )

    expect(afterSecond.currentPlayerIndex).toBe(0)
    expect(afterSecond.round).toBe(2)
  })

  it('atualiza os preços do mercado ao encerrar o turno', () => {
    const initial = readyToEnd(createGame(2))
    const next = endTurn(initial, () => 0.75)

    expect(next.market.prices.btc).not.toBe(initial.market.prices.btc)
    expect(next.market.history.length).toBeGreaterThan(
      initial.market.history.length,
    )
  })

  it('não encerra o turno com decisão pendente', () => {
    let game = withPosition(createGame(2), 0)
    game = withPhase(game, 'awaiting-end-turn')
    game = resolveTile(game, () => 0)

    expect(game.pendingDecision?.type).toBe('market')
    expect(() => endTurn(game)).toThrow(/decisão pendente/i)
  })
})
