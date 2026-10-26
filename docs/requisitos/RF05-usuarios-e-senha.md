# RF5 – Cadastro de usuários e senha

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Alta |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D1 |
| **Épico no Jira** | [SCRUM-9](https://projetodevops.atlassian.net/browse/SCRUM-9) |
| **Depende de** | — |

## Objetivo

Cadastrar as ~23 pessoas que usam o sistema com login (3 administradores, ~8 técnicos e ~12 agentes comunitários) e permitir que cada uma cuide da própria senha.

## Quem usa

| Perfil | O que pode fazer |
|---|---|
| Administrador | Cadastrar, editar, listar, desativar e excluir usuários |
| Qualquer usuário com login | Alterar e recuperar a própria senha |

## Dados

| Campo | Obrigatório | Regra |
|---|---|---|
| Nome | Sim | 3 a 255 caracteres |
| E-mail | Sim | Único. Usado no login. Guardado em minúsculas |
| CPF | Sim | Válido e único |
| Perfil | Sim | Administrador, Técnico de campo ou Agente comunitário |
| Comunidade | Só para Agente comunitário | Escolhida entre as comunidades das estações cadastradas ([RF2](RF02-cadastro-de-estacoes.md)) |
| Senha | Sim | De 8 a 72 caracteres. Guardada só como hash |
| Ativo | — | Começa ativo |

## Regras de negócio

- **R1.** E-mail e CPF são únicos.
- **R2.** Agente comunitário precisa de comunidade.
- **R3.** A senha nunca aparece em nenhuma resposta, nem como hash.
- **R4.** O último Administrador ativo não pode ser excluído, desativado nem ter o perfil trocado.
- **R5.** Usuário desativado não consegue entrar no sistema.
- **R6.** A lista é paginada (20 por página) e ordenada por nome. Pode ser filtrada por nome, perfil e comunidade.
- **R7.** Para alterar a senha, o usuário informa a senha atual.
- **R8.** A recuperação de senha envia por e-mail um link de uso único, válido por 1 hora. E-mail não cadastrado recebe a mesma mensagem de sucesso, para não revelar quem tem conta.

## Critérios de aceitação

**CA1 – Agente sem comunidade**
- **Dado** o cadastro de um Agente comunitário
- **Quando** a comunidade não é informada
- **Então** o cadastro é recusado (422)

**CA2 – Último administrador**
- **Dado** um único Administrador ativo
- **Quando** alguém tenta excluí-lo, desativá-lo ou mudá-lo para Técnico
- **Então** a operação é recusada (409) com a mensagem "Não é possível remover o último administrador ativo."

**CA3 – Link de recuperação usado**
- **Dado** um link de recuperação já usado para trocar a senha
- **Quando** ele é aberto de novo
- **Então** aparece "Link inválido ou expirado." e a senha não muda

**CA4 – Senha fora da resposta**
- **Dado** usuários cadastrados
- **Quando** a lista de usuários é consultada
- **Então** nenhum campo de senha ou hash aparece

## Fora do escopo

- Login com Google ou outro provedor.
- Autenticação em dois fatores.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; campos, regras de senha e critérios em Dado/Quando/Então | — |
