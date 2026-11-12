import type { Asset } from '../types/asset'

export type { Asset }

/**
 * Catálogo fixo de ativos do jogo. Os preços iniciais são fictícios
 * e servem apenas como ponto de partida para a simulação de mercado.
 */
export const ASSETS: Asset[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    description: 'A primeira e mais conhecida criptomoeda. Funciona como ouro digital.',
    color: '#F7931A',
    initialPrice: 50000,
    type: 'crypto',
    volatility: 0.15,
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    description: 'Plataforma de contratos inteligentes e aplicações descentralizadas.',
    color: '#627EEA',
    initialPrice: 3000,
    type: 'crypto',
    volatility: 0.25,
  },
  {
    id: 'aqua',
    name: 'AquaCoin',
    symbol: 'AQUA',
    description: 'Token de utilidade fictício para serviços de purificação de dados.',
    color: '#00BAFF',
    initialPrice: 50,
    type: 'token',
    volatility: 0.4,
  },
  {
    id: 'coral',
    name: 'CoralToken',
    symbol: 'CORAL',
    description: 'Token experimental para governança em projetos de preservação digital.',
    color: '#FF7F50',
    initialPrice: 10,
    type: 'token',
    volatility: 0.6,
  },
]
