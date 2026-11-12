import { DICE_MAX, DICE_MIN } from '../constants'

/**
 * Retorna um valor entre 1 e 6.
 * O gerador é injetável para permitir testes determinísticos.
 */
export function rollDice(random: () => number = Math.random): number {
  const value = Math.floor(random() * (DICE_MAX - DICE_MIN + 1)) + DICE_MIN
  return Math.min(DICE_MAX, Math.max(DICE_MIN, value))
}
