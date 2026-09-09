

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

<br>

<h2 id='objetivo'> Objetivo </h2>
Este projeto tem como objetivo desenvolver um sistema de monitoramento ambiental para a Tecsus, permitindo a coleta, processamento e visualização de dados meteorológicos em tempo real. A plataforma facilitará a análise de informações como temperatura, umidade, pressão, velocidade do vento e índice pluviométrico, promovendo a conscientização ambiental e auxiliando na prevenção de desastres naturais.

<br>

<h2 id='proposta'> Proposta de Solução </h2>

Nossa proposta é criar um sistema eficiente e acessível, integrando sensores IoT a uma plataforma moderna para exibição e análise de dados.

Arquitetura Escalável: Utilizaremos uma estrutura robusta para garantir a recepção e o processamento eficiente dos dados enviados pelas estações meteorológicas.

Dashboards Interativos: O sistema apresentará gráficos e relatórios em tempo real, permitindo a análise detalhada dos dados coletados.

Geração de Alertas: Implementaremos um sistema de notificações automáticas para eventos meteorológicos críticos, auxiliando na tomada de decisões.

<br>

<h2 id='requisitos-funcionais'> Requisitos Funcionais </h2>

| Número | Descrição |
|--------|-----------|
| RF1 | Permitir o registro de estações meteorológicas com sensores variados, adaptando-se a diferentes tipos de medições. |
| RF2 | Permitir o cadastro, edição, visualização e remoção de estações meteorológicas. |
| RF3 | Permitir o cadastro, edição, visualização e remoção dos parâmetros meteorológicos. |
| RF4 | Permitir o cadastro, edição, visualização e remoção dos alertas de condições críticas. |
| RF5 | Permitir o cadastro, edição, visualização e remoção de usuários com diferentes permissões. |
| RF6 | Receber e armazenar dados enviados em tempo real pelas estações meteorológicas. |
| RF7 | Apresentar os dados coletados por meio de painéis gráficos interativos. |
| RF8 | Gerar alertas automaticamente com base em condições climáticas específicas. |
| RF9 | Controlar os níveis de acesso ao sistema, permitindo que administradores tenham acesso completo, funcionários tenham acesso às funcionalidades operacionais, e usuários públicos visualizem apenas informações liberadas. |


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
    <tr><td>1</td><td>ALTA</td><td>Como administrador, quero que o sistema suporte um modelo de dados dinâmico e permita o cadastro de estações meteorológicas, garantindo flexibilidade na gestão e registro dessas informações.</td><td>3</td><td>1</td><td>RF1</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-14">SCRUM-14</a></td></tr>
    <tr><td>2</td><td>ALTA</td><td>Como administrador, quero editar as informações de uma estação meteorológica para manter os dados sempre atualizados.</td><td>3</td><td>1</td><td>RF2</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-15">SCRUM-15</a></td></tr>
    <tr><td>3</td><td>ALTA</td><td>Como usuário, quero visualizar uma lista de todas as estações cadastradas no sistema.</td><td>3</td><td>1</td><td>RF2</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-16">SCRUM-16</a></td></tr>
    <tr><td>4</td><td>ALTA</td><td>Como administrador, quero excluir estações meteorológicas conforme necessário.</td><td>3</td><td>1</td><td>RF2</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-17">SCRUM-17</a></td></tr>
    <tr><td>5</td><td>ALTA</td><td>Como administrador, quero cadastrar novos parâmetros meteorológicos para garantir que todas as medições necessárias sejam registradas corretamente.</td><td>3</td><td>1</td><td>RF3</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-18">SCRUM-18</a></td></tr>
    <tr><td>6</td><td>ALTA</td><td>Como administrador, quero editar os parâmetros meteorológicos para corrigir informações ou ajustar unidades de medida.</td><td>3</td><td>1</td><td>RF3</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-19">SCRUM-19</a></td></tr>
    <tr><td>7</td><td>ALTA</td><td>Como administrador, quero visualizar uma lista de parâmetros meteorológicos cadastrados para acompanhar e gerenciar as medições do sistema.</td><td>3</td><td>1</td><td>RF3</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-20">SCRUM-20</a></td></tr>
    <tr><td>8</td><td>ALTA</td><td>Como administrador, quero excluir parâmetros meteorológicos que não sejam mais necessários para manter o sistema organizado.</td><td>3</td><td>1</td><td>RF3</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-21">SCRUM-21</a></td></tr>
    <tr><td>9</td><td>ALTA</td><td>Como administrador, quero cadastrar novos usuários para que possam acessar o sistema conforme suas permissões.</td><td>3</td><td>1</td><td>RF5</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-22">SCRUM-22</a></td></tr>
    <tr><td>10</td><td>ALTA</td><td>Como administrador, quero editar as informações de um usuário para corrigir ou alterar permissões.</td><td>3</td><td>1</td><td>RF5</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-23">SCRUM-23</a></td></tr>
    <tr><td>11</td><td>ALTA</td><td>Como administrador, quero visualizar uma lista de usuários cadastrados para gerenciar acessos e permissões no sistema.</td><td>3</td><td>1</td><td>RF5</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-24">SCRUM-24</a></td></tr>
    <tr><td>12</td><td>ALTA</td><td>Como administrador, quero excluir usuários inativos ou desnecessários para manter a base de dados organizada.</td><td>3</td><td>1</td><td>RF5</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-25">SCRUM-25</a></td></tr>
    <tr><td>13</td><td>ALTA</td><td>Como administrador, quero controlar o acesso ao sistema definindo permissões para diferentes usuários.</td><td>2</td><td>1</td><td>RF9</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-26">SCRUM-26</a></td></tr>
    <tr><td>14</td><td>MÉDIA</td><td>Como administrador, quero cadastrar alertas meteorológicos para identificar condições climáticas críticas.</td><td>3</td><td>2</td><td>RF4</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-27">SCRUM-27</a></td></tr>
    <tr><td>15</td><td>MÉDIA</td><td>Como administrador, quero editar alertas meteorológicos para ajustar suas condições de ativação e notificação.</td><td>3</td><td>2</td><td>RF4</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-28">SCRUM-28</a></td></tr>
    <tr><td>16</td><td>MÉDIA</td><td>Como administrador, quero visualizar uma lista de alertas meteorológicos cadastrados para gerenciar notificações de eventos climáticos críticos.</td><td>3</td><td>2</td><td>RF4</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-29">SCRUM-29</a></td></tr>
    <tr><td>17</td><td>MÉDIA</td><td>Como administrador, quero excluir alertas que não sejam mais necessários para manter o sistema atualizado.</td><td>3</td><td>2</td><td>RF4</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-30">SCRUM-30</a></td></tr>
    <tr><td>18</td><td>MÉDIA</td><td>Como sistema, quero emular o recebimento de dados das estações meteorológicas, para que o projeto possa ser desenvolvidos e testados sem equipamentos reais.</td><td>5</td><td>2</td><td>RF6</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-31">SCRUM-31</a></td></tr>
    <tr><td>19</td><td>MÉDIA</td><td>Como sistema, quero processar os dados recebidos para calcular médias horárias e diárias.</td><td>8</td><td>2</td><td>RF6</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-32">SCRUM-32</a></td></tr>
    <tr><td>20</td><td>MÉDIA</td><td>Como sistema, quero armazenar os dados recebidos de forma otimizada para suportar grandes volumes de informações.</td><td>5</td><td>2</td><td>RF6</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-33">SCRUM-33</a></td></tr>
    <tr><td>21</td><td>MÉDIA</td><td>Como administrador, quero acompanhar em tempo real o estado operacional das unidades de coleta, para garantir a continuidade do serviço.</td><td>5</td><td>2</td><td>RF6</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-34">SCRUM-34</a></td></tr>
    <tr><td>22</td><td>MÉDIA</td><td>Como usuário, quero receber notificações em caso de eventos meteorológicos extremos.</td><td>3</td><td>2</td><td>RF8</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-35">SCRUM-35</a></td></tr>
    <tr><td>23</td><td>BAIXA</td><td>Como usuário, quero acessar dashboards interativos com os dados coletados pelas estações.</td><td>8</td><td>3</td><td>RF7</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-36">SCRUM-36</a></td></tr>
    <tr><td>24</td><td>BAIXA</td><td>Como usuário, quero filtrar os dados exibidos no dashboard por data, para visualizar informações específicas de um período determinado.</td><td>3</td><td>3</td><td>RF7</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-37">SCRUM-37</a></td></tr>
    <tr><td>25</td><td>BAIXA</td><td>Como administrador, quero gerar relatórios detalhados sobre as condições meteorológicas registradas.</td><td>5</td><td>3</td><td>RF7</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-38">SCRUM-38</a></td></tr>
    <tr><td>26</td><td>BAIXA</td><td>Como sistema, quero receber dados em tempo real das estações meteorológicas físicas, substituindo a emulação, para operar em produção.</td><td>8</td><td>3</td><td>RF6</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-39">SCRUM-39</a></td></tr>
    <tr><td>27</td><td>BAIXA</td><td>Como administrador, quero monitorar o funcionamento das estações meteorológicas em tempo real.</td><td>8</td><td>3</td><td>RF6</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-40">SCRUM-40</a></td></tr>
    <tr><td>28</td><td>BAIXA</td><td>Como usuário, quero alterar minha senha para garantir a segurança da minha conta.</td><td>3</td><td>3</td><td>RF5</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-41">SCRUM-41</a></td></tr>
    <tr><td>29</td><td>BAIXA</td><td>Como usuário, quero poder recuperar minha senha caso eu a esqueça, para continuar acessando o sistema.</td><td>3</td><td>3</td><td>RF5</td><td><a href="https://projetodevops.atlassian.net/browse/SCRUM-42">SCRUM-42</a></td></tr>
  </tbody>
</table>

<b>Distribuição de pontos:</b> Sprint 1 = 38 | Sprint 2 = 38 | Sprint 3 = 38 (total 114)



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
