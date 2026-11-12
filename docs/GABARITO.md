# GABARITO OFICIAL — BLOCK//RUSH

Documento de consulta para a apresentação escolar.

- **Fonte das perguntas:** `src/data/questions.ts`
- **Regra de correção:** `src/game/challenges/challenges.ts`
- **Tipo de dado:** `src/types/challenge.ts`
- **Total de desafios:** 20
- **Conferência:** todas as 20 respostas foram verificadas individualmente comparando o índice `correctAnswer` com a alternativa correspondente no array `options`.

O motor considera correta a alternativa cujo índice é exatamente igual a `correctAnswer`. A resposta escolhida define qual consequência é aplicada: `consequences.success` para acerto e `consequences.failure` para erro.

## Resumo das respostas

| Nº | ID | Tipo | Categoria | Correta |
| --- | --- | --- | --- | --- |
| 01 | q1 | Quiz | Conhecimento | B |
| 02 | q2 | Quiz | Blockchain | B |
| 03 | q3 | Quiz | Segurança | C |
| 04 | q4 | Quiz | Mercado | C |
| 05 | q5 | Decisão | Mercado | B |
| 06 | q6 | Quiz | Conhecimento | B |
| 07 | q7 | Quiz | Segurança | C |
| 08 | q8 | Quiz | Blockchain | B |
| 09 | q9 | Decisão | Mercado | B |
| 10 | q10 | Quiz | Conhecimento | B |
| 11 | q11 | Quiz | Mercado | B |
| 12 | q12 | Quiz | Blockchain | B |
| 13 | q13 | Decisão | Segurança | B |
| 14 | q14 | Quiz | Mercado | B |
| 15 | q15 | Quiz | Conhecimento | B |
| 16 | q16 | Decisão | Mercado | B |
| 17 | q17 | Quiz | Segurança | B |
| 18 | q18 | Quiz | Blockchain | B |
| 19 | q19 | Quiz | Conhecimento | B |
| 20 | q20 | Decisão | Segurança | B |

> Observação: as decisões de mercado (q5, q9 e q16) são situações práticas de investimento. As decisões de segurança (q13 e q20) também usam o formato de escolha, mas o foco é proteção de dados e prevenção de golpes.

---

## 1. q1 — O que é uma criptomoeda?

**Tipo:** Quiz de conhecimento
**Categoria:** Conhecimento

**Enunciado:** O que é uma criptomoeda?

**Alternativas:**
- A) Uma moeda física emitida por um governo digital.
- B) Um tipo de dinheiro digital protegido por criptografia. ✅
- C) Um cupom de desconto para sites de tecnologia.
- D) Uma moeda que só pode ser usada em jogos online.

**Resposta correta:** B — “Um tipo de dinheiro digital protegido por criptografia.”

**Explicação:** Criptomoedas são moedas digitais que utilizam criptografia para garantir a segurança das transações e controlar a criação de novas unidades.

**Consequência de acertar:** +10 de Conhecimento. Mensagem: “Você ganhou +10 de Conhecimento!”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “Você não ganhou pontos de Conhecimento.”

---

## 2. q2 — Qual é a principal função de uma blockchain?

**Tipo:** Quiz de conhecimento
**Categoria:** Blockchain

**Enunciado:** Qual é a principal função de uma blockchain?

**Alternativas:**
- A) Armazenar fotos e vídeos com segurança.
- B) Registrar transações de forma pública, imutável e descentralizada. ✅
- C) Aumentar a velocidade da internet residencial.
- D) Substituir todos os bancos físicos do mundo.

**Resposta correta:** B — “Registrar transações de forma pública, imutável e descentralizada.”

**Explicação:** A blockchain funciona como um livro-razão digital onde todas as transações são registradas em blocos conectados, dificultando fraudes.

**Consequência de acertar:** +10 de Conhecimento. Mensagem: “Excelente! +10 de Conhecimento.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “Ops! Estude mais sobre blockchain.”

---

## 3. q3 — Chave privada e promessa de dobrar Bitcoins

**Tipo:** Quiz de segurança
**Categoria:** Segurança

**Enunciado:** O que você deve fazer se alguém pedir sua "chave privada" prometendo dobrar seus Bitcoins?

**Alternativas:**
- A) Passar a chave imediatamente para aproveitar a oferta.
- B) Passar apenas metade da chave por segurança.
- C) Nunca compartilhar. Quem tem a chave privada tem controle total sobre os ativos. ✅
- D) Denunciar apenas se o retorno demorar mais de 24 horas.

**Resposta correta:** C — “Nunca compartilhar. Quem tem a chave privada tem controle total sobre os ativos.”

**Explicação:** A chave privada é como a senha do seu cofre. Se alguém a tiver, pode roubar todos os seus fundos. Nunca a compartilhe.

**Consequência de acertar:** +15 de Segurança. Mensagem: “+15 de Segurança! Você evitou um golpe.”

**Consequência de errar:** Perda de 10% do saldo atual. Mensagem: “Perigoso! Você caiu no golpe e perdeu 10% do seu saldo.”

---

## 4. q4 — O que significa volatilidade?

**Tipo:** Quiz de conhecimento
**Categoria:** Mercado

**Enunciado:** O que significa "volatilidade" no mercado de criptoativos?

**Alternativas:**
- A) A velocidade constante de valorização de um ativo.
- B) A facilidade de transformar um ativo em dinheiro físico.
- C) As variações rápidas e intensas nos preços dos ativos. ✅
- D) O tempo que uma transação demora para ser confirmada.

**Resposta correta:** C — “As variações rápidas e intensas nos preços dos ativos.”

**Explicação:** Volatilidade refere-se à frequência e intensidade das mudanças de preço de um ativo em um curto período.

**Consequência de acertar:** +10 de Conhecimento. Mensagem: “+10 de Conhecimento de mercado.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “A volatilidade é um conceito chave no mercado.”

---

## 5. q5 — Mercado em queda livre

**Tipo:** Decisão financeira
**Categoria:** Mercado

**Enunciado:** SITUAÇÃO: O mercado está em queda livre e seus ativos perderam 20% do valor. O que você faz?

**Alternativas:**
- A) Vender tudo imediatamente para não perder mais nada.
- B) Manter a calma, avaliar o projeto e decidir se mantém para o longo prazo. ✅
- C) Pegar um empréstimo para comprar o dobro e recuperar o prejuízo rápido.

**Resposta correta:** B — “Manter a calma, avaliar o projeto e decidir se mantém para o longo prazo.”

**Explicação:** Decisões emocionais durante quedas costumam levar a prejuízos. Investidores educados analisam os fundamentos antes de agir.

**Raciocínio e riscos:** vender tudo no auge do medo pode transformar uma queda temporária em prejuízo definitivo. Já pegar empréstimo para “recuperar rápido” aumenta a exposição e pode gerar perdas maiores do que o saldo disponível. A alternativa correta não promete que o preço vai subir: ela propõe avaliar o projeto e decidir com calma, aceitando o risco de forma consciente.

**Consequência de acertar:** +10 de Reputação. Mensagem: “+10 de Reputação. Você demonstrou resiliência.”

**Consequência de errar:** −5 de Reputação. Mensagem: “Decisão impulsiva! Você perdeu 5 de Reputação ao agir sem analisar.”

---

## 6. q6 — O Bitcoin depende de um Banco Central?

**Tipo:** Quiz de conhecimento
**Categoria:** Conhecimento

**Enunciado:** O Bitcoin depende de um Banco Central para funcionar?

**Alternativas:**
- A) Sim, do Banco Central dos EUA.
- B) Não, ele é descentralizado e funciona através de uma rede de computadores. ✅
- C) Sim, mas apenas para a criação de novas moedas.
- D) Não, ele é controlado pelas empresas de cartão de crédito.

**Resposta correta:** B — “Não, ele é descentralizado e funciona através de uma rede de computadores.”

**Explicação:** O Bitcoin foi projetado para ser uma moeda sem autoridade central, operando em uma rede peer-to-peer.

**Consequência de acertar:** +10 de Conhecimento. Mensagem: “+10 de Conhecimento.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “O Bitcoin é a primeira moeda digital descentralizada.”

---

## 7. q7 — O que é Phishing?

**Tipo:** Quiz de segurança
**Categoria:** Segurança

**Enunciado:** O que é Phishing?

**Alternativas:**
- A) Uma técnica de mineração de criptomoedas.
- B) Um método de pescar tokens em redes sociais.
- C) Um golpe que usa mensagens falsas para roubar dados e senhas. ✅
- D) O processo de validação de um novo bloco na rede.

**Resposta correta:** C — “Um golpe que usa mensagens falsas para roubar dados e senhas.”

**Explicação:** Phishing é uma tentativa de enganar o usuário para que ele forneça informações sensíveis, geralmente através de e-mails ou sites falsos.

**Consequência de acertar:** +15 de Segurança. Mensagem: “+15 de Segurança. Olho vivo!”

**Consequência de errar:** −10 de Segurança. Mensagem: “-10 de Segurança. Você caiu em uma armadilha.”

---

## 8. q8 — Depois que uma transação é confirmada

**Tipo:** Quiz de conhecimento
**Categoria:** Blockchain

**Enunciado:** O que acontece após uma transação ser confirmada na blockchain?

**Alternativas:**
- A) Ela pode ser cancelada se o usuário se arrepender.
- B) Ela se torna parte de um registro imutável e permanente. ✅
- C) Ela é enviada para o e-mail do destinatário.
- D) Ela expira após 24 horas se não for sacada.

**Resposta correta:** B — “Ela se torna parte de um registro imutável e permanente.”

**Explicação:** Uma das principais características da blockchain é a imutabilidade: uma vez registrada, a transação não pode ser alterada ou apagada.

**Consequência de acertar:** +10 de Conhecimento. Mensagem: “+10 de Conhecimento.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “A imutabilidade é um pilar da segurança blockchain.”

---

## 9. q9 — Dica de influenciador sobre um token

**Tipo:** Decisão financeira
**Categoria:** Mercado

**Enunciado:** SITUAÇÃO: Você recebeu uma dica de um influenciador sobre um novo token que "vai valorizar 1000% amanhã". O que você faz?

**Alternativas:**
- A) Investe todo seu saldo disponível imediatamente.
- B) Ignora a dica e faz sua própria pesquisa sobre o projeto (DYOR). ✅
- C) Investe apenas metade, para reduzir o risco caso seja mentira.

**Resposta correta:** B — “Ignora a dica e faz sua própria pesquisa sobre o projeto (DYOR).”

**Explicação:** Promessas de lucros exorbitantes e rápidos são sinais comuns de golpes ou esquemas de "pump and dump". Sempre pesquise antes (Do Your Own Research).

**Raciocínio e riscos:** prometer “1000% amanhã” é uma promessa irrealista e um sinal clássico de manipulação. Investir todo o saldo concentra o risco; investir metade ainda mantém a decisão baseada em uma dica não verificada. A resposta correta prioriza pesquisa própria antes de arriscar qualquer valor.

**Consequência de acertar:** +15 de Reputação. Mensagem: “+15 de Reputação. Você é um investidor consciente.”

**Consequência de errar:** −5 de Reputação. Mensagem: “Cuidado com o FOMO: você agiu por impulso e perdeu 5 de Reputação.”

---

## 10. q10 — Cold Wallet e Hot Wallet

**Tipo:** Quiz de conhecimento
**Categoria:** Conhecimento

**Enunciado:** Qual a diferença entre uma "Cold Wallet" e uma "Hot Wallet"?

**Alternativas:**
- A) A temperatura física dos dispositivos.
- B) Cold Wallet fica offline e Hot Wallet fica conectada à internet. ✅
- C) Hot Wallet é para moedas caras e Cold Wallet para moedas baratas.
- D) Não há diferença, são apenas nomes comerciais.

**Resposta correta:** B — “Cold Wallet fica offline e Hot Wallet fica conectada à internet.”

**Explicação:** Cold Wallets (carteiras frias) são mais seguras por não estarem conectadas à rede, enquanto Hot Wallets (carteiras quentes) são mais práticas para o dia a dia.

**Consequência de acertar:** +5 de Conhecimento e +5 de Segurança. Mensagem: “+10 de Segurança e Conhecimento.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “Segurança de armazenamento é fundamental.”

---

## 11. q11 — O que significa HODL?

**Tipo:** Quiz de conhecimento
**Categoria:** Mercado

**Enunciado:** O que significa a expressão "HODL"?

**Alternativas:**
- A) Uma sigla para "High Open Digital Ledger".
- B) Um erro de digitação de "HOLD" que virou gíria para manter um ativo a longo prazo. ✅
- C) O nome do criador do Ethereum.
- D) Um comando usado para minerar Bitcoin.

**Resposta correta:** B — “Um erro de digitação de "HOLD" que virou gíria para manter um ativo a longo prazo.”

**Explicação:** HODL surgiu em um fórum de Bitcoin e passou a representar a estratégia de não vender seus ativos, mesmo em momentos de grande volatilidade.

**Consequência de acertar:** +10 de Conhecimento. Mensagem: “+10 de Conhecimento da cultura cripto.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “HODL é um termo icônico no mercado.”

---

## 12. q12 — O que é um Contrato Inteligente?

**Tipo:** Quiz de conhecimento
**Categoria:** Blockchain

**Enunciado:** O que é um "Contrato Inteligente" (Smart Contract)?

**Alternativas:**
- A) Um contrato assinado com caneta digital.
- B) Um código de programação que executa termos de um acordo automaticamente. ✅
- C) Um documento PDF protegido por senha.
- D) Um robô que decide quando você deve comprar ou vender.

**Resposta correta:** B — “Um código de programação que executa termos de um acordo automaticamente.”

**Explicação:** Contratos inteligentes são programas que rodam na blockchain e executam ações automaticamente quando condições pré-definidas são atendidas.

**Consequência de acertar:** +10 de Conhecimento. Mensagem: “+10 de Conhecimento técnico.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “Smart contracts são a base do DeFi e NFTs.”

---

## 13. q13 — Foto da seed phrase na nuvem

**Tipo:** Decisão de segurança
**Categoria:** Segurança

**Enunciado:** SITUAÇÃO: Você baixou uma nova carteira e ela pediu para você tirar uma foto da sua "seed phrase" (frase de recuperação) e salvar na nuvem. O que você faz?

**Alternativas:**
- A) Tira a foto e salva na nuvem para não perder.
- B) Escreve a frase em um papel e guarda em um local físico seguro, longe da internet. ✅
- C) Salva a frase em um arquivo de texto no computador.

**Resposta correta:** B — “Escreve a frase em um papel e guarda em um local físico seguro, longe da internet.”

**Explicação:** Arquivos digitais e nuvens podem ser hackeados. A forma mais segura de guardar sua frase de recuperação é de maneira offline (papel ou metal).

**Raciocínio e riscos:** a seed phrase dá acesso total à carteira. Foto na nuvem ou arquivo de texto podem ser expostos por invasão de conta, backup comprometido ou malware. Guardar offline reduz a superfície de ataque, embora ainda exija cuidado físico com o papel.

**Consequência de acertar:** +20 de Segurança. Mensagem: “+20 de Segurança! Excelente prática.”

**Consequência de errar:** −15 de Segurança. Mensagem: “-15 de Segurança. Seus dados na nuvem podem ser expostos.”

---

## 14. q14 — Por que diversificar?

**Tipo:** Quiz de conhecimento
**Categoria:** Mercado

**Enunciado:** Por que diversificar os investimentos é importante?

**Alternativas:**
- A) Para garantir que você vai ganhar dinheiro em todos os ativos.
- B) Para reduzir o risco, não dependendo apenas do desempenho de um único ativo. ✅
- C) Para pagar menos taxas de transação.
- D) Para facilitar a declaração de impostos.

**Resposta correta:** B — “Para reduzir o risco, não dependendo apenas do desempenho de um único ativo.”

**Explicação:** A diversificação ajuda a mitigar perdas: se um ativo cai, outros podem compensar ou suavizar o impacto no seu patrimônio total.

**Consequência de acertar:** +10 de Conhecimento. Mensagem: “+10 de Conhecimento financeiro.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “Não coloque todos os ovos na mesma cesta.”

---

## 15. q15 — O que acontece no Halving?

**Tipo:** Quiz de conhecimento
**Categoria:** Conhecimento

**Enunciado:** O que acontece no processo de "Halving" do Bitcoin?

**Alternativas:**
- A) O preço do Bitcoin cai pela metade.
- B) A recompensa dada aos mineradores por novo bloco é reduzida pela metade. ✅
- C) Metade de todos os Bitcoins do mundo desaparecem.
- D) As taxas de transação aumentam 50%.

**Resposta correta:** B — “A recompensa dada aos mineradores por novo bloco é reduzida pela metade.”

**Explicação:** O Halving ocorre aproximadamente a cada 4 anos e serve para controlar a inflação do Bitcoin, tornando-o mais escasso ao longo do tempo.

**Consequência de acertar:** +10 de Conhecimento. Mensagem: “+10 de Conhecimento avançado.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “O Halving é um evento fundamental na economia do Bitcoin.”

---

## 16. q16 — Ativo valorizou 50% em uma semana

**Tipo:** Decisão financeira
**Categoria:** Mercado

**Enunciado:** SITUAÇÃO: Um ativo que você comprou valorizou 50% em uma semana. Qual sua estratégia?

**Alternativas:**
- A) Manter tudo esperando que suba mais 500% (Ganância).
- B) Vender uma parte para garantir o lucro inicial e manter o resto (Realização parcial). ✅
- C) Vender tudo e nunca mais investir em nada (Medo).

**Resposta correta:** B — “Vender uma parte para garantir o lucro inicial e manter o resto (Realização parcial).”

**Explicação:** Realizar lucros parciais é uma estratégia comum para proteger seu capital enquanto mantém exposição a possíveis altas futuras.

**Raciocínio e riscos:** esperar “mais 500%” aumenta a ganância e o risco de devolver todo o lucro em uma correção. Vender tudo por medo abre mão de qualquer alta futura. A realização parcial equilibra os dois lados: garante parte do ganho e mantém uma posição para continuar participando do mercado.

**Consequência de acertar:** +10 de Reputação. Mensagem: “+10 de Reputação. Estratégia equilibrada.”

**Consequência de errar:** −5 de Reputação. Mensagem: “Ganância ou medo excessivo! Você perdeu 5 de Reputação.”

---

## 17. q17 — O que é 2FA?

**Tipo:** Quiz de segurança
**Categoria:** Segurança

**Enunciado:** O que é a Autenticação de Dois Fatores (2FA)?

**Alternativas:**
- A) Ter duas senhas diferentes para a mesma conta.
- B) Uma camada extra de segurança que exige um segundo código além da senha. ✅
- C) A obrigação de usar dois computadores para acessar sua conta.
- D) Pedir para um amigo autorizar seu acesso.

**Resposta correta:** B — “Uma camada extra de segurança que exige um segundo código além da senha.”

**Explicação:** O 2FA aumenta muito a segurança. Mesmo que alguém descubra sua senha, não conseguirá entrar na conta sem o segundo código (geralmente gerado no celular).

**Consequência de acertar:** +15 de Segurança. Mensagem: “+15 de Segurança.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “O 2FA é essencial em exchanges e carteiras.”

---

## 18. q18 — Quem é Satoshi Nakamoto?

**Tipo:** Quiz de conhecimento
**Categoria:** Blockchain

**Enunciado:** Quem é Satoshi Nakamoto?

**Alternativas:**
- A) O atual presidente da maior exchange do mundo.
- B) O pseudônimo usado pela pessoa ou grupo que criou o Bitcoin. ✅
- C) O computador que minerou o primeiro bloco do Ethereum.
- D) Uma inteligência artificial que controla a blockchain.

**Resposta correta:** B — “O pseudônimo usado pela pessoa ou grupo que criou o Bitcoin.”

**Explicação:** Satoshi Nakamoto é o nome utilizado pelo criador do Bitcoin, cuja identidade real permanece desconhecida até hoje.

**Consequência de acertar:** +10 de Conhecimento. Mensagem: “+10 de Conhecimento histórico.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “A origem do Bitcoin é um dos maiores mistérios da tecnologia.”

---

## 19. q19 — O que são Stablecoins?

**Tipo:** Quiz de conhecimento
**Categoria:** Conhecimento

**Enunciado:** O que são Stablecoins?

**Alternativas:**
- A) Criptomoedas que valorizam 10% todos os meses.
- B) Criptoativos pareados ao valor de um ativo estável, como o Dólar ou Ouro. ✅
- C) Moedas que só podem ser usadas para comprar cavalos (stables).
- D) Tokens que não podem ser vendidos, apenas comprados.

**Resposta correta:** B — “Criptoativos pareados ao valor de um ativo estável, como o Dólar ou Ouro.”

**Explicação:** Stablecoins buscam oferecer a agilidade das criptos com a estabilidade de moedas tradicionais, servindo como "porto seguro" em momentos de volatilidade.

**Consequência de acertar:** +10 de Conhecimento. Mensagem: “+10 de Conhecimento.”

**Consequência de errar:** Nenhum efeito sobre saldo ou atributos. Mensagem: “Stablecoins são muito usadas para proteção de capital.”

---

## 20. q20 — E-mail urgente da exchange

**Tipo:** Decisão de segurança
**Categoria:** Segurança

**Enunciado:** SITUAÇÃO: Você recebeu um e-mail dizendo que sua conta na exchange será bloqueada em 1 hora se você não clicar em um link para "confirmar seus dados". O que você faz?

**Alternativas:**
- A) Clica no link rápido para evitar o bloqueio.
- B) Ignora o e-mail, vai até o site oficial da exchange pelo navegador e verifica se há algum aviso real. ✅
- C) Responde ao e-mail enviando seus documentos para agilizar.

**Resposta correta:** B — “Ignora o e-mail, vai até o site oficial da exchange pelo navegador e verifica se há algum aviso real.”

**Explicação:** E-mails de urgência são táticas clássicas de Phishing. Nunca clique em links suspeitos; sempre use os canais oficiais.

**Raciocínio e riscos:** o prazo de “1 hora” existe para impedir que a pessoa pense com calma. Clicar no link pode levar a uma página falsa que captura senha e 2FA; responder com documentos entrega dados pessoais ao golpista. A atitude segura é ignorar o link e acessar o site oficial digitando o endereço ou usando um favorito.

**Consequência de acertar:** +20 de Segurança. Mensagem: “+20 de Segurança! Você não caiu no senso de urgência falso.”

**Consequência de errar:** −20 de Segurança. Mensagem: “-20 de Segurança. Suas credenciais podem ter sido roubadas.”

---

## Conferência final

- 20 desafios encontrados em `src/data/questions.ts`.
- 20 índices `correctAnswer` conferidos contra as alternativas.
- Nenhuma pergunta, alternativa ou explicação foi alterada.
- As decisões financeiras (q5, q9, q16) e as decisões de segurança (q13, q20) estão identificadas com raciocínio e riscos.
- Todas as consequências foram extraídas dos campos `consequences.success` e `consequences.failure`.
