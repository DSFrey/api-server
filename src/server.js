'use strict';

require('dotenv').config();
const express = require('express');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const router = require('./routes/v1');

const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(logger);

app.use(router);

app.use('*', notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

module.exports = { app, start };
