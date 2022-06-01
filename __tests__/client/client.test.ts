import request from 'supertest';
import server from '../../index';

const adminUser = { email: 'dariuux@gmail.com', password: 'test' };
const normalUser = { email: 'cidukascido@gmail.com', password: 'test' };

describe('Client endpoints', () => {
  it('if user is admin he can get all clients', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/clients').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
  });
  it('admin can crete client', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).post('/api/clients').set('Authorization', `Bearer ${token}`).send({
      name: 'test',
    });
    expect(result2.statusCode).toEqual(200);
  });
  it('admin can update client', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    // assert if client is exists before update
    const result2 = await request(server).get('/api/clients').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
    expect(result2.body.length).toBeGreaterThan(0);
    const clientId = result2.body[0].id;
    const result3 = await request(server).patch(`/api/clients/${clientId}`).set('Authorization', `Bearer ${token}`).send({
      name: 'test',
    });
    expect(result3.statusCode).toEqual(200);
  });
  it('admin can delete client', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    // assert if client is exists before delete
    const result2 = await request(server).get('/api/clients').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
    expect(result2.body.length).toBeGreaterThan(0);
    const clientId = result2.body[0].id;
    const result3 = await request(server).delete(`/api/clients/${clientId}`).set('Authorization', `Bearer ${token}`);
    expect(result3.statusCode).toEqual(200);
  });
  it('normal user can not get all clients,', async () => {
    const result = await request(server).post('/api/users/login').send(normalUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/clients').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(403);
  })
  it('normal user can not create client', async () => {
    const result = await request(server).post('/api/users/login').send(normalUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).post('/api/clients').set('Authorization', `Bearer ${token}`).send({
      name: 'test',
    })
    expect(result2.statusCode).toEqual(403);
  });
  it('normal user can not update client', async () => {
    const result = await request(server).post('/api/users/login').send(normalUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result3 = await request(server).patch(`/api/clients/100`).set('Authorization', `Bearer ${token}`).send({
      name: 'test',
    });
    expect(result3.statusCode).toEqual(403);
  });
  it('normal user can not delete client', async () => {
    const result = await request(server).post('/api/users/login').send(normalUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result3 = await request(server).delete(`/api/clients/100`).set('Authorization', `Bearer ${token}`);
    expect(result3.statusCode).toEqual(403);
  });
});

