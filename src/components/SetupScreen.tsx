import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Users,
} from 'lucide-react'
import type { PlayerSetup } from '../types/game'
import {
  MAX_PLAYERS,
  MIN_PLAYERS,
  STARTING_CASH,
  TOTAL_ROUNDS,
  TRANSACTION_FEE_RATE,
} from '../game/constants'
import { useGameStore } from '../store/gameStore'
import { formatMoney } from '../utils/format'
import { Brand } from './Brand'
import { ErrorBanner } from './ErrorBanner'
import './SetupScreen.css'

interface SetupScreenProps {
  onStart: () => void
  onBack: () => void
}

interface PlayerDraft {
  id: string
  name: string
  color: string
}

const COLOR_OPTIONS = ['#F7931A', '#2457E6', '#202124', '#5E6773']

function createInitialPlayers(): PlayerDraft[] {
  return [
    { id: 'd1', name: '', color: COLOR_OPTIONS[0]! },
    { id: 'd2', name: '', color: COLOR_OPTIONS[1]! },
  ]
}

export function SetupScreen({ onStart, onBack }: SetupScreenProps) {
  const startGame = useGameStore((state) => state.startGame)
  const error = useGameStore((state) => state.error)
  const clearError = useGameStore((state) => state.clearError)
  const [players, setPlayers] = useState<PlayerDraft[]>(createInitialPlayers)
  const nextIdRef = useRef(3)

  const addPlayer = () => {
    if (players.length >= MAX_PLAYERS) return
    const nextId = nextIdRef.current
    nextIdRef.current += 1
    setPlayers((current) => {
      const usedColors = new Set(current.map((player) => player.color))
      const availableColor =
        COLOR_OPTIONS.find((color) => !usedColors.has(color)) ??
        COLOR_OPTIONS[current.length % COLOR_OPTIONS.length]!
      return [
        ...current,
        {
          id: `d${nextId}`,
          name: '',
          color: availableColor,
        },
      ]
    })
  }

  const removePlayer = (id: string) => {
    setPlayers((current) =>
      current.length <= MIN_PLAYERS
        ? current
        : current.filter((player) => player.id !== id),
    )
  }

  const updateName = (id: string, name: string) => {
    setPlayers((current) =>
      current.map((player) =>
        player.id === id ? { ...player, name } : player,
      ),
    )
  }

  const updateColor = (id: string, color: string) => {
    setPlayers((current) =>
      current.map((player) =>
        player.id === id ? { ...player, color } : player,
      ),
    )
  }

  const handleStart = () => {
    const setup: PlayerSetup[] = players.map((player) => ({
      name: player.name,
      color: player.color,
    }))
    startGame(setup)
    const state = useGameStore.getState()
    if (!state.error && state.game) {
      onStart()
    }
  }

  const isColorUsedByAnother = (color: string, playerId: string) =>
    players.some(
      (player) => player.id !== playerId && player.color === color,
    )

  return (
    <motion.main
      className="setup-screen"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3 }}
    >
      <header className="setup-topbar">
        <Brand compact />
        <button type="button" className="btn btn--ghost btn--sm" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" />
          VOLTAR
        </button>
      </header>

      <div className="setup-grid">
        <section className="setup-intro">
          <p className="eyebrow">CONFIGURAÇÃO DA PARTIDA</p>
          <h1>
            MONTE
            <br />
            A <span>MESA.</span>
          </h1>
          <p className="setup-intro__text">
            De 2 a 4 jogadores. Escolha quem entra no mercado, defina as cores
            e prepare-se para oito rodadas de decisões.
          </p>

          <div className="setup-rules">
            <div className="setup-rule">
              <Users size={18} aria-hidden="true" />
              <div>
                <span>JOGADORES</span>
                <strong>
                  {MIN_PLAYERS}—{MAX_PLAYERS}
                </strong>
              </div>
            </div>
            <div className="setup-rule">
              <span className="setup-rule__number">{TOTAL_ROUNDS}</span>
              <div>
                <span>RODADAS</span>
                <strong>UMA AÇÃO POR TURNO</strong>
              </div>
            </div>
            <div className="setup-rule">
              <span className="setup-rule__number">1,5%</span>
              <div>
                <span>TAXA DE MERCADO</span>
                <strong>
                  SALDO INICIAL {formatMoney(STARTING_CASH)}
                </strong>
              </div>
            </div>
          </div>

          <p className="setup-intro__note">
            A taxa real aplicada pelo motor é{' '}
            {(TRANSACTION_FEE_RATE * 100).toFixed(1)}% por operação, com mínimo
            de R$ 0,01.
          </p>
        </section>

        <section className="setup-form" aria-labelledby="setup-form-title">
          <div className="setup-form__head">
            <div>
              <p className="eyebrow">JOGADORES</p>
              <h2 id="setup-form-title">QUEM JOGA?</h2>
            </div>
            <span className="setup-form__count">
              {players.length.toString().padStart(2, '0')} /{' '}
              {MAX_PLAYERS.toString().padStart(2, '0')}
            </span>
          </div>

          {error && <ErrorBanner message={error} onDismiss={clearError} />}

          <div className="setup-players">
            <AnimatePresence initial={false}>
              {players.map((player, index) => (
                <motion.div
                  className="setup-player"
                  key={player.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span
                    className="setup-player__index"
                    style={{ backgroundColor: player.color }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="setup-player__field">
                    <label htmlFor={`name-${player.id}`}>NOME DO JOGADOR</label>
                    <input
                      id={`name-${player.id}`}
                      type="text"
                      value={player.name}
                      onChange={(event) =>
                        updateName(player.id, event.target.value)
                      }
                      placeholder={`Jogador ${index + 1}`}
                      maxLength={24}
                      autoComplete="off"
                    />
                  </div>

                  <div className="setup-player__colors" aria-label="Cor do jogador">
                    {COLOR_OPTIONS.map((color) => {
                      const disabled = isColorUsedByAnother(color, player.id)
                      return (
                        <button
                          key={color}
                          type="button"
                          className={`color-swatch ${
                            player.color === color ? 'is-selected' : ''
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => updateColor(player.id, color)}
                          disabled={disabled}
                          aria-label={`Selecionar cor ${color}`}
                          aria-pressed={player.color === color}
                          title={disabled ? 'Cor já usada' : 'Selecionar cor'}
                        />
                      )
                    })}
                  </div>

                  <button
                    type="button"
                    className="setup-player__remove"
                    onClick={() => removePlayer(player.id)}
                    disabled={players.length <= MIN_PLAYERS}
                    aria-label={`Remover jogador ${index + 1}`}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="setup-add"
            onClick={addPlayer}
            disabled={players.length >= MAX_PLAYERS}
          >
            <Plus size={18} aria-hidden="true" />
            ADICIONAR JOGADOR
          </button>

          <button
            type="button"
            className="btn btn--primary btn--lg setup-submit"
            onClick={handleStart}
          >
            INICIAR PARTIDA
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </section>
      </div>
    </motion.main>
  )
}
