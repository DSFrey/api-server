'use strict';

const express = require('express');
const router = express.Router();
const { interfaceTable } = require('../models');
const errorHandler = require('../error-handlers/500');

router.post('/api/v1/:route', async (req, res) => {
  try {
    let { route } = req.params;
    const newRecord = await interfaceTable[route].create(req.body);
    res.status(200).send(newRecord);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.get('/api/v1/:route/:id?', async (req, res) => {
  try {
    let { id, route } = req.params;
    const record = await interfaceTable[route].read(id);
    res.status(200).send(record);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.put('/api/v1/:route/:id', async (req, res) => {
  try {
    let { id, route } = req.params;
    const record = await interfaceTable[route].update(req.body, id);
    res.status(200).send(record);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.delete('/api/v1/:route/:id', async (req, res) => {
  try {
    let { id, route } = req.params;
    let message = await interfaceTable[route].delete(id);
    res.status(200).send(message);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

module.exports = router;
