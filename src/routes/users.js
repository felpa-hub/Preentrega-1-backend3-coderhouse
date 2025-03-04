const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('pets');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Resto de las rutas de usuario

module.exports = router;
