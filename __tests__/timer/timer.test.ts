import request from 'supertest';
import server from '../../index';

const adminUser = { email: 'dariuux@gmail.com', password: 'test' };
const normalUser = { email: 'cidukascido@gmail.com', password: 'test' };

describe('Timer endpoints', () => {
  it('if user is admin he can get all timers', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/timers').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
  });
  it('user can start timer', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    // get random task
    const result2 = await request(server).get('/api/tasks').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
    expect(result2.body.length).toBeGreaterThan(0);
    const taskId = result2.body[0].id;
    const result3 = await request(server).post('/api/timers').set('Authorization', `Bearer ${token}`).send({
      taskId,
      userId: result.body.id,
    });
    expect(result3.statusCode).toEqual(200);
    // stop timer after 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
    const result4 = await request(server).patch(`/api/timers/${result3.body.id}`).set('Authorization', `Bearer ${token}`).send({
      userId: result.body.id,
    });
    expect(result4.statusCode).toEqual(200);
  });
  it('if taskid not provided return 404', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).post('/api/timers').set('Authorization', `Bearer ${token}`).send({
      userId: result.body.id,
    });
    expect(result2.statusCode).toEqual(404);
  });
});