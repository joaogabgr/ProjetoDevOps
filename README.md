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
| Modelo de dados e pipeline de CI/CD | [Confluence › Arquitetura](https://projetodevops.atlassian.net/wiki/spaces/VIGIA/pages/491764) |
| Backlog, sprints e histórias | [Jira – projeto SCRUM](https://projetodevops.atlassian.net/jira/software/projects/SCRUM/boards/1) |
| O que já foi entregue | [Portal de entregas](https://joaogabgr.github.io/ProjetoDevOps/) |
| Notas de cada versão | Releases do [back](https://github.com/joaogabgr/ProjetoDevOps-back/releases) e do [front](https://github.com/joaogabgr/ProjetoDevOps-front/releases) |

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
