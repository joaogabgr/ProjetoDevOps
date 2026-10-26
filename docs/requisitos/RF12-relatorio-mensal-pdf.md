# RF12 – Relatório mensal em PDF

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Média |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), item 1 (problema atual), D6 |
| **Épico no Jira** | [SCRUM-45](https://projetodevops.atlassian.net/browse/SCRUM-45) |
| **Depende de** | [RF6](RF06-recepcao-de-leituras-mqtt.md), [RF8](RF08-disparo-de-alertas.md) |

## Objetivo

Gerar em segundos o relatório que hoje leva dias para montar à mão e vai para os financiadores.

## Quem usa

| Perfil | O que pode fazer |
|---|---|
| Administrador | Gerar para qualquer estação |
| Técnico de campo | Gerar para qualquer estação |
| Agente comunitário | Gerar para estações da sua comunidade |

## Regras de negócio

- **R1.** Entrada: uma estação e um mês já encerrado ou o mês atual (até hoje).
- **R2.** **Cabeçalho:** nome da ONG, estação, `uid`, comunidade, bioma, mês e data de geração.
- **R3.** **Tabela por parâmetro:** mínima (com dia e hora), máxima (com dia e hora) e média do mês, na unidade do parâmetro.
- **R4.** **Chuva acumulada:** soma de `chuva` no mês, em mm, e o dia mais chuvoso.
- **R5.** **Alertas:** lista dos alertas disparados no mês, com regra, valor e horário da medição.
- **R6.** **Disponibilidade:** leituras recebidas ÷ leituras esperadas × 100, com 1 casa decimal. Esperadas = 96 por dia do período. Dias em manutenção contam como esperados.
- **R7.** Usa só leituras válidas (sem duplicadas nem rejeitadas), pelo horário da medição.
- **R8.** Nome do arquivo: `relatorio-<uid>-<AAAA-MM>.pdf`.

## Critérios de aceitação

**CA1 – Disponibilidade**
- **Dado** a PCD-PAN-03 com 2.592 leituras válidas em setembro (30 dias)
- **Quando** o administrador gera o relatório de setembro
- **Então** a disponibilidade aparece como 90,0%

**CA2 – Alertas do mês**
- **Dado** 2 alertas disparados em setembro e 1 em outubro
- **Quando** o relatório de setembro é gerado
- **Então** aparecem só os 2 de setembro

**CA3 – Arquivo**
- **Dado** o relatório de setembro de 2026 da PCD-PAN-03
- **Quando** é baixado
- **Então** o arquivo se chama `relatorio-PCD-PAN-03-2026-09.pdf`

## Fora do escopo

- Relatório com várias estações no mesmo arquivo.
- Envio automático por e-mail aos financiadores.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; layout do relatório, nome do arquivo e critérios em Dado/Quando/Então | — |
