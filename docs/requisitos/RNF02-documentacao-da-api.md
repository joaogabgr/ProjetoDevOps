# RNF2 – Documentação da API e da integração

| Campo | Valor |
|---|---|
| **Status** | Em validação |
| **Versão** | 1.1 |
| **Origem** | Proposta inicial do projeto; [Ata 2026-10-19](../cliente/reunioes/2026-10-19-levantamento-inicial.md), D9 |

## Regras

- **R1.** Todas as rotas da API são documentadas em OpenAPI, com um exemplo de requisição e de resposta, incluindo os erros.
- **R2.** O formato da mensagem MQTT das estações ([RF6](RF06-recepcao-de-leituras-mqtt.md)) é documentado com exemplo, para quem for programar uma placa nova.
- **R3.** A documentação é publicada junto com cada versão.

## Critério de aceitação

- **Dado** a versão publicada, **quando** alguém abre a documentação da API, **então** cada rota tem exemplo de requisição, de resposta e de erro.

## Histórico de alterações

| Versão | Data | Alteração | Aprovado por |
|---|---|---|---|
| 1.0 | 2026-10-19 | Versão inicial, no README | — |
| 1.1 | 2026-10-26 | Formato (OpenAPI) e documentação do MQTT | — |
