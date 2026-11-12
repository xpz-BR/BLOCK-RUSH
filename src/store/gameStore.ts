import { create } from 'zustand'
import type { AssetId } from '../types/asset'
import type { GameState } from '../types/game'
import {
  answerChallenge as answerChallengeEngine,
  applyEvent,
  buyAsset as buyAssetEngine,
  createGame,
  endTurn as endTurnEngine,
  movePlayer,
  resolveTile,
  rollDice as rollDiceEngine,
  sellAsset as sellAssetEngine,
  skipDecision as skipDecisionEngine,
} from '../game/engine'
import type {
  CreateGameOptions,
  GameSetup,
} from '../game/engine'

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

export interface GameStore {
  game: GameState | null
  lastRoll: number | null
  error: string | null
  startGame: (setup: GameSetup, options?: CreateGameOptions) => void
  restartGame: () => void
  resetGame: () => void
  rollDice: (random?: () => number) => number | null
  buyAsset: (assetId: AssetId, quantity: number) => boolean
  sellAsset: (assetId: AssetId, quantity: number) => boolean
  answerChallenge: (challengeId: string, answerIndex: number) => boolean
  resolveEvent: (eventId?: string) => boolean
  skipDecision: () => boolean
  endTurn: (random?: () => number) => boolean
  clearError: () => void
}

export const useGameStore = create<GameStore>()((set, get) => {
  const fail = (error: unknown): false => {
    set({ error: errorMessage(error) })
    return false
  }

  return {
    game: null,
    lastRoll: null,
    error: null,

    startGame: (setup, options) => {
      try {
        const game = createGame(setup, options)
        set({ game, lastRoll: null, error: null })
      } catch (error) {
        fail(error)
      }
    },

    restartGame: () => {
      try {
        const current = get().game
        if (!current) {
          throw new Error('Não há partida para reiniciar.')
        }
        const setups = current.players.map((player) => ({
          name: player.name,
          color: player.color,
        }))
        const game = createGame(setups, {
          maxRounds: current.rules.maxRounds,
          startingCash: current.rules.startingCash,
          transactionFeeRate: current.rules.transactionFeeRate,
        })
        set({ game, lastRoll: null, error: null })
      } catch (error) {
        fail(error)
      }
    },

    resetGame: () => {
      set({ game: null, lastRoll: null, error: null })
    },

    rollDice: (random = Math.random) => {
      try {
        const current = get().game
        if (!current) {
          throw new Error('Nenhuma partida iniciada.')
        }
        const value = rollDiceEngine(random)
        const moved = movePlayer(current, value)
        const resolved = resolveTile(moved, random)
        set({ game: resolved, lastRoll: value, error: null })
        return value
      } catch (error) {
        fail(error)
        return null
      }
    },

    buyAsset: (assetId, quantity) => {
      try {
        const current = get().game
        if (!current) {
          throw new Error('Nenhuma partida iniciada.')
        }
        const game = buyAssetEngine(current, assetId, quantity)
        set({ game, error: null })
        return true
      } catch (error) {
        return fail(error)
      }
    },

    sellAsset: (assetId, quantity) => {
      try {
        const current = get().game
        if (!current) {
          throw new Error('Nenhuma partida iniciada.')
        }
        const game = sellAssetEngine(current, assetId, quantity)
        set({ game, error: null })
        return true
      } catch (error) {
        return fail(error)
      }
    },

    answerChallenge: (challengeId, answerIndex) => {
      try {
        const current = get().game
        if (!current) {
          throw new Error('Nenhuma partida iniciada.')
        }
        const game = answerChallengeEngine(
          current,
          challengeId,
          answerIndex,
        )
        set({ game, error: null })
        return true
      } catch (error) {
        return fail(error)
      }
    },

    resolveEvent: (eventId) => {
      try {
        const current = get().game
        if (!current) {
          throw new Error('Nenhuma partida iniciada.')
        }
        const pending = current.pendingDecision
        const resolvedId =
          eventId ??
          (pending?.type === 'event' ? pending.eventId : undefined)
        if (!resolvedId) {
          throw new Error('Não há evento pendente para resolver.')
        }
        const game = applyEvent(current, resolvedId)
        set({ game, error: null })
        return true
      } catch (error) {
        return fail(error)
      }
    },

    skipDecision: () => {
      try {
        const current = get().game
        if (!current) {
          throw new Error('Nenhuma partida iniciada.')
        }
        const game = skipDecisionEngine(current)
        set({ game, error: null })
        return true
      } catch (error) {
        return fail(error)
      }
    },

    endTurn: (random = Math.random) => {
      try {
        const current = get().game
        if (!current) {
          throw new Error('Nenhuma partida iniciada.')
        }
        const game = endTurnEngine(current, random)
        set({ game, error: null })
        return true
      } catch (error) {
        return fail(error)
      }
    },

    clearError: () => {
      set({ error: null })
    },
  }
})
