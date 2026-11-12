# BLOCK//RUSH — Resumo e Roteiro de Apresentação

Material de apoio para a apresentação escolar.

---

## O que é o BLOCK//RUSH?

O BLOCK//RUSH é um jogo de tabuleiro digital e educativo sobre blockchain, criptomoedas e educação financeira. A ideia é colocar o jogador em situações parecidas com as do mercado: comprar e vender ativos, acompanhar preços que mudam, responder perguntas sobre tecnologia e segurança e lidar com eventos inesperados. Em vez de apenas decorar conceitos, quem joga precisa tomar decisões e ver as consequências delas dentro do jogo.

---

## Objetivo

Vencer a partida com a maior pontuação ao final das 8 rodadas. O jogo não premia apenas quem termina com mais dinheiro: a pontuação combina patrimônio, conhecimento, segurança e reputação. Por isso, um jogador com menos saldo pode vencer se tomou boas decisões e construiu melhores atributos ao longo da partida.

---

## Como funciona?

### Jogadores

A partida recebe de **2 a 4 jogadores**, todos jogando no mesmo dispositivo. Cada um começa com **R$ 10.000** simulados e uma carteira vazia.

### Rodadas

A temporada tem **8 rodadas**. Em cada rodada, todos os jogadores jogam uma vez. O jogo termina quando o último jogador encerra o turno na última rodada.

### Tabuleiro e as 30 casas

O tabuleiro é circular e tem **30 casas**, divididas em sete categorias:

- **5 casas de mercado:** abrem a janela de negociação.
- **5 casas de evento:** sorteiam um evento que altera o mercado.
- **4 casas de conhecimento:** sorteiam um desafio educativo.
- **4 casas de validação:** sorteiam um desafio de blockchain.
- **4 casas de segurança:** sorteiam um desafio de segurança.
- **4 casas de oportunidade:** dão saldo ou atributos imediatamente.
- **4 casas de taxa de rede:** cobram uma taxa fixa do jogador.

### Movimentação com dados

O jogador da vez rola um dado de **1 a 6** e o peão avança essa quantidade de casas. O percurso é circular: depois da última casa, o peão volta para o início.

### Mercado de ativos

Existem quatro ativos simulados: **BTC (Bitcoin)**, **ETH (Ethereum)**, **AQUA (AquaCoin)** e **CORAL (CoralToken)**. Cada um tem um preço inicial e um nível diferente de volatilidade. Os preços mudam ao final dos turnos e também podem ser alterados por eventos.

O jogador pode comprar e vender ativos. Cada operação cobra uma **taxa de 1,5%** sobre o valor bruto, com taxa mínima de R$ 0,01. O patrimônio é a soma do saldo em caixa com o valor de mercado das posições.

### Desafios educativos

O jogo tem **20 desafios**. Ao cair em uma casa de conhecimento, validação ou segurança, o jogador recebe uma pergunta com alternativas. A resposta é corrigida na hora, com explicação e com a consequência aplicada. Acertos e erros podem alterar conhecimento, segurança, reputação ou saldo.

### Eventos aleatórios

O jogo tem **18 eventos**, como quedas e altas de preço, congestionamento de rede, mudanças de regulação e golpes. Um evento pode afetar um ou vários ativos e também aplicar efeitos ao jogador do turno. Depois de resolvido, o turno pode ser encerrado.

### Pontuação final

Ao final da partida, o motor calcula a pontuação de cada jogador e monta o ranking. Ganha quem tiver a maior pontuação. Em caso de empate, os critérios são: maior patrimônio, maior conhecimento, maior segurança e, por último, maior reputação.

---

## Criptomoedas e educação financeira

O jogo foi construído para tornar alguns conceitos mais concretos:

- **Bitcoin e Ethereum:** o Bitcoin aparece como a primeira criptomoeda descentralizada; o Ethereum como uma plataforma de contratos inteligentes e aplicações descentralizadas.
- **Tokens:** AQUA e CORAL são tokens fictícios. Eles mostram que, além das criptomoedas mais conhecidas, existem ativos digitais com finalidades e riscos próprios.
- **Blockchain:** os desafios explicam que blockchain é um registro público, descentralizado e difícil de alterar, usado para registrar transações.
- **Valorização e desvalorização:** os preços dos ativos sobem e descem durante a partida. O jogador vê o efeito disso no próprio patrimônio.
- **Volatilidade:** cada ativo tem um nível diferente de oscilação. Os tokens fictícios são mais voláteis que o Bitcoin, por exemplo.
- **Riscos de investimento:** comprar um ativo não garante lucro. O jogo mostra que decisões impulsivas, concentração excessiva e promessas de retorno fácil podem dar errado.
- **Segurança digital e golpes:** há perguntas sobre chave privada, phishing, seed phrase, 2FA e carteiras frias. O jogo ensina que senhas, links e pressa são pontos de atenção.
- **Decisões financeiras:** as situações de decisão não têm uma resposta “mágica”. Elas mostram que analisar, diversificar e realizar lucros parciais são formas de controlar o risco.

O jogo não dá recomendação de investimento. Ele usa um ambiente simulado para praticar o raciocínio.

---

## Como é definido o vencedor?

A fórmula real implementada no código é:

```text
pontuação = arredondar(
  patrimônio líquido ÷ 50
  + conhecimento × 2
  + segurança × 1,5
  + reputação × 2
)
```

O patrimônio líquido é o saldo em caixa mais o valor de mercado dos ativos que o jogador possui. O divisor 50 faz com que os R$ 10.000 iniciais valham 200 pontos, mantendo o dinheiro importante, mas sem deixar que ele domine a pontuação.

O ranking ordena pela pontuação. Se houver empate, o desempate segue esta ordem: maior patrimônio, maior conhecimento, maior segurança e maior reputação.

---

## Tecnologias utilizadas

- **React 19:** monta a interface e os componentes das telas.
- **TypeScript:** tipa o estado, as regras e os dados do jogo, ajudando a evitar erros.
- **Zustand:** guarda o estado global da partida e conecta a interface ao motor.
- **Vite:** ambiente de desenvolvimento e ferramenta de build.
- **Framer Motion:** transições e animações dos modais e das telas.
- **Lucide React:** biblioteca de ícones vetoriais.
- **CSS puro e SVG:** identidade visual, layout responsivo, tabuleiro, sparklines e ícones desenhados sem bibliotecas de estilo.
- **Vitest:** executa os testes automatizados do motor e da store.
- **Oxlint:** análise estática do código.

---

## Diferencial do projeto

O diferencial é unir um jogo de tabuleiro com decisões reais de educação financeira. O jogador não só lê sobre volatilidade: ele vê o preço mudar e o patrimônio reagir. Não só estuda segurança: ele precisa escolher o que fazer diante de um golpe.

Além disso, o dinheiro e os preços são **totalmente simulados**. Nenhum valor é real, nenhuma operação acontece no mercado de verdade e o jogo não substitui orientação financeira. O objetivo é aprender a pensar antes de decidir, entendendo riscos e consequências.

---

## Roteiro de apresentação oral (2 a 3 minutos)

> Bom dia. Nosso projeto é o BLOCK//RUSH, um jogo de tabuleiro digital sobre blockchain e educação financeira.
>
> A ideia surgiu de uma pergunta simples: como ensinar conceitos de criptomoedas e investimentos sem ficar só na teoria? A resposta foi criar um jogo em que as decisões têm consequência. Aqui, o jogador compra e vende ativos, responde desafios, resolve eventos e acompanha o mercado mudando a cada rodada.
>
> A partida tem de dois a quatro jogadores e dura oito rodadas. O tabuleiro tem trinta casas: mercado, eventos, conhecimento, validação, segurança, oportunidade e taxa de rede. O jogador rola um dado, anda e resolve a casa onde parou. No mercado, existem quatro ativos simulados: Bitcoin, Ethereum, AquaCoin e CoralToken. Cada um tem um preço e uma volatilidade diferente.
>
> O ponto mais importante é que vencer não é só ter mais dinheiro. A pontuação soma patrimônio dividido por cinquenta, conhecimento vezes dois, segurança vezes um e meio e reputação vezes dois. Ou seja, um jogador com menos saldo pode ganhar se tomou decisões melhores. Isso força o equilíbrio entre ganhar dinheiro e aprender.
>
> Os desafios são baseados em situações reais: chave privada, phishing, seed phrase, 2FA, volatilidade, diversificação e realização de lucro. Quando o jogador responde, ele recebe a explicação e vê a consequência aplicada na hora. Os eventos também mudam o preço dos ativos e mostram que o mercado não é previsível.
>
> Na parte técnica, usamos React com TypeScript, Zustand para o estado, Vite para o build, Framer Motion para as animações e CSS puro para a identidade visual. O motor foi separado da interface e tem testes automatizados.
>
> Para concluir: o BLOCK//RUSH é um jogo educativo, com dinheiro e preços simulados. Ele não ensina uma fórmula de ficar rico; ensina a pensar em risco, segurança e consequência antes de decidir. Obrigado.

---

## Versão curta (30 segundos)

> O BLOCK//RUSH é um jogo de tabuleiro digital sobre blockchain e educação financeira, para dois a quatro jogadores. Em oito rodadas, você rola o dado, anda por trinta casas, negocia quatro ativos simulados, responde desafios e resolve eventos. A pontuação não depende só do dinheiro: conhecimento, segurança e reputação também contam. Tudo é simulado, então o objetivo é aprender a avaliar risco e consequência antes de investir.

---

## Sequência recomendada de demonstração

1. **Abrir o menu** e mostrar a proposta do jogo em uma frase.
2. **Entrar em “Como jogar”** e apontar rapidamente o objetivo, as 30 casas e as 8 rodadas.
3. **Iniciar uma partida com dois jogadores** e explicar o HUD: saldo, patrimônio, conhecimento, segurança e reputação.
4. **Rolar o dado** e mostrar o peão andando e a casa sendo resolvida.
5. **Abrir o mercado** e fazer uma compra pequena. Mostrar a taxa de 1,5% e o histórico da operação.
6. **Cair em um desafio** (ou abrir um já sorteado) e responder. Mostrar o feedback, a explicação e a consequência.
7. **Cair em um evento** e mostrar os ativos afetados e o botão de resolver.
8. **Encerrar alguns turnos** para o mercado variar e mostrar o patrimônio mudando.
9. **Chegar ao resultado** e explicar o ranking, a fórmula e o resumo da partida.

Dica: para uma apresentação curta, use dois jogadores e não tente completar as oito rodadas. Mostre uma rodada bem explicada e depois abra a tela de resultado de uma partida já finalizada, se houver.

---

## Cinco perguntas que o professor pode fazer

### 1. O dinheiro do jogo é real?

Não. Todo o saldo, os preços e as operações são simulados pelo motor do jogo. Nenhuma compra ou venda acontece no mercado real.

### 2. Os preços dos ativos são reais?

Não. BTC, ETH, AQUA e CORAL usam preços fictícios dentro do jogo. O Bitcoin e o Ethereum existem de verdade, mas os valores mostrados são apenas parte da simulação.

### 3. Por que o jogador com mais dinheiro não ganha automaticamente?

Porque a pontuação também soma conhecimento, segurança e reputação. O patrimônio é dividido por 50 antes de entrar na conta. Assim, decisões educativas e equilíbrio valem tanto quanto o saldo.

### 4. O que é blockchain, de forma simples?

É como um caderno compartilhado por muitas pessoas: cada transação é anotada em um bloco, os blocos ficam ligados e é muito difícil alterar algo que já foi registrado. Por isso ele é usado para registrar transações de forma descentralizada.

### 5. Qual foi o maior desafio técnico do projeto?

Separar as regras do jogo da interface. O motor foi feito em TypeScript e testado sozinho, antes das telas. A interface apenas chama as ações da store e mostra o estado real, sem recriar as regras. Isso deixou o projeto mais confiável e mais fácil de testar.

---

## Explicação simples de blockchain para apresentar

> Imagina um caderno que não fica com uma pessoa só. Cada página é um bloco, e todas as pessoas da rede têm uma cópia parecida. Quando alguém anota uma transação, ela é conferida por várias pessoas antes de entrar no caderno. Depois que a página é fechada, fica muito difícil mudar o que está lá. É isso que a blockchain faz: registra informações de forma compartilhada, organizada e difícil de falsificar.

---

## Autoria

- **Criadores do projeto:** Vitor e Clara.
- **Desenvolvimento:** XPZ Dev.
- **Identidade de desenvolvimento:** xispedev.

BLOCK//RUSH — projeto educativo. Todos os ativos, preços e resultados são simulados.
