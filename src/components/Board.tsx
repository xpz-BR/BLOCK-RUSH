import { motion } from 'framer-motion'
import {
  BookOpen,
  Check,
  Dices,
  LineChart,
  Network,
  ShieldCheck,
  Sparkles,
  Zap,
  Boxes,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type {
  BoardTile,
  GameState,
  TileCategory,
} from '../types/game'
import { formatMoney, formatNumber, initials } from '../utils/format'
import './Board.css'

interface BoardProps {
  game: GameState
  rolling: boolean
  onRoll: () => void
  onEndTurn: () => void
  onSkipMarket: () => void
}

interface CategoryMeta {
  label: string
  short: string
  Icon: LucideIcon
}

const CATEGORY_META: Record<TileCategory, CategoryMeta> = {
  MARKET: { label: 'Mercado', short: 'MKT', Icon: LineChart },
  VALIDATION: { label: 'Validação', short: 'VAL', Icon: Boxes },
  SECURITY: { label: 'Segurança', short: 'SEC', Icon: ShieldCheck },
  EVENT: { label: 'Evento', short: 'EVT', Icon: Zap },
  KNOWLEDGE: { label: 'Conhecimento', short: 'CON', Icon: BookOpen },
  OPPORTUNITY: { label: 'Oportunidade', short: 'OPP', Icon: Sparkles },
  NETWORK_FEE: { label: 'Taxa de rede', short: 'FEE', Icon: Network },
}

const DICE_PIPS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
}

function categoryClass(category: TileCategory): string {
  return category.toLowerCase().replaceAll('_', '-')
}

function tileEffect(tile: BoardTile): string {
  switch (tile.category) {
    case 'MARKET':
      return 'Abre a janela de negociação.'
    case 'VALIDATION':
    case 'SECURITY':
    case 'KNOWLEDGE':
      return 'Sorteia um desafio educativo.'
    case 'EVENT':
      return 'Sorteia um evento que altera o mercado.'
    case 'NETWORK_FEE':
      return `Cobra ${formatMoney(tile.fee ?? 0)} de taxa.`
    case 'OPPORTUNITY': {
      const parts: string[] = []
      if (tile.opportunity?.cash) {
        parts.push(`${formatMoney(tile.opportunity.cash)} de saldo`)
      }
      if (tile.opportunity?.knowledge) {
        parts.push(`+${formatNumber(tile.opportunity.knowledge)} conhecimento`)
      }
      if (tile.opportunity?.security) {
        parts.push(`+${formatNumber(tile.opportunity.security)} segurança`)
      }
      if (tile.opportunity?.reputation) {
        parts.push(`+${formatNumber(tile.opportunity.reputation)} reputação`)
      }
      return parts.length > 0 ? parts.join(' · ') : 'Efeito imediato.'
    }
    default:
      return 'Casa do tabuleiro.'
  }
}

function Dice({ value, rolling }: { value: number | null; rolling: boolean }) {
  const pips = value ? DICE_PIPS[value] ?? [] : []

  return (
    <motion.div
      className={`board-dice ${rolling ? 'is-rolling' : ''}`}
      animate={rolling ? { rotate: [0, 90, 180, 270, 360] } : { rotate: 0 }}
      transition={
        rolling
          ? { duration: 0.55, repeat: Infinity, ease: 'linear' }
          : { type: 'spring', stiffness: 220, damping: 18 }
      }
      aria-label={value ? `Dado: ${value}` : 'Dado ainda não rolado'}
    >
      {rolling || value === null ? (
        <Dices size={28} aria-hidden="true" />
      ) : (
        <div className="board-dice__face" key={value}>
          {Array.from({ length: 9 }, (_, index) => (
            <span
              key={index}
              className={pips.includes(index) ? 'is-pip' : ''}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

function coordinates(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    x: 50 + Math.cos(angle) * 41.5,
    y: 50 + Math.sin(angle) * 41.5,
  }
}

export function Board({
  game,
  rolling,
  onRoll,
  onEndTurn,
  onSkipMarket,
}: BoardProps) {
  const currentPlayer = game.players[game.currentPlayerIndex]
  const currentTile = game.board[currentPlayer?.position ?? 0]
  const pendingType = game.pendingDecision?.type
  const canRoll = game.phase === 'awaiting-roll'

  return (
    <div className="board-wrap">
      <div className="board" role="list" aria-label="Tabuleiro circular">
        <div className="board__grid" aria-hidden="true" />
        <div className="board__ring board__ring--outer" aria-hidden="true" />
        <div className="board__ring board__ring--inner" aria-hidden="true" />

        {game.board.map((tile) => {
          const position = coordinates(tile.index, game.board.length)
          const meta = CATEGORY_META[tile.category]
          const Icon = meta.Icon
          const isCurrent = currentPlayer?.position === tile.index

          return (
            <div
              key={tile.id}
              className={[
                'board-tile',
                `board-tile--${categoryClass(tile.category)}`,
                isCurrent ? 'is-current' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              role="listitem"
              aria-label={`${tile.index + 1}. ${tile.name} — ${meta.label}`}
              title={`${tile.index + 1}. ${tile.name} — ${meta.label}`}
            >
              <span className="board-tile__index">
                {String(tile.index + 1).padStart(2, '0')}
              </span>
              <Icon size={15} strokeWidth={2.2} aria-hidden="true" />
              <span className="board-tile__short">{meta.short}</span>
            </div>
          )
        })}

        {game.players.map((player, playerIndex) => {
          const position = coordinates(player.position, game.board.length)
          const occupants = game.players.filter(
            (item) => item.position === player.position,
          )
          const slot = occupants.findIndex((item) => item.id === player.id)
          const total = occupants.length
          const offsetX = total > 1 ? (slot - (total - 1) / 2) * 14 : 0
          const offsetY = total > 1 ? (slot % 2 === 0 ? -3 : 5) : 0
          const isCurrent = player.id === currentPlayer?.id

          return (
            <motion.div
              key={player.id}
              className={`board-pawn ${isCurrent ? 'is-current' : ''}`}
              style={{
                backgroundColor: player.color,
                borderColor:
                  player.color === '#F4F5F2' ? '#202124' : '#F4F5F2',
                transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
                zIndex: isCurrent ? 8 : 6 + playerIndex,
              }}
              initial={false}
              animate={{ left: `${position.x}%`, top: `${position.y}%` }}
              transition={{ type: 'spring', stiffness: 130, damping: 18 }}
              title={`${player.name} — casa ${player.position + 1}`}
              aria-label={`${player.name} na casa ${player.position + 1}`}
            >
              {initials(player.name)}
            </motion.div>
          )
        })}

        <div className="board-center">
          <div className="board-center__brand">
            <span>BLOCK</span>
            <span className="board-center__slash">//</span>
            <span>RUSH</span>
          </div>

          <div className="board-center__round">
            <span>RODADA</span>
            <strong>
              {String(game.round).padStart(2, '0')}
              <small>/{String(game.rules.maxRounds).padStart(2, '0')}</small>
            </strong>
          </div>

          <div className="board-center__turn">
            <span
              className="board-center__dot"
              style={{ backgroundColor: currentPlayer?.color }}
            />
            <span>VEZ DE</span>
            <strong>{currentPlayer?.name}</strong>
          </div>

          <Dice value={game.lastRoll} rolling={rolling} />

          {canRoll && (
            <button
              type="button"
              className="btn btn--primary board-center__action"
              onClick={onRoll}
              disabled={rolling}
            >
              <Dices size={18} aria-hidden="true" />
              {rolling ? 'ROLANDO...' : 'ROLAR DADO'}
            </button>
          )}

          {game.phase === 'awaiting-end-turn' && (
            <button
              type="button"
              className="btn btn--primary board-center__action"
              onClick={onEndTurn}
            >
              ENCERRAR TURNO
              <Check size={18} aria-hidden="true" />
            </button>
          )}

          {game.phase === 'awaiting-decision' && pendingType === 'market' && (
            <button
              type="button"
              className="btn btn--accent board-center__action"
              onClick={onSkipMarket}
            >
              CONCLUIR MERCADO
              <Check size={18} aria-hidden="true" />
            </button>
          )}

          {game.phase === 'awaiting-decision' &&
            (pendingType === 'challenge' || pendingType === 'event') && (
              <div className="board-center__lock">
                <span>DECISÃO PENDENTE</span>
                <strong>
                  {pendingType === 'challenge'
                    ? 'Responda o desafio'
                    : 'Resolva o evento'}
                </strong>
              </div>
            )}

          <div className="board-center__hint">
            {game.phase === 'awaiting-roll' &&
              'Role o dado e avance no tabuleiro.'}
            {game.phase === 'awaiting-end-turn' &&
              'Negocie no painel de mercado ou encerre o turno.'}
            {game.phase === 'awaiting-decision' &&
              pendingType === 'market' &&
              'Compre ou venda e conclua a janela.'}
          </div>
        </div>
      </div>

      <div className="board-legend" aria-label="Legenda de categorias">
        {Object.entries(CATEGORY_META).map(([category, meta]) => {
          const Icon = meta.Icon
          return (
            <span className="board-legend__item" key={category}>
              <Icon size={12} aria-hidden="true" />
              {meta.label}
            </span>
          )
        })}
      </div>

      {currentTile && (
        <motion.section
          className="tile-info"
          key={`${currentTile.id}-${currentPlayer?.id}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="tile-info__index">
            <span>CASA</span>
            <strong>{String(currentTile.index + 1).padStart(2, '0')}</strong>
          </div>
          <div className="tile-info__body">
            <span className="tile-info__category">
              {CATEGORY_META[currentTile.category].label}
            </span>
            <h3>{currentTile.name}</h3>
            <p>{currentTile.description}</p>
          </div>
          <div className="tile-info__effect">
            <span>EFEITO</span>
            <strong>{tileEffect(currentTile)}</strong>
          </div>
        </motion.section>
      )}
    </div>
  )
}
