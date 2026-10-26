# Glossário

Termos do domínio do cliente, usados com o mesmo sentido nos requisitos, nas histórias e no código.

| Termo | Significado | No código |
|---|---|---|
| **PCD** | Plataforma de Coleta de Dados. Equipamento de baixo custo instalado em campo, com sensores e transmissão | — |
| **Estação** | Uma PCD cadastrada no sistema, identificada pelo `uid` gravado na placa | `Station` |
| **Parâmetro** | Tipo de medida que um sensor produz (chuva, nível do rio…), identificado pela chave enviada no JSON | `TypeParameter` |
| **Chave do parâmetro** | Nome do campo no JSON da placa (`chuva`, `nivel`…). Não muda depois de criada | `typeJson` |
| **Leitura** | Conjunto de valores que uma estação envia a cada 15 minutos | `Measure` |
| **Horário da medição** | Momento em que a placa mediu (`ts`). É o que vale para gráficos e relatórios | `ts` |
| **Horário de chegada** | Momento em que o sistema recebeu a leitura | — |
| **Leitura atrasada** | Leitura que chega mais de 30 minutos depois do horário da medição | — |
| **Leitura duplicada** | Mesma leitura recebida duas vezes (mesmos `uid`, `seq` e `ts`). É ignorada | — |
| **Leitura rejeitada** | Leitura que não entra como válida (ex.: data do ano 2000 por relógio da placa zerado) | — |
| **Regra de alerta** | Condição configurada pelo administrador numa estação (limite, subida por hora ou acumulado) | `Alert` |
| **Ocorrência** | Registro de que uma regra de alerta foi atingida, com valor e horário | — |
| **Tempo limite sem comunicação** | Minutos sem leitura até a estação ser considerada sem comunicação. Padrão 60 | — |
| **Sem comunicação** | Status da estação que passou do tempo limite sem enviar leitura | — |
| **Em manutenção** | Status marcado à mão pelo técnico enquanto a estação está em conserto. Não gera avisos | — |
| **Disponibilidade** | Leituras recebidas ÷ leituras esperadas no período (96 por dia) | — |
| **Bioma** | Pantanal, Cerrado ou Amazônia | — |
| **Comunidade** | Localidade atendida por uma ou mais estações (ex.: São Benedito) | — |
| **Administrador** | Equipe fixa da ONG. Acesso total | `ADMIN` |
| **Técnico de campo** | Voluntário que instala e conserta estações | — |
| **Agente comunitário** | Liderança de uma comunidade. Vê os dados dela e recebe alertas | — |
| **Público** | Qualquer pessoa, sem login. Vê só o painel público | — |
| **Broker MQTT** | Servidor que recebe as mensagens das estações e repassa ao sistema | — |
| **QoS 1** | Nível de entrega do MQTT em que a mensagem chega pelo menos uma vez, e por isso pode chegar repetida | — |
| **Gateway LoRa** | Equipamento na comunidade que recebe por rádio as leituras das estações próximas e repassa ao broker pela internet | — |
