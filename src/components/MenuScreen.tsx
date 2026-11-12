import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Play,
  RotateCcw,
} from 'lucide-react'
import { BOARD_TILES } from '../game/board/tiles'
import { TOTAL_ROUNDS } from '../game/constants'
import { CHALLENGES } from '../data/questions'
import { EVENTS } from '../game/events/events'
import { Brand } from './Brand'
import './MenuScreen.css'

interface MenuScreenProps {
  hasActiveGame: boolean
  gameFinished: boolean
  onPlay: () => void
  onContinue: () => void
  onManual: () => void
  onCredits: () => void
}

const RING_TILES = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2
  return {
    id: index,
    left: 50 + Math.cos(angle) * 38,
    top: 50 + Math.sin(angle) * 38,
    variant: index % 4,
  }
})

const STATS = [
  { value: String(BOARD_TILES.length), label: 'casas' },
  { value: String(CHALLENGES.length), label: 'desafios' },
  { value: String(EVENTS.length), label: 'eventos' },
  { value: String(TOTAL_ROUNDS), label: 'rodadas' },
]

export function MenuScreen({
  hasActiveGame,
  gameFinished,
  onPlay,
  onContinue,
  onManual,
  onCredits,
}: MenuScreenProps) {
  return (
    <motion.main
      className="menu-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <header className="menu-topbar">
        <Brand />
        <span className="menu-topbar__tag">
          MERCADO FINANCEIRO EDUCACIONAL
        </span>
      </header>

      <section className="menu-hero">
        <div className="menu-hero__copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            BLOCKCHAIN · MERCADO · ESTRATÉGIA
          </motion.p>

          <motion.h1
            className="menu-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.5 }}
          >
            O MERCADO
            <br />
            É O <span>TABULEIRO.</span>
          </motion.h1>

          <motion.p
            className="menu-intro"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
          >
            Compre ativos, atravesse 30 casas e prove que entende de
            blockchain. Vencer não é só ter mais dinheiro: conhecimento,
            segurança e reputação decidem a partida.
          </motion.p>

          <motion.div
            className="menu-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button type="button" className="btn btn--primary btn--lg" onClick={onPlay}>
              <Play size={18} aria-hidden="true" />
              JOGAR
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            {hasActiveGame && (
              <button
                type="button"
                className="btn btn--accent btn--lg"
                onClick={onContinue}
              >
                <RotateCcw size={18} aria-hidden="true" />
                {gameFinished ? 'VER RESULTADO' : 'CONTINUAR'}
              </button>
            )}
            <button type="button" className="btn btn--ghost btn--lg" onClick={onManual}>
              <BookOpen size={18} aria-hidden="true" />
              COMO JOGAR
            </button>
            <button type="button" className="btn btn--ghost btn--lg" onClick={onCredits}>
              <Award size={18} aria-hidden="true" />
              CRÉDITOS
            </button>
          </motion.div>

          <motion.dl
            className="menu-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {STATS.map((stat) => (
              <div className="menu-stats__item" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="menu-visual"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="menu-visual__cross menu-visual__cross--x" />
          <div className="menu-visual__cross menu-visual__cross--y" />
          <div className="menu-visual__ring" />
          <motion.div
            className="menu-visual__orbit"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {RING_TILES.map((tile) => (
              <span
                key={tile.id}
                className={`menu-visual__tile menu-visual__tile--${tile.variant}`}
                style={{ left: `${tile.left}%`, top: `${tile.top}%` }}
              />
            ))}
          </motion.div>
          <div className="menu-visual__core">
            <span className="menu-visual__core-index">//</span>
            <strong>30</strong>
            <span>CASAS</span>
          </div>
          <div className="menu-visual__label menu-visual__label--top">
            PREÇO
            <br />
            &gt; VOLATILIDADE
          </div>
          <div className="menu-visual__label menu-visual__label--bottom">
            COMPRE
            <br />
            &gt; APRENDA
          </div>
        </motion.div>
      </section>

      <footer className="menu-footer">
        <span>BLOCK//RUSH — v0.2</span>
        <span>DESIGN: SWISS MINIMALISM + BAUHAUS FINANCE</span>
        <span>DEVELOPED BY XPZ</span>
        <span>DADOS DE MERCADO SIMULADOS</span>
      </footer>
    </motion.main>
  )
}
