'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('Testing REST API', () => {
  test('Handles bad routes', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(404);
    expect(response.body.route).toEqual('/bad');
    expect(response.body.message).toEqual('Not Found');
  });

  test('Handles bad requests', async () => {
    const response = await request.post('/cymbal').send({ info: 'bad' });
    expect(response.status).toEqual(500);
  });

  test('Create a new cymbal', async () => {
    let response = await request.post('/cymbal').send({
      manufacturer: 'Zildjian',
      series: 'A Custom',
      model: 'Crash',
      size: 16,
      type: 'Crash',
    });
    expect(response.status).toEqual(200);
    expect(response.body.manufacturer).toEqual('Zildjian');
    expect(response.body.series).toEqual('A Custom');
    expect(response.body.model).toEqual('Crash');
    expect(response.body.size).toEqual(16);
    expect(response.body.type).toEqual('Crash');
  });

  test('Read all cymbals', async () => {
    let response = await request.get('/cymbal');
    expect(response.status).toEqual(200);
    expect(response.body[0].manufacturer).toEqual('Zildjian');
    expect(response.body[0].series).toEqual('A Custom');
    expect(response.body[0].model).toEqual('Crash');
    expect(response.body[0].size).toEqual(16);
    expect(response.body[0].type).toEqual('Crash');
  });

  test('Read one cymbal', async () => {
    let response = await request.get('/cymbal/1');
    expect(response.status).toEqual(200);
    expect(response.body[0].manufacturer).toEqual('Zildjian');
    expect(response.body[0].series).toEqual('A Custom');
    expect(response.body[0].model).toEqual('Crash');
    expect(response.body[0].size).toEqual(16);
    expect(response.body[0].type).toEqual('Crash');
  });

  test('Update a cymbal', async () => {
    let response = await request.put('/cymbal/1').send({
      manufacturer: 'Zildjian',
      series: 'K Custom',
      model: 'Splash',
      size: 10,
      type: 'Splash',
    });
    expect(response.status).toEqual(200);
    expect(response.body[0].manufacturer).toEqual('Zildjian');
    expect(response.body[0].series).toEqual('K Custom');
    expect(response.body[0].model).toEqual('Splash');
    expect(response.body[0].size).toEqual(10);
    expect(response.body[0].type).toEqual('Splash');
  });

  test('Delete a cymbal', async () => {
    let response = await request.delete('/cymbal/1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });


  test('Create a new stick', async () => {
    let response = await request.post('/stick').send({
      manufacturer: 'Promark',
      model: '5A',
    });
    expect(response.status).toEqual(200);
    expect(response.body.manufacturer).toEqual('Promark');
    expect(response.body.model).toEqual('5A');
  });

  test('Read all sticks', async () => {
    let response = await request.get('/stick');
    expect(response.status).toEqual(200);
    expect(response.body[0].manufacturer).toEqual('Promark');
    expect(response.body[0].model).toEqual('5A');
  });

  test('Read one stick', async () => {
    let response = await request.get('/stick/1');
    expect(response.status).toEqual(200);
    expect(response.body[0].manufacturer).toEqual('Promark');
    expect(response.body[0].model).toEqual('5A');
  });

  test('Update a stick', async () => {
    let response = await request.put('/stick/1').send({
      manufacturer: 'Vic Firth',
      model: '5B',
    });
    expect(response.status).toEqual(200);
    expect(response.body[0].manufacturer).toEqual('Vic Firth');
    expect(response.body[0].model).toEqual('5B');
  });

  test('Delete a stick', async () => {
    let response = await request.delete('/stick/1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

});
