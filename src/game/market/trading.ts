import type { AssetId } from '../../types/asset'
import type { GameState, Holding, Transaction } from '../../types/game'
import {
  MIN_TRANSACTION_FEE,
  QUANTITY_DECIMALS,
} from '../constants'
import {
  addLog,
  assertCurrentActor,
  assertPositiveQuantity,
  assertTradingAllowed,
  getCurrentPlayer,
  replacePlayer,
  roundMoney,
  roundQuantity,
} from '../engine/helpers'
import { getAsset, getPrice } from './market'

function calculateFee(gross: number, feeRate: number): number {
  if (gross <= 0) return 0
  return Math.max(MIN_TRANSACTION_FEE, roundMoney(gross * feeRate))
}

function upsertHolding(
  holdings: Holding[],
  assetId: AssetId,
  symbol: string,
  addedQuantity: number,
  unitPrice: number,
): Holding[] {
  const existing = holdings.find((holding) => holding.assetId === assetId)
  if (!existing) {
    return [
      ...holdings,
      {
        assetId,
        symbol,
        quantity: roundQuantity(addedQuantity),
        averageBuyPrice: unitPrice,
      },
    ]
  }

  const newQuantity = roundQuantity(existing.quantity + addedQuantity)
  const totalCost =
    existing.quantity * existing.averageBuyPrice + addedQuantity * unitPrice
  const averageBuyPrice = roundMoney(totalCost / newQuantity)

  return holdings.map((holding) =>
    holding.assetId === assetId
      ? {
          ...holding,
          quantity: newQuantity,
          averageBuyPrice,
        }
      : holding,
  )
}

function createTransaction(
  state: GameState,
  kind: Transaction['kind'],
  assetId: AssetId,
  symbol: string,
  quantity: number,
  unitPrice: number,
  gross: number,
  fee: number,
  net: number,
): Transaction {
  return {
    id: `tx-${state.transactions.length + 1}`,
    round: state.round,
    playerId: getCurrentPlayer(state).id,
    assetId,
    symbol,
    kind,
    quantity,
    unitPrice,
    gross,
    fee,
    net,
  }
}

export function buyAsset(
  state: GameState,
  assetId: AssetId,
  quantity: number,
  playerId?: string,
): GameState {
  assertTradingAllowed(state)
  assertCurrentActor(state, playerId)

  const player = getCurrentPlayer(state)
  const asset = getAsset(state.market, assetId)
  const normalizedQuantity = assertPositiveQuantity(quantity)
  const unitPrice = getPrice(state.market, assetId)
  const gross = roundMoney(unitPrice * normalizedQuantity)
  const fee = calculateFee(gross, state.rules.transactionFeeRate)
  const total = roundMoney(gross + fee)

  if (total > player.portfolio.cash) {
    throw new Error(
      `Saldo insuficiente: operação custa ${total} e o saldo é ${player.portfolio.cash}.`,
    )
  }

  const holdings = upsertHolding(
    player.portfolio.holdings,
    assetId,
    asset.symbol,
    normalizedQuantity,
    unitPrice,
  )
  const updatedPlayer = {
    ...player,
    portfolio: {
      cash: roundMoney(player.portfolio.cash - total),
      holdings,
    },
  }

  const transaction = createTransaction(
    state,
    'buy',
    assetId,
    asset.symbol,
    normalizedQuantity,
    unitPrice,
    gross,
    fee,
    total,
  )

  let next = replacePlayer(state, updatedPlayer)
  next = {
    ...next,
    transactions: [...next.transactions, transaction],
  }
  next = addLog(
    next,
    player.id,
    'transaction',
    `Comprou ${normalizedQuantity} ${asset.symbol} a ${unitPrice} (taxa ${fee}).`,
    total,
  )
  return next
}

export function sellAsset(
  state: GameState,
  assetId: AssetId,
  quantity: number,
  playerId?: string,
): GameState {
  assertTradingAllowed(state)
  assertCurrentActor(state, playerId)

  const player = getCurrentPlayer(state)
  const asset = getAsset(state.market, assetId)
  const normalizedQuantity = assertPositiveQuantity(quantity)
  const holding = player.portfolio.holdings.find(
    (item) => item.assetId === assetId,
  )

  if (!holding || holding.quantity < normalizedQuantity) {
    throw new Error(
      `Venda inválida: você não possui ${normalizedQuantity} ${asset.symbol}.`,
    )
  }

  const unitPrice = getPrice(state.market, assetId)
  const gross = roundMoney(unitPrice * normalizedQuantity)
  const fee = calculateFee(gross, state.rules.transactionFeeRate)
  const net = roundMoney(gross - fee)
  const remaining = roundQuantity(holding.quantity - normalizedQuantity)
  const holdings = player.portfolio.holdings
    .map((item) =>
      item.assetId === assetId ? { ...item, quantity: remaining } : item,
    )
    .filter((item) => item.quantity > 10 ** -QUANTITY_DECIMALS)

  const updatedPlayer = {
    ...player,
    portfolio: {
      cash: roundMoney(player.portfolio.cash + net),
      holdings,
    },
  }

  const transaction = createTransaction(
    state,
    'sell',
    assetId,
    asset.symbol,
    normalizedQuantity,
    unitPrice,
    gross,
    fee,
    net,
  )

  let next = replacePlayer(state, updatedPlayer)
  next = {
    ...next,
    transactions: [...next.transactions, transaction],
  }
  next = addLog(
    next,
    player.id,
    'transaction',
    `Vendeu ${normalizedQuantity} ${asset.symbol} a ${unitPrice} (taxa ${fee}).`,
    net,
  )
  return next
}
