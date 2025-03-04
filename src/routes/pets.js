const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// Obtener todas las mascotas
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().populate('owner');
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva mascota
router.post('/', async (req, res) => {
  const { type, name, age, owner } = req.body;
  const pet = new Pet({ type, name, age, owner });

  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(
::contentReference[oaicite:0]{index=0}
 
