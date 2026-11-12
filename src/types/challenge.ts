export type ChallengeCategory =
  | 'knowledge'
  | 'security'
  | 'market'
  | 'blockchain'

export type ChallengeType = 'quiz' | 'decision'

/**
 * Efeitos de um desafio sobre o jogador.
 *
 * `cash` é um valor absoluto (positivo ou negativo).
 * `cashPercent` é uma fração do saldo atual (ex.: -0.1 = perde 10% do saldo).
 * Os dois podem ser combinados; o valor absoluto é aplicado antes do percentual.
 */
export interface ChallengeEffect {
  knowledge?: number
  security?: number
  reputation?: number
  cash?: number
  cashPercent?: number
}

export interface ChallengeConsequence {
  message: string
  effect: ChallengeEffect
}

export interface Challenge {
  id: string
  type: ChallengeType
  category: ChallengeCategory
  question: string
  options: string[]
  /** Índice da alternativa correta em `options`. */
  correctAnswer: number
  explanation: string
  consequences: {
    success: ChallengeConsequence
    failure: ChallengeConsequence
  }
}
