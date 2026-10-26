# RF9 – Login e controle de acesso por perfil

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Alta |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D1 |
| **Épico no Jira** | [SCRUM-13](https://projetodevops.atlassian.net/browse/SCRUM-13) |
| **Depende de** | [RF5](RF05-usuarios-e-senha.md) |

## Objetivo

Cada pessoa vê e faz só o que o seu papel na ONG permite. O agente comunitário fica restrito à sua comunidade, e o público vê só o painel público.

## Matriz de permissões

| Ação | Administrador | Técnico de campo | Agente comunitário | Público |
|---|:---:|:---:|:---:|:---:|
| Gerenciar usuários ([RF5](RF05-usuarios-e-senha.md)) | ✅ | ❌ | ❌ | ❌ |
| Gerenciar estações e parâmetros ([RF1](RF01-sensores-por-estacao.md)–[RF3](RF03-cadastro-de-parametros.md)) | ✅ | ✅ | ❌ | ❌ |
| Gerenciar regras de alerta ([RF4](RF04-regras-de-alerta.md)) | ✅ | ❌ | ❌ | ❌ |
| Marcar estação em manutenção ([RF10](RF10-status-de-comunicacao.md)) | ✅ | ✅ | ❌ | ❌ |
| Ver painéis ([RF7](RF07-paineis-por-estacao.md)) | ✅ todas | ✅ todas | ✅ sua comunidade | ❌ |
| Relatório PDF e Excel ([RF12](RF12-relatorio-mensal-pdf.md), [RF13](RF13-exportacao-excel.md)) | ✅ | ✅ | ✅ sua comunidade | ❌ |
| Receber alertas ([RF8](RF08-disparo-de-alertas.md)) | se destinatário | se destinatário | se destinatário | ❌ |
| Painel público ([RF11](RF11-painel-publico.md)) | ✅ | ✅ | ✅ | ✅ |

## Regras de negócio

- **R1.** O login é feito com e-mail e senha.
- **R2.** Usuário desativado não consegue entrar.
- **R3.** A sessão expira depois de 8 horas.
- **R4.** Depois de 5 tentativas de senha erradas seguidas, o e-mail fica bloqueado por 15 minutos.
- **R5.** Acesso sem login a qualquer recurso que não seja o painel público retorna 401.
- **R6.** Acesso com login a uma ação fora da matriz retorna 403.
- **R7.** As telas escondem menus e botões de ações que o perfil não pode fazer.

## Critérios de aceitação

**CA1 – Login**
- **Dado** o técnico `ana@vigia.org` ativo
- **Quando** ele entra com e-mail e senha corretos
- **Então** acessa o sistema e vê só os menus de Técnico de campo

**CA2 – Usuário desativado**
- **Dado** um usuário desativado
- **Quando** ele tenta entrar com a senha correta
- **Então** o acesso é negado com a mensagem "Usuário desativado. Fale com o administrador."

**CA3 – Comunidade**
- **Dado** um Agente comunitário de São Benedito
- **Quando** ele pede pela API os dados de uma estação de outra comunidade
- **Então** recebe 403

**CA4 – Sem login**
- **Dado** um visitante sem login
- **Quando** ele acessa a lista de usuários
- **Então** recebe 401

## Fora do escopo

- Perfis personalizados além dos quatro definidos.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; login, sessão e bloqueio incluídos (faltavam), critérios em Dado/Quando/Então | — |
