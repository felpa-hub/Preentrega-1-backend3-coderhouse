const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Adoption = require('../models/Adoption');
const User = require('../models/User');
const Pet = require('../models/Pet');

describe('Adoption API', () => {
  let userId, petId, adoptionId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // Crear un usuario y una mascota para la adopción
    const user = new User({ name: 'Adoption User', email: 'adoption@example.com', password: 'password' });
    await user.save();
    userId = user._id;

    const pet = new Pet({ type: 'Gato', name: 'Mishi', age: 2, owner: userId });
    await pet.save();
    petId = pet._id;
  });

  afterAll(async () => {
    await Adoption.deleteMany({});
    await User.deleteMany({});
    await Pet.deleteMany({});
    await mongoose.connection.close();
  });

  test('POST /adoptions - debe crear una adopción', async () => {
    const response = await request(app)
      .post('/adoptions')
      .send({ user: userId, pet: petId });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    adoptionId = response.body._id;
  });

  test('GET /adoptions - debe obtener una lista de adopciones', async () => {
    const response = await request(app).get('/adoptions');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /adoptions/:id - debe obtener una adopción por ID', async () => {
    const response = await request(app).get(`/adoptions/${adoptionId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('pet');
  });

  test('DELETE /adoptions/:id - debe eliminar una adopción', async () => {
    const response = await request(app).delete(`/adoptions/${adoptionId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Adopción eliminada');
  });
});
