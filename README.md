## Payment Service Provider (PSP) with Nest.JS

Small example demonstration a PSP system with limited capabilities.

## Installation

First of all, ensure to be using **Node version 10**.

```bash
# If you don't have nest cli installed yet, install it.
$ npm i -g @nestjs/cli

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

## [GET] /transactions

Get all the transactions.

```
curl -X GET \
  http://localhost:3000/transactions \
  -H 'Host: localhost:3000'
```

```js
// Node.JS Example

var request = require("request");

var options = { method: 'GET',
  url: 'http://localhost:3000/transactions' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

## [POST] /transactions

Create a transaction.

List of parameters `application/x-www-form-urlencoded`:

```
- amount: integer (required).
- description: string (required).
- method: string "credit_card" | "debit_card" (required)
- card_number: string max & min length 16 chars (required)
- card_holder: string (required)
- card_expiration: string max & min length 7 chars, expected format `MM/YYYY` (required)
- card_cvv: string max & min length 3 chars, expected format `XXX` (required)
```

```
# cURL example
curl -X POST \
  http://localhost:3000/transactions \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Host: localhost:3000' \
  -d 'amount=1000&description=Pagar%20me%20rulez&method=debit_card&card_number=1234123412341234&card_holder=Rafael%20Angeline&card_expiration=02%2F2014&card_cvv=123'
```

```js
// Node.JS Example

var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:3000/transactions',
  headers:
   {
     'Accept-Encoding': 'gzip, deflate',
     Host: 'localhost:3000',
     'Content-Type': 'application/x-www-form-urlencoded' },
  form:
    {
     amount: '1000',
     description: 'Pagar me rulez',
     method: 'debit_card',
     card_number: '1234123412341234',
     card_holder: 'Rafael Angeline',
     card_expiration: '02/2014',
     card_cvv: '123'
    } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

## [GET] /customers/balance

Get the customer balance.

```
curl -X GET \
  http://localhost:3000/customers/balance \
  -H 'Host: localhost:3000'
```

```js
var request = require("request");

var options = { method: 'GET',
  url: 'http://localhost:3000/customers/balance',
  headers:
   { Host: 'localhost:3000' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```


## Unit Test

```bash
# unit tests
$ npm run test
```
