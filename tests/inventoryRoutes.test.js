import request from 'supertest';
import express from 'express';
import { getBuildableSets } from '../src/controllers/inventoryController.js';

// Create a test app instance
const app = express();
app.get('/user/:username/buildable-sets', getBuildableSets);

describe('GET /user/:username/buildable-sets', () => {
  it('responds with json', async () => {
    const username = 'brickfan35';
    const response = await request(app)
      .get(`/user/${username}/buildable-sets`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});