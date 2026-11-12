import { ASSETS } from '../../data/assets'
import type { Asset, AssetId } from '../../types/asset'
import type { MarketState, Player, PricePoint } from '../../types/game'
import { roundMoney } from '../engine/helpers'

/** Variação máxima aplicada por rodada, em fração do preço. */
const MAX_ROUND_CHANGE = 0.35
const MARKET_DRIFT = 0.005

function createPriceRecord(assets: Asset[]): Record<AssetId, number> {
  const prices: Record<AssetId, number> = {
    btc: 0,
    eth: 0,
    aqua: 0,
    coral: 0,
  }
  for (const asset of assets) {
    prices[asset.id] = asset.initialPrice
  }
  return prices
}

export function createMarket(assets: Asset[] = ASSETS): MarketState {
  const prices = createPriceRecord(assets)
  const history: PricePoint[] = [{ round: 1, prices: { ...prices } }]
  return {
    assets: assets.map((asset) => ({ ...asset })),
    prices,
    previousPrices: { ...prices },
    history,
  }
}

export function getAsset(market: MarketState, assetId: AssetId): Asset {
  const asset = market.assets.find((item) => item.id === assetId)
  if (!asset) {
    throw new Error(`Ativo não encontrado: ${assetId}.`)
  }
  return asset
}

export function getPrice(market: MarketState, assetId: AssetId): number {
  return market.prices[assetId]
}

export function getHoldingQuantity(player: Player, assetId: AssetId): number {
  return (
    player.portfolio.holdings.find((holding) => holding.assetId === assetId)
      ?.quantity ?? 0
  )
}

/**
 * Simula um tick de mercado.
 *
 * Cada ativo varia proporcionalmente à sua volatilidade:
 * `preçoNovo = preçoAtual * (1 + drift + ruído * volatilidade * 0.35)`.
 * O ruído fica no intervalo [-1, 1], e a variação é limitada pelo
 * próprio fator de volatilidade.
 */
export function simulateMarketTick(
  market: MarketState,
  random: () => number = Math.random,
  round: number = currentMarketRound(market) + 1,
): MarketState {
  const prices: Record<AssetId, number> = { ...market.prices }

  for (const asset of market.assets) {
    const noise = (random() * 2 - 1) * asset.volatility * MAX_ROUND_CHANGE
    const nextPrice = roundMoney(
      Math.max(1, market.prices[asset.id] * (1 + MARKET_DRIFT + noise)),
    )
    prices[asset.id] = nextPrice
  }

  const history: PricePoint[] = [
    ...market.history,
    {
      round,
      prices: { ...prices },
    },
  ]

  return {
    ...market,
    previousPrices: { ...market.prices },
    prices,
    history,
  }
}

/** Aplica uma variação percentual diretamente a um ativo. */
export function applyPriceChange(
  market: MarketState,
  assetId: AssetId,
  changePercent: number,
): MarketState {
  const currentPrice = market.prices[assetId]
  const nextPrice = roundMoney(
    Math.max(1, currentPrice * (1 + changePercent)),
  )
  return {
    ...market,
    previousPrices: { ...market.prices },
    prices: { ...market.prices, [assetId]: nextPrice },
  }
}

export function currentMarketRound(market: MarketState): number {
  return market.history[market.history.length - 1]?.round ?? 1
}
