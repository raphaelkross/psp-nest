## Payment Service Provider (PSP) with Nest.JS

Small example demonstration a PSP system with limited capabilities.

## Installation

First of all, ensure to be using Node 8 or above.

```bash
$ npm install
```

## Configure Database

Copy the `.env.sample` file into a `.env` file - filling the environment variables with the proper values for your PostgreSQL database connection URL / username and password.

Example:

```
POSTGRES_URL=postgres://abcd:fghi@db.elephantsql.com:5432/database
POSTGRES_USERNAME=user
POSTGRES_PASSWORD=pass
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
