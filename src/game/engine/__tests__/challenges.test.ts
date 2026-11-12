import { describe, expect, it } from 'vitest'
import type { GameState } from '../../../types/game'
import { CHALLENGES } from '../../../data/questions'
import { createGame } from '../createGame'
import { resolveTile } from '../resolveTile'
import { answerChallenge } from '../../challenges/challenges'
import { endTurn } from '../turn'

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

function challengeAt(position: number): GameState {
  const game = withPosition(createGame(['Ana', 'Beto']), position)
  return resolveTile(
    { ...game, phase: 'awaiting-end-turn', pendingDecision: null },
    () => 0,
  )
}

function pendingChallengeId(state: GameState): string {
  if (state.pendingDecision?.type !== 'challenge') {
    throw new Error('Desafio pendente não encontrado no teste.')
  }
  return state.pendingDecision.challengeId
}

describe('desafios educativos', () => {
  it('aplica a recompensa de acerto', () => {
    const game = challengeAt(1)
    const challengeId = pendingChallengeId(game)

    expect(challengeId).toBe('q1')

    const answered = answerChallenge(game, challengeId, 1)

    expect(answered.players[0]?.knowledge).toBe(10)
    expect(answered.pendingDecision).toBeNull()
    expect(answered.phase).toBe('awaiting-end-turn')
    expect(answered.logs.at(-1)?.message).toMatch(/Acertou/)
  })

  it('não aplica a recompensa de acerto quando a resposta é errada', () => {
    const game = challengeAt(1)
    const challengeId = pendingChallengeId(game)
    const answered = answerChallenge(game, challengeId, 0)

    expect(answered.players[0]?.knowledge).toBe(0)
    expect(answered.logs.at(-1)?.message).toMatch(/Errou/)
  })

  it('aplica penalidade de erro sem conceder o bônus de acerto', () => {
    const game = challengeAt(4)
    const challengeId = pendingChallengeId(game)

    expect(challengeId).toBe('q3')

    const wrong = answerChallenge(game, challengeId, 0)
    expect(wrong.players[0]?.portfolio.cash).toBe(9000)
    expect(wrong.players[0]?.security).toBe(0)

    const correct = answerChallenge(game, challengeId, 2)
    expect(correct.players[0]?.portfolio.cash).toBe(10000)
    expect(correct.players[0]?.security).toBe(15)
  })

  it('rejeita alternativa fora do intervalo', () => {
    const game = challengeAt(1)
    const challengeId = pendingChallengeId(game)

    expect(() => answerChallenge(game, challengeId, 99)).toThrow()
    expect(() => answerChallenge(game, challengeId, -1)).toThrow()
  })

  it('rejeita resposta quando não há desafio pendente', () => {
    const game = createGame(['Ana', 'Beto'])

    expect(() => answerChallenge(game, 'q1', 1)).toThrow(/não há desafio/i)
  })

  it('não encerra o turno com desafio pendente', () => {
    const game = challengeAt(1)

    expect(() => endTurn(game)).toThrow(/decisão pendente/i)
  })

  it('mantém a integridade dos 20 desafios existentes', () => {
    expect(CHALLENGES).toHaveLength(20)

    for (const challenge of CHALLENGES) {
      expect(challenge.options.length).toBeGreaterThanOrEqual(3)
      expect(challenge.correctAnswer).toBeGreaterThanOrEqual(0)
      expect(challenge.correctAnswer).toBeLessThan(challenge.options.length)
      expect(challenge.explanation.length).toBeGreaterThan(0)
      expect(challenge.consequences.success.effect).not.toEqual(
        challenge.consequences.failure.effect,
      )
    }
  })
})
