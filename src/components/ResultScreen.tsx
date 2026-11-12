import { motion } from 'framer-motion'
import {
  Activity,
  Brain,
  Crown,
  Home,
  RotateCcw,
  ShieldCheck,
  Star,
  Trophy,
  Wallet,
} from 'lucide-react'
import type { GameState } from '../types/game'
import { SCORE_CONFIG } from '../game/engine'
import { useGameStore } from '../store/gameStore'
import {
  formatMoney,
  formatNumber,
  formatPercent,
} from '../utils/format'
import { Brand } from './Brand'
import './ResultScreen.css'

interface ResultScreenProps {
  game: GameState
  onPlayAgain: () => void
  onMenu: () => void
}

export function ResultScreen({
  game,
  onPlayAgain,
  onMenu,
}: ResultScreenProps) {
  const restartGame = useGameStore((state) => state.restartGame)
  const resetGame = useGameStore((state) => state.resetGame)
  const result = game.result

  const handlePlayAgain = () => {
    restartGame()
    const state = useGameStore.getState()
    if (!state.error && state.game) {
      onPlayAgain()
    }
  }

  const handleMenu = () => {
    resetGame()
    onMenu()
  }

  if (!result) return null

  const winner = result.players[0]
  const runnerUp = result.players[1]
  const winnerPlayer = game.players.find(
    (player) => player.id === result.winnerId,
  )
  const margin = winner && runnerUp ? winner.score - runnerUp.score : 0
  const challengeCount = game.logs.filter(
    (log) =>
      log.type === 'challenge' &&
      !log.message.startsWith('Desafio sorteado'),
  ).length
  const eventCount = game.logs.filter(
    (log) => log.type === 'event' && !log.message.startsWith('Evento sorteado'),
  ).length

  const assetChanges = game.market.assets.map((asset) => {
    const price = game.market.prices[asset.id]
    return {
      asset,
      change: asset.initialPrice === 0 ? 0 : (price - asset.initialPrice) / asset.initialPrice,
    }
  })
  const bestAsset = [...assetChanges].sort((a, b) => b.change - a.change)[0]
  const worstAsset = [...assetChanges].sort((a, b) => a.change - b.change)[0]

  const summaryItems = [
    {
      label: 'RODADAS JOGADAS',
      value: String(result.roundsPlayed).padStart(2, '0'),
      Icon: Activity,
    },
    {
      label: 'OPERAÇÕES',
      value: String(game.transactions.length).padStart(2, '0'),
      Icon: Wallet,
    },
    {
      label: 'DESAFIOS RESPONDIDOS',
      value: String(challengeCount).padStart(2, '0'),
      Icon: Brain,
    },
    {
      label: 'EVENTOS APLICADOS',
      value: String(eventCount).padStart(2, '0'),
      Icon: ShieldCheck,
    },
  ]

  return (
    <motion.main
      className="result-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className="result-topbar">
        <Brand compact />
        <span className="result-topbar__label">FIM DA TEMPORADA</span>
        <button type="button" className="btn btn--ghost btn--sm" onClick={handleMenu}>
          <Home size={16} aria-hidden="true" />
          MENU
        </button>
      </header>

      <div className="result-layout">
        <motion.section
          className="result-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45 }}
        >
          <div className="result-hero__flag">
            <Trophy size={18} aria-hidden="true" />
            VENCEDOR
          </div>

          <div className="result-hero__winner">
            <span
              className="result-hero__pawn"
              style={{ backgroundColor: winnerPlayer?.color ?? '#F7931A' }}
            >
              <Crown size={26} aria-hidden="true" />
            </span>
            <div>
              <span className="eyebrow">CAMPEÃO DA TEMPORADA</span>
              <h1>{result.winnerName}</h1>
              <p>
                {margin > 0 && runnerUp
                  ? `${formatNumber(margin)} pontos de vantagem sobre ${runnerUp.name}.`
                  : 'Vitória decidida nos critérios de desempate.'}
              </p>
            </div>
          </div>

          <div className="result-hero__score">
            <div>
              <span>PONTUAÇÃO FINAL</span>
              <strong>{formatNumber(winner?.score ?? 0)}</strong>
            </div>
            <div>
              <span>PATRIMÔNIO</span>
              <strong>{formatMoney(winner?.netWorth ?? 0)}</strong>
            </div>
          </div>

          <div className="result-hero__stats">
            <div>
              <Brain size={15} aria-hidden="true" />
              <span>CONHECIMENTO</span>
              <strong>{formatNumber(winner?.knowledge ?? 0)}</strong>
            </div>
            <div>
              <ShieldCheck size={15} aria-hidden="true" />
              <span>SEGURANÇA</span>
              <strong>{formatNumber(winner?.security ?? 0)}</strong>
            </div>
            <div>
              <Star size={15} aria-hidden="true" />
              <span>REPUTAÇÃO</span>
              <strong>{formatNumber(winner?.reputation ?? 0)}</strong>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="result-ranking"
          aria-labelledby="ranking-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
        >
          <div className="result-section-head">
            <h2 id="ranking-title">RANKING FINAL</h2>
            <span>{result.players.length} JOGADORES</span>
          </div>

          <ol className="ranking-list">
            {result.players.map((entry) => {
              const player = game.players.find(
                (item) => item.id === entry.playerId,
              )
              const isWinner = entry.playerId === result.winnerId
              return (
                <li
                  key={entry.playerId}
                  className={`ranking-row ${isWinner ? 'is-winner' : ''}`}
                >
                  <span className="ranking-row__rank">
                    {String(entry.rank).padStart(2, '0')}
                  </span>
                  <span
                    className="ranking-row__color"
                    style={{ backgroundColor: player?.color }}
                  />
                  <div className="ranking-row__identity">
                    <strong>{entry.name}</strong>
                    <span>
                      {player?.portfolio.holdings.length ?? 0} ativos em carteira
                    </span>
                  </div>
                  <div className="ranking-row__stat">
                    <span>PATRIMÔNIO</span>
                    <strong>{formatMoney(entry.netWorth)}</strong>
                  </div>
                  <div className="ranking-row__attrs">
                    <span title="Conhecimento">
                      <Brain size={11} aria-hidden="true" />
                      {formatNumber(entry.knowledge)}
                    </span>
                    <span title="Segurança">
                      <ShieldCheck size={11} aria-hidden="true" />
                      {formatNumber(entry.security)}
                    </span>
                    <span title="Reputação">
                      <Star size={11} aria-hidden="true" />
                      {formatNumber(entry.reputation)}
                    </span>
                  </div>
                  <div className="ranking-row__score">
                    <span>PONTOS</span>
                    <strong>{formatNumber(entry.score)}</strong>
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="result-equation">
            <span>PONTUAÇÃO =</span>
            <strong>PATRIMÔNIO / {SCORE_CONFIG.netWorthDivisor}</strong>
            <span>+</span>
            <strong>CONHECIMENTO × {SCORE_CONFIG.knowledgeWeight}</strong>
            <span>+</span>
            <strong>SEGURANÇA × {SCORE_CONFIG.securityWeight}</strong>
            <span>+</span>
            <strong>REPUTAÇÃO × {SCORE_CONFIG.reputationWeight}</strong>
          </div>
        </motion.section>

        <motion.section
          className="result-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.19, duration: 0.45 }}
        >
          <div className="result-section-head">
            <h2>RESUMO DA PARTIDA</h2>
            <span>DADOS REAIS DA STORE</span>
          </div>

          <p className="result-summary__text">
            {result.winnerName} venceu ao fim de {result.roundsPlayed} rodadas,
            com {formatMoney(winner?.netWorth ?? 0)} de patrimônio e{' '}
            {formatNumber(winner?.score ?? 0)} pontos. Foram{' '}
            {game.transactions.length} operações de mercado, {challengeCount}{' '}
            desafios respondidos e {eventCount} eventos aplicados.
          </p>

          <div className="result-summary__grid">
            {summaryItems.map((item) => (
              <div className="summary-stat" key={item.label}>
                <item.Icon size={16} aria-hidden="true" />
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
            {bestAsset && (
              <div
                className={`summary-stat ${
                  bestAsset.change >= 0
                    ? 'summary-stat--up'
                    : 'summary-stat--down'
                }`}
              >
                <Activity size={16} aria-hidden="true" />
                <span>
                  {bestAsset.change >= 0 ? 'MAIOR ALTA' : 'MENOR QUEDA'} ·{' '}
                  {bestAsset.asset.symbol}
                </span>
                <strong>{formatPercent(bestAsset.change)}</strong>
              </div>
            )}
            {worstAsset && (
              <div
                className={`summary-stat ${
                  worstAsset.change < 0
                    ? 'summary-stat--down'
                    : 'summary-stat--up'
                }`}
              >
                <Activity size={16} aria-hidden="true" />
                <span>
                  {worstAsset.change < 0 ? 'MAIOR QUEDA' : 'MENOR ALTA'} ·{' '}
                  {worstAsset.asset.symbol}
                </span>
                <strong>{formatPercent(worstAsset.change)}</strong>
              </div>
            )}
          </div>

          <div className="result-actions">
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={handlePlayAgain}
            >
              <RotateCcw size={18} aria-hidden="true" />
              JOGAR NOVAMENTE
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--lg"
              onClick={handleMenu}
            >
              <Home size={18} aria-hidden="true" />
              VOLTAR AO MENU
            </button>
          </div>
        </motion.section>
      </div>
    </motion.main>
  )
}
