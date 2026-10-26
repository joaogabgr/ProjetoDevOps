# RF11 – Painel público

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Média |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D11 |
| **Épico no Jira** | [SCRUM-44](https://projetodevops.atlassian.net/browse/SCRUM-44) |
| **Depende de** | [RF6](RF06-recepcao-de-leituras-mqtt.md), [RF8](RF08-disparo-de-alertas.md) |

## Objetivo

Qualquer morador pode ver, sem conta e pelo celular, se o rio está subindo e se há alerta ativo na sua comunidade.

## Quem usa

| Perfil | O que pode fazer |
|---|---|
| Público (sem login) | Ver o painel público |

## Regras de negócio

- **R1.** Para cada estação ativa, mostra: nome, comunidade, horário da última leitura (fuso da estação) e status de comunicação.
- **R2.** Nas estações com sensor de nível, mostra também o nível atual em metros, com 2 casas.
- **R3.** Mostra **"Alerta ativo"** quando a estação tem uma ocorrência de alerta disparada e ainda não rearmada ([RF8](RF08-disparo-de-alertas.md), R3).
- **R4.** As estações aparecem agrupadas por comunidade, com as que têm alerta ativo primeiro.
- **R5.** A página funciona em celular (largura a partir de 360 px) e é atualizada sozinha a cada 5 minutos.
- **R6.** Não mostra histórico, outras medidas, relatórios nem dados de usuários.

## Critérios de aceitação

**CA1 – Sem login**
- **Dado** um visitante sem login
- **Quando** ele abre o painel público
- **Então** vê as estações ativas com nome, comunidade e última leitura

**CA2 – Nível e alerta**
- **Dado** a PCD-PAN-03 com última leitura de 262 cm e o alerta "Cheia Rio Miranda" disparado
- **Quando** o visitante abre o painel
- **Então** a PCD-PAN-03 aparece no topo, com "2,62 m" e "Alerta ativo"

**CA3 – Dados protegidos**
- **Dado** um visitante sem login
- **Quando** ele chama as rotas de histórico ou de relatório
- **Então** recebe 401

## Fora do escopo

- Mapa interativo.
- Inscrição do visitante para receber alertas.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; ordenação, celular, atualização e critérios em Dado/Quando/Então | — |
