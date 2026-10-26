# RNF4 – Publicação automática

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Origem** | Proposta inicial do projeto; [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D12 |

## Regras

- **R1.** Merge na `homolog` publica automaticamente no ambiente de homologação.
- **R2.** Merge na `main` publica automaticamente em produção e cria a release com as histórias agrupadas por requisito.
- **R3.** As migrations do banco rodam na publicação.
- **R4.** Depois de publicar, um teste rápido confirma que a API responde. Se falhar, a publicação é marcada como falha.

## Critério de aceitação

- **Dado** um merge na `main`, **quando** o Actions termina, **então** a nova versão responde em produção e a release aparece no GitHub e no Jira.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Ambientes, migrations e verificação depois de publicar | — |
