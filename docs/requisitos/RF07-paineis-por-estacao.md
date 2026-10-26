# RF7 – Painéis com gráficos por estação

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Média |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), item 1 (problema atual), D2, D8 |
| **Épico no Jira** | [SCRUM-11](https://projetodevops.atlassian.net/browse/SCRUM-11) |
| **Depende de** | [RF6](RF06-recepcao-de-leituras-mqtt.md) |

## Objetivo

Mostrar à equipe e às comunidades o que está acontecendo em cada estação, em vez de esperar a planilha do mês.

## Quem usa

| Perfil | O que pode fazer |
|---|---|
| Administrador | Ver todas as estações |
| Técnico de campo | Ver todas as estações |
| Agente comunitário | Ver as estações da sua comunidade |

## Regras de negócio

- **R1.** Há um gráfico por parâmetro instalado na estação, com o valor no eixo vertical, na unidade do parâmetro.
- **R2.** Períodos: últimas 24 horas (padrão), 7 dias, 30 dias e intervalo personalizado de até 1 ano.
- **R3.** Até 7 dias, o gráfico mostra cada leitura. De 7 a 90 dias, médias horárias. Acima de 90 dias, médias diárias.
- **R4.** Para `chuva`, as médias são somas (chuva acumulada na hora ou no dia).
- **R5.** Horários exibidos no fuso da estação ([RF2](RF02-cadastro-de-estacoes.md)).
- **R6.** Leituras atrasadas aparecem no horário em que foram medidas ([RF6](RF06-recepcao-de-leituras-mqtt.md), R2).
- **R7.** Período sem leituras aparece como falha no gráfico, sem ligar os pontos.

## Critérios de aceitação

**CA1 – Período padrão**
- **Dado** a estação PCD-PAN-03 com `chuva`, `temp`, `umid` e `nivel`
- **Quando** o técnico abre o painel dela
- **Então** aparecem 4 gráficos com as últimas 24 horas, em horário de Campo Grande

**CA2 – Período personalizado com leitura atrasada**
- **Dado** uma leitura medida em 03/10 às 10:00 que chegou em 03/10 às 14:00
- **Quando** o técnico escolhe o período de 01/10 a 07/10
- **Então** a leitura aparece em 03/10 às 10:00

**CA3 – Período longo**
- **Dado** o período de 30 dias
- **Quando** o gráfico é carregado
- **Então** mostra médias horárias, e para `chuva` a soma de cada hora

**CA4 – Agente de outra comunidade**
- **Dado** um Agente comunitário de São Benedito
- **Quando** ele tenta abrir o painel de uma estação de outra comunidade
- **Então** recebe a mensagem "Você não tem acesso a esta estação." (403)

## Fora do escopo

- Comparação de várias estações no mesmo gráfico.
- Previsão do tempo.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; soma de chuva, falhas no gráfico e critérios em Dado/Quando/Então | — |
