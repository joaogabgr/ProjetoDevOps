# Processo do Product Owner

Como uma necessidade do cliente vira requisito, história, código e entrega, e quem confirma cada passo. Toda demanda segue estas etapas, inclusive mudanças em requisitos que já existem.

## Visão geral

```
 Cliente ──► 1. Descoberta ──► 2. Especificação ──► 3. Refinamento ──► 4. Desenvolvimento ──► 5. Aceite ──► Cliente
              (ata)             (requisito)          (histórias)         (código + testes)      (release)
                 ▲                                                                                  │
                 └──────────────────────── mudança de requisito ◄───────────────────────────────────┘
```

| # | Etapa | Quem conduz | Entrada | Saída | Onde fica | Portão para seguir |
|---|---|---|---|---|---|---|
| 1 | **Descoberta** | PO | Necessidade do cliente | Ata da reunião | [`docs/cliente/reunioes/`](cliente/reunioes/) | O cliente **confirma a ata** |
| 2 | **Especificação** | PO | Ata confirmada | Requisito (RF/RNF) | [`docs/requisitos/`](requisitos/) | O cliente **aprova o requisito** |
| 3 | **Refinamento** | PO + time | Requisito aprovado | Histórias e subtarefas | Jira (épico do requisito) | A história passa no **DoR** |
| 4 | **Desenvolvimento** | Time | História pronta | Branch, PR, testes | Repositórios `back` e `front` | O PR passa no **DoD** e na revisão |
| 5 | **Aceite** | PO + cliente | Versão em homologação | Release e requisito entregue | GitHub Releases, Jira Releases e [portal de entregas](https://joaogabgr.github.io/ProjetoDevOps/) | O cliente **aceita** na sprint review |

## 1. Descoberta

**Objetivo:** entender o problema real do cliente antes de pensar em solução.

- **Antes da reunião:** o PO prepara um roteiro de perguntas sobre problema atual, usuários, volumes, regras, exceções, ambiente, prazo e o que não pode acontecer.
- **Durante:** registrar perguntas e respostas literalmente. Quando o cliente não souber responder, anotar quem sabe e marcar como pendência.
- **Depois:** escrever a ata no [modelo](templates/ata.md) e enviar ao cliente.
  - Decisões numeradas (`D1`, `D2`…).
  - Pendências com responsável e prazo.
- **Portão:** a ata só vale depois que o cliente confirma. O status muda de *Aguardando confirmação* para *Confirmada*.
- Termos novos do cliente entram no [glossário](cliente/glossario.md).

## 2. Especificação

**Objetivo:** transformar decisões da ata em requisitos sem ambiguidade.

- **Arquivo:** um arquivo por requisito em `docs/requisitos/`, no [modelo](templates/requisito.md), com:
  - quem usa;
  - regras numeradas com valores concretos;
  - exemplos;
  - critérios de aceitação;
  - o que está fora do escopo;
  - a origem (ata e decisão).
- **Teste do desenvolvedor novo:** um desenvolvedor que nunca falou com o cliente consegue implementar só lendo o requisito. Se precisar perguntar, o requisito está incompleto.
- **Portão:** o requisito vai para o cliente revisar e só passa para *Aprovado* com a confirmação dele.

**Status de um requisito:**

| Status | Significado |
|---|---|
| Rascunho | O PO está escrevendo |
| Em validação | Enviado ao cliente, aguardando aprovação |
| Aprovado | O cliente aprovou e pode entrar no backlog |
| Em desenvolvimento | Ao menos uma história em andamento |
| Entregue | Todas as histórias publicadas numa release |
| Validado | O cliente usou e aceitou na sprint review |
| Substituído | Trocado por outra versão (o arquivo indica qual) |

## 3. Refinamento

**Objetivo:** quebrar o requisito em entregas pequenas que o time consegue fazer em uma sprint.

**Estrutura no Jira:**

```
Épico   RF6 - Recepção das leituras via MQTT        ← o requisito, com link para o arquivo
 └ História  SCRUM-33 RF6 - Gravar leituras...      ← o valor para o usuário, com critérios Dado/Quando/Então
    ├ Subtarefa  [BACK] Persistir leitura...        ← o trabalho no repositório back
    └ Subtarefa  [FRONT] Exibir leitura atrasada... ← o trabalho no repositório front
```

- **História:** descreve **o que** o usuário ganha e **como saber que ficou pronto**, no [modelo de história](templates/user-story.md). Não diz como implementar.
- **Subtarefas:** dividem o trabalho por repositório. Cada uma tem os critérios técnicos da sua camada:
  - `[BACK]`: rota, regras, persistência.
  - `[FRONT]`: tela, campos, mensagens.
  - Uma história que só mexe no back não tem subtarefa `[FRONT]`, e vice-versa.
- **Estimativa:** fica na história (planning poker), não nas subtarefas.

**Definition of Ready (DoR):** uma história só entra na sprint se:

- [ ] O requisito ligado está **Aprovado**.
- [ ] Tem contexto, regras e critérios Dado/Quando/Então com valores concretos.
- [ ] Diz o que está fora do escopo.
- [ ] As dependências estão listadas e não bloqueiam a sprint.
- [ ] Tem subtarefas `[BACK]` e/ou `[FRONT]` criadas.
- [ ] Se tem tela, há protótipo ou descrição dos campos e mensagens.
- [ ] Foi estimada pelo time e cabe em uma sprint.

## 4. Desenvolvimento

- **Branch da subtarefa:** cada subtarefa vira uma branch no seu repositório, criada pelo botão *Create branch* do Jira. Ex.: `SCRUM-61-back-gravar-leituras` no back.
- **Commits e PR:** commits e título do PR começam com a chave da subtarefa (`SCRUM-61 feat: ...`).
- **Tipo de merge:**
  - feature → `develop`: **Squash and merge**;
  - `develop` → `homolog` → `main`: **Create a merge commit**.
- **Dúvidas:** dúvida de regra vai para o PO, nunca é decidida no código. Se o PO não souber, vira pendência com o cliente.

**Definition of Done (DoD):**

- [ ] Todos os critérios de aceitação da subtarefa atendidos.
- [ ] Os cenários Dado/Quando/Então da história viraram testes automatizados.
- [ ] CI verde (typecheck, testes, build).
- [ ] PR revisado por outra pessoa do time.
- [ ] Commits e PR com a chave do Jira.
- [ ] Subtarefa movida para *Concluído* no Jira.

Uma história fica *Concluída* quando todas as subtarefas estão concluídas.

## 5. Aceite

- **Ao chegar na `main`:** o GitHub Actions cria a release agrupada por requisito e marca a versão nas histórias do Jira.
- **Sprint review:** o PO apresenta ao cliente o que entrou na versão, usando os critérios de aceitação como roteiro.
- **Depois do aceite:** o requisito passa para *Validado* e a ata da review registra o aceite.
- **Portal de entregas:** mostra a situação de todos os requisitos para o cliente, sem precisar de acesso ao Jira.

## Mudança de requisito

O cliente pediu algo novo ou diferente:

1. **Registrar:** o pedido entra numa ata (etapa 1).
2. **Alterar o requisito:** o PO altera o arquivo do requisito num PR. A versão sobe e o histórico de alterações registra o motivo.
3. **Aprovar:** o cliente aprova a nova versão.
4. **Ajustar o backlog:** o PO ajusta as histórias no Jira, e só então o time trabalha na mudança.

Nada muda no código sem passar por um requisito aprovado. É isso que evita a discussão "não foi isso que eu pedi".

## Rastreabilidade

| De | Para | Como |
|---|---|---|
| Ata | Requisito | Seção *Origem* do requisito cita a ata e a decisão (`D4`) |
| Requisito | Épico | O épico no Jira tem o mesmo ID (`RF6`) e link para o arquivo |
| Épico | História | História filha do épico |
| História | Subtarefa | Subtarefa filha da história |
| Subtarefa | Código | Chave no nome da branch, nos commits e no PR (painel *Development* do Jira) |
| Código | Release | O Action lê as chaves dos commits e monta a release por requisito |
| Release | Jira | Versão `back vX.Y.Z` marcada nas histórias |

## Padrão de commit

`SCRUM-NN tipo: descrição curta`, com o tipo:

| Tipo | Uso |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `refactor` | Melhoria de código sem mudar comportamento |
| `docs` | Documentação |
| `style` | Estilos e formatação |
| `test` | Testes |
