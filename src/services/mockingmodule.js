const faker = require('faker');
const bcrypt = require('bcrypt');

const generateUsers = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('coder123', 10), // Contraseña encriptada
        role: Math.random() > 0.5 ? 'user' : 'admin',
        pets: []
    }));
};

const generatePets = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        type: faker.animal.type(),
        name: faker.name.firstName(),
        age: Math.floor(Math.random() * 10) + 1
    }));
};

module.exports = { generateUsers, generatePets };
