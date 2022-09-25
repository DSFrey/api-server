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
    const response = await request.post('/api/v1/cymbal').send({ info: 'bad' });
    expect(response.status).toEqual(500);
  });

  test('Create a new cymbal', async () => {
    let response = await request.post('/api/v1/cymbal').send({
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
    let response = await request.get('/api/v1/cymbal');
    expect(response.status).toEqual(200);
    expect(response.body[0].manufacturer).toEqual('Zildjian');
    expect(response.body[0].series).toEqual('A Custom');
    expect(response.body[0].model).toEqual('Crash');
    expect(response.body[0].size).toEqual(16);
    expect(response.body[0].type).toEqual('Crash');
  });

  test('Read one cymbal', async () => {
    let response = await request.get('/api/v1/cymbal/1');
    expect(response.status).toEqual(200);
    expect(response.body[0].manufacturer).toEqual('Zildjian');
    expect(response.body[0].series).toEqual('A Custom');
    expect(response.body[0].model).toEqual('Crash');
    expect(response.body[0].size).toEqual(16);
    expect(response.body[0].type).toEqual('Crash');
  });

  test('Update a cymbal', async () => {
    let response = await request.put('/api/v1/cymbal/1').send({
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
    let response = await request.delete('/api/v1/cymbal/1');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Record Deleted');
  });
});
