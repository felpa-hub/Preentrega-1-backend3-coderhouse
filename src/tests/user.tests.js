const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('User API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  let userId;

  test('POST /users - debe crear un usuario', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    userId = response.body._id;
  });

  test('GET /users - debe obtener una lista de usuarios', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /users/:id - debe obtener un usuario por ID', async () => {
    const response = await request(app).get(`/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  test('PUT /users/:id - debe actualizar un usuario', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .send({ name: 'Updated User' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated User');
  });

  test('DELETE /users/:id - debe eliminar un usuario', async () => {
    const response = await request(app).delete(`/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuario eliminado');
  });
});
