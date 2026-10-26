# RF8 – Disparo de alertas por e-mail

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Alta |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D4, D8 |
| **Épico no Jira** | [SCRUM-12](https://projetodevops.atlassian.net/browse/SCRUM-12) |
| **Depende de** | [RF4](RF04-regras-de-alerta.md), [RF6](RF06-recepcao-de-leituras-mqtt.md) |

## Objetivo

Avisar a equipe e as lideranças assim que uma regra de risco for atingida. Em março, São Benedito teve 3 horas de aviso, e com os dados de chuva rio acima daria para avisar com um dia de antecedência.

## Quem usa

| Perfil | O que recebe |
|---|---|
| Destinatários da regra | E-mail do alerta |
| Administrador | Lista de ocorrências |

## Regras de negócio

- **R1.** Cada leitura válida é verificada contra as regras ativas da estação.
- **R2.** Quando uma regra é atingida, o sistema registra uma **ocorrência** (regra, estação, parâmetro, valor, horário da medição, horário de chegada) e envia e-mail aos destinatários **em até 2 minutos** depois de a leitura chegar.
- **R3. Sem repetição:** enquanto a condição continuar, a regra não manda outro e-mail. Ela é "rearmada" quando uma leitura volta a ficar fora da condição.
- **R4. Leitura atrasada:** se a leitura que disparou for atrasada ([RF6](RF06-recepcao-de-leituras-mqtt.md), R5), o assunto começa com `[LEITURA ATRASADA]` e o texto informa o horário da medição.
- **R5. Conteúdo do e-mail:**
  - assunto `[Vigia] <nome da regra> – <estação>`;
  - corpo com estação, comunidade, parâmetro, valor com unidade, condição da regra e horário da medição no fuso da estação.
- **R6.** Destinatários desativados não recebem.

## Critérios de aceitação

**CA1 – Disparo**
- **Dado** a regra "Cheia Rio Miranda" (nível acima de 250 cm, PCD-PAN-03) com 2 destinatários
- **Quando** chega uma leitura de 262 cm
- **Então** é registrada 1 ocorrência e sai 1 e-mail para cada destinatário em até 2 minutos

**CA2 – Sem repetição**
- **Dado** o alerta do CA1 já disparado
- **Quando** chega a leitura seguinte, de 265 cm
- **Então** nenhum e-mail novo é enviado

**CA3 – Rearme**
- **Dado** o alerta do CA1 disparado
- **Quando** chegam 240 cm e depois 255 cm
- **Então** a leitura de 255 cm gera uma nova ocorrência e um novo e-mail

**CA4 – Atrasada**
- **Dado** a mesma regra
- **Quando** chega 3 horas atrasada uma leitura de 262 cm medida às 10:00
- **Então** o assunto do e-mail começa com `[LEITURA ATRASADA]` e o texto diz "medido às 10:00"

## Fora do escopo

- WhatsApp e SMS (pendência P4 da ata, para versão futura).
- Confirmação de leitura do alerta pelo destinatário.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; rearme, conteúdo do e-mail e critérios em Dado/Quando/Então | — |
