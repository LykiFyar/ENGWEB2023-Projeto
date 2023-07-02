# Base de Dados de Acórdãos

O Ministério da Justiça Português é composto na sua organização por um conjunto de tribunais com autonomia própria. Cada um destes disponibiliza, periodicamente, um conjunto de acórdãos para o espaço público.
Em termos de estrutura, a estrutura de dados é semelhante entre os websites das diferentes instituições jurídicas, pelo contrário, as interfaces para a consulta não são.

> **acórdão**: Resolução  ou  decisão  de  um  órgão coletivo de  um  tribunal, in Dicionário Priberam da Língua Portuguesa, 2008-2023


# Objetivos

Tendo agora um contexto do problema foram definidos, em enunciado, os seguintes objetivos a atingir pelo grupo, quer para o sistema quer para os utilizadores:

## Sistema
 - [x] Analisar os datasets fornecidos para compreender a estrutura, as diferenças entre os diferentes conjuntos e possíveis erros/incongruências. Tomar especial atenção aos campos que são comuns entre todos;
 - [x] Carregar os datasets no MongoDB ou noutro sistema de dados;
 - [x] Criar uma interface web de navegação em toda a informação disponibilizada;
 - [x] Criar a funcionalidade de adicionar novos registos;
 - [x] Criar a funcionalidade de pesquisa (filtros) através de diferentes opções;
 - [x] Criar a funcionalidade de edição da informação de registos;
 - [x] Criar a capacidade de armazenar/aceder a um conjunto de registos favoritos eleitos, como tal, pelo utilizador;
 - [ ] Construir uma taxonomia de termos a partir dos descritores;
 - Desenvolver outras funcionalidades à imaginação do grupo.

## Utilizadores
- O sistema deverá estar protegido com autenticação: username+password, chaveAPI, google, facebook, etc.
- Deverão existir, pelo menos, dois níveis de acesso: 
   - Administrador - tem acesso a todas as operações; 
   - Consumidor - pode consultar, fazer posts e sugerir alterações; 
   
- Dados que deverão ser armazenados sobre o utilizador a guardar (sugestão):
  - [x]  nome;
  - [x] e-mail;
  - [x] filiação (estudante, docente, curso, departamento, entre outros);
  - [x] nível (administrador, produtor ou consumidor);
  - [x] dataRegisto (registo na plataforma);
  - [x] dataUltimoAcesso;
  - [x] password;
  - outros campos determinados pelo grupo ...
 
# Construção dos requisitos
Neste capítulo debruçamo-nos sobre a estrutura do projeto e quais as estratégias e decisões tomadas em cada uma das partes com vista a responder aos objetivos.

## Estruturação do sistema 
O projeto tem, essencialmente, uma divisão em três partes:
-  API - Análise e tratamento dos dados;
- Interface - Personalização das vistas do programa/website que visa maximizar a performance e satisfação da utilização do sistema por parte dos utilizadores.
- Autenticação - Capacidade de identificar e validar a identidade dos utilizadores, permitindo agilizar, ou até capacitar, a edição e a visualização de dados do sistema por parte dos mesmos.
## Ferramentas utilizadas
Para a construção do projeto o grupo usou o **GitHub** para armazenar e gerir as diferentes versões do projeto, o **Python** para auxilixar na análise e no tratamento dos dados e o **JavaScript** juntamente com o  **Node.Js** para permitir a comunicação e realização de todas as ações desde a conexão à base de dados à requisição de pedidos (de dados) e endereçamento das rotas para obtenção de respostas. 
Para estruturação e design das diferentes vistas o grupo utilizou **Pug**, **CSS** e, novamente, **JavaScript**.
O armazenamento de dados foi feito a partir da ferramenta **MongoDB**, e, para a fase de autenticação utilizamos bibliotecas tais como cookie-parser, morgan, jwt (jsonWebToken) e passport.

## Operações em cada camada
Como o projeto é modularizado, significa que existe uma parte dedicada a cada serviço, nomeadamente, ao serviço prestado pela API, pela Interface e pela a Autenticação. Cada um dos mencionados requer um tratamento diferenciado, exatamente, porque respondem a problemas de distintos, pela sua definição no capítulo [Estruturação do sistema](##Estruturação).
Neste capítulo explicamos para cada uma, o que fazem e mostramos quais foram as ações desenvolvidas.


###  API
Esta camada é responsável por receber um pedido/query da camada da interface. 
Para que estes pedidos consigam ser respondidos é necessário que o que é pedido corresponda a uma estrutura bem definida dos dados que se traduz num modelo definido pelo ficheiro **Model**. Para isso é importante que os dados sejam estudados e tratados para se conseguir obter uma estrutura responsiva.

Ao receber um pedido, com este vem um endereço que por si só "explica" qual o objetivo do pedido, a estes endereços designados como rotas, procura-se qual o método de routing ao qual este pertence no ficheiro das rotas ao qual, vulgarmente, chamamos de **Router (index,js)**. 

Ao identificar o método de routing correspondente este invoca internamente um método que está, previamente, definido num ficheiro que contém métodos que operam diretamente sobre os dados, a este último denomina-se, vulgarmente, de **Controller**.

#### Model
O modelo é importante para definir quais são os campos associados a cada objeto do dataset e o seu respetivo tipo de dados, númerico, string, etc...

| Acórdãos | Sugestões |
| :-------- | :-------- |
| _id -> Number | _id -> Number|
| Processo -> String | username -> String |
| Descritores -> [String] | Data de Submissão -> Date |
| tribunal -> String | Tipo -> String |
| Data do Acordão -> String | Assunto -> String |
| url -> String | Sugestão -> String |
| Relator -> String || 
| Votação -> String | |
| Decisão -> String | |
| Texto Integral -> String | |
| Nº Convencional -> String | |
| Nº do Documento -> String | |
| Área Temática -> String | |
| Legislação Nacional -> String | |
| Sumário -> String | |
| Meio Processual -> String | |
| Privacidade -> String | |
| Decisão Texto Integral -> String | |
| Jurisprudência Nacional -> String | |
| Indicações Eventuais -> String | |
| Data -> String | |
| Legislação Estrangeira -> String | |
| Área Temática 2 -> String | |
| Data de Entrada -> String | |
| Recorrente -> String | |
| Recorrido 1 -> String | |
| Nº Processo/TAF -> String | |
| Sub-Secção -> String | |
| Magistrado -> String | |
| Observações -> String | |
| Disponível na JTCA -> String | |
| Secção -> String | |
| Tribunal -> String | |
| Tribunal Recurso -> String | |
| Contencioso -> String | |
| Apêndice -> String | |
| Data do Apêndice -> String | |
| Acordão -> String | |
| Espécie -> String | |
| Requerente -> String | |
| Requerido -> String | |
| Normas Apreciadas -> String | |
| Normas Julgadas Inconst -> String | |
| Constituição -> String | |
| Nº do Diário da República -> String | |
| Série do Diário da República -> String | |
| Data do Diário da República -> String | |
| Página do Diário da República -> String | |
| Jurisprudência Constitucional -> String | | 
| Normas Suscitadas -> String | | 
| Voto Vencido -> String | | 
| Recorrido 2 -> String | | 
| Referência a Doutrina -> String | | 
| Tribunal 1ª instância -> String | | 
| Juízo ou Secção -> String | | 
| Tipo de Ação -> String | | 
| Tipo de Contrato -> String | | 
| Autor -> String | | 
| Réu -> String | | 
| Data da Decisão -> String | | 
| Texto das Cláusulas Abusivas -> String | | 
| Recursos -> String | | 
| Referência de Publicação -> String | | 
| Processo no Tribunal Recurso -> String | | 
| Processo no Tribunal Recorrido -> String | | 
| Parecer Ministério Publico -> String | | 
| Peça Processual -> String | | 
| Tema -> String | | 
| Texto Parcial -> String | | 
| Reclamações -> String | | 
| Tribunal Recorrido -> String | | 
| Doutrina -> String | |
 
 
Para obtenção destes modelos, em particular, o caso dos acórdãos procedemos às seguintes mudanças nos datasets usando os scripts nos ficheiros **campos_script.py**, **script_id.py**, **join_collections.py** e **manyfiles.py**.
 
 - O `campos_script.py` definimo-lo para analisar as características de cada um dos datasets, nomeadamente, os campos comuns, os mais frequentes e a quantidade de campos existentes e, eventualmente, corrigir a nossa visão prévia sobre os conjuntos de dados somente fazendo uma análise manual.
Detetamos nesta análise a existência de grande diversidade de campos e a possibilidade de selecionar os mais relevantes em cada conjunto tendo por fim a condensação da informação, tornando-a mais fácil de usar sem perder a sua utilidade. Corrigimos incongruências como, por exemplo, sinais de pontuação que apareciam (ou não) em algumas coleções mas não noutras para campos com o mesmo significado.

 - O `script_id.py` foi implementado para adicionar um campo numérico `_id` a cada registo. A razão do campo ser numérico justifica-se pela vantagem associada à capacidade de ordenação pelo sistema da API quando é necessário servir um pedido tornando este processo mais eficiente.
 
 - O `join_collections.py` permitiu agregar todos os dados das diferentes coleções. com o objetivo de facilitar a manipulação e o acesso aos dados.

 - O `manyfiles.py` permitiu dividir os dados em conjuntos mais pequenos de forma a possibilitar o seu armazenamento no GitHub.

#### Router

Definiram-se as seguintes rotas:

-   GET `/acordaos/total`: Obtém o maior id existente na base de dados dos acórdãos invocando o método `Acordaos.getTotal()`.

-   GET `/acordaos`: Obtém uma lista de acórdãos. De acordo com as condições em causa pode invocar os seguintes métodos: `Acordaos.acordaosFilter()` ou `Acordaos.list`.
    -   Parâmetros:
        -   `page`: Número da página a ser retornada.
        -   `pageDirection`: Direção da página que indica se o que se procura na pesquisa está a frente do que já se pesquisou ou se é preciso retornar atrás.
    -   Funcionalidades adicionais:
        -   Filtragem opcional dos acórdãos com base em parâmetros de consulta.
        -   Paginação dos resultados.

-   GET `/acordaos/:id`: Obtém um acórdão específico com base no ID fornecido invocando o método ` Acordaos.getAcordao`.
    -   Parâmetros:
        -   `id`: ID do acórdão.


-   PUT `/acordaos/:id`: Atualiza um acórdão específico com base no ID fornecido invocando o método `Acordaos.editAcordao`
    -   Parâmetros:
        -   `id`: ID do acórdão.
        

       
-   POST `/acordaos`: Adiciona um novo acórdão invocando o método `Acordaos.addAcordao()`

 
    
-   DELETE `/acordaos/:id`: Exclui um acórdão específico com base no ID fornecido invocando o método `Acordaos.deleteAcordao`
    -   Parâmetros:
        -   `id`: ID do acórdão.



-   GET `/sugestoes/total`: Obtém o maior id existente na base de dados das sugestões invocando o método `Sugestoes.getTotal()`.


    
-   GET `/sugestoes`: Obtém uma lista de sugestões invocando o método `Sugestoes.list`
    -   Parâmetros:
        -   `page`: Número da página a ser retornada.
    -   Funcionalidades adicionais: 
        - Paginação dos resultados.

  

-   GET `/sugestoes/:id`: Obtém uma sugestão específica com base no ID fornecido invocando o método `Sugestoes.getSugestao`
    -   Parâmetros:
        -   `id`: ID da sugestão.


     
-   POST `/sugestoes`: Adiciona uma nova sugestão invocando o método `Sugestoes.addSugestao()`.
    

       
-   DELETE `/sugestoes/:id`: Exclui uma sugestão específica com base no ID fornecido invocando o método `Sugestoes.deleteSugestao`
    -   Parâmetros:
        -   `id`: ID da sugestão.

#### Controller
Definiram-se os seguintes métodos de manipulação e acesso a dados, relativos aos acórdãos:
-   `list`: Este método retorna uma lista de acórdãos com base num limite e num ID de referência. Ele invoca o método `Arcordaos.find()` para obter os acórdãos, filtrando pelo ID e usando o `project` para selecionar os campos específicos. A lista é ordenada pelo campo `_id` e limitada pelo valor especificado tornando o processo eficiente. Retorna os dados encontrados ou um erro, se houver.
    
-   `acordaosFilter`: Este método retorna uma lista de acórdãos filtrada com base nas consultas, num limite, num ID de referência e na direção de página. Exclui os campos `page` e `pageDirection` das `queries` e, em seguida, verifica a direção da página. Se for `false`, os acórdãos são filtrados pelo `_id` menor ou igual ao ID de referência. Se for `true`, os acórdãos são filtrados pelo `_id` maior que o ID de referência. Os acórdãos são também limitados por um valor especificado. O grupo optou por esta abordagem, mais uma vez, numa tentativa de tornar o processo de consulta mais eficiente. Por fim, o método retorna os dados encontrados ou um erro, se houver.
    
-   `getAcordao`: Este método retorna um acórdão específico com base no ID fornecido. E invoca o método `Arcordaos.findOne()` para obter o acórdão pelo `_id`. Retorna o acórdão encontrado ou um erro, se houver.
    
-   `acordaosDataDesde`: Este método retorna uma lista de acórdãos com base numa data de referência, num limite e num ID. Utiliza a função de agregação `$match` para filtrar os acórdãos cuja data do acórdão é maior ou igual à data de referência. Os acórdãos são ordenados pelo campo `_id` e limitados pelo valor especificado. Retorna os dados encontrados ou um erro, se houver.
    
-   `getTotal`: Este método retorna maior id existente. Ele invoca o método `Arcordaos.find()` para obter todos os acórdãos, selecionando apenas o campo `_id`. Os acórdãos são ordenados pelo `_id` em ordem decrescente. Retorna o id encontrado ou um erro, se houver.
    
-   `addAcordao`: Este método adiciona um novo acórdão. Ele invoca o método `Arcordaos.collection.insertOne()` para inserir um acórdão na coleção. Retorna os dados do acórdão adicionado ou um erro, se houver.
    
-   `editAcordao`: Este método edita um acórdão existente com base no ID fornecido. Ele invoca o método `Arcordaos.updateOne()` para atualizar o acórdão com os novos dados fornecidos. Retorna os dados do acórdão atualizado ou um erro, se houver.
    
-   `deleteAcordao`: Este método exclui um acórdão existente com base no ID fornecido. Ele invoca o método `Arcordaos.deleteOne()` para excluir o acórdão pelo `_id`. Retorna os dados do acórdão excluído ou um erro, se houver.

De forma análoga, definiram-se os seguintes métodos de manipulação e acesso a dados, relativos às sugestões:
-   `list`: Este método retorna uma lista de sugestões com base num limite e num ID de referência. Ele invoca o método `Sugestoes.find()` para obter as sugestões, filtrando pelo ID de referência e usando o `project` para selecionar os campos específicos. A lista é ordenada pelo campo `_id` e limitada pelo valor especificado. Retorna os dados encontrados ou um erro, se houver.
    
-   `getSugestao`: Este método retorna uma sugestão específica com base no ID fornecido. Ele invoca o método `Sugestoes.findOne()` para obter a sugestão pelo `_id`. Retorna a sugestão encontrada ou um erro, se houver.
    
-   `getTotal`: Este método retorna o maior id existente na base de dados. Invoca o método `Sugestoes.find()` para obter todas as sugestões, selecionando apenas o campo `_id`. As sugestões são ordenadas por `_id` em ordem decrescente. Retorna o id encontrado ou um erro, se houver.
    
-   `addSugestao`: Este método adiciona uma nova sugestão. Ele invoca o método `Sugestoes.collection.insertOne()` para inserir a sugestão na coleção. Retorna os dados da sugestão adicionada ou um erro, se houver.
    
-   `deleteSugestao`: Este método exclui uma sugestão existente com base no ID fornecido. Ele invoca o método `Sugestoes.deleteOne()` para excluir a sugestão com o ID definido pelo `_id`. Retorna os dados da sugestão excluída ou um erro, se houver.
    

###  Interface

Nesta camada o foco principal é o desenvolvimento e a personalização das vistas. Significa isto que é importante ter em conta o tipo de utilizador que vai usar o sistema e em que contexto. 
De acordo com as vistas pode ser importante visualizar e mudar dados, contudo, esta não é a camada responsável pelo acesso aos dados, assim torna-se necessário para além das rotas definidas no **Router** cujo objetivo neste contexto, desta camada, é renderizar as diferentes vistas é obrigatório procurar forma de fazer chegar pedidos à API, e aqui o responsável é o *router*, da Interface, que envia pedidos de "acesso/visualização" a dados ao *router* da API.

#### Router

Definiram-se as seguintes rotas:

- GET `/acordaos`: Renderiza a página inicial com a lista de acórdãos. Retorna a página ou erro, se houver.
  - Parâmetros:
    -   `page`: Número da página a ser exibida.
    -   `pageDirection`: Direção da página (true para avançar, false para retroceder).
  
- GET `/acordaos/:id`: Renderiza a página de um acórdão específico. Retorna a página ou erro, se houver.
  - Parâmetros: 
    -   `id`: ID do acórdão a ser exibido.
   
- GET `/edit/:id`: Renderiza o formulário de edição de um acórdão. Um dos critérios a ser analisado é se tem o login efetuado. Retorna a página ou erro, se houver.
  - Parâmetros:
    -   `id`: ID do acórdão a ser editado.
- GET `/delete/:id`: Exclui um acórdão específico. Um dos critérios a ser analisado é se tem o login efetuado. Retorna a página ou erro, se houver.
  - Parâmetros:
    -   `id`: ID do acórdão a ser excluído.
   
- GET `/add`: Renderiza o formulário de adição de um novo acórdão. Um dos critérios a ser analisado é se tem o login efetuado. Retorna a página ou erro, se houver.
    
- GET `/perfil`: Renderiza a página de perfil do usuário com login efetuado. Um dos critérios a ser analisado é se tem o login efetuado. Retorna a página ou erro, se houver.
    
- GET `/login`: Renderiza o formulário de login. Um dos critérios a ser analisado é se tem o login efetuado. Retorna a página ou erro, se houver.
    
- GET `/register`: Renderiza o formulário de registo. Retorna a página ou erro, se houver.
    
- GET `/`: Redireciona para a página de acórdãos.
    
- POST `/edit/:id`: Atualiza os dados de um acórdão específico. Um dos critérios a ser analisado é se tem o login efetuado. Retorna a página com os dados do registo editado ou erro, se houver.
  - Parâmetros:
    - `id`: ID do acórdão a ser atualizado.
    
- POST `/add` : Adiciona um novo acórdão. Um dos critérios a ser analisado é se tem o login efetuado. Retorna a página ou erro, se houver.
    
- POST `/addfavorite/:id` : Adiciona um acórdão aos favoritos do utilizador com login efetuado. Um dos critérios a ser analisado é se tem o login efetuado. Retorna a página com os dados do registo adicionado aos favoritos ou erro, se houver.
	- Parâmetros:
	    - `id`: ID do acórdão a ser adicionado aos favoritos.
	 
- POST `/removefavorite/:id`: Remove um acórdão dos favoritos do utilizador com login efetuado. Um dos critérios a ser analisado é se tem o login efetuado. Retorna à página inicial em caso de sucesso ou erro, se houver.
    - Parâmetros:
      - `id`: ID do acórdão a ser removido dos favoritos.
    
-  POST `/login`: Realiza a autenticação do utilizador. Um dos critérios a ser analisado é se tem o login efetuado. Retorna à página inicial em caso de sucesso ou erro, se houver.
   - Parâmetros:
     - `username`: Nome de utilizador (que pretende autenticar).
     - `password`: Senha de utilizador (que pretende autenticar).
     
- POST `/register`: Regista um novo utilizador. Um dos critérios a ser analisado é se tem o login efetuado. Retorna à página inicial em caso de sucesso ou erro, se houver.
	- Parâmetros:
	    - `username`: Nome para o novo utilizador (que pretende atribuir).
	    - `password`: Senha para o novo utilizador (que pretende atribuir). 
	    - `email`: Email do novo utilizador (que pretende atribuir).
	    
- GET `/logout`: Realiza o logout do utilizador atual.
    - Função adicional:
        - A função `verificaToken` é um *middleware* que verifica se o token de autenticação é válido antes de permitir o logout. Caso o token seja inválido, o usuário é redirecionado para a página inicial.
        
- GET `/sugestoes`: Obtém a lista de sugestões. Retorna a lista de sugestões ou erro, se houver.
    -   Parâmetros:
        -   `page`: Página da lista de sugestões a ser exibida (opcional).
    -   Funções adicionais:
        -   Verifica se o utilizador tem login efetuado e é um administrador antes de obter a lista de sugestões.
- GET `/sugestoes/:id`: Obtém os detalhes de uma sugestão específica. Retorna a página com a sugestão ou erro, caso contrário.
    -   Parâmetros:
        -   `id`: ID da sugestão.
    -   Funções adicionais:
        -   Verifica se o utilizador tem login efetuado e é um administrador antes de obter a sugestão.
        
- GET `/add/sugestoes`: Renderiza o formulário para adicionar uma nova sugestão. Retorna a página com a lista de sugestões atualizada (com a nova sugestão) ou erro, caso contrário.
    -   Funções adicionais:
        -   Verifica se o utilizador tem login efetuado antes de renderizar o formulário.

- POST`/perfil/:id`: Atribui uma nota a um favorito anteriormente guardado. Retorna a página principal dos acórdãos ou erro, caso contrário.
    -   Parâmetros:
        -   `id`: ID do acórdão.
    -   Funções adicionais:
        -   Verifica se o utilizador tem login efetuado  antes de obter a sugestão.

- POST`/add/sugestao`: Adiciona a sugestão. Retorna a página principal dos acórdãos ou erro, caso contrário.
    -   Funções adicionais:
        -   Verifica se o utilizador tem login efetuado antes de obter a sugestão.

- GET `/delete/sugestao/:id`: Elimina uma sugestão. Retorna a página principal dos acórdãos.
    -   Parâmetros:
        -   `id`: ID da sugestão a ser eliminada.
    -   Funções adicionais:
        -   Verifica se o utilizador tem login efetuado e se é administrados  antes de eliminar a sugestão.

###  Autenticação
O serviço de autenticação depende de um token criado com auxílio do jsonwebtoken que é utilizado para validar vários pedidos feitos ao serviço e permitir efetuar ações no mesmo. Este token pode ser fornecido na query string ou no corpo do pedido HTTP (body) e é verificado pelo _middleware_ `verificaAcesso` que permite ou bloqueia o acesso ao serviço. Assim, neste módulo fomos capaz de criar e de manipular as informações relacionadas com o utilizador do sistema.
    
- GET `/users/isLogged`: Verifica se o utilizador está autenticado e se este é Administrador do sistema através do token.
- GET `/users/getUsername`: Verifica se o utilizador está autenticado e devolve o username correspondente
- GET `/users/favorites`: Verifica se o utilizador está autenticado e devolve a lista de favoritos do mesmo.
- GET `/users/addfavorite/:id`: Verifica se o utilizador está autenticado e devolve a lista de favoritos do mesmo.
- GET `/users`: Verifica se o utilizador está autenticado e devolve a lista de utilizadores no sistema.
- GET `/users/:username`: Verifica se o utilizador está autenticado e devolve as informações do mesmo.
- POST `/users`: Verifica se o utilizador está autenticado e adiciona um utilizador.
- POST `/users/updateFavorite/:id`: Verifica se o utilizador está autenticado e atualiza a nota de um favorito segundo o id do processo.
- POST `/users/register`: Regista um novo utilizador (não é utilizado o _middleware_ `verificaAcesso`)
- POST `/users/login`: Autentica o utilizador e devolve um token (não é utilizado o _middleware_ `verificaAcesso`)
- PUT `/users/:id`: Atualiza a informação de um utilizador pelo seu id
- PUT `/users/:id/desativar`: Desativa a conta de um utilizador pelo seu id
- PUT `/users/:id/ativar`: Ativa a conta de um utilizador pelo seu id
- PUT `/users/:id/password`: Atualiza a password de um utilizador pelo seu id
- DELETE `/users/deletefavorite/:id`: Remove o processo com identificador `id` da lista de favoritos do utilizador
- DELETE `/users/:id`: Apaga a conta do utilizador pelo seu id


## Programa
Para a execução do programa é necessário ter em conta as ferramentas anteriormente mencionadas pelo que podem ser instalas utilizando o comando **npm start** em cada pasta correspondente a cada serviço, isto é, na pasta API, Auth e Interface.

## Conclusão
Após a realização do trabalho, concluímos que o mesmo permitiu compreender de um ponto de vista prático o funcionamento de plataformas web. 
De acordo com os objetivos anteriormente propostos, podemos afirmar que foram, na sua maioria cumpridos, pelo que estamos satisfeitos com o resultado do trabalho. 
Para trabalho futuro, há vários aspetos a melhorar, nomeadamente, a nível de eficiência do site e a nível de funcionalidades oferecidas.
