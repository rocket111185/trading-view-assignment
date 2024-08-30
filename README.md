# TradingView assignment solution

Welcome here! If you read this, it means the solution is ready to be reviewed.

But first, we need to make sure that everything is configured as it should be.

## MongoDB engine

Make sure the MongoDB engine is installed on your system.

For more reference, check the [Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)
or any other edition which suits your needs better.

## Node.js engine

Make sure you use Node.js version 20.17 or higher.

If it's already installed, you should run the command to install the packages:
`npm i` or `npm install`

## Environmental variables

In order to avoid exposing valuable data in the code, environmental variables
are used.

They may be passed in a console like this:
```sh
SERVER_PORT=3000 node server.js
```

Environmental variables which should be defined:
* `SERVER_PORT` - port, where this server accepts requests
* `MONGODB_CONNECTION_URL` - connection URL for MongoDB. For more reference, please, check MongoDB documentation
* `TRADING_API_URL` - URL to API, which is used in term of TradingView assignment. It should have a form like `https://example.com/api/v1`

But also it's possible to pass them inside of `.env` file, thanks to `dotenv` package.

Example of a such file is contained inside of `.example.env` file.

Steps to proceed:
1. Rename `.example.env` to `.env`
2. As value of TRADING_API_URL property, paste URL from the assignment (it should look like `https://example.com/api/v1`)

## Launch

It can be done in any way you prefer:
* `npm start`
* `node server.js`

## Unit-testing
`npm t`, et voila!

## Credits
Dmytro Rekechynskyi, a backend guy with decent experience
