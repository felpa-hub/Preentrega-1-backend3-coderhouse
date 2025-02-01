const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const faker = require('faker');

// Mocking data
const mockUsers = [];
const generateMockUsers = (count) => {
    for (let i = 0; i < count; i++) {
        mockUsers.push({
            id: i + 1,
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('coder123', 10), // Contraseña encriptada
            role: Math.random() > 0.5 ? 'user' : 'admin', // Alterna entre user y admin
            pets: [] // Array vacío
        });
    }
};

// Endpoint para obtener usuarios mockeados
router.get('/mockingusers', (req, res) => {
    if (mockUsers.length === 0) {
        generateMockUsers(50); // Genera 50 usuarios
    }
    res.json(mockUsers);
});

module.exports = router;
