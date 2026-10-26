# RNF6 – Operação pela ONG

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.0 |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D12, pendência P3 |

## Regras

- **R1.** Depois da entrega, quem mantém o sistema é o Felipe, voluntário de TI que conhece Linux e não conhece AWS.
- **R2.** A entrega inclui um manual de operação com:
  - como publicar uma nova versão;
  - como ver os logs;
  - como reiniciar cada serviço (API, banco, broker);
  - como fazer e restaurar backup do banco;
  - o que fazer se a API ou o broker caírem.
- **R3.** Cada procedimento do manual pode ser feito por linha de comando num terminal Linux, sem depender de console web.

## Critério de aceitação

- **Dado** o manual de operação, **quando** o Felipe segue o passo de reiniciar o broker num ambiente de homologação, **então** consegue sem ajuda do time.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-26 | Criado a partir da ata de 19/10 | — |
