import request from 'supertest';
import express from 'express';
import eventRouter from '../../routers/event.router.js';

const app = express();
app.use('/api', eventRouter);

describe('Event Router', () => {
  it('should handle GET /api/event', async () => {
    const response = await request(app).get('/api/event');
    expect(response.statusCode).toBe(200);
  });
  it('should handle POST /api/event', async () => {
    const response = await request(app)
      .post('/api/event')
      .send({
        name: 'fete du spourme',
        theme: 'fete du spourme',
        description: 'fete du spourme',
        owner_id: 2,
        status: false,
        startDate: '2023-12-27 15:30:00+03:00',
        endDate: '2023-12-27 15:30:00+03:00',
      });

    expect(response.statusCode).toBe(200);
  });
});
