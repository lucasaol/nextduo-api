# Next Duo — API

API REST do **Next Duo**, uma plataforma para encontrar parceiros (duos) para jogar.
Os jogadores se autenticam com a conta do Discord, montam sua lista de jogos com o
respectivo rank/elo e podem buscar outros jogadores compatíveis e enviar convites
para jogarem juntos.

Este repositório (`nextduo-api`) é o backend do projeto. Ele faz parte de um
ecossistema maior:

| Projeto | Descrição |
| --- | --- |
| **nextduo-api** | API REST (este repositório) — NestJS + PostgreSQL |
| **nextduo-web** | Front-end SPA — React 19 + Vite + TailwindCSS |
| **nextduo-database** | Configuração/artefatos de banco (PostgreSQL) |

## Tecnologias

- **[NestJS 11](https://nestjs.com/)** — framework Node.js (TypeScript)
- **TypeScript 5**
- **[TypeORM](https://typeorm.io/)** — ORM e controle de migrations
- **PostgreSQL 16** — banco de dados relacional
- **[Passport](https://www.passportjs.org/) + JWT** (`@nestjs/passport`, `@nestjs/jwt`, `passport-jwt`) — autenticação via Bearer token
- **OAuth2 do Discord** — login social (via `axios`)
- **[Zod](https://zod.dev/)** — validação das variáveis de ambiente
- **`class-validator` / `class-transformer`** — validação e serialização de DTOs/respostas
- **Jest** — testes unitários e e2e
- **Docker / Docker Compose** — ambiente containerizado

## Arquitetura

O código é organizado por módulos de domínio em `src/app`, cada um seguindo uma
separação em camadas inspirada em DDD:

```
src/
├── main.ts                 # bootstrap da aplicação (CORS, interceptors, porta)
├── env.ts                  # schema Zod das variáveis de ambiente
├── app.module.ts           # módulo raiz
├── database/
│   ├── database.module.ts  # conexão TypeORM (Postgres)
│   └── migrations/         # migrations do banco
└── app/
    ├── auth/               # autenticação (Discord OAuth + JWT)
    ├── users/              # perfil do usuário e lista de jogos
    ├── games/             # jogos e seus ranks
    ├── invites/            # convites de duo e busca de jogadores
    └── shared/             # validação e utilitários compartilhados
```

Dentro de cada módulo:

- **`domain/`** — entidades (TypeORM) e contratos de repositórios
- **`application/`** — `services` e `use-cases` (regras de negócio)
- **`http/`** — `controllers` (endpoints REST)
- **`dto/`** — objetos de entrada/validação
- **`helpers/`** — guards, decorators, interceptors e strategies

## Principais funcionalidades

### Autenticação (`/auth/discord`)
- Login via **OAuth2 do Discord**: o front-end troca o `code` por um token, a API
  busca os dados do usuário no Discord, cria/atualiza o usuário e devolve um
  **JWT** (`access_token`).
- Rotas protegidas usam `JwtAuthGuard` / `RolesGuard` (papéis: `ROOT` e `PLAYER`).

### Usuários (`/users`)
- `GET /users/me` — dados do usuário autenticado.
- **Lista de jogos** (`/users/me/games`): adicionar, atualizar e remover jogos do
  perfil, cada um associado a um rank/elo.

### Jogos e Ranks (`/games`)
- Listagem pública de jogos e consulta por id.
- CRUD de jogos restrito ao papel **ROOT**.
- **Ranks** por jogo (`/games/:gameId/ranks`): criação e reordenação dos ranks.

### Convites e busca de jogadores (`/invites`, `/users/search`)
- **Busca de jogadores** com filtros por jogo, ranks e último login, com
  **paginação por cursor**.
- **Convites de duo**: criar convite, listar recebidos (`/received`) e enviados
  (`/requested`), e **aceitar / rejeitar / cancelar** (estados: `pending`,
  `accepted`, `rejected`, `cancelled`).

## Configuração do ambiente local

### Pré-requisitos
- **Node.js 22+**
- **Docker** e **Docker Compose** (recomendado para o PostgreSQL)
- Uma aplicação registrada no [Discord Developer Portal](https://discord.com/developers/applications) (client id/secret e redirect URI)

### 1. Instalar dependências

```bash
npm install
```

### 2. Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto. As variáveis são validadas por Zod
(`src/env.ts`) na inicialização — a aplicação não sobe se algo estiver faltando:

```dotenv
NODE_ENV=development
PORT=3333

# Banco de dados
DB_HOST=localhost
DB_PORT=5435
DB_USER=postgres
DB_PASS=postgres
DB_NAME=nextduo

# Chaves JWT (par assimétrico)
JWT_PRIVATE_KEY=
JWT_PUBLIC_KEY=

# OAuth2 do Discord
DISCORD_API_CLIENT_ID=
DISCORD_API_CLIENT_SECRET=
DISCORD_API_BASE_URL=https://discord.com/api
DISCORD_API_REDIRECT_URI=http://localhost:5173/auth/discord/callback
```

> `DB_PORT=5435` corresponde à porta exposta pelo Postgres no `docker-compose.yml`.
> Se rodar o banco de outra forma, ajuste o valor.

### 3. Subir o banco de dados

Com Docker (apenas o Postgres):

```bash
docker compose up -d postgres
```

### 4. Rodar as migrations

```bash
npm run migration:run
```

### 5. Iniciar a API

```bash
# desenvolvimento (watch mode)
npm run start:dev
```

A API ficará disponível em `http://localhost:3333`.

### Alternativa: tudo via Docker

O `docker-compose.yml` sobe o Postgres **e** a API (que roda as migrations no
build e inicia em modo dev). Há também um `compose.yaml` na pasta raiz do
monorepo que orquestra a API e o front-end juntos.

```bash
# a partir desta pasta (API + Postgres)
docker compose up --build
```

## Scripts úteis

| Script | Descrição |
| --- | --- |
| `npm run start:dev` | Inicia a API em modo watch |
| `npm run start:prod` | Inicia a build de produção (`dist/main`) |
| `npm run build` | Compila o projeto (NestJS) |
| `npm run lint` | ESLint com `--fix` |
| `npm run format` | Formata o código com Prettier |
| `npm test` | Testes unitários (Jest) |
| `npm run test:e2e` | Testes end-to-end |
| `npm run test:cov` | Cobertura de testes |
| `npm run migration:run` | Builda e aplica as migrations |
| `npm run migration:create --name=<nome>` | Cria uma nova migration |
