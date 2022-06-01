import request from 'supertest';
import server from '../../index';

const adminUser = { email: 'dariuux@gmail.com', password: 'test' };
const normalUser = { email: 'cidukascido@gmail.com', password: 'test' };

describe('Task endpoints', () => {
  it('if user is admin he can get all tasks', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/tasks').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
  });
  it('admin can crete task', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).post('/api/tasks').set('Authorization', `Bearer ${token}`).send({
      description: 'test',
    });
    expect(result2.statusCode).toEqual(200);
  });
  it('admin can update task', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    // assert if task is exists before update
    const result2 = await request(server).get('/api/tasks').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
    expect(result2.body.length).toBeGreaterThan(0);
    const taskId = result2.body[0].id;
    const result3 = await request(server).patch(`/api/tasks/${taskId}`).set('Authorization', `Bearer ${token}`).send({
      description: 'test',
    });
    expect(result3.statusCode).toEqual(200);
  });
  it('admin can delete task', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    // assert if task is exists before delete
    const result2 = await request(server).get('/api/tasks').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
    expect(result2.body.length).toBeGreaterThan(0);
    const taskId = result2.body[0].id;
    const result3 = await request(server).delete(`/api/tasks/${taskId}`).set('Authorization', `Bearer ${token}`);
    expect(result3.statusCode).toEqual(200);
  });
  it('if user is not admin he can get only tasks, where project is visible to him', async () => {
    const result = await request(server).post('/api/users/login').send(normalUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/tasks').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
    expect(result2.body.length).toBeGreaterThan(0);
  });

});