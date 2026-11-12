import { useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  Plus,
  Wallet,
} from 'lucide-react'
import type { AssetId } from '../types/asset'
import type { GameState } from '../types/game'
import { useGameStore } from '../store/gameStore'
import {
  formatMoney,
  formatPercent,
  formatQuantity,
} from '../utils/format'
import './MarketPanel.css'

interface MarketPanelProps {
  game: GameState
  canTrade: boolean
  featuredAssetId?: AssetId
}

const DEFAULT_QUANTITIES: Record<AssetId, string> = {
  btc: '0.01',
  eth: '0.1',
  aqua: '1',
  coral: '1',
}

function Sparkline({
  values,
  color,
}: {
  values: number[]
  color: string
}) {
  const width = 100
  const height = 32
  const relevant = values.slice(-16)
  const min = relevant.length > 0 ? Math.min(...relevant) : 0
  const max = relevant.length > 0 ? Math.max(...relevant) : 0
  const range = max - min

  const points =
    relevant.length < 2
      ? `0,${height / 2} ${width},${height / 2}`
      : relevant
          .map((value, index) => {
            const x = (index / (relevant.length - 1)) * width
            const y =
              range === 0
                ? height / 2
                : height - 4 - ((value - min) / range) * (height - 8)
            return `${x.toFixed(2)},${y.toFixed(2)}`
          })
          .join(' ')

  return (
    <svg
      className="market-sparkline"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Histórico recente de preços"
    >
      <line
        x1="0"
        y1={height - 4}
        x2={width}
        y2={height - 4}
        className="market-sparkline__base"
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function MarketPanel({
  game,
  canTrade,
  featuredAssetId,
}: MarketPanelProps) {
  const buyAsset = useGameStore((state) => state.buyAsset)
  const sellAsset = useGameStore((state) => state.sellAsset)
  const [quantities, setQuantities] =
    useState<Record<AssetId, string>>(DEFAULT_QUANTITIES)

  const player = game.players[game.currentPlayerIndex]
  if (!player) return null

  const playerTransactions = game.transactions
    .filter((transaction) => transaction.playerId === player.id)
    .slice(-4)
    .reverse()

  const setQuantity = (assetId: AssetId, value: string) => {
    setQuantities((current) => ({ ...current, [assetId]: value }))
  }

  const handleTrade = (assetId: AssetId, kind: 'buy' | 'sell') => {
    const quantity = Number(quantities[assetId])
    if (!Number.isFinite(quantity) || quantity <= 0) return
    if (kind === 'buy') {
      buyAsset(assetId, quantity)
    } else {
      sellAsset(assetId, quantity)
    }
  }

  return (
    <aside className="market-panel" aria-label="Painel de mercado">
      <div className="rail-head">
        <span>MERCADO</span>
        <span className="market-panel__fee">
          TAXA {(game.rules.transactionFeeRate * 100).toFixed(1)}%
        </span>
      </div>

      {game.pendingDecision?.type === 'market' && (
        <div className="market-window">
          <Activity size={15} aria-hidden="true" />
          <div>
            <strong>JANELA DE MERCADO ABERTA</strong>
            <span>Compre ou venda e conclua no tabuleiro.</span>
          </div>
        </div>
      )}

      {!canTrade && (
        <div className="market-locked">
          Resolva a decisão pendente para negociar.
        </div>
      )}

      <div className="market-list">
        {game.market.assets.map((asset) => {
          const price = game.market.prices[asset.id]
          const previous = game.market.previousPrices[asset.id] || price
          const change = previous === 0 ? 0 : (price - previous) / previous
          const holding = player.portfolio.holdings.find(
            (item) => item.assetId === asset.id,
          )
          const quantity = quantities[asset.id]
          const parsedQuantity = Number(quantity)
          const validQuantity =
            Number.isFinite(parsedQuantity) && parsedQuantity > 0
          const isSellDisabled =
            !canTrade || !validQuantity || !holding || holding.quantity <= 0
          const isFeatured = featuredAssetId === asset.id
          const history = game.market.history.map(
            (point) => point.prices[asset.id],
          )

          return (
            <article
              className={`asset-card ${isFeatured ? 'is-featured' : ''}`}
              key={asset.id}
              style={{ borderTopColor: asset.color }}
            >
              <div className="asset-card__head">
                <div>
                  <span className="asset-card__symbol">{asset.symbol}</span>
                  <span className="asset-card__name">{asset.name}</span>
                </div>
                {isFeatured && (
                  <span className="asset-card__featured">DESTAQUE</span>
                )}
              </div>

              <div className="asset-card__price-row">
                <strong>{formatMoney(price)}</strong>
                <span
                  className={`asset-card__change ${
                    change >= 0 ? 'is-up' : 'is-down'
                  }`}
                >
                  {change >= 0 ? (
                    <ArrowUpRight size={12} aria-hidden="true" />
                  ) : (
                    <ArrowDownRight size={12} aria-hidden="true" />
                  )}
                  {formatPercent(change)}
                </span>
              </div>

              <Sparkline values={history} color={asset.color} />

              <div className="asset-card__holding">
                <span>
                  <Wallet size={11} aria-hidden="true" /> POSIÇÃO
                </span>
                <strong>
                  {holding ? formatQuantity(holding.quantity) : '0'}{' '}
                  {asset.symbol}
                </strong>
              </div>

              <div className="asset-card__trade">
                <label>
                  <span>QTD.</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(asset.id, event.target.value)
                    }
                    aria-label={`Quantidade de ${asset.symbol}`}
                  />
                </label>
                <div className="asset-card__buttons">
                  <button
                    type="button"
                    className="trade-btn trade-btn--buy"
                    onClick={() => handleTrade(asset.id, 'buy')}
                    disabled={!canTrade || !validQuantity}
                    title={`Comprar ${asset.symbol}`}
                  >
                    <Plus size={13} aria-hidden="true" />
                    COMPRAR
                  </button>
                  <button
                    type="button"
                    className="trade-btn trade-btn--sell"
                    onClick={() => handleTrade(asset.id, 'sell')}
                    disabled={isSellDisabled}
                    title={`Vender ${asset.symbol}`}
                  >
                    <Minus size={13} aria-hidden="true" />
                    VENDER
                  </button>
                </div>
              </div>

              {holding && (
                <button
                  type="button"
                  className="asset-card__max"
                  onClick={() =>
                    setQuantity(asset.id, String(holding.quantity))
                  }
                  disabled={!canTrade || holding.quantity <= 0}
                >
                  USAR POSIÇÃO MÁXIMA
                </button>
              )}
            </article>
          )
        })}
      </div>

      <section className="market-history" aria-label="Últimas operações">
        <div className="market-history__head">
          <span>ÚLTIMAS OPERAÇÕES</span>
          <span>{player.name}</span>
        </div>
        {playerTransactions.length === 0 ? (
          <p className="market-history__empty">Nenhuma operação ainda.</p>
        ) : (
          <ul>
            {playerTransactions.map((transaction) => (
              <li key={transaction.id}>
                <span
                  className={`market-history__kind market-history__kind--${transaction.kind}`}
                >
                  {transaction.kind === 'buy' ? 'COMPRA' : 'VENDA'}
                </span>
                <span>
                  {formatQuantity(transaction.quantity)} {transaction.symbol}
                </span>
                <strong>{formatMoney(transaction.net)}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  )
}
