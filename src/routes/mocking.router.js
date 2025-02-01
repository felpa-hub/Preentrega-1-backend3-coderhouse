const express = require('express');
const router = express.Router();
const { generateUsers, generatePets } = require('../services/mockingModule');
const database = require('../database/database');

// Endpoint para obtener usuarios mockeados
router.get('/mockingusers', (req, res) => {
    if (database.users.length === 0) {
        database.users = generateUsers(50); // Genera 50 usuarios si la DB está vacía
    }
    res.json(database.users);
});

// Endpoint para obtener mascotas mockeadas
router.get('/mockingpets', (req, res) => {
    if (database.pets.length === 0) {
        database.pets = generatePets(20);
    }
    res.json(database.pets);
});

// Endpoint para generar datos y guardarlos en la "base de datos"
router.post('/generateData', (req, res) => {
    const { users, pets } = req.body;

    if (users && Number(users)) {
        database.users.push(...generateUsers(Number(users)));
    }
    if (pets && Number(pets)) {
        database.pets.push(...generatePets(Number(pets)));
    }

    res.json({ message: 'Data generated successfully', database });
});

// Endpoint para verificar usuarios insertados
router.get('/users', (req, res) => {
    res.json(database.users);
});

// Endpoint para verificar mascotas insertadas
router.get('/pets', (req, res) => {
    res.json(database.pets);
});

module.exports = router;
