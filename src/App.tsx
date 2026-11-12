import { useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useGameStore } from './store/gameStore'
import { MenuScreen } from './components/MenuScreen'
import { SetupScreen } from './components/SetupScreen'
import { GameScreen } from './components/GameScreen'
import { ResultScreen } from './components/ResultScreen'
import { ManualScreen } from './components/ManualScreen'
import { CreditsScreen } from './components/CreditsScreen'
import './App.css'

type Screen = 'menu' | 'setup' | 'game' | 'manual' | 'credits'
type ManualOrigin = 'menu' | 'game'

function App() {
  const game = useGameStore((state) => state.game)
  const [screen, setScreen] = useState<Screen>('menu')
  const [manualOrigin, setManualOrigin] = useState<ManualOrigin>('menu')

  const openManual = (origin: ManualOrigin) => {
    setManualOrigin(origin)
    setScreen('manual')
  }

  const closeManual = () => {
    setScreen(manualOrigin)
  }

  const hasActiveGame = Boolean(game)
  const showResult =
    screen === 'game' && Boolean(game && game.phase === 'finished' && game.result)

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <AnimatePresence mode="wait" initial={false}>
          {screen === 'menu' && (
            <MenuScreen
              key="menu"
              hasActiveGame={hasActiveGame}
              gameFinished={Boolean(
                game && game.phase === 'finished' && game.result,
              )}
              onPlay={() => setScreen('setup')}
              onContinue={() => setScreen('game')}
              onManual={() => openManual('menu')}
              onCredits={() => setScreen('credits')}
            />
          )}

          {screen === 'setup' && (
            <SetupScreen
              key="setup"
              onStart={() => setScreen('game')}
              onBack={() => setScreen('menu')}
            />
          )}

          {screen === 'game' && game && showResult && game.result && (
            <ResultScreen
              key="result"
              game={game}
              onPlayAgain={() => setScreen('game')}
              onMenu={() => setScreen('menu')}
            />
          )}

          {screen === 'game' && game && !showResult && (
            <GameScreen
              key="game"
              onExit={() => setScreen('menu')}
              onManual={() => openManual('game')}
            />
          )}

          {screen === 'manual' && (
            <ManualScreen key="manual" onBack={closeManual} />
          )}

          {screen === 'credits' && (
            <CreditsScreen key="credits" onBack={() => setScreen('menu')} />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

export default App
