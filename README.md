# Vigia das Águas – Monitoramento Comunitário e Prevenção de Enchentes

Sistema para o Instituto Vigia das Águas, uma ONG (fictícia) que monitora rios e chuva com estações de baixo custo no Pantanal, no Cerrado e na Amazônia.

Este repositório junta o front e o back como submódulos e publica o portal de entregas. A documentação do produto fica no Confluence e o trabalho do time no Jira.

## Onde está cada coisa

| O quê | Onde |
|---|---|
| Documentação do produto (início) | [Confluence – espaço Vigia das Águas](https://projetodevops.atlassian.net/wiki/spaces/VIGIA) |
| Requisitos funcionais e não funcionais | [Confluence › Requisitos](https://projetodevops.atlassian.net/wiki/spaces/VIGIA/pages/557078) |
| Atas das reuniões com o cliente | [Confluence › Reuniões](https://projetodevops.atlassian.net/wiki/spaces/VIGIA/pages/589825) |
| Processo do PO, DoR, DoD e padrões de branch e commit | [Confluence › Processo do PO](https://projetodevops.atlassian.net/wiki/spaces/VIGIA/pages/524289) |
| Pipeline de CI/CD: branches, jobs de cada ambiente e regras | [Confluence › Pipeline de CI/CD](https://projetodevops.atlassian.net/wiki/spaces/VIGIA/pages/491764) |
| Modelo de dados | [Confluence › Modelo de dados](https://projetodevops.atlassian.net/wiki/spaces/VIGIA/pages/720910) |
| Backlog, sprints e histórias | [Jira – projeto SCRUM](https://projetodevops.atlassian.net/jira/software/projects/SCRUM/boards/1) |
| O que já foi entregue | [Portal de entregas](https://joaogabgr.github.io/ProjetoDevOps/) |
| Notas de cada versão | Releases do [back](https://github.com/joaogabgr/ProjetoDevOps-back/releases) e do [front](https://github.com/joaogabgr/ProjetoDevOps-front/releases) |

## Como o trabalho está organizado no Jira

```
Épico      RF2 - Cadastro de estações          ← um por requisito (RF ou RNF), com a página do Confluence ligada
 ├ História  SCRUM-125 RF2 - Cadastrar estação  ← o que o usuário ganha, com critérios Dado/Quando/Então
 ├ Tarefa    SCRUM-57  [BACK] Novos campos…     ← componente Backend, "faz parte de" SCRUM-125
 └ Tarefa    SCRUM-152 [FRONT] Formulário…      ← componente Frontend, "faz parte de" SCRUM-125
```

- **Tarefa:** cada uma tem objetivo, critérios técnicos e exemplo, e vira uma branch no seu repositório.
- **Board e backlog:** mostram histórias e tarefas juntas. Para ver só uma parte, filtre por épico, por componente (Backend ou Frontend) ou por sprint.
- **Branch e PR:** `SCRUM-NN-rf-N-descricao` (ex.: `SCRUM-57-rf-2-novos-campos-da-estacao`). O título do PR é o nome da branch, e o squash na `develop` usa esse nome.
- **Promoções:** `develop` → `homolog` → `main` por merge commit. A `main` exige 1 aprovação. Detalhes em [Pipeline de CI/CD](https://projetodevops.atlassian.net/wiki/spaces/VIGIA/pages/491764).

## Sprints

| Sprint | Período | Conteúdo |
|---|---|---|
| 1 | 09/09 a 26/09/2026 | Cadastros de estações, parâmetros e usuários (RF1, RF2, RF3, RF5), login e perfis (RF9), CI e proteção das branches (RNF3) e a base do front (RNF1) |
| 2 | 29/09 a 19/10/2026 | Recepção das leituras via MQTT (RF6), regras e disparo de alertas (RF4, RF8), médias (RF7), status de comunicação (RF10), troca de sensores (RF1), agente por comunidade (RF9) e hospedagem (RNF5) |
| 3 | 20/10 a 09/11/2026 | Painéis e gráficos (RF7), relatório PDF (RF12), exportação Excel (RF13), painel público (RF11), troca e recuperação de senha (RF5), manutenção (RF10), bloqueio de login (RF9), documentação da API (RNF2), publicação automática (RNF4) e manual de operação (RNF6) |

O andamento de cada sprint está no [board do Jira](https://projetodevops.atlassian.net/jira/software/projects/SCRUM/boards/1) e no [portal de entregas](https://joaogabgr.github.io/ProjetoDevOps/).

## Repositórios

| Repositório | Conteúdo |
|---|---|
| [ProjetoDevOps](https://github.com/joaogabgr/ProjetoDevOps) | Este: junta o front e o back e publica o portal de entregas |
| [ProjetoDevOps-front](https://github.com/joaogabgr/ProjetoDevOps-front) | Aplicação web |
| [ProjetoDevOps-back](https://github.com/joaogabgr/ProjetoDevOps-back) | API, recepção MQTT, processamento e alertas |

```bash
git clone --recurse-submodules https://github.com/joaogabgr/ProjetoDevOps.git
```

Se já clonou sem eles: `git submodule update --init --recursive`.
