import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Boxes,
  Braces,
  Layers,
  Package,
  Sparkles,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CHALLENGES } from '../data/questions'
import { BOARD_TILES } from '../game/board/tiles'
import { EVENTS } from '../game/events/events'
import { Brand } from './Brand'
import './CreditsScreen.css'

interface CreditsScreenProps {
  onBack: () => void
}

interface CreditItem {
  label: string
  value: string
}

const STACK: Array<{ name: string; role: string; Icon: LucideIcon }> = [
  { name: 'React', role: 'Interface e componentes', Icon: Layers },
  { name: 'TypeScript', role: 'Tipagem do estado e do motor', Icon: Braces },
  { name: 'Zustand', role: 'Estado global da partida', Icon: Workflow },
  { name: 'Framer Motion', role: 'Transições e microinterações', Icon: Sparkles },
  { name: 'Lucide', role: 'Ícones vetoriais', Icon: Boxes },
  { name: 'Vite', role: 'Build e ambiente de desenvolvimento', Icon: Package },
]

const GAME_CREDITS: CreditItem[] = [
  { label: 'CONCEITO', value: 'Jogo de tabuleiro educativo sobre blockchain e finanças' },
  { label: 'MOTOR', value: 'Regras, mercado, desafios, eventos e pontuação em TypeScript' },
  { label: 'INTERFACE', value: 'Swiss Minimalism + Bauhaus Finance' },
  { label: 'CONTEÚDO', value: `${BOARD_TILES.length} casas, ${CHALLENGES.length} desafios e ${EVENTS.length} eventos` },
  { label: 'TESTES', value: 'Suíte automatizada do motor validada antes da interface' },
]

export function CreditsScreen({ onBack }: CreditsScreenProps) {
  return (
    <motion.main
      className="credits-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className="credits-topbar">
        <Brand compact />
        <button type="button" className="btn btn--ghost btn--sm" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" />
          VOLTAR
        </button>
      </header>

      <div className="credits-layout">
        <section className="credits-hero">
          <p className="eyebrow">CRÉDITOS E TRANSPARÊNCIA</p>
          <h1>
            FEITO PARA
            <br />
            <span>APRENDER.</span>
          </h1>
          <p>
            BLOCK//RUSH nasceu para tornar decisões de mercado, conceitos de
            blockchain e segurança digital algo tangível. O jogo não substitui
            orientação financeira: todos os preços, eventos e resultados são
            simulados pelo motor.
          </p>

          <div className="credits-stamp">
            <span>VERSÃO</span>
            <strong>0.2</strong>
            <span>FASE</span>
            <strong>02</strong>
          </div>
        </section>

        <section className="credits-stack" aria-labelledby="credits-stack-title">
          <div className="credits-section-head">
            <h2 id="credits-stack-title">STACK DO PROJETO</h2>
            <span>TECNOLOGIA REAL</span>
          </div>
          <div className="credits-stack__grid">
            {STACK.map((item, index) => (
              <div className="stack-card" key={item.name}>
                <span className="stack-card__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <item.Icon size={18} aria-hidden="true" />
                <strong>{item.name}</strong>
                <p>{item.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="credits-authors" aria-labelledby="credits-authors-title">
          <div className="credits-section-head">
            <h2 id="credits-authors-title">CRÉDITOS OFICIAIS</h2>
            <span>BLOCK//RUSH</span>
          </div>

          <div className="credits-authors__grid">
            <div className="credits-author credits-author--creators">
              <span className="credits-author__label">CREATED BY</span>
              <div className="credits-author__names">
                <strong>Vitor</strong>
                <span className="credits-author__amp">&amp;</span>
                <strong>Clara</strong>
              </div>
              <p>Criadores do projeto</p>
            </div>

            <div className="credits-author credits-author--dev">
              <span className="credits-author__label">DEVELOPED BY</span>
              <strong className="credits-author__org">XPZ Dev</strong>
              <div className="credits-author__identity">
                <span>DEVELOPER IDENTITY</span>
                <strong>xispedev</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="credits-detail" aria-labelledby="credits-detail-title">
          <div className="credits-section-head">
            <h2 id="credits-detail-title">SOBRE O JOGO</h2>
            <span>FICHA TÉCNICA</span>
          </div>
          <dl className="credits-list">
            {GAME_CREDITS.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="credits-disclaimer">
            <Sparkles size={18} aria-hidden="true" />
            <div>
              <strong>AVISO EDUCACIONAL</strong>
              <p>
                Este é um jogo educativo. Os ativos BTC, ETH, AQUA e CORAL são
                usados em um ambiente simulado, com preços e eventos gerados
                pelo próprio jogo. Nada aqui constitui recomendação de
                investimento.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn--primary btn--lg credits-back"
            onClick={onBack}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            VOLTAR AO MENU
          </button>
        </section>
      </div>

      <footer className="credits-footer">
        <span>BLOCK//RUSH — MERCADO FINANCEIRO EDUCACIONAL</span>
        <span>DEVELOPED BY XPZ</span>
        <span>SEM DADOS DE MERCADO REAIS</span>
      </footer>
    </motion.main>
  )
}
