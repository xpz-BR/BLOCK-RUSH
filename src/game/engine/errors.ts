/** Erro de regra de negócio do jogo (ação inválida). */
export class GameRuleError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GameRuleError'
  }
}
