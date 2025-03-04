const request = require('supertest');
const app = require('../src/app');

describe('Adoption Routes', () => {
  it('Debe obtener todas las adopciones', async () => {
    const res = await request(app).get('/adoptions');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Debe crear una nueva adopción', async () => {
    const newAdoption = { user: 'idUsuario', pet: 'idMascota' };
    const res = await request(app).post('/adoptions').send(newAdoption);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });
});
