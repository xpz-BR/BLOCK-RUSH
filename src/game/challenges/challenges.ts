import { CHALLENGES } from '../../data/questions'
import type { Challenge, ChallengeCategory } from '../../types/challenge'
import type { GameState, StatDelta } from '../../types/game'
import { GameRuleError } from '../engine/errors'
import {
  addLog,
  applyStatDelta,
  assertCurrentActor,
  assertNotFinished,
  getCurrentPlayer,
  replacePlayer,
  roundMoney,
} from '../engine/helpers'

export function getChallenge(challengeId: string): Challenge {
  const challenge = CHALLENGES.find((item) => item.id === challengeId)
  if (!challenge) {
    throw new GameRuleError(`Desafio não encontrado: ${challengeId}.`)
  }
  return challenge
}

export function pickChallenge(
  category: ChallengeCategory,
  random: () => number = Math.random,
): Challenge {
  const candidates = CHALLENGES.filter(
    (challenge) => challenge.category === category,
  )
  if (candidates.length === 0) {
    throw new GameRuleError(`Nenhum desafio da categoria "${category}".`)
  }
  const index = Math.min(
    candidates.length - 1,
    Math.floor(random() * candidates.length),
  )
  return candidates[index]
}

function effectToDelta(
  effect: Challenge['consequences']['success']['effect'],
  currentCash: number,
): StatDelta {
  const afterFixedCash = Math.max(0, currentCash + (effect.cash ?? 0))
  const percentDelta = effect.cashPercent
    ? afterFixedCash * effect.cashPercent
    : 0
  const finalCash = Math.max(0, roundMoney(afterFixedCash + percentDelta))

  return {
    cash: roundMoney(finalCash - currentCash),
    knowledge: effect.knowledge,
    security: effect.security,
    reputation: effect.reputation,
  }
}

export function answerChallenge(
  state: GameState,
  challengeId: string,
  answerIndex: number,
  playerId?: string,
): GameState {
  assertNotFinished(state)
  assertCurrentActor(state, playerId)

  if (
    state.phase !== 'awaiting-decision' ||
    state.pendingDecision?.type !== 'challenge'
  ) {
    throw new GameRuleError('Não há desafio pendente para responder.')
  }
  if (state.pendingDecision.challengeId !== challengeId) {
    throw new GameRuleError('O desafio respondido não é o desafio pendente.')
  }

  const challenge = getChallenge(challengeId)

  if (
    !Number.isInteger(answerIndex) ||
    answerIndex < 0 ||
    answerIndex >= challenge.options.length
  ) {
    throw new GameRuleError('Alternativa de resposta inválida.')
  }

  const player = getCurrentPlayer(state)
  const correct = answerIndex === challenge.correctAnswer
  const consequence = correct
    ? challenge.consequences.success
    : challenge.consequences.failure
  const updatedPlayer = applyStatDelta(
    player,
    effectToDelta(consequence.effect, player.portfolio.cash),
  )

  let next = replacePlayer(state, updatedPlayer)
  next = {
    ...next,
    phase: 'awaiting-end-turn',
    pendingDecision: null,
  }
  next = addLog(
    next,
    player.id,
    'challenge',
    `${correct ? 'Acertou' : 'Errou'} o desafio ${challenge.id}. ${consequence.message}`,
  )
  return next
}

export function getChallengesByCategory(
  category: ChallengeCategory,
): Challenge[] {
  return CHALLENGES.filter((challenge) => challenge.category === category)
}
