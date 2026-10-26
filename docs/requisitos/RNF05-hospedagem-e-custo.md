# RNF5 – Hospedagem e custo

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.0 |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D13 |

## Regras

- **R1.** O sistema roda em servidor Linux.
- **R2.** No primeiro ano, usa os créditos da AWS para ONGs (US$ 1.000 por ano).
- **R3.** Depois dos créditos, o custo mensal total de hospedagem (servidor, banco, broker MQTT e e-mail) fica em no máximo R$ 150.
- **R4.** O ambiente suporta 24 estações (14 atuais + 10 previstas) enviando uma leitura a cada 15 minutos.

## Critério de aceitação

- **Dado** a arquitetura de hospedagem escolhida, **quando** o custo é estimado sem créditos, **então** o total mensal fica em até R$ 150.

## Dúvidas em aberto

- Escolha do ambiente (AWS com créditos ou VPS Linux), a decidir pelo time com o Felipe.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-26 | Criado a partir da ata de 19/10 | — |
