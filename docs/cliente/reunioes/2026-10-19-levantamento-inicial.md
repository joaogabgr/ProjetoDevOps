# Ata – Levantamento inicial de requisitos

| Campo | Valor |
|---|---|
| **Data** | 2026-10-19 |
| **Participantes** | João Gabriel (Product Owner), Ricardo Almeida (Coordenador de Projetos de Campo, Instituto Vigia das Águas), Felipe Nogueira (Voluntário de TI, Instituto Vigia das Águas) |
| **Objetivo** | Entender o problema da ONG, os usuários, as estações, o formato dos dados, o ambiente e o prazo |
| **Status** | Aguardando confirmação do cliente |

> O Instituto Vigia das Águas e as pessoas citadas são fictícios. A ONG instala PCDs (Plataformas de Coleta de Dados) de baixo custo no Pantanal, no Cerrado e na Amazônia, em comunidades com rede instável.

## Pauta

1. Problema atual
2. Perfis de usuário
3. Estações e sensores
4. Alertas
5. Relatórios e exportação
6. Ambiente de hospedagem
7. Formato de entrega e prazo
8. Estação sem comunicação
9. Perda de conexão e envio atrasado
10. Transmissão e formato da mensagem (com o Felipe)

## Registro

### 1. Problema atual
**Pergunta (PO):** Qual o problema real que vocês estão enfrentando hoje?
**Resposta (Ricardo):**
- **Dados atrasados:** as estações gravam os dados num cartão de memória. Uma vez por mês um voluntário vai até lá, tira o cartão e passa tudo para planilhas, então a ONG só fica sabendo o que aconteceu um mês depois.
- **Aviso de cheia no improviso:** depende de um morador ver o rio subindo e mandar mensagem no grupo de WhatsApp da comunidade. Em março, a comunidade São Benedito (Rio Miranda, Pantanal) teve só umas 3 horas de aviso e a água entrou em 11 casas. Pela chuva que caiu rio acima, daria para avisar com um dia de antecedência.
- **Relatórios à mão:** os financiadores pedem relatórios com dados, e montar isso à mão leva dias.

### 2. Perfis de usuário
**Pergunta (PO):** Quais níveis de usuário o sistema vai precisar?
**Resposta (Ricardo):** Quatro.
- **Administrador:** a equipe fixa da ONG, 3 pessoas, que cuida de tudo (usuários, estações, alertas).
- **Técnico de campo:** os voluntários que instalam e consertam as estações, hoje uns 8. Veem os dados e o estado das estações e cadastram ou editam estações e sensores, mas não mexem em usuários nem em alertas.
- **Agente comunitário:** uma ou duas lideranças por comunidade, umas 12 pessoas. Veem os dados da comunidade delas e recebem os alertas.
- **Público, sem login:** qualquer pessoa vê o nível do rio agora e se existe alerta ativo. Dados detalhados e relatórios ficam só para quem tem conta.

### 3. Estações e sensores
**Pergunta (PO):** Hoje quantas estações e sensores vocês têm disponíveis e são necessários para integração?
**Resposta (Ricardo):**
- **14 estações instaladas,** todas precisam entrar no sistema: 6 no Pantanal (rios Miranda e Aquidauana), 5 no Cerrado (áreas de nascente em Goiás) e 3 na Amazônia (comunidades ribeirinhas no Pará).
- **Os sensores variam:** pluviômetro e temperatura/umidade nas 14, nível do rio em 9, pressão em 6 e vento em 4.
- **Frequência:** elas medem a cada 15 minutos.
- **Expansão:** se o edital sair, ano que vem instalam mais 10.
- O formato em que a estação manda os dados quem sabe é o Felipe.

### 4. Alertas
**Pergunta (PO):** Os alertas poderiam ser configurados por um admin e o disparo acontecer por e-mail?
**Resposta (Ricardo):**
- **Configuração pelo admin, sim.** Ele define, por exemplo: nível do rio na estação X acima de 2,5 metros, rio subindo mais de 20 cm por hora, ou mais de 80 mm de chuva em 24 horas.
- **Canal:** e-mail serve para a equipe, mas quase nenhuma liderança comunitária lê e-mail. Eles usam WhatsApp e, onde o sinal é fraco, SMS. Para uma primeira versão, e-mail é aceitável, mas o objetivo final é o aviso chegar na comunidade.
- **Estação parada:** também querem saber quando uma estação para de mandar dados. Hoje só descobrem na visita do mês.

### 5. Relatórios e exportação
**Pergunta (PO):** Quais informações são importantes para serem exportáveis e qual formato vocês preferem, PDF ou Excel?
**Resposta (Ricardo):** Os dois.
- **PDF:** o relatório mensal por estação, que vai para os financiadores, com mínima, máxima e média de cada medida, chuva acumulada no mês, alertas que dispararam e quanto tempo a estação ficou funcionando.
- **Excel:** as leituras brutas por período, que a universidade parceira usa nas pesquisas.

### 6. Ambiente de hospedagem
**Pergunta (PO):** Hoje vocês usam qual ambiente: servidores próprios ou nuvem como AWS?
**Resposta (Ricardo):**
- **Sem servidor próprio:** o site fica numa hospedagem simples, que só serve para ele.
- **Créditos da AWS:** têm créditos do programa da AWS para ONGs, uns US$ 1.000 por ano, e nunca usaram.
- **Orçamento depois:** quando os créditos acabarem, dá para pagar no máximo uns R$ 150 por mês.
- **Conhecimento do Felipe:** ele entende de Linux (usa Ubuntu), mas nunca mexeu com AWS.

### 7. Formato de entrega e prazo
**Pergunta (PO):** Vocês recebem só o código ou o sistema já rodando? Quem mantém depois? *(O PO informou que a equipe entrega o sistema rodando, junto com o código.)*
**Resposta (Ricardo):** Combinado: a equipe entrega o sistema rodando e o código fica com a ONG. Depois da entrega quem mantém é o Felipe, então ele precisa conseguir entender como subir uma nova versão e o que fazer se algo cair.

**Pergunta (PO):** O prazo pode seguir as datas das sprints? *(Entrega final em 09/11/2026, fim da sprint 3.)*
**Resposta (Ricardo):** Serve. 9 de novembro está bom, porque a época de cheia no Pantanal começa forte em dezembro.

### 8. Estação sem comunicação
**Pergunta (PO):** Uma estação sem receber dados deve gerar alerta? E dá para marcar uma estação como parada pela tela?
**Resposta (Ricardo):**
- **Aviso:** gera. Se uma estação passar 1 hora sem mandar nada (4 leituras perdidas), ela aparece como "sem comunicação" na tela e os administradores e técnicos de campo recebem aviso por e-mail.
- **Tempo por estação:** nas 3 estações da Amazônia o sinal cai quase toda tarde por uma ou duas horas, então esse tempo precisa ser ajustável por estação, com 1 hora de padrão.
- **Em manutenção:** pela tela, a marcação é "em manutenção". O técnico marca quando tira a estação para conserto, o sistema para de avisar que ela está sem dados, e ele desmarca quando ela volta. Administrador e técnico de campo podem fazer isso.

### 9. Perda de conexão e envio atrasado
**Pergunta (PO):** Em caso de perda de conexão, a estação guarda as informações para enviar depois?
**Resposta (Ricardo):**
- **Nada se perde:** o cartão de memória grava tudo sempre, com ou sem sinal, e cabe vários meses.
- **Reenvio automático:** se a estação reenvia sozinha o que ficou pendente quando o sinal volta, o Ricardo não sabe garantir. O Felipe precisa confirmar.
- **O que importa para o cliente:**
  - O dado atrasado entra no horário em que foi medido, não no horário em que chegou. Senão o gráfico fica errado.
  - Uma leitura atrasada que passa do limite de um alerta ainda gera o aviso, mas deixando claro que é de horas atrás, para não parecer que está acontecendo agora.

### 10. Transmissão e formato da mensagem
**Pergunta (PO):** Qual o formato da mensagem que as estações enviam e qual o meio de transmissão?
**Resposta (Felipe):**
- **Protocolo:** MQTT, com dois caminhos até a internet:
  - **11 estações (Pantanal e Cerrado):** placa ESP32 com modem GSM 2G, conectada direto no broker.
  - **3 estações (Amazônia):** mandam por LoRa até um gateway na escola da comunidade, que tem internet via satélite e só repassa a mensagem ao broker, no mesmo formato.
- **Broker:** hoje não existe broker em produção (os testes foram com um Mosquitto no notebook do Felipe), então o broker precisa fazer parte do sistema.
- **Envio:** QoS 1, no tópico `vigia/estacoes/{uid}/leituras`, com um JSON por leitura a cada 15 minutos:

```json
{ "uid": "PCD-PAN-03", "seq": 18452, "ts": 1760875200, "bat": 3.92,
  "leituras": { "chuva": 0.4, "temp": 27.3, "umid": 81, "nivel": 182.5 } }
```

| Campo | Significado |
|---|---|
| `uid` | Identificador da estação, gravado na placa. Não muda |
| `seq` | Contador que sobe 1 a cada leitura. Só zera se trocarem a placa |
| `ts` | Horário da **medição**, Unix epoch em segundos, UTC |
| `bat` | Tensão da bateria em volts. Abaixo de 3,5 V a estação está para morrer |
| `leituras` | Só vêm as chaves dos sensores que a estação tem: `chuva` (mm em 15 min), `temp` (°C), `umid` (%), `nivel` (cm), `pressao` (hPa), `vento_vel` (m/s), `vento_dir` (graus) |

**Pergunta (PO):** Como funciona o envio das mensagens atrasadas? O timestamp é o do envio ou o da medição?
**Resposta (Felipe):**
- **Fila de pendentes:** toda leitura é gravada no cartão e numa fila de pendentes. Ela só sai da fila quando o broker confirma o recebimento (PUBACK do QoS 1).
- **Reenvio:** quando o sinal volta, a placa manda primeiro a leitura atual e depois esvazia a fila, da mais antiga para a mais nova. A fila guarda até 7 dias (672 leituras). O que passar disso fica só no cartão.
- **Mesma mensagem:** o JSON reenviado é idêntico ao original, com o mesmo `seq` e o mesmo `ts`.
- **Horário:** o `ts` é sempre o da medição. Para saber se atrasou, o sistema compara o `ts` com o horário em que recebeu.
- **Duplicadas:** se a confirmação do broker se perder, a placa reenvia a mesma leitura. O sistema precisa ignorar duplicadas.
- **Relógio errado:** o relógio da placa é acertado pela rede quando conecta. Se a bateria do relógio acabar e a placa reiniciar sem sinal, o `ts` vem com data de 2000 (já aconteceu uma vez). Leitura com data absurda não pode entrar como válida.
- **Não testado em campo:** o reenvio da fila funciona na bancada, mas nunca foi testado em campo.

## Decisões

| ID | Decisão | Requisitos |
|---|---|---|
| D1 | Quatro perfis: Administrador, Técnico de campo, Agente comunitário e Público (sem login), com as permissões descritas no item 2 | [RF5](../../requisitos/RF05-usuarios-e-senha.md), [RF9](../../requisitos/RF09-controle-de-acesso.md) |
| D2 | As 14 estações entram no sistema. Cada estação tem seu conjunto de sensores. Uma leitura a cada 15 minutos | [RF1](../../requisitos/RF01-sensores-por-estacao.md), [RF2](../../requisitos/RF02-cadastro-de-estacoes.md), [RF3](../../requisitos/RF03-cadastro-de-parametros.md) |
| D3 | Regras de alerta configuradas pelo Administrador, dos tipos limite, subida por hora e acumulado | [RF4](../../requisitos/RF04-regras-de-alerta.md) |
| D4 | Alertas por e-mail na primeira versão. WhatsApp e SMS ficam para versão futura | [RF8](../../requisitos/RF08-disparo-de-alertas.md) |
| D5 | Estação sem leitura além do tempo limite (padrão 60 min, ajustável por estação) fica "sem comunicação" e gera e-mail para Administradores e Técnicos. Estação "em manutenção" não gera aviso | [RF10](../../requisitos/RF10-status-de-comunicacao.md) |
| D6 | Relatório mensal em PDF por estação, com mínima, máxima, média, chuva acumulada, alertas e disponibilidade | [RF12](../../requisitos/RF12-relatorio-mensal-pdf.md) |
| D7 | Exportação das leituras brutas em Excel por estação e período | [RF13](../../requisitos/RF13-exportacao-excel.md) |
| D8 | Leitura atrasada entra no horário da medição. Alerta disparado por leitura atrasada informa que é atrasado | [RF6](../../requisitos/RF06-recepcao-de-leituras-mqtt.md), [RF8](../../requisitos/RF08-disparo-de-alertas.md) |
| D9 | Recepção via MQTT, QoS 1, tópico `vigia/estacoes/{uid}/leituras`, no formato do item 10. O broker faz parte do sistema | [RF6](../../requisitos/RF06-recepcao-de-leituras-mqtt.md) |
| D10 | Leituras duplicadas são ignoradas, e leituras com data absurda não entram como válidas | [RF6](../../requisitos/RF06-recepcao-de-leituras-mqtt.md) |
| D11 | Público sem login vê o nível atual do rio e se há alerta ativo | [RF11](../../requisitos/RF11-painel-publico.md) |
| D12 | A equipe entrega o sistema rodando e o código. O Felipe mantém depois e precisa de documentação de operação | [RNF4](../../requisitos/RNF04-publicacao-automatica.md), [RNF6](../../requisitos/RNF06-operacao-pela-ong.md) |
| D13 | Hospedagem com os créditos da AWS para ONGs (US$ 1.000/ano) e, depois, no máximo R$ 150/mês, em ambiente Linux | [RNF5](../../requisitos/RNF05-hospedagem-e-custo.md) |
| D14 | Entrega final em 09/11/2026 | — |

## Pendências

| ID | Pendência | Responsável | Prazo | Situação |
|---|---|---|---|---|
| P1 | Decidir o que fazer com leituras de data inválida: descartar ou guardar para revisão. Enquanto isso, vale a decisão provisória de guardar numa lista de rejeitadas | Ricardo | 2026-10-30 | Aberta |
| P2 | Testar em campo o reenvio da fila de pendentes depois que o broker estiver no ar | Felipe e time | Junto com SCRUM-39 | Aberta |
| P3 | Documentar para o Felipe como publicar nova versão e como agir em caso de queda | Time | 2026-11-09 | Aberta |
| P4 | Avaliar WhatsApp e SMS para os alertas numa versão futura | PO | Depois de 2026-11-09 | Aberta |
| P5 | Confirmar esta ata e aprovar os requisitos derivados dela | Ricardo | 2026-10-30 | Aberta |
