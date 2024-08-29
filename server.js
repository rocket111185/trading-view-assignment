'use strict';

require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const ApiController = require('./controllers/ApiController');
const WebController = require('./controllers/WebController');
const sessionGuard = require('./middleware/sessionGuard');

mongoose.connect(process.env.MONGODB_CONNECTION_URL);

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', WebController.mainPage);

app.post('/api/v1/symbol/add', sessionGuard, ApiController.recordUserFavourite);
app.delete('/api/v1/symbol/delete', sessionGuard, ApiController.removeUserFavourite);

const port = process.env.SERVER_PORT;
const server = app.listen(port, () => {
    console.log(`Server has been started, port: ${port}`);
});

const shutdown = () => {
    console.log('Trying to shut down the server gracefully...');

    server.close(() => {
        console.log('Closed remaining connections.');

        mongoose.disconnect().then(() => {
            console.log('Closed connection with database.');
            process.exit(0);
        });
    });
};

process.on('SIGINT', shutdown);
