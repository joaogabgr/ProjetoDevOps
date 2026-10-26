# Modelo de história (descrição no Jira)

Título no Jira: `RFX - Verbo + objeto` (ex.: `RF10 - Avisar quando uma estação parar de enviar dados`).

---

**História**
Como **[perfil]**, quero **[ação]**, para **[benefício]**.

**Contexto**
Por que isso existe, com o caso real do cliente e o link para a ata.

**Regras**
- R1. Regra com valor concreto.
- R2. …

**Critérios de aceitação**
- **CA1 – Nome do cenário:** Dado …, quando …, então ….
- **CA2 – …**

**Fora do escopo**
- …

**Depende de**
- SCRUM-NN (motivo)

**Requisito:** [RFX – Título](https://github.com/joaogabgr/ProjetoDevOps/blob/main/docs/requisitos/RFXX-titulo.md)
**Rank:** N · **Sprint planejada:** N · **Planning poker:** N

---

## Subtarefas

Criadas como *Subtarefa* filha da história, uma por repositório que precisa mudar.

**`[BACK] verbo + objeto`**
- O que a API precisa expor (rota, método, campos, erros).
- Critérios técnicos verificáveis (ex.: "retorna 409 quando…").

**`[FRONT] verbo + objeto`**
- Tela, campos, botões, mensagens de erro e de sucesso.
- Critérios verificáveis na tela (ex.: "o botão Excluir fica desabilitado quando…").
