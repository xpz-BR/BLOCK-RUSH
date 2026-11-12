import { motion } from 'framer-motion'
import {
  Brain,
  CircleDollarSign,
  ShieldCheck,
  Star,
  Wallet,
} from 'lucide-react'
import type { GameState } from '../types/game'
import {
  calculateNetWorth,
  calculatePlayerScore,
} from '../game/engine'
import { formatMoney } from '../utils/format'
import './PlayerHud.css'

interface PlayerHudProps {
  game: GameState
}

export function PlayerHud({ game }: PlayerHudProps) {
  const currentPlayer = game.players[game.currentPlayerIndex]

  return (
    <aside className="player-hud" aria-label="Jogadores">
      <div className="rail-head">
        <span>JOGADORES</span>
        <span className="rail-head__count">
          {String(game.players.length).padStart(2, '0')}
        </span>
      </div>

      <div className="player-hud__list">
        {game.players.map((player, index) => {
          const isCurrent = player.id === currentPlayer?.id
          const netWorth = calculateNetWorth(game, player.id)
          const score = calculatePlayerScore(game, player.id)
          const holdingsCount = player.portfolio.holdings.length

          return (
            <motion.article
              key={player.id}
              className={`player-card ${isCurrent ? 'is-current' : ''}`}
              style={{ borderLeftColor: player.color }}
              layout
              initial={false}
              transition={{ duration: 0.25 }}
            >
              <div className="player-card__top">
                <span
                  className="player-card__pawn"
                  style={{ backgroundColor: player.color }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="player-card__identity">
                  <span className="player-card__name">{player.name}</span>
                  <span className="player-card__status">
                    {isCurrent ? 'JOGANDO AGORA' : 'AGUARDANDO'}
                  </span>
                </div>
                {isCurrent && <span className="player-card__turn">VEZ</span>}
              </div>

              <div className="player-card__money">
                <div>
                  <span>
                    <Wallet size={12} aria-hidden="true" /> SALDO
                  </span>
                  <strong>{formatMoney(player.portfolio.cash)}</strong>
                </div>
                <div>
                  <span>
                    <CircleDollarSign size={12} aria-hidden="true" /> PATRIMÔNIO
                  </span>
                  <strong>{formatMoney(netWorth)}</strong>
                </div>
              </div>

              <div className="player-card__stats">
                <div title="Conhecimento">
                  <Brain size={13} aria-hidden="true" />
                  <strong>{player.knowledge}</strong>
                  <span>CON</span>
                </div>
                <div title="Segurança">
                  <ShieldCheck size={13} aria-hidden="true" />
                  <strong>{player.security}</strong>
                  <span>SEG</span>
                </div>
                <div title="Reputação">
                  <Star size={13} aria-hidden="true" />
                  <strong>{player.reputation}</strong>
                  <span>REP</span>
                </div>
              </div>

              <div className="player-card__footer">
                <span>
                  {holdingsCount === 0
                    ? 'SEM ATIVOS'
                    : `${holdingsCount} ${
                        holdingsCount === 1 ? 'ATIVO' : 'ATIVOS'
                      }`}
                </span>
                <span>
                  PONTOS <strong>{String(score).padStart(3, '0')}</strong>
                </span>
              </div>
            </motion.article>
          )
        })}
      </div>
    </aside>
  )
}
