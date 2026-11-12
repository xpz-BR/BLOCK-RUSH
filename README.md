# BLOCK//RUSH

Jogo de tabuleiro digital e educativo sobre blockchain, criptomoedas e educação financeira.

O BLOCK//RUSH coloca de 2 a 4 jogadores em uma temporada de 8 rodadas. Cada jogador percorre um tabuleiro circular de 30 casas, negocia quatro ativos simulados, responde desafios educativos e reage a eventos que alteram o mercado. Vence quem terminar com a maior pontuação — e o dinheiro é apenas uma parte dela.

## Objetivo educativo

O projeto foi criado para tornar conceitos de blockchain e finanças mais concretos. Em vez de apenas ler definições, o jogador precisa:

- decidir quando comprar e vender ativos;
- entender volatilidade, valorização e desvalorização;
- reconhecer golpes e práticas de segurança digital;
- avaliar risco antes de tomar uma decisão;
- equilibrar patrimônio, conhecimento, segurança e reputação.

Todo o conteúdo é educativo. O jogo não substitui orientação financeira.

## Funcionalidades

- **Menu principal** com acesso a jogo, manual e créditos.
- **Configuração de partida** para 2 a 4 jogadores, com nomes e cores.
- **Tabuleiro circular** com 30 casas e peões animados.
- **HUD dos jogadores** com saldo, patrimônio, conhecimento, segurança, reputação e pontuação.
- **Mercado simulado** com BTC, ETH, AQUA e CORAL, preços, variações, histórico e sparklines.
- **Compra e venda** de ativos com quantidade, taxas e cálculo de patrimônio.
- **20 desafios educativos** com alternativas, feedback imediato, explicação e consequência.
- **18 eventos aleatórios** com efeitos sobre preços e atributos.
- **Resultado final** com vencedor, ranking, pontuação, atributos e resumo da partida.
- **Manual do jogador** com regras, turnos, mercado, pontuação e condições de vitória.
- **Interface responsiva** para desktop, notebook, tablet e celular.
- **Testes automatizados** do motor, das regras e da store.

## Tecnologias

- [React 19](https://react.dev/) — interface e componentes.
- [TypeScript](https://www.typescriptlang.org/) — tipagem do motor, estado e dados.
- [Zustand](https://zustand.docs.pmnd.rs/) — estado global da partida.
- [Vite](https://vite.dev/) — ambiente de desenvolvimento e build.
- [Framer Motion](https://motion.dev/) — transições e animações.
- [Lucide React](https://lucide.dev/) — ícones vetoriais.
- CSS puro e SVG — identidade visual, layout, tabuleiro e gráficos.
- [Vitest](https://vitest.dev/) — testes automatizados.
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) — análise estática do código.

## Como instalar e executar localmente

Requisitos: Node.js e npm instalados.

```bash
# instalar dependências
npm install

# iniciar o servidor de desenvolvimento
npm run dev
```

O Vite exibirá no terminal o endereço local, normalmente `http://localhost:5173/`.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Como jogar

1. No menu, clique em **JOGAR**.
2. Escolha de 2 a 4 jogadores, informe os nomes e as cores.
3. Clique em **INICIAR PARTIDA**.
4. No seu turno, clique em **ROLAR DADO**. O peão avança de 1 a 6 casas.
5. Resolva a casa onde parou:
   - **Mercado:** compre ou venda ativos e depois conclua a janela.
   - **Conhecimento, Validação ou Segurança:** responda ao desafio.
   - **Evento:** leia as consequências e resolva o evento.
   - **Oportunidade ou Taxa de Rede:** o efeito é aplicado automaticamente.
6. Clique em **ENCERRAR TURNO** quando não houver decisões pendentes.
7. Ao final de 8 rodadas, o jogo calcula a pontuação e mostra o ranking.

A partida tem 8 rodadas. Cada jogador começa com R$ 10.000 simulados. A taxa de negociação é de 1,5% por operação, com mínimo de R$ 0,01.

### Pontuação

```text
pontuação = arredondar(
  patrimônio líquido ÷ 50
  + conhecimento × 2
  + segurança × 1,5
  + reputação × 2
)
```

Em caso de empate, vence o maior patrimônio. Depois, maior conhecimento, maior segurança e, por último, maior reputação.

## Estrutura do projeto

```text
BLOCK-RUSH/
├── docs/
│   ├── GABARITO.md
│   └── RESUMO-APRESENTACAO.md
├── public/
│   └── favicon.svg
├── src/
│   ├── components/        # telas, tabuleiro, HUD, mercado e modais
│   ├── data/              # ativos e banco de desafios
│   ├── game/
│   │   ├── board/         # casas do tabuleiro
│   │   ├── challenges/    # resolução dos desafios
│   │   ├── engine/        # regras, turnos, movimento e testes
│   │   ├── events/        # catálogo e aplicação de eventos
│   │   ├── market/        # preços e negociação
│   │   └── scoring/       # patrimônio e pontuação
│   ├── store/             # estado global com Zustand
│   ├── types/             # tipos do jogo
│   ├── utils/             # formatação de valores
│   ├── App.tsx            # navegação entre telas
│   └── main.tsx           # entrada da aplicação
├── index.html
├── package.json
└── vite.config.ts
```

## Testes e validações

```bash
npm run typecheck   # verificação de tipos
npm run lint        # análise estática com Oxlint
npm test            # testes com Vitest
npm run build       # build de produção
```

A suíte cobre o motor do jogo, as regras de mercado, desafios, eventos, pontuação, configuração da partida e a store. Também foram feitos testes manuais de navegação no navegador, incluindo fluxo completo de partida e layouts responsivos.

## Aviso importante

Todos os ativos, preços, eventos e resultados são **simulados**. BTC, ETH, AQUA e CORAL aparecem em um ambiente fictício de aprendizado. Nenhum valor é real e nada no projeto constitui recomendação de investimento.

## Créditos

- **Criadores:** Vitor e Clara.
- **Desenvolvimento:** XPZ Dev.
- **Identidade:** xispedev.

Documentos de apoio:

- [Gabarito oficial dos desafios](docs/GABARITO.md)
- [Resumo e roteiro de apresentação](docs/RESUMO-APRESENTACAO.md)
