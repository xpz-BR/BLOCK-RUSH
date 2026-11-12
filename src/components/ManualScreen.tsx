import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Coins,
  Dices,
  LineChart,
  Percent,
  ShieldCheck,
  Target,
  Trophy,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BOARD_TILES } from '../game/board/tiles'
import {
  MAX_PLAYERS,
  MIN_PLAYERS,
  MIN_TRANSACTION_FEE,
  STARTING_CASH,
  TOTAL_ROUNDS,
  TRANSACTION_FEE_RATE,
} from '../game/constants'
import { SCORE_CONFIG } from '../game/engine'
import { CHALLENGES } from '../data/questions'
import { EVENTS } from '../game/events/events'
import { formatMoney } from '../utils/format'
import { Brand } from './Brand'
import './ManualScreen.css'

interface ManualScreenProps {
  onBack: () => void
}

interface ManualSection {
  id: string
  index: string
  title: string
  Icon: LucideIcon
}

const SECTIONS: ManualSection[] = [
  { id: 'objetivo', index: '01', title: 'Objetivo', Icon: Target },
  { id: 'regras', index: '02', title: 'Regras', Icon: BookOpen },
  { id: 'turnos', index: '03', title: 'Turnos', Icon: Dices },
  { id: 'mercado', index: '04', title: 'Mercado', Icon: LineChart },
  { id: 'desafios', index: '05', title: 'Desafios', Icon: Brain },
  { id: 'eventos', index: '06', title: 'Eventos', Icon: Zap },
  { id: 'pontuacao', index: '07', title: 'Pontuação', Icon: Percent },
  { id: 'vitoria', index: '08', title: 'Vitória', Icon: Trophy },
]

const tileCount = BOARD_TILES.length
const challengeCount = CHALLENGES.length
const eventCount = EVENTS.length
const networkFeeTiles = BOARD_TILES.filter(
  (tile) => tile.category === 'NETWORK_FEE',
).length

export function ManualScreen({ onBack }: ManualScreenProps) {
  return (
    <motion.main
      className="manual-screen"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <header className="manual-topbar">
        <Brand compact />
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={onBack}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          VOLTAR
        </button>
      </header>

      <div className="manual-hero">
        <div>
          <p className="eyebrow">MANUAL DO JOGADOR</p>
          <h1>
            APRENDA
            <br />O <span>JOGO.</span>
          </h1>
          <p className="manual-hero__intro">
            BLOCK//RUSH é um jogo de tabuleiro educativo sobre blockchain e
            mercado financeiro. Você toma decisões de investimento, responde a
            desafios e reage a eventos que mudam os preços dos ativos.
          </p>
        </div>

        <dl className="manual-hero__stats">
          <div>
            <dt>CASAS</dt>
            <dd>{tileCount}</dd>
          </div>
          <div>
            <dt>DESAFIOS</dt>
            <dd>{challengeCount}</dd>
          </div>
          <div>
            <dt>EVENTOS</dt>
            <dd>{eventCount}</dd>
          </div>
          <div>
            <dt>RODADAS</dt>
            <dd>{TOTAL_ROUNDS}</dd>
          </div>
        </dl>
      </div>

      <div className="manual-layout">
        <nav className="manual-nav" aria-label="Índice do manual">
          <span className="manual-nav__label">ÍNDICE</span>
          {SECTIONS.map((section) => (
            <a key={section.id} href={`#manual-${section.id}`}>
              <span>{section.index}</span>
              {section.title}
              <ArrowRight size={12} aria-hidden="true" />
            </a>
          ))}
        </nav>

        <article className="manual-content">
          <section id="manual-objetivo" className="manual-section">
            <div className="manual-section__head">
              <span>01</span>
              <h2>Objetivo</h2>
              <Target size={20} aria-hidden="true" />
            </div>
            <p>
              Terminar a temporada com a maior pontuação. Dinheiro importa, mas
              não é tudo: a pontuação combina patrimônio, conhecimento,
              segurança e reputação. Um jogador com menos saldo pode vencer se
              tiver construído atributos melhores ao longo da partida.
            </p>
            <div className="manual-callout">
              <Coins size={18} aria-hidden="true" />
              <div>
                <strong>Saldo inicial</strong>
                <span>
                  Cada jogador começa com {formatMoney(STARTING_CASH)} e uma
                  carteira vazia.
                </span>
              </div>
            </div>
          </section>

          <section id="manual-regras" className="manual-section">
            <div className="manual-section__head">
              <span>02</span>
              <h2>Regras</h2>
              <BookOpen size={20} aria-hidden="true" />
            </div>
            <ul className="manual-list">
              <li>
                A partida recebe de {MIN_PLAYERS} a {MAX_PLAYERS} jogadores,
                todos controlando suas decisões localmente.
              </li>
              <li>
                Cada jogador começa na casa 01 e percorre o tabuleiro circular
                de {tileCount} casas.
              </li>
              <li>
                A temporada dura {TOTAL_ROUNDS} rodadas. Em cada rodada, todos
                os jogadores jogam uma vez.
              </li>
              <li>
                As casas são divididas em mercado, validação, segurança, evento,
                conhecimento, oportunidade e taxa de rede.
              </li>
              <li>
                Toda ação precisa respeitar a fase atual. Quando existe uma
                decisão pendente de desafio ou evento, o tabuleiro e o mercado
                ficam bloqueados até a resolução.
              </li>
              <li>
                Existem {networkFeeTiles} casas de taxa de rede, que cobram
                valores fixos do jogador do turno.
              </li>
            </ul>

            <div className="manual-categories">
              {[
                ['MARKET', 'Abre a janela de negociação de ativos.'],
                ['VALIDATION', 'Sorteia um desafio de blockchain.'],
                ['SECURITY', 'Sorteia um desafio de segurança.'],
                ['KNOWLEDGE', 'Sorteia um desafio de conhecimento.'],
                ['EVENT', 'Aplica um evento que altera o mercado.'],
                ['OPPORTUNITY', 'Concede saldo ou atributos imediatamente.'],
                ['NETWORK_FEE', 'Cobra uma taxa fixa do jogador.'],
              ].map(([category, description]) => (
                <div key={category}>
                  <span>{category}</span>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="manual-turnos" className="manual-section">
            <div className="manual-section__head">
              <span>03</span>
              <h2>Turnos</h2>
              <Dices size={20} aria-hidden="true" />
            </div>
            <ol className="manual-steps">
              <li>
                <strong>Role o dado.</strong> O resultado é sempre de 1 a 6 e
                move o peão para frente.
              </li>
              <li>
                <strong>Resolva a casa.</strong> O motor aplica o efeito, abre
                uma janela de mercado ou cria uma decisão pendente.
              </li>
              <li>
                <strong>Tome decisões.</strong> Responda ao desafio, resolva o
                evento ou negocie ativos na janela de mercado.
              </li>
              <li>
                <strong>Encerre o turno.</strong> Só é possível encerrar sem
                decisões pendentes. Ao encerrar, o mercado varia e o próximo
                jogador assume.
              </li>
            </ol>
            <p className="manual-note">
              A janela de mercado pode ser concluída sem operações pelo botão
              “Concluir mercado”. Desafios e eventos não podem ser ignorados.
            </p>
          </section>

          <section id="manual-mercado" className="manual-section">
            <div className="manual-section__head">
              <span>04</span>
              <h2>Mercado</h2>
              <LineChart size={20} aria-hidden="true" />
            </div>
            <p>
              Quatro ativos são negociados: BTC, ETH, AQUA e CORAL. Os preços
              mudam ao final de cada turno e também podem ser alterados por
              eventos. O painel mostra o preço atual, a variação desde a última
              atualização e um histórico visual.
            </p>
            <div className="manual-callout manual-callout--blue">
              <Percent size={18} aria-hidden="true" />
              <div>
                <strong>
                  Taxa de transação: {(TRANSACTION_FEE_RATE * 100).toFixed(1)}%
                </strong>
                <span>
                  A taxa é cobrada sobre o valor bruto de cada compra ou venda,
                  com mínimo de {formatMoney(MIN_TRANSACTION_FEE)}.
                </span>
              </div>
            </div>
            <ul className="manual-list">
              <li>
                <strong>Comprar:</strong> debita o valor bruto mais a taxa e
                adiciona a quantidade à carteira.
              </li>
              <li>
                <strong>Vender:</strong> credita o valor bruto menos a taxa e
                reduz a posição. Não é possível vender mais do que possui.
              </li>
              <li>
                <strong>Patrimônio:</strong> soma do saldo em caixa com o valor
                de mercado das posições.
              </li>
              <li>
                O preço de compra médio é recalculado a cada nova compra do
                mesmo ativo.
              </li>
            </ul>
          </section>

          <section id="manual-desafios" className="manual-section">
            <div className="manual-section__head">
              <span>05</span>
              <h2>Desafios</h2>
              <Brain size={20} aria-hidden="true" />
            </div>
            <p>
              Casas de conhecimento, validação e segurança sorteiam um dos{' '}
              {challengeCount} desafios do banco educativo. Cada desafio tem
              quatro alternativas e uma única resposta correta.
            </p>
            <ul className="manual-list">
              <li>
                Acertos e erros aplicam consequências diferentes, definidas nos
                dados do desafio.
              </li>
              <li>
                As consequências podem alterar conhecimento, segurança,
                reputação, saldo fixo ou percentual do saldo.
              </li>
              <li>
                O feedback mostra imediatamente se a resposta está correta, a
                explicação educativa e o efeito realmente aplicado.
              </li>
              <li>
                Não é possível pular um desafio: a decisão precisa ser
                respondida para liberar o encerramento do turno.
              </li>
            </ul>
          </section>

          <section id="manual-eventos" className="manual-section">
            <div className="manual-section__head">
              <span>06</span>
              <h2>Eventos</h2>
              <Zap size={20} aria-hidden="true" />
            </div>
            <p>
              Casas de evento sorteiam um dos {eventCount} eventos do catálogo.
              Eles representam notícias de mercado, falhas de segurança, novas
              regulamentações e movimentos de adoção.
            </p>
            <ul className="manual-list">
              <li>
                Eventos podem alterar preços de um ou mais ativos e aplicar
                efeitos ao jogador do turno.
              </li>
              <li>
                Mudanças de preço afetam o valor de todas as carteiras, não
                apenas a do jogador que tirou o evento.
              </li>
              <li>
                O botão “Resolver evento” aplica as consequências e libera o
                encerramento do turno.
              </li>
            </ul>
          </section>

          <section id="manual-pontuacao" className="manual-section">
            <div className="manual-section__head">
              <span>07</span>
              <h2>Pontuação</h2>
              <Percent size={20} aria-hidden="true" />
            </div>
            <div className="score-formula">
              <span>PONTUAÇÃO</span>
              <strong>PATRIMÔNIO ÷ {SCORE_CONFIG.netWorthDivisor}</strong>
              <b>+</b>
              <strong>
                CONHECIMENTO × {SCORE_CONFIG.knowledgeWeight}
              </strong>
              <b>+</b>
              <strong>SEGURANÇA × {SCORE_CONFIG.securityWeight}</strong>
              <b>+</b>
              <strong>REPUTAÇÃO × {SCORE_CONFIG.reputationWeight}</strong>
            </div>
            <p>
              O patrimônio é dividido por {SCORE_CONFIG.netWorthDivisor} para
              que o componente financeiro seja relevante sem dominar os
              atributos educativos. O resultado é arredondado para o inteiro
              mais próximo.
            </p>
            <div className="manual-callout">
              <ShieldCheck size={18} aria-hidden="true" />
              <div>
                <strong>Equilíbrio vence</strong>
                <span>
                  Cada ponto de conhecimento vale 2; segurança vale 1,5;
                  reputação vale 2. Investir apenas em saldo raramente é a
                  melhor estratégia.
                </span>
              </div>
            </div>
          </section>

          <section id="manual-vitoria" className="manual-section">
            <div className="manual-section__head">
              <span>08</span>
              <h2>Condições de vitória</h2>
              <Trophy size={20} aria-hidden="true" />
            </div>
            <p>
              A partida termina quando o último jogador encerra o turno na
              última rodada. O motor calcula a pontuação de todos e monta o
              ranking final.
            </p>
            <ol className="manual-steps manual-steps--compact">
              <li>Maior pontuação final vence.</li>
              <li>Em caso de empate, vence o maior patrimônio.</li>
              <li>Depois, maior conhecimento.</li>
              <li>Depois, maior segurança.</li>
              <li>Por último, maior reputação.</li>
            </ol>
            <p className="manual-note">
              Ao final, a tela de resultado mostra o vencedor, o ranking
              completo, os atributos e um resumo real da partida. É possível
              jogar novamente com os mesmos jogadores ou voltar ao menu.
            </p>
          </section>
        </article>
      </div>
    </motion.main>
  )
}
