import type { Challenge } from '../types/challenge'

export type { Challenge }

/**
 * Banco de desafios educativos.
 *
 * Cada desafio possui consequências distintas para acerto e erro.
 * O motor aplica apenas a consequência correspondente à resposta escolhida,
 * garantindo que uma resposta errada nunca receba a recompensa de acerto.
 */
export const CHALLENGES: Challenge[] = [
  {
    id: 'q1',
    type: 'quiz',
    category: 'knowledge',
    question: 'O que é uma criptomoeda?',
    options: [
      'Uma moeda física emitida por um governo digital.',
      'Um tipo de dinheiro digital protegido por criptografia.',
      'Um cupom de desconto para sites de tecnologia.',
      'Uma moeda que só pode ser usada em jogos online.',
    ],
    correctAnswer: 1,
    explanation:
      'Criptomoedas são moedas digitais que utilizam criptografia para garantir a segurança das transações e controlar a criação de novas unidades.',
    consequences: {
      success: {
        message: 'Você ganhou +10 de Conhecimento!',
        effect: { knowledge: 10 },
      },
      failure: {
        message: 'Você não ganhou pontos de Conhecimento.',
        effect: {},
      },
    },
  },
  {
    id: 'q2',
    type: 'quiz',
    category: 'blockchain',
    question: 'Qual é a principal função de uma blockchain?',
    options: [
      'Armazenar fotos e vídeos com segurança.',
      'Registrar transações de forma pública, imutável e descentralizada.',
      'Aumentar a velocidade da internet residencial.',
      'Substituir todos os bancos físicos do mundo.',
    ],
    correctAnswer: 1,
    explanation:
      'A blockchain funciona como um livro-razão digital onde todas as transações são registradas em blocos conectados, dificultando fraudes.',
    consequences: {
      success: {
        message: 'Excelente! +10 de Conhecimento.',
        effect: { knowledge: 10 },
      },
      failure: {
        message: 'Ops! Estude mais sobre blockchain.',
        effect: {},
      },
    },
  },
  {
    id: 'q3',
    type: 'quiz',
    category: 'security',
    question:
      'O que você deve fazer se alguém pedir sua "chave privada" prometendo dobrar seus Bitcoins?',
    options: [
      'Passar a chave imediatamente para aproveitar a oferta.',
      'Passar apenas metade da chave por segurança.',
      'Nunca compartilhar. Quem tem a chave privada tem controle total sobre os ativos.',
      'Denunciar apenas se o retorno demorar mais de 24 horas.',
    ],
    correctAnswer: 2,
    explanation:
      'A chave privada é como a senha do seu cofre. Se alguém a tiver, pode roubar todos os seus fundos. Nunca a compartilhe.',
    consequences: {
      success: {
        message: '+15 de Segurança! Você evitou um golpe.',
        effect: { security: 15 },
      },
      failure: {
        message: 'Perigoso! Você caiu no golpe e perdeu 10% do seu saldo.',
        effect: { cashPercent: -0.1 },
      },
    },
  },
  {
    id: 'q4',
    type: 'quiz',
    category: 'market',
    question: 'O que significa "volatilidade" no mercado de criptoativos?',
    options: [
      'A velocidade constante de valorização de um ativo.',
      'A facilidade de transformar um ativo em dinheiro físico.',
      'As variações rápidas e intensas nos preços dos ativos.',
      'O tempo que uma transação demora para ser confirmada.',
    ],
    correctAnswer: 2,
    explanation:
      'Volatilidade refere-se à frequência e intensidade das mudanças de preço de um ativo em um curto período.',
    consequences: {
      success: {
        message: '+10 de Conhecimento de mercado.',
        effect: { knowledge: 10 },
      },
      failure: {
        message: 'A volatilidade é um conceito chave no mercado.',
        effect: {},
      },
    },
  },
  {
    id: 'q5',
    type: 'decision',
    category: 'market',
    question:
      'SITUAÇÃO: O mercado está em queda livre e seus ativos perderam 20% do valor. O que você faz?',
    options: [
      'Vender tudo imediatamente para não perder mais nada.',
      'Manter a calma, avaliar o projeto e decidir se mantém para o longo prazo.',
      'Pegar um empréstimo para comprar o dobro e recuperar o prejuízo rápido.',
    ],
    correctAnswer: 1,
    explanation:
      'Decisões emocionais durante quedas costumam levar a prejuízos. Investidores educados analisam os fundamentos antes de agir.',
    consequences: {
      success: {
        message: '+10 de Reputação. Você demonstrou resiliência.',
        effect: { reputation: 10 },
      },
      failure: {
        message:
          'Decisão impulsiva! Você perdeu 5 de Reputação ao agir sem analisar.',
        effect: { reputation: -5 },
      },
    },
  },
  {
    id: 'q6',
    type: 'quiz',
    category: 'knowledge',
    question: 'O Bitcoin depende de um Banco Central para funcionar?',
    options: [
      'Sim, do Banco Central dos EUA.',
      'Não, ele é descentralizado e funciona através de uma rede de computadores.',
      'Sim, mas apenas para a criação de novas moedas.',
      'Não, ele é controlado pelas empresas de cartão de crédito.',
    ],
    correctAnswer: 1,
    explanation:
      'O Bitcoin foi projetado para ser uma moeda sem autoridade central, operando em uma rede peer-to-peer.',
    consequences: {
      success: {
        message: '+10 de Conhecimento.',
        effect: { knowledge: 10 },
      },
      failure: {
        message: 'O Bitcoin é a primeira moeda digital descentralizada.',
        effect: {},
      },
    },
  },
  {
    id: 'q7',
    type: 'quiz',
    category: 'security',
    question: 'O que é Phishing?',
    options: [
      'Uma técnica de mineração de criptomoedas.',
      'Um método de pescar tokens em redes sociais.',
      'Um golpe que usa mensagens falsas para roubar dados e senhas.',
      'O processo de validação de um novo bloco na rede.',
    ],
    correctAnswer: 2,
    explanation:
      'Phishing é uma tentativa de enganar o usuário para que ele forneça informações sensíveis, geralmente através de e-mails ou sites falsos.',
    consequences: {
      success: {
        message: '+15 de Segurança. Olho vivo!',
        effect: { security: 15 },
      },
      failure: {
        message: '-10 de Segurança. Você caiu em uma armadilha.',
        effect: { security: -10 },
      },
    },
  },
  {
    id: 'q8',
    type: 'quiz',
    category: 'blockchain',
    question:
      'O que acontece após uma transação ser confirmada na blockchain?',
    options: [
      'Ela pode ser cancelada se o usuário se arrepender.',
      'Ela se torna parte de um registro imutável e permanente.',
      'Ela é enviada para o e-mail do destinatário.',
      'Ela expira após 24 horas se não for sacada.',
    ],
    correctAnswer: 1,
    explanation:
      'Uma das principais características da blockchain é a imutabilidade: uma vez registrada, a transação não pode ser alterada ou apagada.',
    consequences: {
      success: {
        message: '+10 de Conhecimento.',
        effect: { knowledge: 10 },
      },
      failure: {
        message: 'A imutabilidade é um pilar da segurança blockchain.',
        effect: {},
      },
    },
  },
  {
    id: 'q9',
    type: 'decision',
    category: 'market',
    question:
      'SITUAÇÃO: Você recebeu uma dica de um influenciador sobre um novo token que "vai valorizar 1000% amanhã". O que você faz?',
    options: [
      'Investe todo seu saldo disponível imediatamente.',
      'Ignora a dica e faz sua própria pesquisa sobre o projeto (DYOR).',
      'Investe apenas metade, para reduzir o risco caso seja mentira.',
    ],
    correctAnswer: 1,
    explanation:
      'Promessas de lucros exorbitantes e rápidos são sinais comuns de golpes ou esquemas de "pump and dump". Sempre pesquise antes (Do Your Own Research).',
    consequences: {
      success: {
        message: '+15 de Reputação. Você é um investidor consciente.',
        effect: { reputation: 15 },
      },
      failure: {
        message:
          'Cuidado com o FOMO: você agiu por impulso e perdeu 5 de Reputação.',
        effect: { reputation: -5 },
      },
    },
  },
  {
    id: 'q10',
    type: 'quiz',
    category: 'knowledge',
    question: 'Qual a diferença entre uma "Cold Wallet" e uma "Hot Wallet"?',
    options: [
      'A temperatura física dos dispositivos.',
      'Cold Wallet fica offline e Hot Wallet fica conectada à internet.',
      'Hot Wallet é para moedas caras e Cold Wallet para moedas baratas.',
      'Não há diferença, são apenas nomes comerciais.',
    ],
    correctAnswer: 1,
    explanation:
      'Cold Wallets (carteiras frias) são mais seguras por não estarem conectadas à rede, enquanto Hot Wallets (carteiras quentes) são mais práticas para o dia a dia.',
    consequences: {
      success: {
        message: '+10 de Segurança e Conhecimento.',
        effect: { knowledge: 5, security: 5 },
      },
      failure: {
        message: 'Segurança de armazenamento é fundamental.',
        effect: {},
      },
    },
  },
  {
    id: 'q11',
    type: 'quiz',
    category: 'market',
    question: 'O que significa a expressão "HODL"?',
    options: [
      'Uma sigla para "High Open Digital Ledger".',
      'Um erro de digitação de "HOLD" que virou gíria para manter um ativo a longo prazo.',
      'O nome do criador do Ethereum.',
      'Um comando usado para minerar Bitcoin.',
    ],
    correctAnswer: 1,
    explanation:
      'HODL surgiu em um fórum de Bitcoin e passou a representar a estratégia de não vender seus ativos, mesmo em momentos de grande volatilidade.',
    consequences: {
      success: {
        message: '+10 de Conhecimento da cultura cripto.',
        effect: { knowledge: 10 },
      },
      failure: {
        message: 'HODL é um termo icônico no mercado.',
        effect: {},
      },
    },
  },
  {
    id: 'q12',
    type: 'quiz',
    category: 'blockchain',
    question: 'O que é um "Contrato Inteligente" (Smart Contract)?',
    options: [
      'Um contrato assinado com caneta digital.',
      'Um código de programação que executa termos de um acordo automaticamente.',
      'Um documento PDF protegido por senha.',
      'Um robô que decide quando você deve comprar ou vender.',
    ],
    correctAnswer: 1,
    explanation:
      'Contratos inteligentes são programas que rodam na blockchain e executam ações automaticamente quando condições pré-definidas são atendidas.',
    consequences: {
      success: {
        message: '+10 de Conhecimento técnico.',
        effect: { knowledge: 10 },
      },
      failure: {
        message: 'Smart contracts são a base do DeFi e NFTs.',
        effect: {},
      },
    },
  },
  {
    id: 'q13',
    type: 'decision',
    category: 'security',
    question:
      'SITUAÇÃO: Você baixou uma nova carteira e ela pediu para você tirar uma foto da sua "seed phrase" (frase de recuperação) e salvar na nuvem. O que você faz?',
    options: [
      'Tira a foto e salva na nuvem para não perder.',
      'Escreve a frase em um papel e guarda em um local físico seguro, longe da internet.',
      'Salva a frase em um arquivo de texto no computador.',
    ],
    correctAnswer: 1,
    explanation:
      'Arquivos digitais e nuvens podem ser hackeados. A forma mais segura de guardar sua frase de recuperação é de maneira offline (papel ou metal).',
    consequences: {
      success: {
        message: '+20 de Segurança! Excelente prática.',
        effect: { security: 20 },
      },
      failure: {
        message:
          '-15 de Segurança. Seus dados na nuvem podem ser expostos.',
        effect: { security: -15 },
      },
    },
  },
  {
    id: 'q14',
    type: 'quiz',
    category: 'market',
    question: 'Por que diversificar os investimentos é importante?',
    options: [
      'Para garantir que você vai ganhar dinheiro em todos os ativos.',
      'Para reduzir o risco, não dependendo apenas do desempenho de um único ativo.',
      'Para pagar menos taxas de transação.',
      'Para facilitar a declaração de impostos.',
    ],
    correctAnswer: 1,
    explanation:
      'A diversificação ajuda a mitigar perdas: se um ativo cai, outros podem compensar ou suavizar o impacto no seu patrimônio total.',
    consequences: {
      success: {
        message: '+10 de Conhecimento financeiro.',
        effect: { knowledge: 10 },
      },
      failure: {
        message: 'Não coloque todos os ovos na mesma cesta.',
        effect: {},
      },
    },
  },
  {
    id: 'q15',
    type: 'quiz',
    category: 'knowledge',
    question: 'O que acontece no processo de "Halving" do Bitcoin?',
    options: [
      'O preço do Bitcoin cai pela metade.',
      'A recompensa dada aos mineradores por novo bloco é reduzida pela metade.',
      'Metade de todos os Bitcoins do mundo desaparecem.',
      'As taxas de transação aumentam 50%.',
    ],
    correctAnswer: 1,
    explanation:
      'O Halving ocorre aproximadamente a cada 4 anos e serve para controlar a inflação do Bitcoin, tornando-o mais escasso ao longo do tempo.',
    consequences: {
      success: {
        message: '+10 de Conhecimento avançado.',
        effect: { knowledge: 10 },
      },
      failure: {
        message: 'O Halving é um evento fundamental na economia do Bitcoin.',
        effect: {},
      },
    },
  },
  {
    id: 'q16',
    type: 'decision',
    category: 'market',
    question:
      'SITUAÇÃO: Um ativo que você comprou valorizou 50% em uma semana. Qual sua estratégia?',
    options: [
      'Manter tudo esperando que suba mais 500% (Ganância).',
      'Vender uma parte para garantir o lucro inicial e manter o resto (Realização parcial).',
      'Vender tudo e nunca mais investir em nada (Medo).',
    ],
    correctAnswer: 1,
    explanation:
      'Realizar lucros parciais é uma estratégia comum para proteger seu capital enquanto mantém exposição a possíveis altas futuras.',
    consequences: {
      success: {
        message: '+10 de Reputação. Estratégia equilibrada.',
        effect: { reputation: 10 },
      },
      failure: {
        message:
          'Ganância ou medo excessivo! Você perdeu 5 de Reputação.',
        effect: { reputation: -5 },
      },
    },
  },
  {
    id: 'q17',
    type: 'quiz',
    category: 'security',
    question: 'O que é a Autenticação de Dois Fatores (2FA)?',
    options: [
      'Ter duas senhas diferentes para a mesma conta.',
      'Uma camada extra de segurança que exige um segundo código além da senha.',
      'A obrigação de usar dois computadores para acessar sua conta.',
      'Pedir para um amigo autorizar seu acesso.',
    ],
    correctAnswer: 1,
    explanation:
      'O 2FA aumenta muito a segurança. Mesmo que alguém descubra sua senha, não conseguirá entrar na conta sem o segundo código (geralmente gerado no celular).',
    consequences: {
      success: {
        message: '+15 de Segurança.',
        effect: { security: 15 },
      },
      failure: {
        message: 'O 2FA é essencial em exchanges e carteiras.',
        effect: {},
      },
    },
  },
  {
    id: 'q18',
    type: 'quiz',
    category: 'blockchain',
    question: 'Quem é Satoshi Nakamoto?',
    options: [
      'O atual presidente da maior exchange do mundo.',
      'O pseudônimo usado pela pessoa ou grupo que criou o Bitcoin.',
      'O computador que minerou o primeiro bloco do Ethereum.',
      'Uma inteligência artificial que controla a blockchain.',
    ],
    correctAnswer: 1,
    explanation:
      'Satoshi Nakamoto é o nome utilizado pelo criador do Bitcoin, cuja identidade real permanece desconhecida até hoje.',
    consequences: {
      success: {
        message: '+10 de Conhecimento histórico.',
        effect: { knowledge: 10 },
      },
      failure: {
        message: 'A origem do Bitcoin é um dos maiores mistérios da tecnologia.',
        effect: {},
      },
    },
  },
  {
    id: 'q19',
    type: 'quiz',
    category: 'knowledge',
    question: 'O que são Stablecoins?',
    options: [
      'Criptomoedas que valorizam 10% todos os meses.',
      'Criptoativos pareados ao valor de um ativo estável, como o Dólar ou Ouro.',
      'Moedas que só podem ser usadas para comprar cavalos (stables).',
      'Tokens que não podem ser vendidos, apenas comprados.',
    ],
    correctAnswer: 1,
    explanation:
      'Stablecoins buscam oferecer a agilidade das criptos com a estabilidade de moedas tradicionais, servindo como "porto seguro" em momentos de volatilidade.',
    consequences: {
      success: {
        message: '+10 de Conhecimento.',
        effect: { knowledge: 10 },
      },
      failure: {
        message: 'Stablecoins são muito usadas para proteção de capital.',
        effect: {},
      },
    },
  },
  {
    id: 'q20',
    type: 'decision',
    category: 'security',
    question:
      'SITUAÇÃO: Você recebeu um e-mail dizendo que sua conta na exchange será bloqueada em 1 hora se você não clicar em um link para "confirmar seus dados". O que você faz?',
    options: [
      'Clica no link rápido para evitar o bloqueio.',
      'Ignora o e-mail, vai até o site oficial da exchange pelo navegador e verifica se há algum aviso real.',
      'Responde ao e-mail enviando seus documentos para agilizar.',
    ],
    correctAnswer: 1,
    explanation:
      'E-mails de urgência são táticas clássicas de Phishing. Nunca clique em links suspeitos; sempre use os canais oficiais.',
    consequences: {
      success: {
        message: '+20 de Segurança! Você não caiu no senso de urgência falso.',
        effect: { security: 20 },
      },
      failure: {
        message: '-20 de Segurança. Suas credenciais podem ter sido roubadas.',
        effect: { security: -20 },
      },
    },
  },
]
