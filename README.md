

<h2 id='repositorios'> Repositórios do Projeto </h2>

Este é o repositório principal, onde ficam a documentação, os requisitos, o Product Backlog e os relatórios de sprint. O código é desenvolvido nos repositórios abaixo.

| Repositório | Conteúdo |
|-------------|----------|
| [ProjetoDevOps](https://github.com/joaogabgr/ProjetoDevOps) | Este repositório: documentação, requisitos, Product Backlog e sprints |
| [ProjetoDevOps-front](https://github.com/joaogabgr/ProjetoDevOps-front) | Aplicação web: dashboards e telas de gestão |
| [ProjetoDevOps-back](https://github.com/joaogabgr/ProjetoDevOps-back) | API: recebimento, processamento e persistência dos dados das estações |

Os repositórios de código estão vinculados aqui como submódulos, nas pastas `front/` e `back/`. Para clonar o projeto inteiro de uma vez:

```bash
git clone --recurse-submodules https://github.com/joaogabgr/ProjetoDevOps.git
```

Se você já clonou sem os submódulos, use `git submodule update --init --recursive` para baixá-los. Para atualizar as pastas com o que há de mais recente em cada repositório, use `git submodule update --remote`.

Gestão das atividades: [board do Jira](https://projetodevops.atlassian.net/jira/software/projects/SCRUM/boards/1).

**O que já foi entregue:** [ENTREGAS.md](ENTREGAS.md) mostra a situação de cada requisito e em qual versão ele foi publicado. A página é atualizada automaticamente todo dia, a partir do Jira e das releases do [back](https://github.com/joaogabgr/ProjetoDevOps-back/releases) e do [front](https://github.com/joaogabgr/ProjetoDevOps-front/releases).

<br>

<h2 id='objetivo'> Objetivo </h2>

**Tema:** Monitoramento Comunitário e Prevenção de Enchentes (Terceiro Setor / ONGs).

**Cliente:** Instituto Vigia das Águas, uma organização sem fins lucrativos que instala PCDs (Plataformas de Coleta de Dados) de baixo custo no Pantanal, no Cerrado e na Amazônia, em comunidades com rede instável. O cliente é fictício, e toda a conversa de levantamento de requisitos está registrada em [`conversa-cliente.json`](conversa-cliente.json).

**Problema atual:** as 14 estações gravam os dados num cartão de memória que um voluntário recolhe uma vez por mês. O aviso de cheia depende de um morador ver o rio subindo. Em março, a comunidade São Benedito (Rio Miranda, Pantanal) teve cerca de 3 horas de aviso e 11 casas foram alagadas. Os relatórios para os financiadores são montados à mão.

**Objetivo:** receber as leituras das estações quase em tempo real, avisar a equipe e as lideranças comunitárias quando o rio ou a chuva passarem dos limites, mostrar os dados em painéis e gerar os relatórios dos financiadores automaticamente.

<br>

<h2 id='proposta'> Proposta de Solução </h2>

- **Recepção via MQTT:** as estações publicam uma leitura a cada 15 minutos num broker MQTT que faz parte do sistema. Leituras atrasadas por falta de sinal entram no horário em que foram medidas.
- **Alertas configuráveis:** o administrador define limites por estação (nível, subida por hora, chuva acumulada), e o disparo é feito por e-mail. O sistema também avisa quando uma estação para de mandar dados.
- **Painéis e relatórios:** gráficos por estação, um painel público sem login, relatório mensal em PDF e exportação das leituras em Excel.
- **Entrega:** o sistema rodando e o código-fonte, com documentação para o voluntário de TI da ONG manter depois. A entrega final é em 09/11/2026, no fim da sprint 3.

<br>

<h2 id='requisitos-funcionais'> Requisitos Funcionais </h2>

Cada requisito traz quem usa, as regras e os critérios de aceitação, e indica de qual conversa com o cliente ele saiu (`#n` = item `id` em [`conversa-cliente.json`](conversa-cliente.json)). Os números de RF1 a RF9 foram mantidos porque já aparecem nos nomes das branches e nas issues do Jira. Os itens novos começam no RF10.

**Perfis citados:** Administrador (equipe fixa da ONG), Técnico de campo (voluntários que instalam as estações), Agente comunitário (lideranças das comunidades) e Público (sem login). As permissões de cada perfil estão no [RF9](#rf9).

| Número | Resumo |
|--------|--------|
| [RF1](#rf1) | Sensores configuráveis por estação |
| [RF2](#rf2) | Cadastro de estações |
| [RF3](#rf3) | Cadastro de parâmetros (tipos de medida) |
| [RF4](#rf4) | Cadastro de regras de alerta |
| [RF5](#rf5) | Cadastro de usuários e senha |
| [RF6](#rf6) | Recepção das leituras via MQTT |
| [RF7](#rf7) | Painéis com gráficos por estação |
| [RF8](#rf8) | Disparo de alertas por e-mail |
| [RF9](#rf9) | Controle de acesso por perfil |
| [RF10](#rf10) | Status de comunicação e manutenção da estação |
| [RF11](#rf11) | Painel público |
| [RF12](#rf12) | Relatório mensal em PDF |
| [RF13](#rf13) | Exportação das leituras em Excel |

<h3 id="rf1">RF1 – Sensores configuráveis por estação</h3>

As estações não têm todas os mesmos sensores. Pluviômetro e temperatura/umidade estão nas 14, nível do rio em 9, pressão em 6 e vento em 4 (#3).

- **Quem:** Administrador e Técnico de campo.
- **Regras:**
  - Cada estação tem a sua lista de parâmetros instalados, escolhida entre os parâmetros do [RF3](#rf3).
  - Um parâmetro novo cadastrado no RF3 pode ser ligado a qualquer estação, sem mudar código.
  - Leituras de um parâmetro que a estação não tem são ignoradas e registradas em log (ver [RF6](#rf6)).
- **Critérios de aceitação:**
  - Uma estação cadastrada com `chuva`, `temp` e `umid` aceita essas três chaves e ignora `nivel`.
  - Depois de cadastrar o parâmetro `pressao` e ligá-lo à estação, as leituras de `pressao` passam a ser gravadas.

<h3 id="rf2">RF2 – Cadastro de estações</h3>

São 14 estações hoje, com previsão de mais 10 no ano que vem (#3).

- **Quem:** Administrador e Técnico de campo cadastram, editam, desativam e excluem. O Agente comunitário só vê as estações da comunidade dele.
- **Campos:**

| Campo | Regra |
|---|---|
| Identificador (`uid`) | Obrigatório e único. É o mesmo gravado na placa, por exemplo `PCD-PAN-03` |
| Nome | Obrigatório |
| Bioma | Pantanal, Cerrado ou Amazônia |
| Comunidade | Obrigatória |
| Latitude e longitude | Obrigatórias |
| Fuso horário | Por exemplo `America/Campo_Grande` ou `America/Belem` |
| Parâmetros instalados | Ver [RF1](#rf1) |
| Tempo limite sem comunicação | Em minutos. Padrão 60 (ver [RF10](#rf10)) |

- **Regras:**
  - A lista de estações pode ser filtrada por bioma, comunidade e status.
  - Uma estação sem nenhuma leitura pode ser excluída.
  - Uma estação com leituras só pode ser **desativada**: o histórico fica, mas novas leituras são recusadas.
- **Critérios de aceitação:**
  - Cadastrar um `uid` que já existe retorna erro e não grava nada.
  - Excluir uma estação com leituras é recusado, com uma mensagem que indica a opção de desativar.

<h3 id="rf3">RF3 – Cadastro de parâmetros (tipos de medida)</h3>

- **Quem:** Administrador e Técnico de campo.
- **Campos:** chave (o nome usado na mensagem MQTT, único), nome de exibição, unidade e casas decimais.
- **Carga inicial:** o sistema já vem com os 7 parâmetros que as placas enviam hoje (#11):

| Chave | Unidade |
|---|---|
| `chuva` | mm em 15 minutos |
| `temp` | °C |
| `umid` | % |
| `nivel` | cm |
| `pressao` | hPa |
| `vento_vel` | m/s |
| `vento_dir` | graus |

- **Regras:**
  - A chave não pode ser alterada depois de criada, porque está gravada nas placas.
  - Um parâmetro com leituras não pode ser excluído.
- **Critério de aceitação:** editar a unidade de `nivel` altera a unidade nos gráficos e relatórios, sem alterar os valores já gravados.

<h3 id="rf4">RF4 – Cadastro de regras de alerta</h3>

- **Quem:** só o Administrador (#2, #4).
- **Tipos de regra** (#4):

| Tipo | Exemplo |
|---|---|
| **Limite** | O parâmetro passa de um valor: "nível acima de 250 cm" |
| **Subida por hora** | O parâmetro sobe mais que X numa janela de 60 minutos: "nível subindo mais de 20 cm/h" |
| **Acumulado** | A soma do parâmetro numa janela de N horas passa de X: "chuva acima de 80 mm em 24 h" |

- **Campos:** nome, estação, parâmetro, tipo, valor, janela (só nos tipos subida por hora e acumulado), destinatários (usuários ou perfis) e ativa/inativa.
- **Regras:** o parâmetro escolhido precisa estar instalado na estação.
- **Critério de aceitação:** não é possível criar uma regra de `nivel` para uma estação que não tem esse sensor.

<h3 id="rf5">RF5 – Cadastro de usuários e senha</h3>

- **Quem:** o Administrador cadastra, edita, desativa e exclui. Qualquer usuário com login altera a própria senha.
- **Campos:** nome, e-mail (usado no login, único), perfil (Administrador, Técnico de campo ou Agente comunitário) e comunidade. A comunidade é obrigatória para o Agente comunitário.
- **Regras:**
  - A senha tem no mínimo 8 caracteres e é guardada com hash.
  - A recuperação de senha envia por e-mail um link de uso único, válido por 1 hora.
  - O último Administrador ativo não pode ser excluído nem rebaixado.
- **Critérios de aceitação:**
  - Cadastrar um Agente comunitário sem comunidade é recusado.
  - O link de recuperação usado uma vez não funciona de novo.

<h3 id="rf6">RF6 – Recepção das leituras via MQTT</h3>

As estações publicam uma leitura a cada 15 minutos. As 11 estações do Pantanal e do Cerrado usam GSM 2G. As 3 da Amazônia usam LoRa até um gateway, que repassa a mensagem no mesmo formato. O broker faz parte do sistema (#11).

- **Tópico:** `vigia/estacoes/{uid}/leituras`, com QoS 1.
- **Mensagem:**

```json
{ "uid": "PCD-PAN-03", "seq": 18452, "ts": 1760875200, "bat": 3.92,
  "leituras": { "chuva": 0.4, "temp": 27.3, "umid": 81, "nivel": 182.5 } }
```

`ts` é o horário da **medição**, em Unix epoch, segundos, UTC. `seq` sobe 1 a cada leitura. `bat` é a tensão da bateria em volts.

- **Regras:**
  1. **Estação desconhecida ou desativada:** a mensagem é recusada e registrada em log.
  2. **Horário da medição:** cada leitura grava o horário da medição (`ts`) e, separado, o horário em que chegou. Leituras atrasadas entram na posição certa do histórico (#10, #12).
  3. **Duplicadas:** mensagens com o mesmo `uid`, `seq` e `ts` são ignoradas. O QoS 1 pode entregar a mesma mensagem duas vezes (#12).
  4. **Data inválida:** é recusada uma leitura com `ts` anterior a 01/01/2024 ou mais de 10 minutos à frente do horário de chegada. Isso cobre o caso do relógio da placa voltar para o ano 2000 (#12). A leitura recusada fica numa lista de leituras rejeitadas, visível ao Administrador. *Essa decisão é provisória e precisa ser confirmada com o cliente.*
  5. **Leitura atrasada:** é a que chega mais de 30 minutos depois do `ts`.
  6. **Chaves sem sensor:** chaves de `leituras` que a estação não tem são ignoradas ([RF1](#rf1)).
  7. **Ordem de chegada:** a placa reenvia até 7 dias de leituras pendentes quando o sinal volta, primeiro a atual e depois da mais antiga para a mais nova. O sistema aceita receber nessa ordem (#12).
- **Critérios de aceitação:**
  - A mesma mensagem publicada duas vezes gera uma leitura só.
  - Uma leitura medida às 10:00 e recebida às 14:00 aparece no gráfico às 10:00, marcada como atrasada.
  - Uma mensagem com `ts` de 2000 não entra nos gráficos e aparece na lista de rejeitadas.

<h3 id="rf7">RF7 – Painéis com gráficos por estação</h3>

- **Quem:** Administrador e Técnico de campo veem todas as estações. O Agente comunitário vê as da comunidade dele.
- **Regras:**
  - Um gráfico por parâmetro instalado na estação.
  - Períodos: últimas 24 horas (padrão), 7 dias, 30 dias e intervalo personalizado.
  - Até 7 dias, o gráfico mostra cada leitura. Acima disso, mostra médias horárias. Acima de 90 dias, médias diárias.
  - Horários exibidos no fuso da estação ([RF2](#rf2)).
- **Critério de aceitação:** escolhendo 01/10 a 07/10, o gráfico mostra só as leituras medidas nesse intervalo, incluindo as que chegaram atrasadas depois.

<h3 id="rf8">RF8 – Disparo de alertas por e-mail</h3>

O e-mail é o canal da primeira versão. WhatsApp e SMS ficam para depois (#4).

- **Regras:**
  - Cada leitura recebida é verificada contra as regras ativas da estação ([RF4](#rf4)).
  - **Ocorrência:** quando uma regra é atingida, o sistema registra uma ocorrência (regra, estação, valor, horário da medição) e envia e-mail aos destinatários em até 2 minutos depois de a leitura chegar.
  - **Sem repetição:** enquanto a condição continuar, a regra não manda e-mail de novo. Ela volta a valer depois que uma leitura fica abaixo do limite.
  - **Leitura atrasada:** se a leitura que disparou o alerta for atrasada ([RF6](#rf6)), o assunto do e-mail começa com **"[LEITURA ATRASADA]"** e o texto informa o horário da medição. Assim o alerta não parece estar acontecendo agora (#10).
- **Critérios de aceitação:**
  - Com a regra "nível acima de 250 cm", uma leitura de 262 cm gera 1 ocorrência e 1 e-mail por destinatário.
  - A leitura seguinte, de 265 cm, não gera outro e-mail.
  - A mesma leitura de 262 cm, recebida 3 horas atrasada, gera e-mail com "[LEITURA ATRASADA]" e o horário da medição.

<h3 id="rf9">RF9 – Controle de acesso por perfil</h3>

Perfis definidos pelo cliente (#2):

| Ação | Administrador | Técnico de campo | Agente comunitário | Público (sem login) |
|---|:---:|:---:|:---:|:---:|
| Gerenciar usuários (RF5) | ✅ | ❌ | ❌ | ❌ |
| Gerenciar estações e parâmetros (RF1–RF3) | ✅ | ✅ | ❌ | ❌ |
| Gerenciar regras de alerta (RF4) | ✅ | ❌ | ❌ | ❌ |
| Marcar estação em manutenção (RF10) | ✅ | ✅ | ❌ | ❌ |
| Ver painéis e gráficos (RF7) | ✅ todas | ✅ todas | ✅ só da sua comunidade | ❌ |
| Gerar relatório PDF e Excel (RF12, RF13) | ✅ | ✅ | ✅ só da sua comunidade | ❌ |
| Receber alertas (RF8) | se for destinatário | se for destinatário | se for destinatário | ❌ |
| Painel público (RF11) | ✅ | ✅ | ✅ | ✅ |

- **Critério de aceitação:** um Agente comunitário que pede pela API os dados de uma estação de outra comunidade recebe erro 403.

<h3 id="rf10">RF10 – Status de comunicação e manutenção da estação</h3>

Hoje uma estação quebrada só é descoberta na visita do mês (#4, #9).

- **Status:**

| Status | Quando |
|---|---|
| **Online** | Recebeu leitura dentro do tempo limite da estação |
| **Sem comunicação** | Passou do tempo limite sem leitura. O padrão é 60 minutos, ajustável por estação, porque nas estações da Amazônia o sinal cai quase toda tarde por uma ou duas horas |
| **Em manutenção** | Marcado manualmente |

- **Regras:**
  - Quando uma estação passa para "Sem comunicação", os Administradores e os Técnicos de campo recebem e-mail.
  - Quando ela volta a mandar dados, o status volta para "Online".
  - Administrador e Técnico de campo marcam e desmarcam "Em manutenção" pela tela. Enquanto estiver marcada, a estação não gera aviso de falta de comunicação.
  - A tela de estações mostra o status, o horário da última leitura e a tensão da bateria.
- **Critérios de aceitação:**
  - Com tempo limite de 60 minutos, uma estação sem leitura desde 10:00 fica "Sem comunicação" às 11:00 e gera 1 e-mail.
  - Com a estação "Em manutenção", nenhum e-mail é enviado.

<h3 id="rf11">RF11 – Painel público</h3>

- **Quem:** qualquer pessoa, sem login (#2).
- **Mostra:**
  - para cada estação ativa: nome, comunidade e horário da última leitura;
  - o nível do rio atual, só nas estações com sensor de nível;
  - se existe alerta ativo.
- **Não mostra:** histórico, outras medidas, relatórios nem dados de usuários.
- **Critério de aceitação:** sem login, a página abre e as rotas de histórico e relatório retornam 401.

<h3 id="rf12">RF12 – Relatório mensal em PDF</h3>

O relatório vai para os financiadores (#1, #5).

- **Entrada:** estação e mês.
- **Conteúdo:**
  - Mínima, máxima e média de cada parâmetro no mês.
  - Chuva acumulada no mês.
  - Lista de alertas disparados, com regra, valor e horário.
  - **Disponibilidade:** leituras recebidas dividido por leituras esperadas (96 por dia).
- **Critério de aceitação:** num mês de 30 dias com 2.592 leituras recebidas, a disponibilidade aparece como 90%.

<h3 id="rf13">RF13 – Exportação das leituras em Excel</h3>

As leituras brutas são usadas pela universidade parceira (#5).

- **Entrada:** uma ou mais estações e um período.
- **Saída:** arquivo `.xlsx` com uma linha por leitura e as colunas `uid`, estação, data/hora da medição (no fuso da estação), data/hora de recebimento e uma coluna por parâmetro.
- **Critério de aceitação:** exportar uma estação por 1 dia sem falhas gera 96 linhas.


<br>

<h2 id='requisitos-nao-funcionais'> Requisitos Não Funcionais </h2>

| Número | Descrição |
|--------|-----------|
| RNF1 | O sistema deve ser fácil de usar e visualmente agradável, especialmente nos painéis com os dados das estações. |
| RNF2 | Toda a comunicação entre a plataforma e as aplicações deve ser bem documentada, com exemplos claros para facilitar futuras integrações. |
| RNF3 | O sistema deve ter um processo automático que verifique se tudo está funcionando corretamente antes de publicar uma nova versão. |
| RNF4 | Sempre que houver uma atualização no sistema, ela deve ser publicada automaticamente para que o cliente sempre tenha acesso à versão mais recente, sem precisar esperar ou atualizar manualmente. |

<br>

<h2 id='product-backlog'> Product Backlog </h2>

<table>
  <thead>
    <tr align="center">
      <th>Rank</th>
      <th>Prioridade</th>
      <th>User Story</th>
      <th>Planning Poker</th>
      <th>Sprint</th>
      <th>Requisito</th>
      <th>Jira</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>ALTA</td><td>Como administrador, quero cadastrar uma estação informando quais sensores ela tem, para que o sistema aceite só as medidas que ela realmente envia.</td><td>3</td><td>1</td><td><a href="#rf1">RF1</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-14">SCRUM-14</a></td></tr>
    <tr><td>2</td><td>ALTA</td><td>Como técnico de campo, quero editar os dados de uma estação (comunidade, coordenadas, sensores e tempo limite sem comunicação) para refletir o que está instalado em campo.</td><td>3</td><td>1</td><td><a href="#rf2">RF2</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-15">SCRUM-15</a></td></tr>
    <tr><td>3</td><td>ALTA</td><td>Como técnico de campo, quero listar as estações filtrando por bioma, comunidade e status, para encontrar rápido a estação que preciso.</td><td>3</td><td>1</td><td><a href="#rf2">RF2</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-16">SCRUM-16</a></td></tr>
    <tr><td>4</td><td>ALTA</td><td>Como administrador, quero excluir uma estação sem leituras ou desativar uma com histórico, para não perder dados já coletados.</td><td>3</td><td>1</td><td><a href="#rf2">RF2</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-17">SCRUM-17</a></td></tr>
    <tr><td>5</td><td>ALTA</td><td>Como administrador, quero cadastrar um parâmetro com chave, nome, unidade e casas decimais, para receber um novo tipo de sensor sem mudar código.</td><td>3</td><td>1</td><td><a href="#rf3">RF3</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-18">SCRUM-18</a></td></tr>
    <tr><td>6</td><td>ALTA</td><td>Como administrador, quero editar o nome, a unidade e as casas decimais de um parâmetro, sem poder mudar a chave gravada nas placas.</td><td>3</td><td>1</td><td><a href="#rf3">RF3</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-19">SCRUM-19</a></td></tr>
    <tr><td>7</td><td>ALTA</td><td>Como técnico de campo, quero ver a lista de parâmetros, já com os 7 que as placas enviam hoje, para saber o que pode ser ligado a uma estação.</td><td>3</td><td>1</td><td><a href="#rf3">RF3</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-20">SCRUM-20</a></td></tr>
    <tr><td>8</td><td>ALTA</td><td>Como administrador, quero excluir um parâmetro que não tem leituras, para manter a lista limpa sem apagar histórico.</td><td>3</td><td>1</td><td><a href="#rf3">RF3</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-21">SCRUM-21</a></td></tr>
    <tr><td>9</td><td>ALTA</td><td>Como administrador, quero cadastrar usuários com perfil e, para agentes comunitários, a comunidade, para que cada um acesse só o que precisa.</td><td>3</td><td>1</td><td><a href="#rf5">RF5</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-22">SCRUM-22</a></td></tr>
    <tr><td>10</td><td>ALTA</td><td>Como administrador, quero editar nome, perfil e comunidade de um usuário, sem conseguir rebaixar o último administrador.</td><td>3</td><td>1</td><td><a href="#rf5">RF5</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-23">SCRUM-23</a></td></tr>
    <tr><td>11</td><td>ALTA</td><td>Como administrador, quero listar os usuários filtrando por perfil e comunidade, para conferir quem tem acesso.</td><td>3</td><td>1</td><td><a href="#rf5">RF5</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-24">SCRUM-24</a></td></tr>
    <tr><td>12</td><td>ALTA</td><td>Como administrador, quero desativar ou excluir usuários que saíram do projeto, para que não acessem mais o sistema.</td><td>3</td><td>1</td><td><a href="#rf5">RF5</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-25">SCRUM-25</a></td></tr>
    <tr><td>13</td><td>ALTA</td><td>Como administrador, quero que cada perfil (administrador, técnico de campo, agente comunitário) acesse só as ações da matriz de permissões, e o agente só a sua comunidade.</td><td>2</td><td>1</td><td><a href="#rf9">RF9</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-26">SCRUM-26</a></td></tr>
    <tr><td>14</td><td>MÉDIA</td><td>Como administrador, quero criar regras de alerta dos tipos limite, subida por hora e acumulado, com estação, parâmetro, valor e destinatários.</td><td>3</td><td>2</td><td><a href="#rf4">RF4</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-27">SCRUM-27</a></td></tr>
    <tr><td>15</td><td>MÉDIA</td><td>Como administrador, quero editar valor, janela, destinatários e ativar ou desativar uma regra de alerta.</td><td>3</td><td>2</td><td><a href="#rf4">RF4</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-28">SCRUM-28</a></td></tr>
    <tr><td>16</td><td>MÉDIA</td><td>Como administrador, quero listar as regras de alerta por estação, vendo quais estão ativas.</td><td>3</td><td>2</td><td><a href="#rf4">RF4</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-29">SCRUM-29</a></td></tr>
    <tr><td>17</td><td>MÉDIA</td><td>Como administrador, quero excluir uma regra de alerta que não é mais usada.</td><td>3</td><td>2</td><td><a href="#rf4">RF4</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-30">SCRUM-30</a></td></tr>
    <tr><td>18</td><td>MÉDIA</td><td>Como equipe de desenvolvimento, quero um emulador que publique leituras no broker MQTT no mesmo formato das placas, inclusive duplicadas e atrasadas, para testar sem as estações reais.</td><td>5</td><td>2</td><td><a href="#rf6">RF6</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-31">SCRUM-31</a></td></tr>
    <tr><td>19</td><td>MÉDIA</td><td>Como sistema, quero calcular médias horárias e diárias das leituras, para que gráficos de períodos longos e o relatório mensal carreguem rápido.</td><td>8</td><td>2</td><td><a href="#rf7">RF7</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-32">SCRUM-32</a></td></tr>
    <tr><td>20</td><td>MÉDIA</td><td>Como sistema, quero gravar cada leitura com o horário da medição e o de chegada, ignorando duplicadas e recusando datas inválidas, para que o histórico fique correto.</td><td>5</td><td>2</td><td><a href="#rf6">RF6</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-33">SCRUM-33</a></td></tr>
    <tr><td>21</td><td>MÉDIA</td><td>Como técnico de campo, quero que a estação fique "sem comunicação" depois do tempo limite e que eu receba um e-mail, para não descobrir a falha só na visita do mês.</td><td>5</td><td>2</td><td><a href="#rf10">RF10</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-34">SCRUM-34</a></td></tr>
    <tr><td>22</td><td>MÉDIA</td><td>Como agente comunitário, quero receber e-mail quando uma regra de alerta da minha comunidade for atingida, com aviso de leitura atrasada quando for o caso.</td><td>3</td><td>2</td><td><a href="#rf8">RF8</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-35">SCRUM-35</a></td></tr>
    <tr><td>23</td><td>BAIXA</td><td>Como técnico de campo, quero ver um gráfico por parâmetro de cada estação, nas últimas 24 horas e no fuso da estação.</td><td>8</td><td>3</td><td><a href="#rf7">RF7</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-36">SCRUM-36</a></td></tr>
    <tr><td>24</td><td>BAIXA</td><td>Como técnico de campo, quero escolher o período do gráfico (24 h, 7 dias, 30 dias ou personalizado), para analisar um evento específico.</td><td>3</td><td>3</td><td><a href="#rf7">RF7</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-37">SCRUM-37</a></td></tr>
    <tr><td>25</td><td>BAIXA</td><td>Como administrador, quero gerar o relatório mensal de uma estação em PDF, com mínimas, máximas, médias, chuva acumulada, alertas e disponibilidade, para enviar aos financiadores.</td><td>5</td><td>3</td><td><a href="#rf12">RF12</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-38">SCRUM-38</a></td></tr>
    <tr><td>26</td><td>BAIXA</td><td>Como sistema, quero receber pelo broker MQTT as leituras das 14 estações reais, inclusive as reenviadas depois de falta de sinal, para operar em produção.</td><td>8</td><td>3</td><td><a href="#rf6">RF6</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-39">SCRUM-39</a></td></tr>
    <tr><td>27</td><td>BAIXA</td><td>Como técnico de campo, quero marcar uma estação como "em manutenção" e ver o status, a última leitura e a bateria de cada estação, para não gerar avisos falsos durante o conserto.</td><td>3</td><td>3</td><td><a href="#rf10">RF10</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-40">SCRUM-40</a></td></tr>
    <tr><td>28</td><td>BAIXA</td><td>Como usuário com login, quero alterar minha senha para manter minha conta segura.</td><td>3</td><td>3</td><td><a href="#rf5">RF5</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-41">SCRUM-41</a></td></tr>
    <tr><td>29</td><td>BAIXA</td><td>Como usuário com login, quero recuperar minha senha por um link enviado por e-mail, válido por 1 hora, para voltar a acessar o sistema.</td><td>3</td><td>3</td><td><a href="#rf5">RF5</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-42">SCRUM-42</a></td></tr>
    <tr><td>30</td><td>BAIXA</td><td>Como morador de uma comunidade, quero ver sem login o nível do rio atual e se existe alerta ativo, para saber se preciso me preparar.</td><td>5</td><td>3</td><td><a href="#rf11">RF11</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-47">SCRUM-47</a></td></tr>
    <tr><td>31</td><td>BAIXA</td><td>Como administrador, quero exportar em Excel as leituras brutas de estações e período, para enviar à universidade parceira.</td><td>3</td><td>3</td><td><a href="#rf13">RF13</a></td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-48">SCRUM-48</a></td></tr>
  </tbody>
</table>

<b>Distribuição de pontos:</b> Sprint 1 = 38 | Sprint 2 = 38 | Sprint 3 = 41 (total 117)



<br>

<h2 id='dor'> DoR (Definitions of Ready) </h2>

### User Stories
- Definidas e compreendidas por todos.
- Pequenas o suficiente para serem feitas em uma sprint.

### Critério de Aceitação
- Mensurável e testável.
- Descreve claramente quando a funcionalidade está completa.

### Tarefas
- Identificadas e documentadas para cada User Story.
- Cada tarefa possui um responsável designado.

### Modelo de Dados
- Definido e documentado.
- Campos, tipos de dados e relações claramente especificados.

### Arquitetura do Sistema
- Definida e validada pela equipe técnica.
- Diagramas e decisões arquiteturais documentadas.

<br>

<h2 id='dod'> DoD (Definition of Done) </h2>

### Código
- Implementa todos os critérios de aceitação.
- Todos os testes implementados e executados com sucesso.

### Commit
- Documentados com mensagens claras e descritivas.
- Seguem o padrão de nomenclatura acordado pela equipe.

### Mockups
- Mockups na interface funcionam conforme esperado.
- Experiência do usuário corresponde aos critérios definidos.

<br> 

<h2 id='padroes-de-commit'> Padrões de Commit </h2>

| Prefixo | Uso |
|---------|-----|
| feat | Usado para criação de nova funcionalidade; |
| fix | Usado para corrigir algum problema no código e/ou funcionalidade (bugs); |
| refactor | Usado para refatoração de código sem alterar sua funcionalidade, apenas melhoria; |
| docs | Usado para atualizar documentações como o arquivo README.md; |
| style | Usado para atualizar estilos e arquivos de estilização; |

Toda mensagem de commit deve começar pela chave da issue do Jira, seguida do prefixo. É essa chave que faz o commit aparecer no painel *Development* da atividade no Jira.

```
SCRUM-36 feat: gráfico de temperatura por estação
```

O mesmo vale para o nome da branch e para o título do Pull Request:

```
feature/SCRUM-36-dashboards-interativos
```

<br>

<h2 id='sprints'> Sprints </h2>

<table>
  <thead>
    <tr align="center">
      <th>Sprints</th>
      <th>Data de Início</th>
      <th>Data de Término</th>
      <th>Documentos</th>
      <th>Status</th>
    </tr>
  </thead>
 <tbody>
  <tr align="center">
    <td>01</td>
    <td>08/09/2026</td>
    <td>28/09/2026</td>
    <td><a href="https://github.com/Sync-FATEC/API-2025.1-4SEM/tree/main/sprints/sprint01/sprint01.md">Relatório</a></td> 
    <td>Em andamento</td>
  </tr>
  <tr align="center">
    <td>02</td>
    <td>29/09/2026</td>
    <td>19/10/2026</td>
    <td><a href="https://github.com/Sync-FATEC/API-2025.1-4SEM/tree/main/sprints/sprint02/sprint02.md">Relatório</a></td> 
    <td>Não iniciada</td>
  </tr>
  <tr align="center">
    <td>03</td>
    <td>20/10/2026</td>
    <td>09/11/2026</td>
    <td><a href="https://github.com/Sync-FATEC/API-2025.1-4SEM/tree/main/sprints/sprint03/sprint03.md">Relatório</a></td> 
    <td>Não iniciada</td>
  </tr>
</tbody>
</table>
