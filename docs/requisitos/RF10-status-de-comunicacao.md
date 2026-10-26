# RF10 – Status de comunicação e manutenção da estação

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Alta |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D5 |
| **Épico no Jira** | [SCRUM-43](https://projetodevops.atlassian.net/browse/SCRUM-43) |
| **Depende de** | [RF2](RF02-cadastro-de-estacoes.md), [RF6](RF06-recepcao-de-leituras-mqtt.md) |

## Objetivo

Hoje uma estação quebrada só é descoberta na visita do mês. O sistema deve avisar logo que uma estação parar, sem gerar avisos falsos quando ela está em conserto ou quando o sinal cai por pouco tempo, como acontece toda tarde na Amazônia.

## Quem usa

| Perfil | O que pode fazer |
|---|---|
| Administrador | Ver status, receber aviso, marcar e desmarcar manutenção |
| Técnico de campo | Ver status, receber aviso, marcar e desmarcar manutenção |

## Status

| Status | Quando |
|---|---|
| **Online** | Última leitura dentro do tempo limite da estação |
| **Sem comunicação** | Passou do tempo limite sem leitura |
| **Em manutenção** | Marcado à mão |
| **Aguardando primeira leitura** | Estação cadastrada que nunca enviou leitura |

## Regras de negócio

- **R1.** O tempo limite é o configurado na estação ([RF2](RF02-cadastro-de-estacoes.md)). O padrão é 60 minutos.
- **R2.** O sistema verifica o status das estações a cada 5 minutos.
- **R3.** Quando uma estação passa para *Sem comunicação*, sai **um** e-mail para os Administradores e Técnicos de campo ativos. Enquanto ela continuar assim, não sai outro.
- **R4.** A primeira leitura que chega volta o status para *Online*.
- **R5.** Estação *Em manutenção* ou desativada nunca passa para *Sem comunicação*.
- **R6.** Ao desmarcar a manutenção, o status volta a ser calculado pela última leitura.
- **R7.** A lista de estações mostra o status, o horário da última leitura (fuso da estação) e a tensão da bateria. Bateria abaixo de 3,5 V aparece destacada.
- **R8. E-mail:** assunto `[Vigia] Estação <uid> sem comunicação`, com estação, comunidade, horário da última leitura e tensão da bateria.

## Critérios de aceitação

**CA1 – Sem comunicação**
- **Dado** a PCD-PAN-03, com limite de 60 min e última leitura às 10:00
- **Quando** dá 11:05 sem nova leitura
- **Então** o status é *Sem comunicação* e sai 1 e-mail para cada administrador e técnico ativo

**CA2 – Sem repetir aviso**
- **Dado** o cenário do CA1
- **Quando** a verificação roda de novo às 11:30
- **Então** nenhum e-mail novo é enviado

**CA3 – Limite maior na Amazônia**
- **Dado** a PCD-AMZ-01, com limite de 180 min e última leitura às 14:00
- **Quando** dá 16:00
- **Então** o status continua *Online*

**CA4 – Manutenção**
- **Dado** a PCD-PAN-03 marcada *Em manutenção*, sem leitura há 5 horas
- **Quando** a verificação roda
- **Então** o status não muda e nenhum e-mail é enviado

**CA5 – Volta**
- **Dado** uma estação *Sem comunicação*
- **Quando** chega uma leitura
- **Então** o status volta para *Online*

## Fora do escopo

- Aviso de "estação voltou".
- Envio por WhatsApp ou SMS.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; intervalo da verificação, status inicial, e-mail e critérios em Dado/Quando/Então | — |
