# RF3 – Cadastro de parâmetros (tipos de medida)

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Alta |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D2, D9 (formato da mensagem) |
| **Épico no Jira** | [SCRUM-7](https://projetodevops.atlassian.net/browse/SCRUM-7) |
| **Depende de** | — |

## Objetivo

Cadastrar os tipos de medida que as placas enviam, com a chave exata usada no JSON do MQTT, para que um sensor novo entre no sistema sem mudança de código.

## Quem usa

| Perfil | O que pode fazer |
|---|---|
| Administrador | Cadastrar, editar, listar e excluir |
| Técnico de campo | Cadastrar, editar, listar e excluir |

## Dados

| Campo | Obrigatório | Regra |
|---|---|---|
| Chave | Sim | Única. Começa com letra, só minúsculas, números e `_`, até 64 caracteres. **Não muda depois de criada** |
| Nome | Sim | Único, até 128 caracteres |
| Unidade | Sim | Até 32 caracteres |
| Casas decimais | Não | De 0 a 6. Padrão 2 |

## Regras de negócio

- **R1.** O sistema já vem com os 7 parâmetros que as placas enviam hoje:

| Chave | Nome | Unidade | Casas |
|---|---|---|---|
| `chuva` | Índice Pluviométrico | mm (em 15 minutos) | 2 |
| `temp` | Temperatura | °C | 1 |
| `umid` | Umidade Relativa | % | 1 |
| `nivel` | Nível do Rio | cm | 1 |
| `pressao` | Pressão Atmosférica | hPa | 1 |
| `vento_vel` | Velocidade do Vento | m/s | 2 |
| `vento_dir` | Direção do Vento | ° | 0 |

- **R2.** Chave e nome são únicos.
- **R3.** A chave não pode ser alterada, porque está gravada nas placas.
- **R4.** Mudar a unidade ou as casas decimais muda só a exibição. Os valores gravados não são convertidos.
- **R5.** Parâmetro com leituras não pode ser excluído. Parâmetro sem leituras pode, e é desligado das estações.
- **R6.** A lista é ordenada por nome.

## Critérios de aceitação

**CA1 – Carga inicial**
- **Dado** um banco novo com as migrations aplicadas
- **Quando** o técnico abre a lista de parâmetros
- **Então** aparecem os 7 parâmetros da tabela R1

**CA2 – Chave repetida**
- **Dado** o parâmetro `chuva` cadastrado
- **Quando** alguém cadastra outro com a chave `chuva`
- **Então** o cadastro é recusado (409)

**CA3 – Chave imutável**
- **Dado** o parâmetro `nivel`
- **Quando** alguém tenta mudar a chave para `nivel_rio`
- **Então** a alteração é recusada e a chave continua `nivel`

**CA4 – Excluir com leituras**
- **Dado** o parâmetro `chuva` com leituras gravadas
- **Quando** o administrador tenta excluí-lo
- **Então** a exclusão é recusada com a mensagem "Parâmetro com leituras não pode ser excluído."

## Fora do escopo

- Conversão de valores já gravados quando a unidade muda.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; formato da chave e critérios em Dado/Quando/Então | — |
