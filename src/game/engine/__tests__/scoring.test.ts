import { describe, expect, it } from 'vitest'
import type { GameState, Player } from '../../../types/game'
import { createGame } from '../createGame'
import { buyAsset } from '../../market/trading'
import {
  calculateNetWorth,
  calculatePlayerScore,
} from '../../scoring/scoring'
import { checkVictory, endTurn } from '../turn'

function updatePlayer(
  state: GameState,
  playerId: string,
  updater: (player: Player) => Player,
): GameState {
  return {
    ...state,
    players: state.players.map((player) =>
      player.id === playerId ? updater(player) : player,
    ),
  }
}

describe('patrimônio e pontuação', () => {
  it('calcula o patrimônio com saldo e ativos', () => {
    const game = buyAsset(createGame(['Ana', 'Beto']), 'btc', 0.1)

    expect(calculateNetWorth(game, 'p1')).toBe(9925)
    expect(calculateNetWorth(game, 'p2')).toBe(10000)
  })

  it('usa a fórmula documentada de pontuação', () => {
    const initial = createGame(['Ana', 'Beto'])
    expect(calculatePlayerScore(initial, 'p1')).toBe(200)

    const withStats = updatePlayer(initial, 'p1', (player) => ({
      ...player,
      knowledge: 10,
      security: 10,
      reputation: 10,
    }))

    // 10000 / 50 + 10 * 2 + 10 * 1.5 + 10 * 2 = 255
    expect(calculatePlayerScore(withStats, 'p1')).toBe(255)
  })

  it('não deixa o patrimônio determinar sozinho o vencedor', () => {
    let game = createGame(['Ana', 'Beto'])
    game = updatePlayer(game, 'p1', (player) => ({
      ...player,
      portfolio: { ...player.portfolio, cash: 20000 },
    }))
    game = updatePlayer(game, 'p2', (player) => ({
      ...player,
      knowledge: 100,
      security: 100,
      reputation: 100,
    }))

    expect(calculateNetWorth(game, 'p1')).toBeGreaterThan(
      calculateNetWorth(game, 'p2'),
    )
    expect(calculatePlayerScore(game, 'p2')).toBeGreaterThan(
      calculatePlayerScore(game, 'p1'),
    )
  })

  it('retorna null enquanto a temporada não terminou', () => {
    expect(checkVictory(createGame(['Ana', 'Beto']))).toBeNull()
  })

  it('encerra após 8 rodadas e gera o resultado final', () => {
    let game = createGame(['Ana', 'Beto'])
    game = {
      ...game,
      round: 8,
      currentPlayerIndex: game.players.length - 1,
      phase: 'awaiting-end-turn',
      pendingDecision: null,
    }

    const finished = endTurn(game, () => 0.5)

    expect(finished.phase).toBe('finished')
    expect(finished.result).not.toBeNull()
    expect(finished.result?.roundsPlayed).toBe(8)
    expect(finished.result?.players).toHaveLength(2)
    expect(finished.result?.players[0]?.rank).toBe(1)
    expect(finished.result?.players[1]?.rank).toBe(2)
    expect(finished.result?.winnerId).toBe(
      finished.result?.players[0]?.playerId,
    )
    expect(finished.logs.at(-1)?.type).toBe('score')
  })

  it('impede novas ações depois do fim da partida', () => {
    let game = createGame(['Ana', 'Beto'])
    game = {
      ...game,
      round: 8,
      currentPlayerIndex: 1,
      phase: 'awaiting-end-turn',
      pendingDecision: null,
    }
    const finished = endTurn(game, () => 0.5)

    expect(() => endTurn(finished)).toThrow(/encerrada/i)
  })

  it('ordena o resultado por pontuação', () => {
    let game = createGame(['Ana', 'Beto'])
    game = updatePlayer(game, 'p1', (player) => ({
      ...player,
      knowledge: 50,
    }))
    game = {
      ...game,
      round: 9,
      phase: 'finished',
      pendingDecision: null,
    }

    const result = checkVictory(game)
    expect(result).not.toBeNull()
    expect(result?.players[0]?.playerId).toBe('p1')
    expect(result?.players[0]?.score).toBeGreaterThanOrEqual(
      result?.players[1]?.score ?? 0,
    )
  })
})
