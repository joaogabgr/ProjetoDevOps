# RNF3 – Verificação automática antes de publicar

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Origem** | Proposta inicial do projeto |

## Regras

- **R1.** Todo PR roda typecheck, testes automatizados e build no GitHub Actions.
- **R2.** As branches `develop`, `homolog` e `main` só recebem merge com a verificação verde.
- **R3.** Os cenários dos critérios de aceitação das histórias viram testes automatizados.

## Critério de aceitação

- **Dado** um PR com um teste quebrado, **quando** alguém tenta mergear na `develop`, **então** o GitHub bloqueia o merge.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Regras verificáveis | — |
