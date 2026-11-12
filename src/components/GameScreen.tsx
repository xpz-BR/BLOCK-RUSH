import { useEffect, useRef, useState } from 'react'
import {
  BookOpen,
  ChevronRight,
  Dices,
  Home,
  Radio,
} from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { Board } from './Board'
import { Brand } from './Brand'
import { ChallengeModal } from './ChallengeModal'
import { ErrorBanner } from './ErrorBanner'
import { EventModal } from './EventModal'
import { MarketPanel } from './MarketPanel'
import { PlayerHud } from './PlayerHud'
import './GameScreen.css'

interface GameScreenProps {
  onExit: () => void
  onManual: () => void
}

function phaseLabel(phase: string, hasPending: boolean): string {
  switch (phase) {
    case 'awaiting-roll':
      return 'AGUARDANDO ROLAGEM'
    case 'awaiting-decision':
      return hasPending ? 'DECISÃO PENDENTE' : 'DECISÃO'
    case 'awaiting-end-turn':
      return 'TURNO EM ANDAMENTO'
    case 'finished':
      return 'PARTIDA ENCERRADA'
    default:
      return phase.toUpperCase()
  }
}

export function GameScreen({ onExit, onManual }: GameScreenProps) {
  const game = useGameStore((state) => state.game)
  const error = useGameStore((state) => state.error)
  const clearError = useGameStore((state) => state.clearError)
  const rollDice = useGameStore((state) => state.rollDice)
  const endTurn = useGameStore((state) => state.endTurn)
  const skipDecision = useGameStore((state) => state.skipDecision)
  const [rolling, setRolling] = useState(false)
  const rollTimeout = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (rollTimeout.current !== null) {
        window.clearTimeout(rollTimeout.current)
      }
    }
  }, [])

  if (!game) return null

  const currentPlayer = game.players[game.currentPlayerIndex]
  const pending = game.pendingDecision
  const latestLog = game.logs[game.logs.length - 1]
  const highlightedAsset =
    pending?.type === 'market' ? pending.featuredAssetId : undefined
  const canTrade = !pending || pending.type === 'market'

  const handleRoll = () => {
    if (rolling || game.phase !== 'awaiting-roll') return
    setRolling(true)
    if (rollTimeout.current !== null) {
      window.clearTimeout(rollTimeout.current)
    }
    rollTimeout.current = window.setTimeout(() => {
      rollDice()
      setRolling(false)
      rollTimeout.current = null
    }, 620)
  }

  const handleEndTurn = () => {
    if (rolling) return
    endTurn()
  }

  const handleSkipMarket = () => {
    skipDecision()
  }

  return (
    <main className="game-screen">
      <header className="game-topbar">
        <div className="game-topbar__brand">
          <Brand compact />
          <span className="game-topbar__edition">TEMPORADA 01</span>
        </div>

        <div className="game-topbar__status">
          <span className="game-topbar__round">
            RODADA
            <strong>
              {String(game.round).padStart(2, '0')}
              <small>/{String(game.rules.maxRounds).padStart(2, '0')}</small>
            </strong>
          </span>

          <span className="game-topbar__turn">
            <span
              className="game-topbar__dot"
              style={{ backgroundColor: currentPlayer?.color }}
            />
            <span>
              VEZ DE
              <strong>{currentPlayer?.name}</strong>
            </span>
            <small>
              {game.currentPlayerIndex + 1}/{game.players.length}
            </small>
          </span>

          <span
            className={`game-topbar__phase ${
              pending ? 'is-pending' : ''
            }`}
          >
            {phaseLabel(game.phase, Boolean(pending))}
          </span>
        </div>

        <div className="game-topbar__actions">
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={onManual}
          >
            <BookOpen size={15} aria-hidden="true" />
            MANUAL
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={onExit}
          >
            <Home size={15} aria-hidden="true" />
            MENU
          </button>
        </div>
      </header>

      {error && <ErrorBanner message={error} onDismiss={clearError} />}

      <div className="game-ticker" aria-live="polite">
        <span className="game-ticker__label">
          <Radio size={13} aria-hidden="true" />
          ÚLTIMO EVENTO
        </span>
        <span className="game-ticker__message">
          {latestLog?.message ?? 'A partida começou. Role o dado para avançar.'}
        </span>
        <span className="game-ticker__round">R{game.round}</span>
      </div>

      <div className="game-layout">
        <aside className="game-rail game-rail--left">
          <PlayerHud game={game} />
        </aside>

        <section className="game-board" aria-label="Mesa de jogo">
          <Board
            game={game}
            rolling={rolling}
            onRoll={handleRoll}
            onEndTurn={handleEndTurn}
            onSkipMarket={handleSkipMarket}
          />
        </section>

        <aside className="game-rail game-rail--right">
          <MarketPanel
            game={game}
            canTrade={canTrade}
            featuredAssetId={highlightedAsset}
          />
        </aside>
      </div>

      <footer className="game-footer">
        <span>
          <Dices size={12} aria-hidden="true" />
          ROLAGEM DE 1 A 6 · MOVIMENTO CIRCULAR
        </span>
        <span>
          <ChevronRight size={12} aria-hidden="true" />
          NEGOCIAÇÃO PERMITIDA DURANTE O TURNO
        </span>
        <span>DADOS SIMULADOS PELO MOTOR</span>
      </footer>

      <ChallengeModal
        challengeId={
          pending?.type === 'challenge' ? pending.challengeId : null
        }
        playerName={currentPlayer?.name ?? ''}
      />

      <EventModal
        game={game}
        eventId={pending?.type === 'event' ? pending.eventId : null}
      />
    </main>
  )
}
