# RNF1 – Usabilidade

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Origem** | Proposta inicial do projeto; [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D1 (usuários voluntários e lideranças comunitárias) |

## Regras

- **R1.** As telas funcionam em celular (a partir de 360 px de largura) e em computador.
- **R2.** Todos os textos estão em português e usam os termos do [glossário](../cliente/glossario.md).
- **R3.** Toda ação que grava algo mostra uma mensagem de sucesso ou uma mensagem de erro que explica como corrigir.
- **R4.** Ações que apagam dados pedem confirmação.

## Critério de aceitação

- **Dado** um técnico no celular, **quando** ele cadastra uma estação com o `uid` repetido, **então** a tela mostra "Já existe uma estação com este identificador." ao lado do campo, sem perder o que foi digitado.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Regras verificáveis no lugar de "fácil de usar e agradável" | — |
