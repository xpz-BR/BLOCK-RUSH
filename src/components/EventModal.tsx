import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  Scale,
  ShieldCheck,
  TrendingUp,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type {
  EventCategory,
  EventEffect,
  GameEvent,
  GameState,
} from '../types/game'
import { useGameStore } from '../store/gameStore'
import { formatMoney, formatNumber, formatPercent } from '../utils/format'
import './EventModal.css'

interface EventModalProps {
  game: GameState
  eventId: string | null
}

interface CategoryMeta {
  label: string
  Icon: LucideIcon
}

const CATEGORY_META: Record<EventCategory, CategoryMeta> = {
  market: { label: 'Mercado', Icon: TrendingUp },
  security: { label: 'Segurança', Icon: ShieldCheck },
  technology: { label: 'Tecnologia', Icon: Cpu },
  regulation: { label: 'Regulação', Icon: Scale },
}

function signedNumber(value: number): string {
  return `${value > 0 ? '+' : ''}${formatNumber(value)}`
}

function statLines(effect: EventEffect): string[] {
  const lines: string[] = []
  if (effect.cash) {
    lines.push(
      `${effect.cash > 0 ? '+' : ''}${formatMoney(effect.cash)} de saldo`,
    )
  }
  if (effect.knowledge) {
    lines.push(`${signedNumber(effect.knowledge)} conhecimento`)
  }
  if (effect.security) {
    lines.push(`${signedNumber(effect.security)} segurança`)
  }
  if (effect.reputation) {
    lines.push(`${signedNumber(effect.reputation)} reputação`)
  }
  return lines
}

export function EventModal({ game, eventId }: EventModalProps) {
  const resolve = useGameStore((state) => state.resolveEvent)
  const resolvingRef = useRef<string | null>(null)
  const event: GameEvent | undefined = eventId
    ? game.events.find((item) => item.id === eventId)
    : undefined

  // Cada evento novo libera o guard de resolução do evento anterior.
  useEffect(() => {
    resolvingRef.current = null
    return () => {
      resolvingRef.current = null
    }
  }, [eventId])

  const player = game.players[game.currentPlayerIndex]
  const meta = event ? CATEGORY_META[event.category] : null
  const Icon = meta?.Icon
  const lines = event ? statLines(event.effects) : []
  const priceChanges = event?.effects.priceChanges ?? []

  const handleResolve = () => {
    if (!eventId || resolvingRef.current === eventId) return
    resolvingRef.current = eventId
    const accepted = resolve(eventId)
    if (!accepted) {
      resolvingRef.current = null
    }
  }

  if (!event || !meta || !Icon) {
    return null
  }

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.section
        className="event-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-title"
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
      >
            <header className="event-modal__head">
              <div className="event-modal__identity">
                <span className="event-modal__category">
                  <Icon size={14} aria-hidden="true" />
                  EVENTO · {meta.label}
                </span>
                <span className="event-modal__player">{player?.name}</span>
              </div>
              <span className="event-modal__stamp">EVENTO ATIVO</span>
            </header>

            <div className="event-modal__body">
              <div className="event-modal__title-row">
                <span className="event-modal__mark" aria-hidden="true">
                  <Zap size={26} />
                </span>
                <h2 id="event-title">{event.title}</h2>
              </div>

              <p className="event-modal__description">{event.description}</p>

              <div className="event-modal__grid">
                <section
                  className="event-block"
                  aria-labelledby="event-effects-title"
                >
                  <h3 id="event-effects-title">CONSEQUÊNCIAS IMEDIATAS</h3>
                  {lines.length === 0 ? (
                    <p className="event-block__empty">
                      Sem alteração direta nos atributos do jogador.
                    </p>
                  ) : (
                    <ul className="event-effects">
                      {lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  )}
                  <p className="event-block__note">
                    Aplicado a {player?.name}, jogador do turno.
                  </p>
                </section>

                <section
                  className="event-block"
                  aria-labelledby="event-assets-title"
                >
                  <h3 id="event-assets-title">ATIVOS AFETADOS</h3>
                  {priceChanges.length === 0 ? (
                    <p className="event-block__empty">
                      Nenhum ativo teve o preço alterado.
                    </p>
                  ) : (
                    <ul className="event-assets">
                      {priceChanges.map((change) => {
                        const asset = game.market.assets.find(
                          (item) => item.id === change.assetId,
                        )
                        const up = change.changePercent >= 0
                        return (
                          <li key={change.assetId}>
                            <span
                              className="event-assets__dot"
                              style={{ backgroundColor: asset?.color }}
                            />
                            <strong>{asset?.symbol ?? change.assetId}</strong>
                            <span
                              className={`event-assets__change ${
                                up ? 'is-up' : 'is-down'
                              }`}
                            >
                              {up ? (
                                <ArrowUpRight size={12} aria-hidden="true" />
                              ) : (
                                <ArrowDownRight size={12} aria-hidden="true" />
                              )}
                              {formatPercent(change.changePercent)}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                  <p className="event-block__note">
                    Os novos preços valem para todo o mercado.
                  </p>
                </section>
              </div>

      <button
        type="button"
        className="btn btn--accent event-modal__resolve"
        onClick={handleResolve}
      >
        RESOLVER EVENTO
        <Zap size={18} aria-hidden="true" />
      </button>
    </div>
      </motion.section>
    </motion.div>
  )
}
