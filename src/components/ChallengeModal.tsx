import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Boxes,
  Brain,
  Check,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type {
  Challenge,
  ChallengeCategory,
  ChallengeEffect,
} from '../types/challenge'
import { getChallenge } from '../game/engine'
import { useGameStore } from '../store/gameStore'
import { formatMoney, formatNumber } from '../utils/format'
import './ChallengeModal.css'

interface ChallengeModalProps {
  challengeId: string | null
  playerName: string
}

interface AnswerState {
  challenge: Challenge
  answerIndex: number
  correct: boolean
}

interface CategoryMeta {
  label: string
  Icon: LucideIcon
}

const CATEGORY_META: Record<ChallengeCategory, CategoryMeta> = {
  knowledge: { label: 'Conhecimento', Icon: Brain },
  security: { label: 'Segurança', Icon: ShieldCheck },
  market: { label: 'Mercado', Icon: TrendingUp },
  blockchain: { label: 'Blockchain', Icon: Boxes },
}

function signedNumber(value: number): string {
  return `${value > 0 ? '+' : ''}${formatNumber(value)}`
}

function effectLines(effect: ChallengeEffect): string[] {
  const lines: string[] = []
  if (effect.knowledge) {
    lines.push(`${signedNumber(effect.knowledge)} conhecimento`)
  }
  if (effect.security) {
    lines.push(`${signedNumber(effect.security)} segurança`)
  }
  if (effect.reputation) {
    lines.push(`${signedNumber(effect.reputation)} reputação`)
  }
  if (effect.cash) {
    lines.push(`${effect.cash > 0 ? '+' : ''}${formatMoney(effect.cash)} de saldo`)
  }
  if (effect.cashPercent) {
    lines.push(
      `${effect.cashPercent > 0 ? '+' : ''}${(effect.cashPercent * 100).toFixed(0)}% do saldo`,
    )
  }
  return lines.length > 0 ? lines : ['Sem alteração de atributos.']
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export function ChallengeModal({
  challengeId,
  playerName,
}: ChallengeModalProps) {
  const answerChallenge = useGameStore((state) => state.answerChallenge)
  const [answer, setAnswer] = useState<AnswerState | null>(null)
  const answeringRef = useRef<string | null>(null)

  const challenge = challengeId
    ? getChallenge(challengeId)
    : (answer?.challenge ?? null)

  const isOpen = Boolean(challenge && (challengeId || answer))
  const showingFeedback = Boolean(answer && !challengeId)
  const handleAnswer = (index: number) => {
    if (!challenge || answer?.challenge.id === challenge.id) return
    if (answeringRef.current === challenge.id) return
    answeringRef.current = challenge.id
    const correct = index === challenge.correctAnswer
    const accepted = answerChallenge(challenge.id, index)
    if (accepted) {
      setAnswer({ challenge, answerIndex: index, correct })
    } else {
      answeringRef.current = null
    }
  }

  const handleClose = () => {
    answeringRef.current = null
    setAnswer(null)
  }

  if (!challenge) {
    return null
  }

  const meta = CATEGORY_META[challenge.category]
  const Icon = meta.Icon
  const consequence = answer
    ? answer.correct
      ? challenge.consequences.success
      : challenge.consequences.failure
    : null
  const effectList = consequence ? effectLines(consequence.effect) : []

  if (!isOpen) {
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
        className={`challenge-modal ${
          showingFeedback
            ? answer?.correct
              ? 'is-correct'
              : 'is-wrong'
            : ''
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={
          showingFeedback && !answer?.correct
            ? { opacity: 1, y: 0, scale: 1, x: [0, -7, 7, -4, 4, 0] }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
      >
            <header className="challenge-modal__head">
              <div className="challenge-modal__identity">
                <span className="challenge-modal__category">
                  <Icon size={14} aria-hidden="true" />
                  DESAFIO · {meta.label}
                </span>
                <span className="challenge-modal__player">{playerName}</span>
              </div>
              <span className="challenge-modal__stamp">
                {showingFeedback ? 'RESULTADO' : 'DECISÃO PENDENTE'}
              </span>
            </header>

            <div className="challenge-modal__body">
              <h2 id="challenge-title" className="challenge-modal__question">
                {challenge.question}
              </h2>

              <div className="challenge-options">
                {challenge.options.map((option, index) => {
                  const isChosen = answer?.answerIndex === index
                  const isCorrectOption = challenge.correctAnswer === index
                  let stateClass = ''
                  if (showingFeedback && isCorrectOption) {
                    stateClass = 'is-correct'
                  } else if (showingFeedback && isChosen) {
                    stateClass = 'is-wrong'
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`challenge-option ${stateClass}`}
                      onClick={() => handleAnswer(index)}
                      disabled={!challengeId}
                    >
                      <span className="challenge-option__letter">
                        {OPTION_LETTERS[index] ?? index + 1}
                      </span>
                      <span className="challenge-option__text">{option}</span>
                      {showingFeedback && isCorrectOption && (
                        <Check
                          className="challenge-option__mark"
                          size={17}
                          aria-hidden="true"
                        />
                      )}
                      {showingFeedback && isChosen && !isCorrectOption && (
                        <X
                          className="challenge-option__mark"
                          size={17}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              {showingFeedback && answer && consequence && (
                <motion.div
                  className="challenge-feedback"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="challenge-feedback__result">
                    <span className="challenge-feedback__icon">
                      {answer.correct ? (
                        <Check size={20} aria-hidden="true" />
                      ) : (
                        <X size={20} aria-hidden="true" />
                      )}
                    </span>
                    <div>
                      <strong>
                        {answer.correct ? 'RESPOSTA CORRETA' : 'RESPOSTA ERRADA'}
                      </strong>
                      <span>{consequence.message}</span>
                    </div>
                  </div>

                  <div className="challenge-feedback__explain">
                    <Lightbulb size={16} aria-hidden="true" />
                    <p>{challenge.explanation}</p>
                  </div>

                  <div className="challenge-feedback__effects">
                    <span>CONSEQUÊNCIA APLICADA</span>
                    <ul>
                      {effectList.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="btn btn--primary challenge-feedback__continue"
                    onClick={handleClose}
                  >
                    CONTINUAR
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.section>
        </motion.div>
  )
}
