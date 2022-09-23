'use strict';

const express = require('express');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const cymbalRouter = require('./routes/cymbal');
const userRouter = require('./routes/user');

const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(logger);

app.use(cymbalRouter);
app.use(userRouter);

app.use('*', notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

module.exports = { app, start };
