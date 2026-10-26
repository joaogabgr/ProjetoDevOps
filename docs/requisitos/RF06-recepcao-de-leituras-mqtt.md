# RF6 – Recepção das leituras via MQTT

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Alta |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D8, D9, D10 |
| **Épico no Jira** | [SCRUM-10](https://projetodevops.atlassian.net/browse/SCRUM-10) |
| **Depende de** | [RF1](RF01-sensores-por-estacao.md), [RF2](RF02-cadastro-de-estacoes.md) |

## Objetivo

Receber as leituras das estações quase em tempo real, no lugar do cartão de memória recolhido uma vez por mês, sem perder nem duplicar dados quando a rede cai.

## Como as estações enviam

- **Caminho até a internet:** 11 estações (Pantanal e Cerrado) usam GSM 2G. As 3 da Amazônia mandam por LoRa até um gateway, que repassa no mesmo formato.
- **Broker:** o broker MQTT faz parte do sistema.
- **Tópico:** `vigia/estacoes/{uid}/leituras`, QoS 1, uma mensagem a cada 15 minutos:

```json
{ "uid": "PCD-PAN-03", "seq": 18452, "ts": 1760875200, "bat": 3.92,
  "leituras": { "chuva": 0.4, "temp": 27.3, "umid": 81, "nivel": 182.5 } }
```

| Campo | Significado |
|---|---|
| `uid` | Identificador da estação |
| `seq` | Contador da placa, sobe 1 por leitura |
| `ts` | Horário da **medição**, Unix epoch em segundos, UTC |
| `bat` | Tensão da bateria, em volts |
| `leituras` | Uma chave por sensor da estação ([RF3](RF03-cadastro-de-parametros.md)) |

## Regras de negócio

- **R1. Estação desconhecida ou desativada:** a mensagem é recusada e registrada em log.
- **R2. Dois horários:** cada leitura grava o horário da medição (`ts`) e o horário de chegada. Gráficos e relatórios usam sempre o da medição.
- **R3. Duplicada:** mensagem com `uid`, `seq` e `ts` iguais a uma já gravada é ignorada.
- **R4. Data inválida:** `ts` anterior a 01/01/2024, ou mais de 10 minutos à frente do horário de chegada, não entra como leitura válida. Vai para a lista de leituras rejeitadas, visível ao Administrador. *Decisão provisória (pendência P1 da ata).*
- **R5. Atrasada:** leitura que chega mais de 30 minutos depois do `ts` é marcada como atrasada.
- **R6. Parâmetro não instalado:** chaves de `leituras` que a estação não tem são ignoradas e registradas em log.
- **R7. Ordem:** depois de uma queda, a placa manda primeiro a leitura atual e depois até 7 dias de pendentes, da mais antiga para a mais nova. O sistema aceita qualquer ordem de chegada.
- **R8. Última leitura:** a cada leitura válida, a estação guarda o horário da medição mais recente e a tensão da bateria.

## Critérios de aceitação

**CA1 – Duplicada**
- **Dado** a leitura `seq` 18452 da PCD-PAN-03 já gravada
- **Quando** a mesma mensagem chega de novo
- **Então** continua existindo uma leitura só

**CA2 – Atrasada**
- **Dado** uma leitura medida às 10:00 (horário da estação)
- **Quando** ela chega às 14:00
- **Então** aparece no histórico às 10:00 e marcada como atrasada

**CA3 – Relógio zerado**
- **Dado** uma mensagem com `ts` de 01/01/2000
- **Quando** ela chega
- **Então** não aparece em gráficos nem relatórios e aparece na lista de rejeitadas

**CA4 – Estação desconhecida**
- **Dado** nenhum cadastro com `uid` `PCD-XYZ-99`
- **Quando** chega uma mensagem dessa estação
- **Então** nada é gravado e o log registra a recusa

## Fora do escopo

- Comandos do sistema para a estação (ex.: reiniciar placa).
- Leitura do cartão de memória por upload de arquivo.

## Dúvidas em aberto

- P1: descartar ou guardar as leituras de data inválida (Ricardo).
- P2: teste em campo do reenvio da fila (Felipe).

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; regras numeradas e critérios em Dado/Quando/Então | — |
