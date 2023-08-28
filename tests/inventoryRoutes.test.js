import request from 'supertest';
import express from 'express';
import { getBuildableSets } from '../src/controllers/inventoryController.js';

// Create a test app instance
const app = express();
app.get('/user/:username/buildable-sets', getBuildableSets);

describe('GET /user/:username/buildable-sets', () => {
  it('responds with json', async () => {
    const username = 'brickfan35'; // replace with a valid username // Increase timeout to 10 seconds
    const response = await request(app)
      .get(`/user/${username}/buildable-sets`)
      .expect('Content-Type', /json/)
      .expect(200); // replace with the expected status code

    // Add more assertions based on your application's behavior
    expect(Array.isArray(response.body)).toBe(true);
  });
});