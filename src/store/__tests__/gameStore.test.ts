import { beforeEach, describe, expect, it } from 'vitest'
import { useGameStore } from '../gameStore'

beforeEach(() => {
  useGameStore.getState().resetGame()
})

describe('store Zustand', () => {
  it('inicia a partida e expõe o estado global', () => {
    useGameStore.getState().startGame(['Ana', 'Beto'])
    const game = useGameStore.getState().game

    expect(game).not.toBeNull()
    expect(game?.players).toHaveLength(2)
    expect(game?.phase).toBe('awaiting-roll')
    expect(useGameStore.getState().error).toBeNull()
  })

  it('rola o dado, move e abre o desafio da casa', () => {
    useGameStore.getState().startGame(['Ana', 'Beto'])

    const roll = useGameStore.getState().rollDice(() => 0)
    const game = useGameStore.getState().game

    expect(roll).toBe(1)
    expect(useGameStore.getState().lastRoll).toBe(1)
    expect(game?.players[0]?.position).toBe(1)
    expect(game?.pendingDecision?.type).toBe('challenge')
  })

  it('responde desafio e encerra o turno', () => {
    useGameStore.getState().startGame(['Ana', 'Beto'])
    useGameStore.getState().rollDice(() => 0)

    const pending = useGameStore.getState().game?.pendingDecision
    expect(pending?.type).toBe('challenge')
    if (pending?.type !== 'challenge') throw new Error('Sem desafio')

    const answered = useGameStore
      .getState()
      .answerChallenge(pending.challengeId, 1)
    expect(answered).toBe(true)
    expect(useGameStore.getState().game?.players[0]?.knowledge).toBe(10)

    const ended = useGameStore.getState().endTurn()
    expect(ended).toBe(true)
    expect(useGameStore.getState().game?.currentPlayerIndex).toBe(1)
    expect(useGameStore.getState().game?.phase).toBe('awaiting-roll')
  })

  it('compra e vende ativos pela store', () => {
    useGameStore.getState().startGame(['Ana', 'Beto'])

    expect(useGameStore.getState().buyAsset('eth', 0.5)).toBe(true)
    expect(
      useGameStore.getState().game?.players[0]?.portfolio.holdings[0]
        ?.quantity,
    ).toBe(0.5)

    expect(useGameStore.getState().sellAsset('eth', 0.5)).toBe(true)
    expect(
      useGameStore.getState().game?.players[0]?.portfolio.holdings,
    ).toEqual([])
  })

  it('registra erros de operações inválidas sem quebrar a store', () => {
    useGameStore.getState().startGame(['Ana', 'Beto'])

    expect(useGameStore.getState().buyAsset('btc', 10)).toBe(false)
    expect(useGameStore.getState().error).toMatch(/saldo insuficiente/i)
    expect(useGameStore.getState().game?.players[0]?.portfolio.cash).toBe(
      10000,
    )

    useGameStore.getState().clearError()
    expect(useGameStore.getState().error).toBeNull()
  })

  it('resolve evento sorteado pela casa', () => {
    useGameStore.getState().startGame(['Ana', 'Beto'])
    useGameStore.getState().rollDice(() => 0.4)

    const pending = useGameStore.getState().game?.pendingDecision
    expect(pending?.type).toBe('event')

    expect(useGameStore.getState().resolveEvent()).toBe(true)
    expect(useGameStore.getState().game?.pendingDecision).toBeNull()
    expect(useGameStore.getState().game?.phase).toBe('awaiting-end-turn')
  })

  it('encerra a janela de mercado e libera o fim do turno', () => {
    useGameStore.getState().startGame(['Ana', 'Beto'])
    useGameStore.getState().rollDice(() => 0.99)

    expect(useGameStore.getState().game?.pendingDecision?.type).toBe('market')
    expect(useGameStore.getState().skipDecision()).toBe(true)
    expect(useGameStore.getState().game?.pendingDecision).toBeNull()
    expect(useGameStore.getState().endTurn()).toBe(true)
  })

  it('reinicia a partida preservando jogadores e regras', () => {
    useGameStore.getState().startGame(['Ana', 'Beto'], { startingCash: 7000 })
    useGameStore.getState().buyAsset('eth', 1)
    useGameStore.getState().restartGame()

    const game = useGameStore.getState().game
    expect(game?.round).toBe(1)
    expect(game?.players.map((player) => player.name)).toEqual(['Ana', 'Beto'])
    expect(game?.players[0]?.portfolio.cash).toBe(7000)
    expect(game?.transactions).toEqual([])
  })

  it('informa erro quando não há partida', () => {
    expect(useGameStore.getState().rollDice()).toBeNull()
    expect(useGameStore.getState().error).toMatch(/nenhuma partida/i)
    expect(useGameStore.getState().buyAsset('btc', 0.1)).toBe(false)
  })
})
