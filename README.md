# Vigia das Águas – Monitoramento Comunitário e Prevenção de Enchentes

Sistema para o Instituto Vigia das Águas, uma ONG (fictícia) que instala PCDs (Plataformas de Coleta de Dados) de baixo custo no Pantanal, no Cerrado e na Amazônia, em comunidades com rede instável.

**O problema:**
- **Dados atrasados:** as 14 estações gravam os dados num cartão que um voluntário recolhe uma vez por mês.
- **Aviso tardio:** o aviso de cheia depende de um morador ver o rio subindo. Em março, a comunidade São Benedito (Rio Miranda, Pantanal) teve 3 horas de aviso e 11 casas foram alagadas.

**A solução:**
- receber as leituras das estações quase em tempo real, via MQTT;
- avisar a equipe e as lideranças quando o rio ou a chuva passarem dos limites;
- mostrar painéis e gerar os relatórios dos financiadores.

**Entrega:** sistema rodando e código-fonte, até 09/11/2026.

## Onde está cada coisa

| O quê | Onde |
|---|---|
| Requisitos funcionais e não funcionais | [docs/requisitos](docs/requisitos/README.md) |
| Atas das reuniões com o cliente | [docs/cliente/reunioes](docs/cliente/reunioes/) |
| Glossário do domínio | [docs/cliente/glossario.md](docs/cliente/glossario.md) |
| Processo do PO, DoR, DoD e padrões de branch e commit | [docs/processo-po.md](docs/processo-po.md) |
| Modelos de requisito, história e ata | [docs/templates](docs/templates/) |
| Backlog, sprints e histórias | [Jira – projeto SCRUM](https://projetodevops.atlassian.net/jira/software/projects/SCRUM/boards/1) |
| O que já foi entregue | [Portal de entregas](https://joaogabgr.github.io/ProjetoDevOps/) |
| Notas de cada versão | Releases do [back](https://github.com/joaogabgr/ProjetoDevOps-back/releases) e do [front](https://github.com/joaogabgr/ProjetoDevOps-front/releases) |
| Pipeline de CI/CD | [docs/pipeline-ci.html](docs/pipeline-ci.html) |

## Repositórios

| Repositório | Conteúdo |
|---|---|
| [ProjetoDevOps](https://github.com/joaogabgr/ProjetoDevOps) | Este: documentação, requisitos e processo |
| [ProjetoDevOps-front](https://github.com/joaogabgr/ProjetoDevOps-front) | Aplicação web |
| [ProjetoDevOps-back](https://github.com/joaogabgr/ProjetoDevOps-back) | API, recepção MQTT, processamento e alertas |

O front e o back estão vinculados como submódulos:

```bash
git clone --recurse-submodules https://github.com/joaogabgr/ProjetoDevOps.git
```

Se já clonou sem eles: `git submodule update --init --recursive`.

## Sprints

| Sprint | Início | Fim |
|---|---|---|
| 1 | 08/09/2026 | 28/09/2026 |
| 2 | 29/09/2026 | 19/10/2026 |
| 3 | 20/10/2026 | 09/11/2026 |

O conteúdo e o andamento de cada sprint estão no Jira.
