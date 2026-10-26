# RF2 – Cadastro de estações

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Alta |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D2, D5 |
| **Épico no Jira** | [SCRUM-6](https://projetodevops.atlassian.net/browse/SCRUM-6) |
| **Depende de** | [RF1](RF01-sensores-por-estacao.md) |

## Objetivo

Manter o cadastro das 14 estações atuais e das 10 previstas para o ano que vem, com os dados que a operação de campo precisa (comunidade, coordenadas, fuso, tempo limite sem comunicação).

## Quem usa

| Perfil | O que pode fazer |
|---|---|
| Administrador | Cadastrar, editar, listar, desativar e excluir |
| Técnico de campo | Cadastrar, editar, listar, desativar e excluir |
| Agente comunitário | Listar e ver só as estações da sua comunidade |

## Dados

| Campo | Obrigatório | Regra |
|---|---|---|
| Identificador (`uid`) | Sim | Único. É o mesmo gravado na placa, ex.: `PCD-PAN-03`. Não muda depois de criado |
| Nome | Sim | 3 a 255 caracteres |
| Bioma | Sim | Pantanal, Cerrado ou Amazônia |
| Comunidade | Sim | Ex.: São Benedito. O campo sugere as comunidades já usadas em outras estações, para que a mesma comunidade não seja escrita de dois jeitos |
| Latitude | Sim | Número entre -90 e 90 |
| Longitude | Sim | Número entre -180 e 180 |
| Fuso horário | Sim | Ex.: `America/Campo_Grande`, `America/Sao_Paulo`, `America/Belem` |
| Parâmetros instalados | Sim | Ao menos 1 ([RF1](RF01-sensores-por-estacao.md)) |
| Tempo limite sem comunicação | Sim | Em minutos, de 15 a 1440. Padrão 60 ([RF10](RF10-status-de-comunicacao.md)) |
| Ativa | — | Começa como ativa |

## Regras de negócio

- **R1.** O `uid` é único. Cadastro com `uid` repetido é recusado.
- **R2.** A lista é paginada (20 por página, máximo 100) e ordenada por nome. Pode ser filtrada por nome (parcial, sem diferenciar maiúsculas), bioma, comunidade e status.
- **R3.** Estação sem nenhuma leitura pode ser excluída.
- **R4.** Estação com leituras não pode ser excluída, só **desativada**. A desativada mantém o histórico e passa a recusar novas leituras.
- **R5.** O Agente comunitário só vê estações da sua comunidade ([RF9](RF09-controle-de-acesso.md)).

## Critérios de aceitação

**CA1 – `uid` repetido**
- **Dado** a estação `PCD-PAN-03` já cadastrada
- **Quando** alguém cadastra outra estação com `uid` `PCD-PAN-03`
- **Então** o cadastro é recusado (409) e nada é gravado

**CA2 – Excluir estação com histórico**
- **Dado** a estação PCD-PAN-03 com leituras gravadas
- **Quando** o administrador tenta excluí-la
- **Então** a exclusão é recusada com a mensagem "Estação com leituras não pode ser excluída. Desative-a."

**CA3 – Estação desativada**
- **Dado** a estação PCD-PAN-03 desativada
- **Quando** chega uma leitura dela
- **Então** a leitura é recusada e o histórico anterior continua visível

**CA4 – Filtro**
- **Dado** 6 estações no Pantanal e 5 no Cerrado
- **Quando** o técnico filtra por bioma Cerrado
- **Então** a lista mostra 5 estações, ordenadas por nome

## Fora do escopo

- Mapa com a localização das estações.
- Importação de estações por planilha.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; limites de campos e critérios em Dado/Quando/Então | — |
