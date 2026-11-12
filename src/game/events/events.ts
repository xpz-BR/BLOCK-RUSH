import type { GameEvent } from '../../types/game'

/**
 * Catálogo de eventos de mercado, segurança e adoção.
 * Todo evento possui pelo menos um efeito real sobre o estado da partida.
 */
export const EVENTS: GameEvent[] = [
  {
    id: 'ev-btc-crash',
    title: 'Queda do Bitcoin',
    description:
      'Uma correção forte derruba o Bitcoin e contamina o humor do mercado.',
    category: 'market',
    effects: {
      priceChanges: [{ assetId: 'btc', changePercent: -0.25 }],
      reputation: -2,
    },
  },
  {
    id: 'ev-eth-rally',
    title: 'Valorização do Ethereum',
    description:
      'Uma atualização de rede bem-sucedida impulsiona o Ethereum.',
    category: 'technology',
    effects: {
      priceChanges: [{ assetId: 'eth', changePercent: 0.2 }],
    },
  },
  {
    id: 'ev-network-congestion',
    title: 'Congestionamento da Rede',
    description:
      'As taxas disparam e os preços recuam levemente com a incerteza.',
    category: 'technology',
    effects: {
      cash: -200,
      priceChanges: [
        { assetId: 'btc', changePercent: -0.04 },
        { assetId: 'eth', changePercent: -0.04 },
        { assetId: 'aqua', changePercent: -0.04 },
        { assetId: 'coral', changePercent: -0.04 },
      ],
    },
  },
  {
    id: 'ev-phishing',
    title: 'Ataque de Phishing',
    description:
      'Uma campanha falsa tenta roubar credenciais e abala a confiança.',
    category: 'security',
    effects: {
      cash: -300,
      security: -12,
    },
  },
  {
    id: 'ev-security-breach',
    title: 'Falha de Segurança',
    description:
      'Uma exchange sofre um vazamento e parte do seu saldo é comprometida.',
    category: 'security',
    effects: {
      cash: -500,
      security: -15,
    },
  },
  {
    id: 'ev-token-adoption',
    title: 'Adoção de Token',
    description:
      'Uma grande empresa anuncia suporte ao AquaCoin.',
    category: 'technology',
    effects: {
      priceChanges: [{ assetId: 'aqua', changePercent: 0.3 }],
      reputation: 2,
    },
  },
  {
    id: 'ev-market-panic',
    title: 'Pânico no Mercado',
    description:
      'Investidores vendem em massa e todos os ativos sentem o impacto.',
    category: 'market',
    effects: {
      reputation: -5,
      priceChanges: [
        { assetId: 'btc', changePercent: -0.12 },
        { assetId: 'eth', changePercent: -0.14 },
        { assetId: 'aqua', changePercent: -0.18 },
        { assetId: 'coral', changePercent: -0.22 },
      ],
    },
  },
  {
    id: 'ev-optimistic-market',
    title: 'Mercado Otimista',
    description:
      'O apetite por risco cresce e os preços sobem de forma generalizada.',
    category: 'market',
    effects: {
      reputation: 3,
      priceChanges: [
        { assetId: 'btc', changePercent: 0.08 },
        { assetId: 'eth', changePercent: 0.09 },
        { assetId: 'aqua', changePercent: 0.1 },
        { assetId: 'coral', changePercent: 0.12 },
      ],
    },
  },
  {
    id: 'ev-coral-hype',
    title: 'Hype do CoralToken',
    description:
      'Uma comunidade especulativa leva o CoralToken a uma alta expressiva.',
    category: 'market',
    effects: {
      priceChanges: [{ assetId: 'coral', changePercent: 0.45 }],
    },
  },
  {
    id: 'ev-regulation',
    title: 'Nova Regulamentação',
    description:
      'Regras mais claras trazem conhecimento, mas pressionam as criptos.',
    category: 'regulation',
    effects: {
      knowledge: 5,
      priceChanges: [
        { assetId: 'btc', changePercent: -0.1 },
        { assetId: 'eth', changePercent: -0.05 },
      ],
    },
  },
  {
    id: 'ev-stablecoin-inflow',
    title: 'Entrada de Stablecoins',
    description:
      'Capital de stablecoins entra no mercado e melhora a liquidez.',
    category: 'market',
    effects: {
      cash: 150,
      priceChanges: [
        { assetId: 'btc', changePercent: 0.05 },
        { assetId: 'eth', changePercent: 0.05 },
        { assetId: 'aqua', changePercent: 0.05 },
        { assetId: 'coral', changePercent: 0.05 },
      ],
    },
  },
  {
    id: 'ev-exchange-hack',
    title: 'Hack em Exchange',
    description:
      'Uma exchange é invadida e você precisa reforçar suas defesas.',
    category: 'security',
    effects: {
      cash: -400,
      security: -20,
    },
  },
  {
    id: 'ev-whale-move',
    title: 'Movimento de Baleia',
    description:
      'Uma baleia movimenta grandes volumes e puxa BTC e ETH para cima.',
    category: 'market',
    effects: {
      priceChanges: [
        { assetId: 'btc', changePercent: 0.12 },
        { assetId: 'eth', changePercent: 0.06 },
      ],
    },
  },
  {
    id: 'ev-airdrop-season',
    title: 'Temporada de Airdrops',
    description:
      'Tokens de utilidade são distribuídos e ganham visibilidade.',
    category: 'technology',
    effects: {
      cash: 200,
      priceChanges: [
        { assetId: 'aqua', changePercent: 0.2 },
        { assetId: 'coral', changePercent: 0.2 },
      ],
    },
  },
  {
    id: 'ev-bear-market',
    title: 'Mercado Urso',
    description:
      'O pessimismo domina e o mercado entra em uma fase de baixa.',
    category: 'market',
    effects: {
      reputation: -8,
      priceChanges: [
        { assetId: 'btc', changePercent: -0.08 },
        { assetId: 'eth', changePercent: -0.1 },
        { assetId: 'aqua', changePercent: -0.12 },
        { assetId: 'coral', changePercent: -0.15 },
      ],
    },
  },
  {
    id: 'ev-bull-run',
    title: 'Bull Run',
    description:
      'O mercado entra em euforia e os ativos disparam.',
    category: 'market',
    effects: {
      reputation: 5,
      priceChanges: [
        { assetId: 'btc', changePercent: 0.15 },
        { assetId: 'eth', changePercent: 0.18 },
        { assetId: 'aqua', changePercent: 0.22 },
        { assetId: 'coral', changePercent: 0.25 },
      ],
    },
  },
  {
    id: 'ev-smart-contract-bug',
    title: 'Bug em Smart Contract',
    description:
      'Uma falha em um contrato inteligente gera perdas e desconfiança.',
    category: 'technology',
    effects: {
      security: -5,
      priceChanges: [{ assetId: 'eth', changePercent: -0.15 }],
    },
  },
  {
    id: 'ev-community-support',
    title: 'Apoio da Comunidade',
    description:
      'A comunidade reconhece suas contribuições e sua reputação cresce.',
    category: 'technology',
    effects: {
      reputation: 12,
      knowledge: 5,
    },
  },
]
