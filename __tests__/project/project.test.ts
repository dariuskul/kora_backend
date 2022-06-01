import request from 'supertest';
import server from '../../index';

const adminUser = { email: 'dariuux@gmail.com', password: 'test' };
const normalUser = { email: 'cidukascido@gmail.com', password: 'test' };

describe('Project endpoints', () => {
  it('if user is admin he can get all projects', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/projects').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
    expect(result2.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'Dora' })]));
  });
  it('if user is not admin or moderator he can get projects in which he is invited or project is public', async () => {
    const result = await request(server).post('/api/users/login').send(normalUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/projects').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
    expect(result2.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'Kora projektas' })]));
  });
  it('admin can get project statistics', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/projects/10001/statistics').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
  });
  it('admin can get project by id', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/projects/10001').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
  });
  it('get project by id should return 404 if project does not exist', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/projects/1123123123').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(500);
  });
  it('throw 400 error if validation error occurs', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).post('/api/projects').set('Authorization', `Bearer ${token}`).send({
      name: 'test',
    });
    expect(result2.statusCode).toEqual(400);
  });
  it('admin can update project', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).put('/api/projects/1').set('Authorization', `Bearer ${token}`).send({
      name: 'test',
    });
    expect(result2.statusCode).toEqual(500);
  });

})