const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Pet = require('../models/Pet');

describe('Pet API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await Pet.deleteMany({});
    await mongoose.connection.close();
  });

  let petId;

  test('POST /pets - debe crear una mascota', async () => {
    const response = await request(app)
      .post('/pets')
      .send({
        type: 'Perro',
        name: 'Firulais',
        age: 3
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    petId = response.body._id;
  });

  test('GET /pets - debe obtener una lista de mascotas', async () => {
    const response = await request(app).get('/pets');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /pets/:id - debe obtener una mascota por ID', async () => {
    const response = await request(app).get(`/pets/${petId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Firulais');
  });

  test('PUT /pets/:id - debe actualizar una mascota', async () => {
    const response = await request(app)
      .put(`/pets/${petId}`)
      .send({ name: 'Max' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Max');
  });

  test('DELETE /pets/:id - debe eliminar una mascota', async () => {
    const response = await request(app).delete(`/pets/${petId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Mascota eliminada');
  });
});
