# RF1 – Sensores configuráveis por estação

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Prioridade** | Alta |
| **Origem** | [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D2 |
| **Épico no Jira** | [SCRUM-5](https://projetodevops.atlassian.net/browse/SCRUM-5) |
| **Depende de** | [RF3](RF03-cadastro-de-parametros.md) |

## Objetivo

As estações não têm os mesmos sensores: pluviômetro e temperatura/umidade estão nas 14, nível do rio em 9, pressão em 6 e vento em 4. O sistema precisa saber o que cada estação mede, sem mudança de código quando entrar um sensor novo.

## Quem usa

| Perfil | O que pode fazer |
|---|---|
| Administrador | Escolher os parâmetros instalados de cada estação |
| Técnico de campo | Escolher os parâmetros instalados de cada estação |

## Regras de negócio

- **R1.** Cada estação tem uma lista de parâmetros instalados, escolhida entre os parâmetros cadastrados no [RF3](RF03-cadastro-de-parametros.md).
- **R2.** Uma estação tem no mínimo 1 parâmetro instalado.
- **R3.** Um parâmetro novo pode ser ligado a qualquer estação sem mudar código.
- **R4.** Leituras de um parâmetro que a estação não tem são ignoradas e registradas em log ([RF6](RF06-recepcao-de-leituras-mqtt.md), R6).

## Critérios de aceitação

**CA1 – Leitura de parâmetro não instalado**
- **Dado** a estação PCD-CER-02 com `chuva`, `temp` e `umid` instalados
- **Quando** chega uma leitura com `chuva`, `temp`, `umid` e `nivel`
- **Então** são gravados `chuva`, `temp` e `umid`, e `nivel` é ignorado e registrado em log

**CA2 – Sensor novo sem mudar código**
- **Dado** o parâmetro `pressao` cadastrado
- **Quando** o técnico liga `pressao` à estação PCD-CER-02
- **Então** as próximas leituras de `pressao` dessa estação passam a ser gravadas

**CA3 – Estação sem parâmetro**
- **Dado** o cadastro de uma estação
- **Quando** nenhum parâmetro é escolhido
- **Então** o cadastro é recusado com a mensagem "A estação precisa de ao menos um parâmetro."

## Fora do escopo

- Calibração de sensores (fator e deslocamento por estação).

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Migrado para arquivo próprio; critérios em Dado/Quando/Então | — |
