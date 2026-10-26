# RF13 – Exportação das leituras em Excel

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Baixa |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D7 |
| **Épico no Jira** | [SCRUM-46](https://projetodevops.atlassian.net/browse/SCRUM-46) |
| **Depende de** | [RF6](RF06-recepcao-de-leituras-mqtt.md) |

## Objetivo

Entregar à universidade parceira as leituras brutas para pesquisa, sem montar planilha à mão.

## Quem usa

| Perfil | O que pode fazer |
|---|---|
| Administrador | Exportar qualquer estação |
| Técnico de campo | Exportar qualquer estação |
| Agente comunitário | Exportar estações da sua comunidade |

## Regras de negócio

- **R1.** Entrada: uma ou mais estações e um período de até 1 ano.
- **R2.** Saída: arquivo `.xlsx` com uma aba por estação e uma linha por leitura válida, ordenadas pelo horário da medição.
- **R3.** Colunas: `uid`, estação, data/hora da medição (fuso da estação), data/hora de recebimento, atrasada (sim/não) e uma coluna por parâmetro instalado, com a unidade no cabeçalho (ex.: `chuva (mm)`).
- **R4.** Parâmetro sem valor naquela leitura fica em branco.
- **R5.** Nome do arquivo: `leituras-<AAAA-MM-DD>-a-<AAAA-MM-DD>.xlsx`.

## Critérios de aceitação

**CA1 – Um dia sem falhas**
- **Dado** a PCD-PAN-03 com todas as leituras de 01/10
- **Quando** o administrador exporta essa estação para 01/10
- **Então** a aba PCD-PAN-03 tem 96 linhas de dados

**CA2 – Duas estações**
- **Dado** a escolha de PCD-PAN-03 e PCD-CER-02
- **Quando** a exportação é gerada
- **Então** o arquivo tem 2 abas, uma por estação, cada uma só com as colunas dos seus parâmetros

**CA3 – Período longo demais**
- **Dado** um período de 13 meses
- **Quando** a exportação é pedida
- **Então** é recusada com a mensagem "O período máximo é de 1 ano."

## Fora do escopo

- Exportação em CSV.
- Envio do arquivo por e-mail.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; abas, colunas, limite de período e critérios em Dado/Quando/Então | — |
