import request from 'supertest';
import server from '../../index';

const URL = 'http://localhost:3000/api';

const adminUser = { email: 'dariuux@gmail.com', password: 'test' };
const normalUser = { email: 'cidukascido@gmail.com', password: 'test' };

describe('User endpoints', () => {
  it('returns 401 if user has no token', async () => {
    console.log('test');
    const result = await request(server).get('/api/users');
    expect(result.statusCode).toEqual(401);
  });
  it('returns 403 if user has token, but it is invalid', async () => {
    const result = await request(server).get('/api/users').set('Authorization', 'Bearer 12345');
    expect(result.statusCode).toEqual(403);
  });
  it('logins user and returns token', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
  });
  it('lets admin get all users', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/users').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
  });
  it('if user is not admin, he can not get all users', async () => {
    const result = await request(server).post('/api/users/login').send(normalUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/users').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(403);
  });
  it('lets admin add new employee to the system', async () => {
    const result = await request(server).post('/api/users/login').send(adminUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).get('/api/users').set('Authorization', `Bearer ${token}`);
    expect(result2.statusCode).toEqual(200);
    const users = result2.body;
    const user = users.find((user) => user.email === 'test0001@mailinator.com');
    if (user) {
      await request(server).delete(`/api/users/${user.id}`).set('Authorization', `Bearer ${token}`);
    }

    const result3 = await request(server).post('/api/users/add').set('Authorization', `Bearer ${token}`).send({ email: 'test0001@mailinator.com' })
    expect(result3.statusCode).toEqual(200);
    const result4 = await request(server).get('/api/users').set('Authorization', `Bearer ${token}`);
    expect(result4.statusCode).toEqual(200);
    const removableUser = result4.body.find((user) => user.email === 'test0001@mailinator.com');
    const result5 = await request(server).delete(`/api/users/${removableUser.id}`).set('Authorization', `Bearer ${token}`);
    expect(result5.statusCode).toEqual(204);
  });
  it('if user is not admin, he can not create new user', async () => {
    const result = await request(server).post('/api/users/login').send(normalUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body.token).toBeDefined();
    const token = result.body.token;
    const result2 = await request(server).post('/api/users/add').set('Authorization', `Bearer ${token}`).send({ email: 'randomUser', password: 'randomPassword' })
    expect(result2.statusCode).toEqual(403);
  });
});
