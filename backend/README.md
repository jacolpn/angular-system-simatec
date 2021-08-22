## Execução do backend:
- `yarn` (atualizar com as dependências, igual npm i)
- `yarn dev` (vai executar o npm start e o tsc --init ao mesmo tempo)

## Development server
Run `yarn dev` for a dev server. Navigate to `http://localhost:3000/`. The server will automatically reload if you change any of the source files.

## Dependências instaladas:
- `npm add typescript -D`
- `npm add ts-node-dev -D`
- `npm install --global yarn`
- `Yarn add uuid`
- `Yarn add @types/uuid -D`
- `npm install typeorm --save`
- `npm install reflect-metadata --save`
- `npm install sqlite3 --save`
- `yarn add express-async-errors`
- `yarn add jsonwebtoken (token)`
- `yarn add @types/jsonwebtoken -D (token)`
- `yarn add bcryptjs (cryptografia de senha)`
- `yarn add @types/bcryptjs -D (cryptografia de senha)`
- `yarn add cors (frontend)`
- `yarn add @types/cors -D (frontend)`

## Comando de Migration:
- Criar um migration: (execução inicial, comando que cria e insere lá na pasta Migrations)
    - `yarn typeorm migration:create -n CreateUsers`
- Criar a tabela: (Depois de inserido a lógica no arquivo de Migration, rodar esse para de fato criar/alterar tabela)
    - `yarn typeorm migration:run`
- Remover a ultima migration feita:
    - `yarn typeorm migration:revert`
- Criar a entidade sozinho:
    - `yarn typeorm entity:create -n User`
