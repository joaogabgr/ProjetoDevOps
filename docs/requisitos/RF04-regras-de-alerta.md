# RF4 – Cadastro de regras de alerta

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Média |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D3 |
| **Épico no Jira** | [SCRUM-8](https://projetodevops.atlassian.net/browse/SCRUM-8) |
| **Depende de** | [RF1](RF01-sensores-por-estacao.md), [RF5](RF05-usuarios-e-senha.md) |

## Objetivo

Permitir que o administrador defina, por estação, quando o sistema deve avisar sobre risco de cheia. Exemplos do cliente: nível acima de 2,5 m, rio subindo mais de 20 cm por hora e mais de 80 mm de chuva em 24 horas.

## Quem usa

| Perfil | O que pode fazer |
|---|---|
| Administrador | Criar, editar, listar, ativar/desativar e excluir |

## Tipos de regra

| Tipo | Condição | Exemplo |
|---|---|---|
| **Limite** | O valor da leitura fica acima (ou abaixo) do valor da regra | Nível acima de 250 cm |
| **Subida por hora** | O valor subiu mais que X nos últimos 60 minutos | Nível subindo mais de 20 cm/h |
| **Acumulado** | A soma do parâmetro nas últimas N horas passou de X | Chuva acima de 80 mm em 24 h |

## Dados

| Campo | Obrigatório | Regra |
|---|---|---|
| Nome | Sim | Ex.: "Cheia Rio Miranda" |
| Estação | Sim | Uma estação ativa |
| Parâmetro | Sim | Precisa estar instalado na estação |
| Tipo | Sim | Limite, Subida por hora ou Acumulado |
| Operador | Só no tipo Limite | Acima de ou Abaixo de |
| Valor | Sim | Na unidade do parâmetro |
| Janela (horas) | Só no tipo Acumulado | De 1 a 72 |
| Destinatários | Sim | Usuários e/ou perfis. Ao menos 1 |
| Ativa | — | Começa ativa |

## Regras de negócio

- **R1.** Só o Administrador gerencia regras.
- **R2.** O parâmetro precisa estar instalado na estação escolhida.
- **R3.** Uma regra inativa não dispara.
- **R4.** Editar uma regra vale para as próximas leituras. Ocorrências já registradas não mudam.
- **R5.** Excluir uma regra mantém no histórico as ocorrências que ela gerou.
- **R6.** A lista pode ser filtrada por estação e por ativa ou inativa.

## Critérios de aceitação

**CA1 – Parâmetro não instalado**
- **Dado** a estação PCD-CER-02, sem sensor de nível
- **Quando** o administrador cria uma regra de `nivel` para ela
- **Então** a regra é recusada com a mensagem "A estação não tem o parâmetro nivel."

**CA2 – Regra de acumulado sem janela**
- **Dado** o formulário de nova regra do tipo Acumulado
- **Quando** a janela não é informada
- **Então** a regra é recusada (422)

**CA3 – Perfil sem permissão**
- **Dado** um Técnico de campo logado
- **Quando** ele tenta criar uma regra
- **Então** recebe 403

## Fora do escopo

- O disparo e o envio dos avisos ([RF8](RF08-disparo-de-alertas.md)).
- Regras que combinam mais de uma estação.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; campos e critérios em Dado/Quando/Então | — |
