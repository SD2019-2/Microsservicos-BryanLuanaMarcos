# Sugestor de Amigos

Um sistema distribuído em microsserviços que cria usuários e sugere amigos.

## Ideia

O sistema permite um usuário se cadastrar e escolher, dentre uma lista de nomes, pessoas para se tornar amigo. O cadastro completo (nome e idade) é feito no serviço de usuário, que dispara um webhook (requisição POST) para o serviço de amigos para salvar a referência (nome) no banco desse serviço. O objetivo é demonstrar como a ferramenta Docker pode ser utilizada para isolar serviços específicos para criação de aplicações distribuídas, aumentando sua portabilidade, compatibilidade com serviços de nuvem e possibilitando a autonomia entre desenvolvedores na escolha de linguagens, bancos de dados e sua evolução independente.

## Componentes

- [x] Serviço de usuário (NodeJS)
- [X] Banco de dados do serviço de usuário (MongoDB)
- [X] Serviço de amigos e recomendações (Python)
- [X] Banco de dados do serviço de amigos (Neo4j)
- [X] Comunicação entre serviços (Request-Response)
- [X] Front-end (Angular)

## Requisitos
Para os serviços:
- docker
- docker-compose
Para o front-end:
- nodejs e npm
- npm: @angular/cli

## Executando

- Suba o serviço de amigos:
`cd friends && npm i && sudo bash local_start.sh`

- No serviço de usuários, edite o arquivo `users-service/src/controller.js` e insira o endereço do serviço de amigos (IP + porta) como valor da constante `FRIENDS_URL`.

- Suba o serviço de usuários:
`cd users && npm i && sudo bash local_start.sh`

- No front-end, edite o arquivo `src/environments/environment.ts` e edite as variáveis `API_USERS` e `API_FRIENDS` para apontar para o endereço do serviço de usuários e do serviço de amigos, respectivamente.

- Suba o frontend:
`ng serve`

- Acesse o serviço em `http://localhost:4200`

